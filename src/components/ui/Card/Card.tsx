import React from "react";

export interface CardProps {
    /** Optional title to display in the card header */
    title?: string;
    /** Card content */
    children: React.ReactNode;
    /** Additional classes to extend or override styling */
    className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = "" }) => {
    return (
        <div
            className={`bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow p-6 ${className}`}
            role="region"
            aria-label={title ? `Card: ${title}` : "Card"}
        >
            {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
            <div>{children}</div>
        </div>
    );
};

export default Card;