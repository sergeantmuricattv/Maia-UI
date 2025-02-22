import React from 'react';

/**
 * SeparatorProps for creating accessible horizontal or vertical dividers.
 *
 * References:
 * - WCAG Guidelines: https://www.w3.org/TR/WCAG21/
 */
export interface SeparatorProps {
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}

const Separator: React.FC<SeparatorProps> = ({ orientation = 'horizontal', className }) => {
    const styles =
        orientation === 'vertical'
            ? 'w-px h-full bg-gray-300'
            : 'h-px w-full bg-gray-300';
    return (
        <div
            role="separator"
            aria-orientation={orientation}
            className={`${styles} ${className || ''}`}
        />
    );
};

export default Separator;
