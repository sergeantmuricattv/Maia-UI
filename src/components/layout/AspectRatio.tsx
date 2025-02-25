import React from 'react';
import { cn } from '../../utils';

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
    ratio?: number;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
    ({ className, ratio = 16 / 9, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('relative w-full', className)}
                style={{
                    paddingBottom: `${(1 / ratio) * 100}%`,
                }}
                {...props}
            >
                <div className="absolute inset-0">{children}</div>
            </div>
        );
    }
);

AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
