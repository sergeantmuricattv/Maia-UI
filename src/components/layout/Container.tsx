import React from "react";
import clsx from "clsx";
import {useScreenSize} from "./hooks/useScreenSize";
import {ScreenSize} from "./utils/screenSize";
import {getResponsiveValue} from "./hooks/getResponsiveValue";

export interface ContainerProps {
    as?: "div" | "section" | "main",
    className?: string,
    children: React.ReactNode,
    maxWidth?: ScreenSize | Partial<Record<ScreenSize, ScreenSize>>,
    padding?: number | string | Partial<Record<ScreenSize, number | string>>,
    disableGutters?: boolean,
    centered?: boolean,
    size?: ScreenSize
}

const getMaxWidthValue = (size: ScreenSize): string => {
    const maxWidths: Record<ScreenSize, string> = {
        xs: "100%",
        sm: "600px",
        md: "960px",
        lg: "1280px",
        xl: "1920px",
        uw: "2560px",
    };
    return maxWidths[size];
};


const Container: React.FC<ContainerProps> = ({
                                                 as: Component = "div",
                                                 className,
                                                 children,
                                                 maxWidth = "lg",
                                                 padding,
                                                 disableGutters = false,
                                                 centered = true,
                                                 size
                                             }) => {
    const screenSize = useScreenSize();
    const currentMaxWidth = getResponsiveValue(maxWidth, screenSize, "lg");
    const currentPadding = getResponsiveValue(padding, screenSize, undefined);

    const inlineStyles: React.CSSProperties = {
        boxSizing: "border-box",
        width: "100%",
        marginLeft: centered ? "auto" : undefined,
        marginRight: centered ? "auto" : undefined,
        maxWidth: currentMaxWidth ? getMaxWidthValue(size as ScreenSize ?? currentMaxWidth) : undefined,
        padding: !disableGutters
            ? currentPadding ?? "0 1rem"
            : undefined,
    };

    return (
        <Component style={inlineStyles} className={clsx(className)}>
            {children}
        </Component>
    );
};

export {Container};
