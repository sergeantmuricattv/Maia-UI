// Inputs.test.tsx
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextField, Button, Select } from '../components';

const selectOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape', disabled: true },
];

describe('Input Components', () => {
    // TextField Tests
    describe('TextField Component', () => {
        describe('Basic Functionality', () => {
            it('renders input element with different variants', () => {
                const { rerender } = render(<TextField variant="outline" placeholder="Outline variant" />);
                expect(screen.getByPlaceholderText('Outline variant')).toHaveClass('border-input');

                rerender(<TextField variant="filled" placeholder="Filled variant" />);
                expect(screen.getByPlaceholderText('Filled variant')).toHaveClass('bg-muted');

                rerender(<TextField variant="flushed" placeholder="Flushed variant" />);
                expect(screen.getByPlaceholderText('Flushed variant')).toHaveClass('border-b');
            });

            it('handles controlled value changes', () => {
                const handleChange = jest.fn();
                render(<TextField value="initial" onChange={handleChange} />);
                const input = screen.getByDisplayValue('initial');

                fireEvent.change(input, { target: { value: 'updated' } });
                expect(handleChange).toHaveBeenCalled();
                expect(handleChange.mock.calls[0][0].target.value).toBe('updated');
            });

            it('handles uncontrolled value changes', () => {
                render(<TextField defaultValue="default" />);
                const input = screen.getByDisplayValue('default');

                fireEvent.change(input, { target: { value: 'new value' } });
                expect(input).toHaveValue('new value');
            });
        });

        describe('States and Validation', () => {
            it('handles different states correctly', () => {
                const { rerender } = render(<TextField disabled placeholder="Disabled input" />);
                expect(screen.getByPlaceholderText('Disabled input')).toBeDisabled();

                rerender(<TextField readOnly value="Read only" />);
                expect(screen.getByDisplayValue('Read only')).toHaveAttribute('readonly');

                rerender(<TextField required placeholder="Required field" />);
                expect(screen.getByPlaceholderText('Required field')).toBeRequired();
            });

            it('displays validation states appropriately', async () => {
                const { rerender } = render(
                    <TextField
                        validation="success"
                        helperText="Success message"
                        placeholder="Success input"
                    />
                );
                expect(screen.getByText('Success message')).toHaveClass('text-green-500');

                rerender(
                    <TextField
                        validation="warning"
                        helperText="Warning message"
                        placeholder="Warning input"
                    />
                );
                expect(screen.getByText('Warning message')).toHaveClass('text-yellow-500');

                rerender(
                    <TextField
                        validation="error"
                        helperText="Error message"
                        placeholder="Error input"
                    />
                );
                expect(screen.getByText('Error message')).toHaveClass('text-red-500');
            });
        });

        describe('Advanced Features', () => {
            it('handles prefix and suffix elements', () => {
                render(
                    <TextField
                        prefix={<span>$</span>}
                        suffix={<span>.00</span>}
                        placeholder="Amount"
                    />
                );

                expect(screen.getByText('$')).toBeInTheDocument();
                expect(screen.getByText('.00')).toBeInTheDocument();
            });

            it('supports character count', () => {
                render(
                    <TextField
                        maxLength={10}
                        showCharacterCount
                        placeholder="Limited input"
                    />
                );

                const input = screen.getByPlaceholderText('Limited input');
                fireEvent.change(input, { target: { value: '12345' } });

                expect(screen.getByText('5/10')).toBeInTheDocument();
            });

            it('handles password visibility toggle', () => {
                render(<TextField type="password" showPasswordToggle />);

                const input = screen.getByRole('textbox') as HTMLInputElement;
                const toggleButton = screen.getByRole('button', { name: /toggle password/i });

                expect(input.type).toBe('password');
                fireEvent.click(toggleButton);
                expect(input.type).toBe('text');
            });
        });

        describe('Accessibility', () => {
            it('supports aria labels and descriptions', () => {
                render(
                    <TextField
                        aria-label="Username"
                        aria-describedby="username-hint"
                        helperText="Enter your username"
                    />
                );

                const input = screen.getByRole('textbox');
                expect(input).toHaveAttribute('aria-label', 'Username');
                expect(input).toHaveAttribute('aria-describedby', 'username-hint');
            });

            it('handles focus and blur events', async () => {
                const handleFocus = jest.fn();
                const handleBlur = jest.fn();

                render(
                    <TextField
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder="Focus test"
                    />
                );

                const input = screen.getByPlaceholderText('Focus test');
                fireEvent.focus(input);
                expect(handleFocus).toHaveBeenCalled();

                fireEvent.blur(input);
                expect(handleBlur).toHaveBeenCalled();
            });
        });
    });


    // Button Tests
    describe('Button', () => {
        it('renders button with default variant', () => {
            render(<Button>Click me</Button>);
            const button = screen.getByRole('button', { name: /click me/i });
            expect(button).toBeInTheDocument();
        });

        it('handles click events', () => {
            const handleClick = jest.fn();
            render(<Button onClick={handleClick}>Click me</Button>);
            const button = screen.getByRole('button', { name: /click me/i });
            fireEvent.click(button);
            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it('applies variant classes correctly', () => {
            render(<Button variant="destructive">Delete</Button>);
            const button = screen.getByRole('button', { name: /delete/i });
            expect(button).toHaveClass('bg-destructive');
        });
    });

    // Select Tests
    describe('Select', () => {
        it('renders with placeholder', () => {
            render(<Select options={selectOptions} placeholder="Select fruit" />);
            expect(screen.getByText('Select fruit')).toBeInTheDocument();
        });

        it('opens options on click', () => {
            render(<Select options={selectOptions} />);
            fireEvent.click(screen.getByRole('combobox'));
            expect(screen.getByRole('listbox')).toBeInTheDocument();
            expect(screen.getByText('Apple')).toBeInTheDocument();
        });

        it('selects an option when clicked', () => {
            const handleChange = jest.fn();
            render(<Select options={selectOptions} onChange={handleChange} />);

            fireEvent.click(screen.getByRole('combobox'));
            fireEvent.click(screen.getByText('Apple'));

            expect(handleChange).toHaveBeenCalledWith('apple');
            expect(screen.getByText('Apple')).toBeInTheDocument();
        });

        it('handles disabled state', () => {
            render(<Select options={selectOptions} disabled />);
            const select = screen.getByRole('combobox');
            expect(select).toHaveClass('cursor-not-allowed');
            expect(select).toHaveClass('opacity-50');
        });

        it('handles keyboard navigation', () => {
            render(<Select options={selectOptions} />);
            const select = screen.getByRole('combobox');

            fireEvent.keyDown(select, { key: 'Enter' });
            expect(screen.getByRole('listbox')).toBeInTheDocument();

            fireEvent.keyDown(select, { key: 'Escape' });
            expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        });

        it('shows error state', () => {
            render(<Select options={selectOptions} error />);
            expect(screen.getByRole('combobox')).toHaveClass('border-red-500');
        });

        it('handles required attribute', () => {
            render(<Select options={selectOptions} required name="fruit" />);
            const hiddenInput = screen.getByDisplayValue('') as HTMLInputElement;
            expect(hiddenInput).toBeRequired();
        });
    });

    // Add Select component tests
    describe('Select Component', () => {
        it('renders with options and handles selection', () => {
            const handleChange = jest.fn();
            render(
                <Select
                    options={selectOptions}
                    onChange={handleChange}
                    placeholder="Select fruit"
                />
            );

            const select = screen.getByRole('combobox');
            fireEvent.click(select);

            const option = screen.getByText('Apple');
            fireEvent.click(option);

            expect(handleChange).toHaveBeenCalledWith('apple');
        });

        it('handles disabled state', () => {
            render(
                <Select
                    options={selectOptions}
                    disabled
                    placeholder="Select fruit"
                />
            );

            const select = screen.getByRole('combobox');
            expect(select).toHaveClass('cursor-not-allowed');
            expect(select).toHaveClass('opacity-50');
        });
    });

    // Add Button component tests
    describe('Button Component', () => {
        it('renders with different variants', () => {
            const { rerender } = render(<Button variant="default">Default</Button>);
            expect(screen.getByRole('button')).toHaveClass('bg-primary');

            rerender(<Button variant="outline">Outline</Button>);
            expect(screen.getByRole('button')).toHaveClass('border-input');

            rerender(<Button variant="destructive">Destructive</Button>);
            expect(screen.getByRole('button')).toHaveClass('bg-destructive');
        });

        it('handles different sizes', () => {
            const { rerender } = render(<Button size="sm">Small</Button>);
            expect(screen.getByRole('button')).toHaveClass('h-8');

            rerender(<Button size="default">Default</Button>);
            expect(screen.getByRole('button')).toHaveClass('h-10');

            rerender(<Button size="lg">Large</Button>);
            expect(screen.getByRole('button')).toHaveClass('h-12');
        });

        it('handles disabled state', () => {
            render(<Button disabled>Disabled</Button>);
            const button = screen.getByRole('button');
            expect(button).toBeDisabled();
            expect(button).toHaveClass('disabled:opacity-50');
        });
    });
});
