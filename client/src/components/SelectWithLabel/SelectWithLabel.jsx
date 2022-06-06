import React from 'react';
import { useTheme, InputLabel, Select } from '@mui/material';

const SelectWithLabel = (props) => {
  const {
    id,
    label,
    children,
    ...selectProps
  } = props;

  const { palette } = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <InputLabel htmlFor={id} sx={{ color: palette.black }}>{label}</InputLabel>
      <Select
        hiddenLabel
        id={id}
        margin="none"
        {...selectProps}
      >
        {children}
      </Select>
    </div>
  );
};

export default SelectWithLabel;
