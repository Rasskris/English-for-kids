import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

interface InputTextProps {
  name: string;
  label: string;
  type: string;
  defaultValue: string;
  required: boolean;
}

export const InputText: FC<InputTextProps> = ({ name, label, type, defaultValue, required }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          margin="normal"
          fullWidth
          required={required}
          label={label}
          type={type}
          variant="filled"
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
    />
  );
};
