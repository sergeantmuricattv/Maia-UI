import React, {ElementType, useCallback, useContext, useEffect, useMemo, useState} from "react";
import clsx from "clsx";
import {getResponsiveValue, useScreenSize} from "../../hooks";
import {ScreenSize} from "../../utils";

type GridDirection = "row" | "row-reverse" | "column" | "column-reverse";
type GridWrap = "nowrap" | "wrap" | "wrap-reverse";
type GridSize = number | "auto" | "grow" | "shrink" | "none";
type GridAlignment = "start" | "center" | "end" | "stretch" | "baseline";
type GridJustification = "start" | "center" | "end" | "between" | "around" | "evenly";
type GridOrder = number | "first" | "last";

// Base props shared by all grid types
interface BaseGridProps extends Omit<React.HTMLAttributes<HTMLElement>, 'hidden'> {
    as?: ElementType;
    className?: string;
    children: React.ReactNode;
    hidden?: boolean | Partial<Record<ScreenSize, boolean>>;
    zIndex?: number;
    overflow?: "visible" | "hidden" | "scroll" | "auto";
}

// Container-specific props
interface GridContainerProps extends BaseGridProps {
    container: true;
    item?: never;
    nested?: never;
    // Container-only props
    spacing?: number | string | [number, number] | undefined | Partial<Record<ScreenSize, number | string | [number, number] | undefined>>;
    direction?: GridDirection;
    wrap?: GridWrap | Partial<Record<ScreenSize, GridWrap>>;
    alignItems?: GridAlignment | Partial<Record<ScreenSize, GridAlignment>>;
    alignContent?: GridAlignment | Partial<Record<ScreenSize, GridAlignment>>;
    justifyContent?: GridJustification | Partial<Record<ScreenSize, GridJustification>>;
    justifyItems?: GridJustification | Partial<Record<ScreenSize, GridJustification>>;
}

// Item-specific props
interface GridItemProps extends BaseGridProps {
    container?: never;
    item: true;
    nested?: boolean;
    // Item-only props
    size?: GridSize | Partial<Record<ScreenSize, GridSize>>;
    alignSelf?: GridAlignment | Partial<Record<ScreenSize, GridAlignment>>;
    justifySelf?: GridJustification | Partial<Record<ScreenSize, GridJustification>>;
    offset?: number | [number, number] | Partial<Record<ScreenSize, number | [number, number]>>;
    order?: GridOrder | Partial<Record<ScreenSize, GridOrder>>;
}

export type GridProps = GridContainerProps | GridItemProps;


const calculateOrder = (order: GridOrder): number => {
    if (order === "first") return -1;
    if (order === "last") return 999;
    return order;
};

const GridContext = React.createContext<{
    spacing: number | string | [number, number] | undefined;
    availableColumns: number;
    updateAvailableColumns: (used: number) => void;
}>({
    spacing: 0,
    availableColumns: 20,
    updateAvailableColumns: () => {}
});

