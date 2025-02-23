import React from 'react';
import { cn } from '../../../utils';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
    'rounded-lg border bg-card text-card-foreground transition-all duration-200',
    {
        variants: {
            variant: {
                default: 'shadow-sm',
                elevated: 'shadow-lg hover:shadow-xl',
                outlined: 'border-2',
                interactive: 'cursor-pointer hover:scale-105 hover:shadow-lg',
            },
            size: {
                default: 'w-full',
                sm: 'max-w-sm',
                md: 'max-w-md',
                lg: 'max-w-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardVariants> {
    loading?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, size, loading, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(cardVariants({ variant, size, className }))}
            {...props}
        >
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-card/50">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
            )}
            {props.children}
        </div>
    )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 p-6', className)}
        {...props}
    />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement> & {
    subtitle?: string;
}
>(({ className, subtitle, ...props }, ref) => (
    <div className="space-y-1">
        <h3
            ref={ref}
            className={cn('text-2xl font-semibold leading-none', className)}
            {...props}
        />
        {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
    </div>
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
    />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
    divider?: boolean;
}
>(({ className, divider, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'flex items-center p-6 pt-0',
            divider && 'border-t mt-6 pt-6',
            className
        )}
        {...props}
    />
));
CardFooter.displayName = 'CardFooter';

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
};