import { ReactNode, CSSProperties } from 'react';

export type DialogVariant =
    | 'alert'
    | 'modal'
    | 'dialog'
    | 'drawer'
    | 'popup'
    | 'toast';

export type DialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type DialogPosition =
    | 'center'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';

export type DialogAnimation =
    | 'fade'
    | 'slide'
    | 'zoom'
    | 'flip'
    | 'rotate'
    | 'none';

export type DialogColor =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'custom';

export interface DialogAction {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'text';
    color?: DialogColor;
    disabled?: boolean;
    loading?: boolean;
    icon?: ReactNode;
}

export interface DialogProps {
    // Required props
    open: boolean;
    onClose: () => void;

    // Content
    title?: ReactNode;
    children: ReactNode;
    actions?: DialogAction[];

    // Styling
    variant?: DialogVariant;
    size?: DialogSize;
    position?: DialogPosition;
    animation?: DialogAnimation;
    color?: DialogColor;
    className?: string;
    style?: CSSProperties;
    contentClassName?: string;
    contentStyle?: CSSProperties;

    // Behavior
    closeOnOutsideClick?: boolean;
    closeOnEscape?: boolean;
    preventScroll?: boolean;
    showCloseButton?: boolean;
    disableTransition?: boolean;

    // Custom components
    header?: ReactNode;
    footer?: ReactNode;
    closeIcon?: ReactNode;

    // Customization
    customColors?: {
        background?: string;
        text?: string;
        border?: string;
        overlay?: string;
    };

    // Animation settings
    animationDuration?: number;

    // Accessibility
    ariaLabel?: string;
    ariaDescribedBy?: string;

    // Callbacks
    onOpen?: () => void;
    afterClose?: () => void;
    beforeClose?: () => boolean | Promise<boolean>;
}
