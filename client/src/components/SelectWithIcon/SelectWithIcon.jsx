import React from 'react';

import {
  Translate,
} from '@mui/icons-material';

import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';

const SelectWithIcon = (props) => {
  const {
    label,
    itemsArray,
    icon
  } = props;


  return (
    <>
      <FormControl
        variant='outlined'
        fullWidth
      >
        <InputLabel
          id={label + "Label"}
        >
          {label}
        </InputLabel>
        <Select
          labelId={label + "Label"}
          id={label}
          name="education"
          {...props}
          startAdornment={
            <InputAdornment sx={{paddingRight:"16px"}}> {icon} </InputAdornment>
          }
        >
          {
            itemsArray.map(selectItem => (
              <MenuItem
                value={selectItem}
                id={selectItem}
              >
                {selectItem}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </>
  )
}
export default SelectWithIcon;