import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../utils';

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface SelectProps {
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    error?: boolean;
    required?: boolean;
    name?: string;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
    (
        {
            options,
            value,
            onChange,
            placeholder = 'Select an option',
            disabled = false,
            className,
            error = false,
            required = false,
            name,
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
            options.find((opt) => opt.value === value) || null
        );
        const selectRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    selectRef.current &&
                    !selectRef.current.contains(event.target as Node)
                ) {
                    setIsOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

        useEffect(() => {
            const option = options.find((opt) => opt.value === value);
            setSelectedOption(option || null);
        }, [value, options]);

        const handleSelect = (option: SelectOption) => {
            if (option.disabled) return;
            setSelectedOption(option);
            setIsOpen(false);
            onChange?.(option.value);
        };

        const handleKeyDown = (event: React.KeyboardEvent) => {
            if (disabled) return;

            switch (event.key) {
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    setIsOpen(!isOpen);
                    break;
                case 'Escape':
                    setIsOpen(false);
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    if (!isOpen) {
                        setIsOpen(true);
                    }
                    break;
            }
        };

        return (
            <div
                ref={selectRef}
                className={cn('relative w-full', className)}
                data-testid="select-container"
            >
                <div
                    ref={ref}
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-controls="select-options"
                    tabIndex={disabled ? -1 : 0}
                    className={cn(
                        'flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                        disabled && 'cursor-not-allowed opacity-50',
                        error && 'border-red-500 focus:ring-red-500',
                        !disabled && 'cursor-pointer'
                    )}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                >
          <span
              className={cn(
                  'truncate',
                  !selectedOption && 'text-muted-foreground'
              )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
                    <input
                        type="hidden"
                        name={name}
                        value={selectedOption?.value || ''}
                        required={required}
                    />
                    <svg
                        className={cn(
                            'h-4 w-4 opacity-50 transition-transform duration-200',
                            isOpen && 'rotate-180'
                        )}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>

                {isOpen && (
                    <ul
                        id="select-options"
                        role="listbox"
                        className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 shadow-md animate-in fade-in-0 zoom-in-95"
                    >
                        {options.map((option) => (
                            <li
                                key={option.value}
                                role="option"
                                aria-selected={selectedOption?.value === option.value}
                                className={cn(
                                    'relative flex cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none transition-colors',
                                    option.disabled && 'opacity-50 cursor-not-allowed',
                                    selectedOption?.value === option.value &&
                                    'bg-accent text-accent-foreground',
                                    !option.disabled &&
                                    'hover:bg-accent hover:text-accent-foreground'
                                )}
                                onClick={() => handleSelect(option)}
                            >
                                {option.label}
                                {selectedOption?.value === option.value && (
                                    <svg
                                        className="ml-auto h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export { Select };
export type { SelectOption };
