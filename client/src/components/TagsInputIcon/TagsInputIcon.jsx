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



const TagsInputIcon = (props) => {
  const {
    onChange,
    tags,
    name,
    value,
    label,
    icon,
    ...inputProps
  } = props;

  const StartAdornment = (
    <InputAdornment position="start">
      {icon}
    </InputAdornment>
  );
  return (
    <Autocomplete
      multiple
      options={tags}
      getOptionLabel={(option) => option.name}
      value={value}
      onChange={(_, newValue) => onChange(name, newValue)}
      renderInput={(params) => (
        <TextField
          label={label}
          name={name}
          {...params}
          {...inputProps}
          InputProps={{
            ...params.InputProps,
            startAdornment: [StartAdornment, params.InputProps.startAdornment],
          }}
        />
      )}
    />
  );
};

export default TagsInputIcon;

TagsInputIcon.defaultProps = {
  name: 'campo',
  tags: [],
  value: [],
  label: '',
};

TagsInputIcon.propTypes = {
  tags: PropTypes.oneOfType(PropTypes.arrayOf(PropTypes.object)),
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};
