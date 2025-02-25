import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
                success: 'bg-green-600 text-white hover:bg-green-700',
                warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
                info: 'bg-blue-500 text-white hover:bg-blue-600',
                light: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
                dark: 'bg-gray-800 text-white hover:bg-gray-900',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-12 rounded-md px-8 text-lg',
                xl: 'h-14 rounded-md px-10 text-xl',
                icon: 'h-10 w-10',
                'icon-sm': 'h-8 w-8',
                'icon-lg': 'h-12 w-12',
            },
            state: {
                default: '',
                loading: 'opacity-70 cursor-progress',
                disabled: 'opacity-50 cursor-not-allowed',
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
            state: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    variant?: VariantProps<typeof buttonVariants>['variant'];
    size?: VariantProps<typeof buttonVariants>['size'];
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        return (
            <button
                className={buttonVariants({ variant, size, className })}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };