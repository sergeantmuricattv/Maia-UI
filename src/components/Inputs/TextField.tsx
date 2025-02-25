import React, { useState, forwardRef } from 'react';
import { cn } from '../../utils';
import { IconEye, IconEyeOff } from '../../Icons';

export type ValidationState = 'success' | 'warning' | 'error' | undefined;
export type TextFieldVariant = 'outline' | 'filled' | 'flushed';
export type TextFieldSize = 'sm' | 'md' | 'lg';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'size'> {
    validation?: ValidationState;
    helperText?: string;
    variant?: TextFieldVariant;
    size?: TextFieldSize;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    showCharacterCount?: boolean;
    showPasswordToggle?: boolean;
    format?: 'currency' | 'number' | 'phone' | 'creditCard' | 'date' | 'expDate' | 'cvv' | 'zipCode' | 'ssn' | 'ein' | 'percentage' | 'decimal';
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    ({
         className,
         validation,
         helperText,
         variant = 'outline',
         size = 'md',
         type = 'text',
         prefix,
         suffix,
         showCharacterCount,
         showPasswordToggle,
         format,
         value,
         defaultValue,
         maxLength,
         onChange,
         disabled,
         ...props
     }, ref) => {
        const [inputValue, setInputValue] = useState(value || defaultValue || '');
        const [showPassword, setShowPassword] = useState(false);

        const formatValue = (val: string) => {
            if (!val) return val;

            switch (format) {
                case 'currency':
                    return new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }).format(Number(val.replace(/[^\d.-]/g, '')));

                case 'phone':
                    const phoneClean = val.replace(/\D/g, '');
                    const phoneMatch = phoneClean.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
                    if (phoneMatch) {
                        return ['(', phoneMatch[1], ')', phoneMatch[2] && ' ', phoneMatch[2], phoneMatch[3] && '-', phoneMatch[3]]
                            .filter(Boolean)
                            .join('');
                    }
                    return val;

                case 'creditCard':
                    const ccClean = val.replace(/\D/g, '');
                    const groups = ccClean.match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
                    if (groups) {
                        return [groups[1], groups[2] && ' ', groups[2], groups[3] && ' ', groups[3], groups[4] && ' ', groups[4]]
                            .filter(Boolean)
                            .join('');
                    }
                    return val;

                case 'date':
                    const dateClean = val.replace(/\D/g, '');
                    const dateMatch = dateClean.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
                    if (dateMatch) {
                        return [dateMatch[1], dateMatch[2] && '/', dateMatch[2], dateMatch[3] && '/', dateMatch[3]]
                            .filter(Boolean)
                            .join('');
                    }
                    return val;

                case 'expDate':
                    const expClean = val.replace(/\D/g, '');
                    const expMatch = expClean.match(/^(\d{0,2})(\d{0,2})$/);
                    if (expMatch) {
                        return [expMatch[1], expMatch[2] && '/', expMatch[2]]
                            .filter(Boolean)
                            .join('');
                    }
                    return val;

                case 'cvv':
                    return val.replace(/\D/g, '').slice(0, 4);

                case 'zipCode':
                    const zipClean = val.replace(/[^\d-]/g, '');
                    const zipMatch = zipClean.match(/^(\d{0,5})(\d{0,4})?$/);
                    if (!(zipMatch) || zipMatch[2]) {
                        return `${zipMatch ? zipMatch : [1]}-${zipMatch ? zipMatch : [2]}`;
                    }
                    return zipMatch[1] || val;

                case 'ssn':
                    const ssnClean = val.replace(/\D/g, '');
                    const ssnMatch = ssnClean.match(/^(\d{0,3})(\d{0,2})(\d{0,4})$/);
                    if (ssnMatch) {
                        return [ssnMatch[1], ssnMatch[2] && '-', ssnMatch[2], ssnMatch[3] && '-', ssnMatch[3]]
                            .filter(Boolean)
                            .join('');
                    }
                    return val;

                case 'ein':
                    const einClean = val.replace(/\D/g, '');
                    const einMatch = einClean.match(/^(\d{0,2})(\d{0,7})$/);
                    if (einMatch) {
                        return [einMatch[1], einMatch[2] && '-', einMatch[2]]
                            .filter(Boolean)
                            .join('');
                    }
                    return val;

                case 'percentage':
                    return new Intl.NumberFormat('en-US', {
                        style: 'percent',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                    }).format(Number(val.replace(/[^\d.-]/g, '')) / 100);

                case 'decimal':
                    return new Intl.NumberFormat('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                    }).format(Number(val.replace(/[^\d.-]/g, '')));

                default:
                    return val;
            }

        };

        const getSizeClasses = () => {
            switch (size) {
                case 'sm':
                    return 'h-8 text-xs px-2';
                case 'lg':
                    return 'h-12 text-base px-4';
                default:
                    return 'h-10 text-sm px-3';
            }
        };

        const getVariantClasses = () => {
            const baseClasses = 'w-full rounded-md transition-colors duration-200';
            switch (variant) {
                case 'filled':
                    return `${baseClasses} bg-gray-100 border-transparent hover:bg-gray-200 focus:bg-white`;
                case 'flushed':
                    return `${baseClasses} border-t-0 border-l-0 border-r-0 rounded-none px-0 hover:border-gray-400`;
                default:
                    return `${baseClasses} border border-gray-300 bg-white hover:border-gray-400`;
            }
        };

        const getValidationClasses = () => {
            switch (validation) {
                case 'success':
                    return 'border-green-500 focus:ring-green-500';
                case 'warning':
                    return 'border-yellow-500 focus:ring-yellow-500';
                case 'error':
                    return 'border-red-500 focus:ring-red-500';
                default:
                    return 'focus:ring-blue-500';
            }
        };

        return (
            <div className="w-full">
                <div className="relative">
                    {prefix && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            {prefix}
                        </div>
                    )}
                    <input
                        type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
                        className={cn(
                            getVariantClasses(),
                            getSizeClasses(),
                            getValidationClasses(),
                            'focus:outline-none focus:ring-2 focus:ring-offset-0',
                            'disabled:opacity-50 disabled:cursor-not-allowed',
                            prefix && 'pl-9',
                            suffix && 'pr-9',
                            className
                        )}
                        value={formatValue(inputValue as string)}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                            onChange?.(e);
                        }}
                        disabled={disabled}
                        ref={ref}
                        {...props}
                    />
                    {suffix && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                            {suffix}
                        </div>
                    )}
                    {showPasswordToggle && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            aria-label="toggle password visibility"
                        >
                            {showPassword ? <IconEyeOff /> : <IconEye />}
                        </button>
                    )}
                </div>
                <div className="flex justify-between mt-1">
                    {helperText && (
                        <p className={cn(
                            'text-sm',
                            validation === 'success' && 'text-green-500',
                            validation === 'warning' && 'text-yellow-500',
                            validation === 'error' && 'text-red-500',
                            !validation && 'text-gray-500'
                        )}>
                            {helperText}
                        </p>
                    )}
                    {showCharacterCount && maxLength && (
                        <p className="text-sm text-gray-500">
                            {inputValue.toString().length}/{maxLength}
                        </p>
                    )}
                </div>
            </div>
        );
    }
);

TextField.displayName = 'TextField';

export { TextField };
