import React, { useState } from 'react';
import { useForm } from './FormContext';

interface ValidatedInputProps {
    name: string;
    type: string;
    placeholder: string;
    label: string;
    error?: string; // Optional error message prop
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Optional onChange handler
}

const ValidatedInput: React.FC<ValidatedInputProps> = ({ name, type, placeholder, label, error, onChange }) => {
    const { formData, handleChange } = useForm();
    const [isFocused, setIsFocused] = useState(false);

    // Detect if input has text
    const hasText = formData[name as keyof typeof formData]?.length > 0;

    return (
        <div className="relative mb-3">
            <input
                type={type}
                name={name}
                id={name}
                value={formData[name as keyof typeof formData]}
                placeholder={placeholder}
                onChange={onChange || handleChange} // Use onChange from parent or form context
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`peer w-full mb-4 px-4 py-2 bg-gray-100 rounded-lg border ${
                    error ? 'border-red-500' : 'border-gray-300'
                } text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200 placeholder-transparent`}
            />
            <label
                htmlFor={name}
                className={`absolute py-2 left-4 transform transition-all duration-200 ${
                    (hasText || isFocused) ? 'translate-y-[-30px] text-purple-600' : 'translate-y-0 text-gray-500'
                }`}
            >
                {label}
            </label>

            {/* Show error message if exists */}
            {error && (
                <span className="text-sm text-red-500 mt-1">{error}</span>
            )}
        </div>
    );
};

export default ValidatedInput;
