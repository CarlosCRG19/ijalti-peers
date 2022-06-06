import React from 'react';
import PropTypes from 'prop-types';
import {
  TextField,
  InputAdornment,
  Autocomplete,
} from '@mui/material';

import {
  Handyman,
} from '@mui/icons-material';

const StartAdornment = (
  <InputAdornment position="start">
    <Handyman />
  </InputAdornment>
);

const TagsInput = (props) => {
  const {
    onChange,
    tags,
    name,
    value,
    label,
  } = props;

  return (
    <Autocomplete
      multiple
      options={tags}
      getOptionLabel={(option) => option.name}
      value={value}
      onChange={(event, newValue) => onChange(name, newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="filled"
          sx={{ backgroundColor: '#E7EDF3' }}
          InputProps={{
            ...params.InputProps,
            startAdornment: [StartAdornment, params.InputProps.startAdornment],
          }}
        />
      )}
    />
  );
};

export default TagsInput;
