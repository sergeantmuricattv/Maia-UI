import {ScreenSize} from "../utils";

export const getResponsiveValue = <T, >(
    value: T | Partial<Record<ScreenSize, T>> | undefined,
    screenSize: ScreenSize,
    defaultValue: T | undefined
): T | undefined => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        return (value as Partial<Record<ScreenSize, T>>)[screenSize] ?? defaultValue;
    }
    return (value as T) ?? defaultValue;
};