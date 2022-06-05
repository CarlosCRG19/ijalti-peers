import { Grid, Button } from '@mui/material';
import React from 'react';
import { DatePicker, Form, TextFieldWithLabel } from '../../../../components';

const Generalnfo = ({ onNext }) => {
  console.log('something');
  const handleSubmit = (event) => {
    const {name, target} = event.target;
    
    onNext();
  }; 
  return (
    <Form 
      title='Información General'
      onSubmit={handleSubmit}
    >
      <Grid>
        <p>Something</p>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="flex-end">
        <Button type="submit" variant="contained" size="large">SIGUIENTE</Button>
      </Grid>
    </Form>
  );
};

export default Generalnfo;
