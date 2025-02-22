import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
    it('renders input element', () => {
        render(<Input placeholder="Test input" />);
        const input = screen.getByPlaceholderText('Test input');
        expect(input).toBeInTheDocument();
    });

    it('handles value changes', () => {
        const handleChange = jest.fn();
        render(<Input onChange={handleChange} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test' } });
        expect(handleChange).toHaveBeenCalled();
    });

    it('displays helper text when provided', () => {
        render(<Input helperText="Helper text" />);
        expect(screen.getByText('Helper text')).toBeInTheDocument();
    });

    it('applies error styles when error prop is true', () => {
        render(<Input error helperText="Error message" />);
        const helperText = screen.getByText('Error message');
        expect(helperText).toHaveClass('text-red-500');
    });
});
