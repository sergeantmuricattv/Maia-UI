import React from 'react';

export interface HeadingProps {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children: React.ReactNode;
    className?: string;
}

/**
 * Heading component for rendering accessible headings.
 *
 * References:
 * - React: https://reactjs.org/docs/components-and-props.html
 * - WCAG (headings): https://www.w3.org/TR/WCAG21/
 */
const Heading: React.FC<HeadingProps> = ({ as: Component = 'h1', children, className }) => {
    return <Component className={`text-2xl font-bold ${className || ''}`}>{children}</Component>;
};

export default Heading;
