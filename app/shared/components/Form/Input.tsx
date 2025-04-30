
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface InputProps {
  name: string;
  control: Control<any>;
  type?: 'text' | 'email' | 'password' | 'number';
  label?: string;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  name,
  control,
  type = 'text',
  label,
  placeholder,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div style={{ marginBottom: '1rem' }}>
          {label && <label htmlFor={name}>{label}</label>}
          <input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            style={{
              border: fieldState.error ? '2px solid red' : '1px solid #ccc',
              padding: '8px',
              width: '100%',
              borderRadius: '4px',
            }}
          />
          {fieldState.error && (
            <span style={{ color: 'red', fontSize: '12px' }}>
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};
