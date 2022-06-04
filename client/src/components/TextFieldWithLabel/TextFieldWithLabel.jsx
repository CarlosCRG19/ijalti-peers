/* eslint-disable react/prop-types */
import React from 'react';
import { InputLabel, TextField } from '@mui/material';
import PasswordField from '../PasswordField';

const TextFieldWithLabel = (props) => {
  const {
    id,
    label,
    type,
    ...inputProps
  } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <InputLabel htmlFor={id} sx={{ color: '#000' }}>{label}</InputLabel>
      {type === 'password'
        ? (
          <PasswordField
            hiddenLabel
            id={id}
            margin="none"
            {...inputProps}
          />
        )
        : (
          <TextField
            hiddenLabel
            id={id}
            type={type}
            margin="none"
            {...inputProps}
          />
        )}

    </div>
  );
};

export default TextFieldWithLabel;
