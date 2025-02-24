import React from 'react';

export const useContainerWidth = (ref: React.RefObject<HTMLElement>) => {
    const [width, setWidth] = React.useState<number>(0);

    React.useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });

        resizeObserver.observe(element);

        return () => {
            resizeObserver.disconnect();
        };
    }, [ref]);

    return width;
};