import * as Joi from 'joi';
import { debounce } from 'lodash';
import { ChangeEventHandler, useEffect, useRef, useState } from 'react';

import { bySeconds } from '@/common/helpers/timespan';
import { TextField, TextFieldProps } from '@mui/material';

interface IProps {
  validator?: Joi.Schema;
  validationLatency?: number;
}

function ValidatedInput({
  validator = Joi.any().required(),
  validationLatency = bySeconds(0.5),
  ...textFieldProps
}: IProps & TextFieldProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>();

  const handleChange: ChangeEventHandler<HTMLInputElement> = debounce(
    (event) => {
      const { value: newValue } = event.target;

      const validation = validator.validate(newValue);

      console.log(validation.error);

      if (validation.error) {
        event.target.value = value;
        return;
      }

      setValue(newValue);
    },
    validationLatency,
  );

  useEffect(() => {
    inputRef.current && (inputRef.current.value = value);
  }, [value]);

  return (
    <TextField
      {...textFieldProps}
      onChange={handleChange}
      ref={inputRef}
      error={error.length > 0}
      helperText={error}
    />
  );
}

export default ValidatedInput;
