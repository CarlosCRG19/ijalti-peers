import React, { useState } from 'react';
import { Grid } from '@mui/material';
import SelectWithIcon from '../SelectWithIcon/SelectWithIcon';
import { LocationOn } from '@mui/icons-material';

const INITIAL_LOCATION = {
    country: '',
    state: '',
    city: '',
}

//UNFINISHED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const SelectLocation = () => {
  return (
    <>
      <Grid item xs={4}>
        <SelectWithIcon
          label={"País"}
          itemsarray={["a", "b", "c"]}
          value={""}
          icon={<LocationOn />}
          sx={{ backgroundColor: '#E7EDF3' }}
          fullwidth
          />
      </Grid>
      <Grid item xs={4}>
        <SelectWithIcon
          label={"Estado"}
          itemsarray={["a", "b", "c"]}
          value={""}
          icon={<LocationOn />}
          sx={{ backgroundColor: '#E7EDF3' }}
          fullwidth
          disabled
          />
      </Grid>
      <Grid item xs={4}>
        <SelectWithIcon
          label={"Ciudad"}
          itemsarray={["a", "b", "c"]}
          value={""}
          icon={<LocationOn />}
          sx={{ backgroundColor: '#E7EDF3' }}
          disabled
          fullwidth
        />
      </Grid>
    </>

  )
}

export default SelectLocation