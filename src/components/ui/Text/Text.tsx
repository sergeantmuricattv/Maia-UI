import React from 'react';

export interface TextProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * Text component for rendering paragraph text.
 *
 * References:
 * - React: https://reactjs.org/docs/components-and-props.html
 * - WCAG (readability): https://www.w3.org/TR/WCAG21/
 */
const Text: React.FC<TextProps> = ({ children, className }) => {
    return <p className={`text-base ${className || ''}`}>{children}</p>;
};

export default Text;
