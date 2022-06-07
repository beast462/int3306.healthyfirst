import { ReactElement } from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface IProps {
  value: Date | null;
  setValue: (value: Date | null) => void;
  minDate?: Date;
  label?: string;
}

export default function CDatePicker({
  value,
  setValue,
  minDate = new Date(),
  label,
  ...props
}: IProps): ReactElement {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...props}
        label={label}
        minDate={minDate}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        inputFormat="dd/MM/yyyy"
        renderInput={(params) => <TextField fullWidth {...params} />}
      />
    </LocalizationProvider>
  );
}
