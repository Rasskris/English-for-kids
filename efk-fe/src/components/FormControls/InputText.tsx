import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';

interface InputTextProps {
  name: string;
  label: string;
  defaultValue: string;
}

export const InputText: FC<InputTextProps> = ({ name, label, defaultValue }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          margin="normal"
          required
          fullWidth
          label={label}
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
