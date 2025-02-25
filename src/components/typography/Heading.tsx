import React from 'react';
import { cn } from '../../utils';
import { cva, type VariantProps } from 'class-variance-authority';

const headingVariants = cva('font-bold tracking-tight', {
    variants: {
        level: {
            h1: 'text-4xl lg:text-5xl',
            h2: 'text-3xl lg:text-4xl',
            h3: 'text-2xl lg:text-3xl',
            h4: 'text-xl lg:text-2xl',
            h5: 'text-lg lg:text-xl',
            h6: 'text-base lg:text-lg',
        },
        variant: {
            default: 'text-foreground',
            primary: 'text-primary',
            secondary: 'text-secondary-foreground',
            gradient:
                'text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary',
            destructive: 'text-destructive',
        },
        weight: {
            normal: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold',
            extrabold: 'font-extrabold',
        },
        align: {
            left: 'text-left',
            center: 'text-center',
            right: 'text-right',
        },
    },
    defaultVariants: {
        level: 'h1',
        variant: 'default',
        weight: 'bold',
        align: 'left',
    },
});

export interface HeadingProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof headingVariants> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    (
        { className, level, variant, weight, align, as, children, ...props },
        ref
    ) => {
        const Component = as || level || 'h1';

        return React.createElement(
            Component,
            {
                ref,
                className: cn(
                    headingVariants({ level, variant, weight, align, className })
                ),
                ...props,
            },
            children
        );
    }
);

Heading.displayName = 'Heading';

export { Heading, headingVariants };
