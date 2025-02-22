import React from 'react';
import { render, screen } from '@testing-library/react';
import Separator from './Separator';

describe('Separator component', () => {
    it('renders a horizontal separator by default', () => {
        render(<Separator />);
        const separator = screen.getByRole('separator');
        expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('renders a vertical separator when specified', () => {
        render(<Separator orientation="vertical" />);
        const separator = screen.getByRole('separator');
        expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    });
});
