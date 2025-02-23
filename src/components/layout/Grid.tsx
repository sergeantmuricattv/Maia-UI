import React, {ElementType} from "react";
import clsx from "clsx";
import { useScreenSize } from "../../hooks";
import { ScreenSize } from "../../utils";
import { getResponsiveValue } from "../../hooks";

type GridDirection = "row" | "row-reverse" | "column" | "column-reverse";
type GridWrap = "nowrap" | "wrap" | "wrap-reverse";
type GridSize = number | "auto" | "grow" | "shrink" | "none";
type GridAlignment = "start" | "center" | "end" | "stretch" | "baseline";
type GridJustification = "start" | "center" | "end" | "between" | "around" | "evenly";
type GridOrder = number | "first" | "last";

export interface GridProps extends Omit<React.HTMLAttributes<HTMLElement>, 'hidden'> {
    as?: ElementType;
    className?: string;
    children: React.ReactNode;
    // Spacing
    columnSpacing?: number | string | Partial<Record<ScreenSize, number | string>>;
    rowSpacing?: number | string | Partial<Record<ScreenSize, number | string>>;
    spacing?: number | string | Partial<Record<ScreenSize, number | string>>;
    // Layout
    container?: boolean;
    item?: boolean;
    direction?: GridDirection | Partial<Record<ScreenSize, GridDirection>>;
    wrap?: GridWrap | Partial<Record<ScreenSize, GridWrap>>;
    // Alignment
    alignItems?: GridAlignment | Partial<Record<ScreenSize, GridAlignment>>;
    alignContent?: GridAlignment | Partial<Record<ScreenSize, GridAlignment>>;
    alignSelf?: GridAlignment | Partial<Record<ScreenSize, GridAlignment>>;
    justifyContent?: GridJustification | Partial<Record<ScreenSize, GridJustification>>;
    justifyItems?: GridJustification | Partial<Record<ScreenSize, GridJustification>>;
    justifySelf?: GridJustification | Partial<Record<ScreenSize, GridJustification>>;
    // Sizing and Positioning
    size?: GridSize | Partial<Record<ScreenSize, GridSize>>;
    offset?: number | [number, number] | Partial<Record<ScreenSize, number | [number, number]>>;
    order?: GridOrder | Partial<Record<ScreenSize, GridOrder>>;
    // Additional features
    hidden?: boolean | Partial<Record<ScreenSize, boolean>>;
    zIndex?: number;
    overflow?: "visible" | "hidden" | "scroll" | "auto";
}

const calculateGridSize = (size: GridSize): React.CSSProperties => {
    if (size === "grow") {
        return {
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: "0%",
        };
    }
    if (size === "shrink") {
        return {
            flexGrow: 0,
            flexShrink: 1,
            flexBasis: "auto",
        };
    }
    if (size === "none") {
        return {
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: "auto",
        };
    }
    if (size === "auto") {
        return {
            flexBasis: "auto",
            flexGrow: 0,
            flexShrink: 1,
            width: "auto",
        };
    }
    const widthValue = `${(Number(size) / 20) * 100}%`;
    return {
        flexBasis: widthValue,
        maxWidth: widthValue,
        width: widthValue,
        flexGrow: 0,
        flexShrink: 1,
    };
};

const calculateOrder = (order: GridOrder): number => {
    if (order === "first") return -1;
    if (order === "last") return 999;
    return order;
};

