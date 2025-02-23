import React from 'react';
import { cn } from '../../../utils';
import { cva, type VariantProps } from 'class-variance-authority';

const separatorVariants = cva('transition-all duration-300', {
    variants: {
        variant: {
            default: 'bg-gray-200 dark:bg-gray-700',
            primary: 'bg-primary/20',
            destructive: 'bg-destructive/20',
            gradient: 'bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700',
            dashed: 'border-dashed border-gray-200 dark:border-gray-700 bg-transparent',
            dotted: 'border-dotted border-gray-200 dark:border-gray-700 bg-transparent',
        },
        size: {
            thin: '',
            default: '',
            thick: '',
        },
        withLabel: {
            true: 'flex items-center gap-4',
            false: '',
        },
        animated: {
            true: 'hover:scale-y-150 hover:opacity-80',
            false: '',
        },
    },
    compoundVariants: [
        {
            size: 'thin',
            withLabel: false,
            className: 'h-px',
        },
        {
            size: 'default',
            withLabel: false,
            className: 'h-0.5',
        },
        {
            size: 'thick',
            withLabel: false,
            className: 'h-1',
        },
        {
            variant: ['dashed', 'dotted'],
            className: 'border',
        },
    ],
    defaultVariants: {
        variant: 'default',
        size: 'default',
        withLabel: false,
        animated: false,
    },
});

export interface SeparatorProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof separatorVariants> {
    orientation?: 'horizontal' | 'vertical';
    label?: React.ReactNode;
    decorators?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
    (
        {
            className,
            orientation = 'horizontal',
            variant,
            size,
            label,
            animated,
            decorators = false,
            ...props
        },
        ref
    ) => {
        const isVertical = orientation === 'vertical';
        const withLabel = Boolean(label);

        return (
            <div
                ref={ref}
                role="separator"
                aria-orientation={orientation}
                className={cn(
                    'shrink-0',
                    isVertical ? 'mx-2 h-full w-[1px]' : 'my-2 w-full',
                    separatorVariants({
                        variant,
                        size,
                        withLabel,
                        animated,
                        className,
                    })
                )}
                {...props}
            >
                {label && (
                    <div className="flex items-center gap-4 whitespace-nowrap text-sm text-muted-foreground">
                        {decorators && <div className="h-px flex-1 bg-current opacity-20" />}
                        {label}
                        {decorators && <div className="h-px flex-1 bg-current opacity-20" />}
                    </div>
                )}
            </div>
        );
    }
);

Separator.displayName = 'Separator';

export { Separator, separatorVariants };
