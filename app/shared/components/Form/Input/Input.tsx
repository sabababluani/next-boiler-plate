import { Controller } from 'react-hook-form';
import { InputPropsInterface } from './interfaces/input-props.interface';

const Input = (props: InputPropsInterface) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <div style={{ marginBottom: '1rem' }}>
          {props.label && <label htmlFor={props.name}>{props.label}</label>}
          <input
            {...field}
            id={props.name}
            type={props.type}
            placeholder={props.placeholder}
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

export default Input;