import React from 'react';

import {
  useTheme, Autocomplete, TextField, InputLabel,
} from '@mui/material';

const AutocompleteWithLabel = (props) => {
  const {
    id,
    label,
    tags,
    children,
    ...inputProps
  } = props;

  const { palette } = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <InputLabel htmlFor={id} sx={{ color: palette.black }}>{label}</InputLabel>
      <Autocomplete
        freeSolo
        disableClearable
        options={tags}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => {
          console.log(params);

          return (
            <TextField
              hiddenLabel
              {...params}
              {...inputProps}
              id={id}
              sx={{ padding: '16px 12px 17px' }}
            />
          );
        }}
      />
    </div>

  );
};

export default AutocompleteWithLabel;
