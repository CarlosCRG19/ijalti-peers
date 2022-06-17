import React from 'react';

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
    itemsarray,
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
            <InputAdornment sx={{ paddingRight: "16px" }} position="start"> {icon} </InputAdornment>
          }
        >
          {
            itemsarray.map(selectItem => (
              <MenuItem
                key={selectItem}
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