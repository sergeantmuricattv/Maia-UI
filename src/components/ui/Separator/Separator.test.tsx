import { render, screen } from '@testing-library/react';
import { Separator } from './Separator';

describe('Separator', () => {
    it('renders horizontal separator by default', () => {
        render(<Separator />);
        const separator = screen.getByRole('separator');
        expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('renders vertical separator when specified', () => {
        render(<Separator orientation="vertical" />);
        const separator = screen.getByRole('separator');
        expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    });

    it('renders with label when provided', () => {
        render(<Separator label="OR" />);
        expect(screen.getByText('OR')).toBeInTheDocument();
    });

    it('applies variant classes correctly', () => {
        render(<Separator variant="primary" />);
        const separator = screen.getByRole('separator');
        expect(separator).toHaveClass('bg-primary/20');
    });

    it('applies size classes correctly', () => {
        render(<Separator size="thick" />);
        const separator = screen.getByRole('separator');
        expect(separator).toHaveClass('h-1');
    });

    it('renders with decorators when specified', () => {
        render(<Separator label="Test" decorators />);
        const decorators = screen.getAllByRole('separator');
        expect(decorators).toHaveLength(1);
    });

    it('applies custom className', () => {
        render(<Separator className="custom-class" />);
        const separator = screen.getByRole('separator');
        expect(separator).toHaveClass('custom-class');
    });

    it('applies animated classes when specified', () => {
        render(<Separator animated />);
        const separator = screen.getByRole('separator');
        expect(separator).toHaveClass('hover:scale-y-150');
    });
});