const Grid = React.forwardRef<HTMLElement, GridProps>((props, ref) => {
    const screenSize = useScreenSize();
    const [availableColumns, setAvailableColumns] = useState(20);

    const updateAvailableColumns = useCallback((used: number) => {
        setAvailableColumns(prev => Math.max(0, prev - used));
    }, []);


    const {
        as: Component = "div",
        className,
        children,
        hidden,
        zIndex,
        overflow,
        ...rest
    } = props;

    const isContainer = 'container' in props && props.container;
    const isItem = 'item' in props && props.item;

    // Get responsive values
    const isHidden = getResponsiveValue(hidden, screenSize, false);

    if (isContainer) {
        const {
            spacing = 0,
            alignItems,
            alignContent,
            justifyContent,
            justifyItems,
        } = rest as GridContainerProps;

        const currentSpacing = getResponsiveValue(spacing, screenSize, 0);

        useEffect(() => {
            setAvailableColumns(20);
        }, []);

        let margin, gap;
        if (currentSpacing !== undefined && !Array.isArray(currentSpacing)) {
            gap = currentSpacing;
            margin = currentSpacing;
        } else if (Array.isArray(currentSpacing)) {
            gap = currentSpacing[0];
            margin = currentSpacing[1];
        }


        const style: React.CSSProperties = {
            display: isHidden ? "none" : "grid",
            gridTemplateColumns: "repeat(20, minmax(0, 1fr))",
            gridAutoFlow: "row",

            gridAutoRows: "auto",
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            position: "relative",


            gap: typeof gap === 'number' ? `${gap}px` : undefined,
            marginBottom: typeof margin === 'number' ? `${margin}px` : undefined,
            marginTop: typeof margin === 'number' ? `${margin}px` : undefined,
            alignItems: getResponsiveValue(alignItems, screenSize, undefined),
            alignContent: getResponsiveValue(alignContent, screenSize, undefined),
            justifyContent: getResponsiveValue(justifyContent, screenSize, "center"),
            justifyItems: getResponsiveValue(justifyItems, screenSize, undefined),
            ...(zIndex !== undefined && { zIndex }),
            ...(overflow && { overflow }),
            ["--grid-gap" as any]: typeof currentSpacing === 'number' ? `${currentSpacing}px` : currentSpacing || '0px',

        };

        return (
            <GridContext.Provider value={{ spacing: currentSpacing, availableColumns, updateAvailableColumns }}>
                <Component
                    className={clsx(className, "grid-container")}
                    style={style}
                    ref={ref}
                >
                    {children}
                </Component>
            </GridContext.Provider>
        );
    }

    if (isItem) {
        const context = useContext(GridContext);
        const {
            nested,
            size,
            alignSelf,
            justifySelf,
            offset = 0,
            order,
        } = rest as GridItemProps;

        const currentSize = getResponsiveValue(size, screenSize, undefined);
        const currentOffset = getResponsiveValue(offset, screenSize, undefined);
        const currentOrder = getResponsiveValue(order, screenSize, undefined);

        const columnsToUse = useMemo(() => {
            if (typeof currentSize === 'number') {
                return Math.min(currentSize, 20);
            }
            if (currentSize === 'grow') {
                return context.availableColumns;
            }
            if (currentSize === 'auto' || currentSize === 'shrink') {
                return 1; // Or calculate based on content width
            }
            return 1;
        }, [currentSize, context.availableColumns]);

        useEffect(() => {
            context.updateAvailableColumns(columnsToUse);
        }, [columnsToUse]);


        const style: React.CSSProperties = {
            display: isHidden ? "none" : undefined,

            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            position: "relative",

            ...(currentSize && calculateGridSize(currentSize)),
            alignSelf: getResponsiveValue(alignSelf, screenSize, undefined),
            justifySelf: getResponsiveValue(justifySelf, screenSize, undefined),
            order: currentOrder !== undefined ? calculateOrder(currentOrder) : undefined,
            ...(zIndex !== undefined && { zIndex }),
            ...(overflow && { overflow }),
        };

        // Handle offset
        if (currentOffset !== undefined) {
            const [xOffset, yOffset] = Array.isArray(currentOffset)
                ? currentOffset
                : [currentOffset, currentOffset];

            const clampedX = Math.min(Math.max(Number(xOffset), -10), 10);
            const clampedY = Math.min(Math.max(Number(yOffset), -10), 10);

            style.transform = `translate(${clampedX * 10}%, ${clampedY * 10}%)`;
        }








        return (
            <Component
                ref={ref}

                onClick={() => {console.log(size, offset, order)}}
                className={clsx(className, {
                    "grid-item": true,
                    "nested-item": nested,
                })}
                style={style}
            >
                {children}
            </Component>
        );
    }

    return null;
});


const calculateGridSize = (
    size: GridSize,
): React.CSSProperties => {
    if (typeof size === 'number') {
        if (size === 0) {
            return {
                display: 'none',
                minWidth: 0,
            };
        }
        // Ensure size doesn't exceed 20 columns
        const columnSpan = Math.min(size, 20);
        return {
            gridColumn: `span ${columnSpan}`,
            minWidth: 0,
        };
    }
    switch (size) {
        case "grow":
            return {
                gridColumn: "auto / span 20", // Start at current position, span up to 20
                minWidth: 0,
                width: "100%",
                // These ensure it only takes available space
                maxWidth: `calc((var(--available-width, 100%) - var(--gap, 0px)) * var(--columns-left, 1))`,
            };


        case "shrink":
            return {
                gridColumn: "auto",
                width: "min-content",
            };

        case "auto":
            return {
                gridColumn: "auto",
                width: "min-content",
            };
        case "none":
            return {
                gridColumn: "auto",
                minWidth: "fit-content",
                maxWidth: "100%",
            };
        default:
            return {
                gridColumn: "auto",
                width: "auto",
                maxWidth: "100%",
            };


    }
};


Grid.displayName = "Grid";

export {Grid};