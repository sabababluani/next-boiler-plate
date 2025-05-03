import { JSX } from 'react';
import { Controller } from 'react-hook-form';
import { SelectPropsInterface } from './interfaces/select-props.interface';

const Select = (props: SelectPropsInterface): JSX.Element => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <div style={{ marginBottom: '1rem' }}>
          {props.label && <label htmlFor={props.name}>{props.label}</label>}
          <select
            {...field}
            id={props.name}
            style={{
              border: fieldState.error ? '2px solid red' : '1px solid #ccc',
              padding: '8px',
              width: '100%',
              borderRadius: '4px',
            }}
          >
            <option value="">Select...</option>
            {props.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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

export default Select;
