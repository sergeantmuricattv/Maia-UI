import React, {ElementType} from "react";
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
    columnSpacing?: number | string  | undefined | Partial<Record<ScreenSize, number | string | undefined>>;
    rowSpacing?: number | string  | undefined | Partial<Record<ScreenSize, number | string | undefined>>;
    spacing?: number | string | undefined | Partial<Record<ScreenSize, number | string | undefined>>;
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
    spacing: number | string | undefined;
    rowSpacing?: number | string | undefined;
    columnSpacing?: number | string | undefined;
}>({ spacing: 0, rowSpacing: 0, columnSpacing: 0});

const Grid = React.forwardRef<HTMLElement, GridProps>((props, ref) => {
    const screenSize = useScreenSize();
    const parentContext = React.useContext(GridContext);

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
            columnSpacing,
            rowSpacing,
            spacing = 0,
            direction = "row",
            wrap = "wrap",
            alignItems,
            alignContent,
            justifyContent,
            justifyItems,
        } = rest as GridContainerProps;

        const currentSpacing = getResponsiveValue(spacing, screenSize, 0);
        const currentColSpacing = getResponsiveValue(columnSpacing, screenSize, currentSpacing);
        const currentRowSpacing = getResponsiveValue(rowSpacing, screenSize, currentSpacing);

        const style: React.CSSProperties = {
            display: isHidden ? "none" : "flex",
            flexDirection: direction,
            flexWrap: typeof wrap === "object"
                ? (getResponsiveValue(wrap, screenSize, "nowrap") as GridWrap)
                : wrap,
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            gap: `${currentSpacing}px`,
            columnGap: currentColSpacing !== undefined ? `${currentColSpacing}px` : undefined,
            rowGap: currentRowSpacing !== undefined ? `${currentRowSpacing}px` : undefined,
            alignItems: getResponsiveValue(alignItems, screenSize, undefined),
            alignContent: getResponsiveValue(alignContent, screenSize, undefined),
            justifyContent: getResponsiveValue(justifyContent, screenSize, "space-between"),
            justifyItems: getResponsiveValue(justifyItems, screenSize, undefined),
            ...(zIndex !== undefined && { zIndex }),
            ...(overflow && { overflow }),
        };

        return (
            <GridContext.Provider value={{ spacing: currentSpacing, rowSpacing: currentRowSpacing, columnSpacing: currentColSpacing}}>
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

        const style: React.CSSProperties = {
            display: isHidden ? "none" : undefined,
            boxSizing: "border-box",
            minWidth: 0,
            ...(currentSize && calculateGridSize(currentSize, parentContext.spacing? parentContext.spacing : parentContext.rowSpacing? parentContext.rowSpacing : parentContext.columnSpacing)),
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
                onClick={() => {console.log(size, offset, order)}}
                className={clsx(className, {
                    "grid-item": true,
                    "nested-item": nested,
                })}
                style={style}
                ref={ref}
            >
                {children}
            </Component>
        );
    }

    return null;
});


const calculateGridSize = (
    size: GridSize,
    containerSpacing: number | string = 0
): React.CSSProperties => {
    // Handle non-numeric sizes first
    if (typeof size !== 'number') {
        return {
            flexGrow: size === "grow" ? 1 : 0,
            maxWidth: size === "grow" ? "100%" : undefined,
            flexShrink: size !== "none" ? 1 : 0,
            flexBasis: size === "auto" ? "auto" : "0%",
            width: size === "auto" ? "auto" : undefined,
        };
    }

    const spacingValue = typeof containerSpacing === 'string'
        ? parseFloat(containerSpacing)
        : Number(containerSpacing) || 0;

    const spacingReduction = (spacingValue / 10);


    const adjustedSize = Math.max(size - spacingReduction, 0);

    const percentage = (adjustedSize / 20) * 100;

    return {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: `calc(${percentage}% - ${spacingValue}px)`,
        maxWidth: `calc(${percentage}% - ${spacingValue}px)`,
        width: `calc(${percentage}% - ${spacingValue}px)`,
        minWidth: 0,
    };
};

Grid.displayName = "Grid";

export {Grid};