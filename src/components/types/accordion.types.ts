import { ReactNode } from 'react';

export type AccordionVariant =
    | 'default'
    | 'bordered'
    | 'contained'
    | 'floating'
    | 'minimal'
    | 'elegant'
    | 'glass'
    | 'gradient'
    | 'neumorphic'
    | 'retro';

export type AccordionSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type AccordionColor =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'dark'
    | 'light'
    | 'custom';

export type AccordionAnimation =
    | 'slide'
    | 'fade'
    | 'zoom'
    | 'collapse'
    | 'bounce'
    | 'none';

export type AccordionIconPosition = 'start' | 'end';

export type AccordionHeaderStyle =
    | 'default'
    | 'filled'
    | 'outlined'
    | 'underlined'
    | 'text';

export interface AccordionItem {
    id: string | number;
    title: ReactNode;
    content: ReactNode;
    icon?: ReactNode;
    disabled?: boolean;
    customClass?: string;
    headerProps?: Record<string, unknown>;
    contentProps?: Record<string, unknown>;
}

export interface AccordionProps {
    items: AccordionItem[];
    variant?: AccordionVariant;
    size?: AccordionSize;
    color?: AccordionColor;
    animation?: AccordionAnimation;
    multiple?: boolean;
    defaultExpanded?: string | number | (string | number)[];
    onChange?: (expanded: (string | number)[]) => void;
    className?: string;
    expandIcon?: ReactNode;
    collapseIcon?: ReactNode;
    iconPosition?: AccordionIconPosition;
    headerStyle?: AccordionHeaderStyle;
    divider?: boolean;
    rounded?: boolean;
    elevated?: boolean;
    bordered?: boolean;
    compact?: boolean;
    fullWidth?: boolean;
    customColors?: {
        background?: string;
        text?: string;
        border?: string;
        hover?: string;
        active?: string;
    };
    transitionDuration?: number;
    onItemClick?: (id: string | number) => void;
    renderHeader?: (item: AccordionItem, isExpanded: boolean) => ReactNode;
    renderContent?: (item: AccordionItem, isExpanded: boolean) => ReactNode;
}
