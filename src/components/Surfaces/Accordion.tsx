import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { AccordionProps, AccordionItem } from '../types';
import { useAccordionAnimation } from '../../hooks';

const AccordionItemComponent: React.FC<{
    item: AccordionItem;
    isExpanded: boolean;
    onToggle: () => void;
    props: AccordionProps;
}> = ({ item, isExpanded, onToggle, props }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentVisible, setContentVisible] = useState(isExpanded);
    const { height, isTransitioning, handleTransitionEnd } = useAccordionAnimation(
        contentRef,
        isExpanded,
        props.animation
    );

    useEffect(() => {
        if (isExpanded) {
            setContentVisible(true);
        } else if (!isTransitioning) {
            setContentVisible(false);
        }
    }, [isExpanded, isTransitioning]);

    const {
        variant = 'default',
        size = 'md',
        color = 'primary',
        iconPosition = 'end',
        headerStyle = 'default',
        elevated,
        rounded,
        compact,
        customColors,
        transitionDuration = 200,
    } = props;

    const headerClasses = clsx(
        'accordion-header',
        `accordion-header-${headerStyle}`,
        `accordion-${variant}`,
        `accordion-${size}`,
        `accordion-${color}`,
        {
            'accordion-elevated': elevated,
            'accordion-rounded': rounded,
            'accordion-compact': compact,
            'accordion-expanded': isExpanded,
            'accordion-disabled': item.disabled,
            [`accordion-icon-${iconPosition}`]: true,
        },
        item.customClass
    );

    const contentClasses = clsx(
        'accordion-content',
        `accordion-content-${variant}`,
        `accordion-animation-${props.animation}`,
        {
            'accordion-content-expanded': isExpanded,
            'accordion-content-visible': contentVisible,
        }
    );

    const renderIcon = () => {
        const icon = isExpanded ? props.collapseIcon : props.expandIcon;
        return (
            <span
                className={`accordion-icon ${isExpanded ? 'expanded' : ''}`}
                style={{
                    transitionDuration: `${transitionDuration}ms`,
                    ...(customColors && { color: customColors.text })
                }}
            >
                {icon}
            </span>
        );
    };

    return (
        <div
            className={`accordion-item ${variant}`}
            style={customColors ? {
                '--custom-bg': customColors.background,
                '--custom-text': customColors.text,
                '--custom-border': customColors.border,
                '--custom-hover': customColors.hover,
                '--custom-active': customColors.active,
            } as React.CSSProperties : undefined}
        >
            <button
                className={headerClasses}
                onClick={() => !item.disabled && onToggle()}
                disabled={item.disabled}
                {...item.headerProps}
            >
                {iconPosition === 'start' && renderIcon()}
                {props.renderHeader ? props.renderHeader(item, isExpanded) : (
                    <span className="accordion-title">{item.title}</span>
                )}
                {iconPosition === 'end' && renderIcon()}
            </button>
            <div
                ref={contentRef}
                className={contentClasses}
                style={{
                    height,
                    visibility: contentVisible ? 'visible' : 'hidden',
                    transitionDuration: `${transitionDuration}ms`,
                }}
                onTransitionEnd={handleTransitionEnd}
                {...item.contentProps}
            >
                <div className="accordion-content-inner">
                    {props.renderContent ? props.renderContent(item, isExpanded) : item.content}
                </div>
            </div>
        </div>
    );
};

export const Accordion: React.FC<AccordionProps> = (props) => {
    const [expandedItems, setExpandedItems] = useState<(string | number)[]>(
        Array.isArray(props.defaultExpanded)
            ? props.defaultExpanded
            : props.defaultExpanded
                ? [props.defaultExpanded]
                : []
    );

    const handleToggle = (itemId: string | number) => {
        let newExpanded: (string | number)[];

        if (props.multiple) {
            newExpanded = expandedItems.includes(itemId)
                ? expandedItems.filter(id => id !== itemId)
                : [...expandedItems, itemId];
        } else {
            newExpanded = expandedItems.includes(itemId) ? [] : [itemId];
        }

        setExpandedItems(newExpanded);
        props.onChange?.(newExpanded);
        props.onItemClick?.(itemId);
    };

    return (
        <div
            className={clsx(
                'accordion-container',
                props.fullWidth && 'accordion-full-width',
                props.className
            )}
        >
            {props.items.map((item) => (
                <AccordionItemComponent
                    key={item.id}
                    item={item}
                    isExpanded={expandedItems.includes(item.id)}
                    onToggle={() => handleToggle(item.id)}
                    props={props}
                />
            ))}
        </div>
    );
};