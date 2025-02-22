// hooks/useScreenSize.ts
import {useEffect, useState} from "react";
import {ScreenSize, screenSizeManager} from "../utils/screenSize";

export const useScreenSize = (): ScreenSize => {
    const [screenSize, setScreenSize] = useState(screenSizeManager.getCurrentSize());

    useEffect(() => {
        return screenSizeManager.subscribe(setScreenSize);
    }, []);

    return screenSize;
};
