import { useEffect, useState, RefObject } from 'react';
import { AccordionAnimation } from '../components';

export const useAccordionAnimation = (
    contentRef: RefObject<HTMLDivElement | null>,
    isExpanded: boolean,
    animation: AccordionAnimation = 'slide'
) => {
    const [height, setHeight] = useState<string | number>(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const element = contentRef.current;
        if (!element) return;

        setIsTransitioning(true);
        const contentHeight = element.scrollHeight;

        switch (animation) {
            case 'fade':
                element.style.opacity = isExpanded ? '1' : '0';
                break;
            case 'zoom':
                element.style.transform = isExpanded ? 'scale(1)' : 'scale(0.95)';
                break;
            case 'bounce':
                if (isExpanded) {
                    element.style.animation = 'accordionBounce 0.3s ease';
                }
                break;
            case 'none':
                element.style.transition = 'none';
                break;
            case 'slide':
            default:
                // Default slide behavior
                break;
        }

        if (isExpanded) {
            setHeight(contentHeight);
        } else {
            setHeight(0);
        }
    }, [isExpanded, contentRef, animation]);

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (isExpanded) {
            setHeight('auto');
        }
    };

    return {
        height,
        isTransitioning,
        handleTransitionEnd
    };
};