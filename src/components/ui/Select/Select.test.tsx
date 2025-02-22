// src/components/Select/Select.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape', disabled: true },
];

describe('Select', () => {
    it('renders with placeholder', () => {
        render(<Select options={options} placeholder="Select fruit" />);
        expect(screen.getByText('Select fruit')).toBeInTheDocument();
    });

    it('opens options on click', () => {
        render(<Select options={options} />);
        fireEvent.click(screen.getByRole('combobox'));
        expect(screen.getByRole('listbox')).toBeInTheDocument();
        expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    it('selects an option when clicked', () => {
        const handleChange = jest.fn();
        render(<Select options={options} onChange={handleChange} />);

        fireEvent.click(screen.getByRole('combobox'));
        fireEvent.click(screen.getByText('Apple'));

        expect(handleChange).toHaveBeenCalledWith('apple');
        expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    it('handles disabled state', () => {
        render(<Select options={options} disabled />);
        const select = screen.getByRole('combobox');
        expect(select).toHaveClass('cursor-not-allowed');
        expect(select).toHaveClass('opacity-50');
    });

    it('handles keyboard navigation', () => {
        render(<Select options={options} />);
        const select = screen.getByRole('combobox');

        fireEvent.keyDown(select, { key: 'Enter' });
        expect(screen.getByRole('listbox')).toBeInTheDocument();

        fireEvent.keyDown(select, { key: 'Escape' });
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('shows error state', () => {
        render(<Select options={options} error />);
        expect(screen.getByRole('combobox')).toHaveClass('border-red-500');
    });

    it('handles required attribute', () => {
        render(<Select options={options} required name="fruit" />);
        const hiddenInput = screen.getByDisplayValue('') as HTMLInputElement;
        expect(hiddenInput).toBeRequired();
    });
});
