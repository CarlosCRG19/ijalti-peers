import { Grid, Button } from '@mui/material';
import React from 'react';
import { DatePicker, Form, TextFieldWithLabel } from '../../../../components';

const ContactInfo = ({ onNext, onPrevious }) => {
  const handleSubmit = (event) => {
    const {name, target} = event.target;
    onNext();
  };
  return (
    <Form 
      title='Información de Contact'
      onSubmit={handleSubmit}
    >
      <Grid>
        <p>Something</p>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="flex-end">
        <Button variant="text" size="large" onClick={onPrevious}>ANTERIOR</Button>
        <Button type="submit" variant="contained" size="large">SIGUIENTE</Button>
      </Grid>
    </Form>
  );
};

export default ContactInfo;