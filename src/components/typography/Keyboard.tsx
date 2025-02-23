import React from 'react';
import { cn } from '../../utils';

export interface KeyboardProps extends React.HTMLAttributes<HTMLElement> {
    combo?: boolean;
}

const Keyboard = React.forwardRef<HTMLElement, KeyboardProps>(
    ({ className, combo = false, children, ...props }, ref) => {
        return (
            <kbd
                ref={ref}
                className={cn(
                    'px-1.5 py-0.5 text-xs font-mono text-foreground bg-muted rounded border shadow-[inset_0_-1px_0_0_rgb(0_0_0_/_20%)]',
                    combo && 'mx-0.5',
                    className
                )}
                {...props}
            >
                {children}
            </kbd>
        );
    }
);

Keyboard.displayName = 'Keyboard';

export { Keyboard };
