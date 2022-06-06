import React from 'react';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { createCustomEvent } from '../../utils';
import TextFieldWithLabel from '../TextFieldWithLabel';

const DatePicker = (props) => {
  const {
    label,
    value,
    onChange,
    name,
    ...inputProps
  } = props;

  const handleChange = (newDate) => {
    const customEvent = createCustomEvent(name, newDate);

    if (customEvent) {
      onChange(customEvent);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        label={label}
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextFieldWithLabel
            name={name}
            {...params}
            {...inputProps}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
