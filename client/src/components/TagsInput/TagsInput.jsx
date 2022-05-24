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
    handleChangeAbilities,
    tags,
    name,
    value,
    label,
  } = props;

  return (
    <Autocomplete
      id="tags-standard"
      multiple
      variant="outlined"
      options={tags}
      getOptionLabel={(option) => option}
      value={value}
      onChange={(_, newValue) => handleChangeAbilities(name, newValue)}
        // console.log(newValue);
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

TagsInput.defaultProps = {
  name: 'campo',
  tags: [],
  value: [],
  label: '',
};

TagsInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  handleChangeAbilities: PropTypes.func.isRequired,
};
