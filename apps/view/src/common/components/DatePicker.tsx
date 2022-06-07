import { ReactElement } from 'react';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

interface IProps {
  value: Date | null;
  setValue: (value: Date | null) => void;
}

export default function DatePicker({
  value,
  setValue,
  ...props
}: IProps): ReactElement {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
        {...props}
        minDate={new Date()}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