const Grid = React.forwardRef<HTMLElement, GridProps>(({
                                                           as: Component = "div",
                                                           className,
                                                           children,
                                                           // Spacing props
                                                           columnSpacing,
                                                           rowSpacing,
                                                           spacing = 0,
                                                           // Layout props
                                                           container = false,
                                                           item = false,
                                                           direction = { xs: "column", md: "row" },
                                                           wrap = "wrap",
                                                           // Alignment props
                                                           alignItems,
                                                           alignContent,
                                                           alignSelf,
                                                           justifyContent,
                                                           justifyItems,
                                                           justifySelf,
                                                           // Sizing and Positioning props
                                                           size,
                                                           offset = 0,
                                                           order,
                                                           // Additional features
                                                           hidden,
                                                           zIndex,
                                                           overflow,
                                                           ...rest
                                                       }, ref) => {
    const screenSize = useScreenSize();

    // Get responsive values
    const currentDirection = getResponsiveValue(direction, screenSize, "row");
    const currentWrap = getResponsiveValue(wrap, screenSize, "wrap");
    const currentSize = getResponsiveValue(size, screenSize, undefined);
    const currentOffset = getResponsiveValue(offset, screenSize, undefined);
    const currentOrder = getResponsiveValue(order, screenSize, undefined);
    const isHidden = getResponsiveValue(hidden, screenSize, false);
    const currentAlignItems = getResponsiveValue(alignItems, screenSize, undefined);
    const currentAlignContent = getResponsiveValue(alignContent, screenSize, undefined);
    const currentAlignSelf = getResponsiveValue(alignSelf, screenSize, undefined);
    const currentJustifyContent = getResponsiveValue(justifyContent, screenSize, undefined);
    const currentJustifyItems = getResponsiveValue(justifyItems, screenSize, undefined);
    const currentJustifySelf = getResponsiveValue(justifySelf, screenSize, undefined);

    const inlineStyles: React.CSSProperties = {
        boxSizing: "border-box",
        display: isHidden ? "none" : container ? "flex" : undefined,
        zIndex,
        overflow,
    };

    // Container styles
    if (container) {
        Object.assign(inlineStyles, {
            flexDirection: currentDirection,
            flexWrap: currentWrap,
            alignItems: currentAlignItems,
            alignContent: currentAlignContent,
            justifyContent: currentJustifyContent?.replace("between", "space-between")
                .replace("around", "space-around")
                .replace("evenly", "space-evenly"),
            justifyItems: currentJustifyItems,
        });

        // Handle spacing
        const spacingValue = getResponsiveValue(spacing, screenSize, undefined);
        const colSpacing = getResponsiveValue(columnSpacing, screenSize, undefined);
        const rowSpacingValue = getResponsiveValue(rowSpacing, screenSize, undefined);

        if (spacingValue !== undefined) {
            inlineStyles.gap = spacingValue;
        }
        if (colSpacing !== undefined) {
            inlineStyles.columnGap = colSpacing;
        }
        if (rowSpacingValue !== undefined) {
            inlineStyles.rowGap = rowSpacingValue;
        }

        // Auto-layout optimization
        const childrenArray = React.Children.toArray(children);
        let totalSize = 0;
        let hasSizes = false;

        childrenArray.forEach(child => {
            if (React.isValidElement(child)) {
                const childProps = child.props as GridProps;
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

    // Item styles
    if (item) {
        if (currentSize !== undefined) {
            Object.assign(inlineStyles, calculateGridSize(currentSize));
        }

        Object.assign(inlineStyles, {
            alignSelf: currentAlignSelf,
            justifySelf: currentJustifySelf,
            order: currentOrder !== undefined ? calculateOrder(currentOrder) : undefined,
            minWidth: 0,
        });

        // Handle offset
        if (currentOffset !== undefined) {
            const [xOffset, yOffset] = Array.isArray(currentOffset)
                ? currentOffset
                : [currentOffset, currentOffset];

            const clampedX = Math.min(Math.max(Number(xOffset), -10), 10);
            const clampedY = Math.min(Math.max(Number(yOffset), -10), 10);

            inlineStyles.transform = `translate(${clampedX * 10}%, ${clampedY * 10}%)`;
        }
    }

    return React.createElement(
        Component,
        {
            ref,
            style: inlineStyles,
            className: clsx(className),
            ...rest
        },
        children
    );
});

Grid.displayName = 'Grid';

export {Grid};
