import React from "react";
import clsx from "clsx";
import {useScreenSize} from "./hooks/useScreenSize";
import {ScreenSize} from "./utils/screenSize";

type GridDirection = "row" | "row-reverse" | "column" | "column-reverse";
type GridWrap = "nowrap" | "wrap" | "wrap-reverse";
type GridSize = number | "auto" | "grow";

export interface GridProps {
    as?: "div" | "span";
    className?: string;
    children: React.ReactNode;
    columnSpacing?: number | string | Partial<Record<ScreenSize, number | string>>;
    rowSpacing?: number | string | Partial<Record<ScreenSize, number | string>>;
    spacing?: number | string | Partial<Record<ScreenSize, number | string>>;
    container?: boolean;
    item?: boolean;
    direction?: GridDirection | Partial<Record<ScreenSize, GridDirection>>;
    offset?:
        | string
        | number
        | [string | number, string | number]
        | Partial<
        Record<
            ScreenSize,
            string | number | [string | number, string | number]
        >
    >;
    size?: GridSize | Partial<Record<ScreenSize, GridSize>>;
    wrap?: GridWrap;
}

const getResponsiveValue = <T, >(
    value: T | Partial<Record<ScreenSize, T>> | undefined,
    screenSize: ScreenSize,
    defaultValue: T | undefined
): T | undefined => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        return (value as Partial<Record<ScreenSize, T>>)[screenSize] ?? defaultValue;
    }
    return (value as T) ?? defaultValue;
};

const clamp = (val: number, min: number, max: number): number =>
    Math.min(Math.max(val, min), max);

// Calculate percentage width for a numeric size (1-20).
const calculateGridSize = (size: number): string => {
    return `${(Number(size) / 20) * 100}%`;
};

const Grid: React.FC<GridProps> = ({
                                       as: Component = "div",
                                       className,
                                       children,
                                       columnSpacing,
                                       rowSpacing,
                                       spacing = 0,
                                       container = false,
                                       item = false,
                                       direction = {xs: "column", md: "row"},
                                       offset = 0,
                                       size,
                                       wrap = "wrap",
                                   }) => {
    const screenSize = useScreenSize();
    const spacingValue = getResponsiveValue(spacing, screenSize, undefined);
    const flexDirection = getResponsiveValue(direction, screenSize, "row");
    const offsetValue = getResponsiveValue(offset, screenSize, undefined);
    const gridSize = getResponsiveValue(size, screenSize, undefined);

    const inlineStyles: React.CSSProperties = {
        boxSizing: "border-box",
    };

    // Container styles using flex layout.
    if (container) {
        inlineStyles.display = "flex";
        inlineStyles.flexDirection = flexDirection as React.CSSProperties["flexDirection"];
        inlineStyles.flexWrap = wrap;
        if (spacingValue !== undefined) {
            inlineStyles.columnGap = spacingValue;
            inlineStyles.rowGap = spacingValue;
        }
        const colSpacing = getResponsiveValue(columnSpacing, screenSize, undefined);
        const rowSpacingValue = getResponsiveValue(rowSpacing, screenSize, undefined);
        if (colSpacing !== undefined) {
            inlineStyles.columnGap = colSpacing;
        }
        if (rowSpacingValue !== undefined) {
            inlineStyles.rowGap = rowSpacingValue;
        }
        // --- Force same-row behavior when total size (of pure items) equals a multiple of 20 ---
        const childrenArray = React.Children.toArray(children);
        let totalSize = 0;
        let hasSizes = false;
        childrenArray.forEach(child => {
            if (React.isValidElement(child)) {
                const childProps = child.props as GridProps;
                // Only count this child if it's an item and not also a container (i.e. a pure item).
                if (childProps.item && !childProps.container && typeof childProps.size === "number") {
                    totalSize += childProps.size;
                    hasSizes = true;
                }
            }
        });
        if (hasSizes && totalSize % 20 === 0) {
            inlineStyles.flexWrap = "nowrap";
            inlineStyles.flexDirection = "row";
        }
    }

    // Item styles.
    if (item) {
        if (gridSize !== undefined) {
            if (gridSize === "grow") {
                // Separate flex properties for grow.
                inlineStyles.flexGrow = 1;
                inlineStyles.flexShrink = 1;
                inlineStyles.flexBasis = "0%";
            } else if (gridSize === "auto") {
                inlineStyles.flexBasis = "auto";
                inlineStyles.flexGrow = 0;
                inlineStyles.flexShrink = 1;
                inlineStyles.width = "auto";
            } else if (typeof gridSize === "number") {
                const widthValue = calculateGridSize(gridSize);
                inlineStyles.flexBasis = widthValue;
                inlineStyles.maxWidth = widthValue;
                inlineStyles.width = widthValue;
                inlineStyles.flexGrow = 0;
                inlineStyles.flexShrink = 1;
            }
            inlineStyles.minWidth = 0;
        }
        // Offset handling.
        if (offsetValue !== undefined) {
            let xOffset: number, yOffset: number;
            if (Array.isArray(offsetValue)) {
                xOffset = clamp(Number(offsetValue[0]), -10, 10);
                yOffset = clamp(Number(offsetValue[1]), -10, 10);
            } else {
                xOffset = clamp(Number(offsetValue), -10, 10);
                yOffset = clamp(Number(offsetValue), -10, 10);
            }
            inlineStyles.transform = `translate(${xOffset * 10}%, ${yOffset * 10}%)`;
        }
    }

    return (
        <Component style={inlineStyles} className={clsx(className)}>
            {children}
        </Component>
    );
};

export default Grid;
