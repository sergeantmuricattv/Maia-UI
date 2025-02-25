import React from 'react';
import { cn } from '../../utils';
import { cva, type VariantProps } from 'class-variance-authority';

const sectionVariants = cva('relative', {
    variants: {
        spacing: {
            none: 'py-0',
            sm: 'py-4',
            md: 'py-8',
            lg: 'py-12',
            xl: 'py-16',
            '2xl': 'py-20',
        },
        background: {
            default: 'bg-background',
            muted: 'bg-muted',
            primary: 'bg-primary text-primary-foreground',
            secondary: 'bg-secondary text-secondary-foreground',
        },
    },
    defaultVariants: {
        spacing: 'lg',
        background: 'default',
    },
});

export interface SectionProps
    extends React.HTMLAttributes<HTMLElement>,
        VariantProps<typeof sectionVariants> {}

const Section = React.forwardRef<HTMLElement, SectionProps>(
    ({ className, spacing, background, ...props }, ref) => {
        return (
            <section
                ref={ref}
                className={cn(sectionVariants({ spacing, background, className }))}
                {...props}
            />
        );
    }
);

Section.displayName = 'Section';

export { Section, sectionVariants };
