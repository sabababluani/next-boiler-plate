import { Controller, Control } from 'react-hook-form';

interface SelectProps {
  name: string;
  control: Control<any>;
  options: { value: string; label: string }[];
  label?: string;
}

export const Select: React.FC<SelectProps> = ({
  name,
  control,
  options,
  label,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div style={{ marginBottom: '1rem' }}>
          {label && <label htmlFor={name}>{label}</label>}
          <select
            {...field}
            id={name}
            style={{
              border: fieldState.error ? '2px solid red' : '1px solid #ccc',
              padding: '8px',
              width: '100%',
              borderRadius: '4px',
            }}
          >
            <option value="">Select...</option>
            {options.map((opt) => (
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
