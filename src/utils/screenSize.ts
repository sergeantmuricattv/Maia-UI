export type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "uw";

export const breakpoints: Record<ScreenSize, number> = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    uw: 2560, // Ultra Wide
};

class ScreenSizeManager {
    private static instance: ScreenSizeManager;
    private listeners: Set<(size: ScreenSize) => void> = new Set();
    private currentSize: ScreenSize = "md";
    private resizeTimeout: number | null = null;

    private constructor() {
        this.currentSize = this.getScreenSize();
        window.addEventListener("resize", this.handleResize);
    }

    static getInstance(): ScreenSizeManager {
        if (!ScreenSizeManager.instance) {
            ScreenSizeManager.instance = new ScreenSizeManager();
        }
        return ScreenSizeManager.instance;
    }

    public subscribe(listener: (size: ScreenSize) => void): () => void {
        this.listeners.add(listener);
        listener(this.currentSize);

        return () => {
            this.listeners.delete(listener);
        };
    }

    public getCurrentSize(): ScreenSize {
        return this.currentSize;
    }

    private handleResize = () => {
        if (this.resizeTimeout) {
            cancelAnimationFrame(this.resizeTimeout);
        }

        this.resizeTimeout = requestAnimationFrame(() => {
            const newSize = this.getScreenSize();
            if (newSize !== this.currentSize) {
                this.currentSize = newSize;
                this.listeners.forEach((listener) => listener(newSize));
            }
        });
    };

    private getScreenSize(): ScreenSize {
        const width = window.innerWidth;
        return (Object.keys(breakpoints) as ScreenSize[])
            .reverse()
            .find((key) => width >= breakpoints[key]) || "xs";
    }
}

export const screenSizeManager = ScreenSizeManager.getInstance();
