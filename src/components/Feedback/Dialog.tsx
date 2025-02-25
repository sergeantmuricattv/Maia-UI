import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { DialogProps } from '../types';

const Dialog: React.FC<DialogProps> = ({
                                           open,
                                           onClose,
                                           title,
                                           children,
                                           actions,
                                           variant = 'modal',
                                           size = 'md',
                                           position = 'center',
                                           animation = 'fade',
                                           color = 'primary',
                                           className,
                                           style,
                                           contentClassName,
                                           contentStyle,
                                           closeOnOutsideClick = true,
                                           closeOnEscape = true,
                                           preventScroll = true,
                                           showCloseButton = true,
                                           disableTransition = false,
                                           header,
                                           footer,
                                           closeIcon,
                                           customColors,
                                           animationDuration = 300,
                                           ariaLabel,
                                           ariaDescribedBy,
                                           onOpen,
                                           afterClose,
                                           beforeClose,
                                       }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (open) {
            setIsVisible(true);
            onOpen?.();
            if (preventScroll) {
                document.body.style.overflow = 'hidden';
            }
            previousActiveElement.current = document.activeElement as HTMLElement;
            setTimeout(() => {
                dialogRef.current?.focus();
            });
        }
        return () => {
            if (preventScroll) {
                document.body.style.overflow = '';
            }
            previousActiveElement.current?.focus();
        };
    }, [open, preventScroll, onOpen]);

    const handleClose = async () => {
        if (beforeClose) {
            const canClose = await beforeClose();
            if (!canClose) return;
        }
        setIsClosing(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsClosing(false);
            onClose();
            afterClose?.();
            if (preventScroll) {
                document.body.style.overflow = '';
            }
            previousActiveElement.current?.focus();
        }, disableTransition ? 0 : animationDuration);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape' && closeOnEscape) {
            handleClose();
        }
    };

    const handleOutsideClick = (event: React.MouseEvent) => {
        if (closeOnOutsideClick && event.target === event.currentTarget) {
            handleClose();
        }
    };

    const dialogClasses = [
        'dialog',
        `dialog-${variant}`,
        `dialog-${size}`,
        `dialog-${position}`,
        `dialog-${color}`,
        isClosing ? 'dialog-closing' : '',
        `dialog-animation-${animation}`,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    const contentClasses = [
        'dialog-content',
        `dialog-content-${variant}`,
        contentClassName,
    ]
        .filter(Boolean)
        .join(' ');

    if (!isVisible) return null;

    const dialogNode = (
        <div
            className={`dialog-overlay ${
                isClosing ? 'dialog-overlay-closing' : ''
            }`}
            onClick={handleOutsideClick}
            style={{
                '--animation-duration': `${animationDuration}ms`,
                '--overlay-color': customColors?.overlay,
            } as React.CSSProperties}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label={ariaLabel}
                aria-describedby={ariaDescribedBy}
                className={dialogClasses}
                style={{
                    ...style,
                    '--dialog-bg': customColors?.background,
                    '--dialog-text': customColors?.text,
                    '--dialog-border': customColors?.border,
                } as React.CSSProperties}
                onKeyDown={handleKeyDown}
                tabIndex={-1}
            >
                {showCloseButton && (
                    <button
                        className="dialog-close"
                        onClick={handleClose}
                        aria-label="Close"
                    >
                        {closeIcon || '×'}
                    </button>
                )}
                {(header || title) && (
                    <div className="dialog-header">
                        {header || <h2 className="dialog-title">{title}</h2>}
                    </div>
                )}
                <div className={contentClasses} style={contentStyle}>
                    {children}
                </div>
                {(footer || actions) && (
                    <div className="dialog-footer">
                        {footer ||
                            (actions &&
                                actions.map((action, index) => (
                                    <button
                                        key={index}
                                        // Stop propagation so that this click does not bubble to the overlay.
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            action.onClick();
                                            handleClose();
                                        }}
                                        className={`dialog-action dialog-action-${
                                            action.variant || 'primary'
                                        } dialog-action-${action.color || color}`}
                                        disabled={action.disabled || action.loading}
                                    >
                                        {action.loading && (
                                            <span className="dialog-action-spinner" />
                                        )}
                                        {action.icon && (
                                            <span className="dialog-action-icon">{action.icon}</span>
                                        )}
                                        {action.label}
                                    </button>
                                )))}
                    </div>
                )}
            </div>
        </div>
    );

    return createPortal(dialogNode, document.body);
};
export {Dialog};