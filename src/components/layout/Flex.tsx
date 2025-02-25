import React from 'react';
import { cn } from '../../utils';

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
    inline?: boolean;
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
    align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    grow?: boolean;
    shrink?: boolean;
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
    (
        {
            className,
            inline = false,
            direction = 'row',
            wrap = 'nowrap',
            justify = 'start',
            align = 'stretch',
            gap = 'none',
            grow = false,
            shrink = false,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    inline ? 'inline-flex' : 'flex',
                    {
                        'flex-row': direction === 'row',
                        'flex-row-reverse': direction === 'row-reverse',
                        'flex-col': direction === 'column',
                        'flex-col-reverse': direction === 'column-reverse',
                        'flex-nowrap': wrap === 'nowrap',
                        'flex-wrap': wrap === 'wrap',
                        'flex-wrap-reverse': wrap === 'wrap-reverse',
                        'justify-start': justify === 'start',
                        'justify-end': justify === 'end',
                        'justify-center': justify === 'center',
                        'justify-between': justify === 'between',
                        'justify-around': justify === 'around',
                        'justify-evenly': justify === 'evenly',
                        'items-start': align === 'start',
                        'items-end': align === 'end',
                        'items-center': align === 'center',
                        'items-baseline': align === 'baseline',
                        'items-stretch': align === 'stretch',
                        'gap-0': gap === 'none',
                        'gap-2': gap === 'sm',
                        'gap-4': gap === 'md',
                        'gap-6': gap === 'lg',
                        'gap-8': gap === 'xl',
                        'grow': grow,
                        'shrink': shrink,
                    },
                    className
                )}
                {...props}
            />
        );
    }
);

Flex.displayName = 'Flex';

export { Flex };
