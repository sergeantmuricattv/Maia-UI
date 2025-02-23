import React from 'react';
import { cn } from '../../utils';
import { cva, type VariantProps } from 'class-variance-authority';

const textVariants = cva('', {
    variants: {
        variant: {
            default: 'text-foreground',
            muted: 'text-muted-foreground',
            primary: 'text-primary',
            secondary: 'text-secondary-foreground',
            destructive: 'text-destructive',
        },
        size: {
            xs: 'text-xs',
            sm: 'text-sm',
            base: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
        },
        weight: {
            thin: 'font-thin',
            normal: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold',
        },
        align: {
            left: 'text-left',
            center: 'text-center',
            right: 'text-right',
            justify: 'text-justify',
        },
        leading: {
            none: 'leading-none',
            tight: 'leading-tight',
            normal: 'leading-normal',
            relaxed: 'leading-relaxed',
            loose: 'leading-loose',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'base',
        weight: 'normal',
        align: 'left',
        leading: 'normal',
    },
});

export interface TextProps
    extends React.HTMLAttributes<HTMLParagraphElement>,
        VariantProps<typeof textVariants> {
    as?: 'p' | 'span' | 'div';
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
    (
        {
            className,
            variant,
            size,
            weight,
            align,
            leading,
            as = 'p',
            children,
            ...props
        },
        ref
    ) => {
        const Component = as;

        return React.createElement(
            Component,
            {
                ref,
                className: cn(
                    textVariants({ variant, size, weight, align, leading, className })
                ),
                ...props,
            },
            children
        );
    }
);

Text.displayName = 'Text';

export { Text, textVariants };
