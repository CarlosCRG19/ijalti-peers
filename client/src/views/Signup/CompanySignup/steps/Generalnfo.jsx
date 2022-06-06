import { Grid, Button } from '@mui/material';
import React, { useState } from 'react';
import { DatePicker, Form, TextFieldWithLabel } from '../../../../components';
import { useCompanySignupContext } from '../../../../contexts/company-signup';

const Generalnfo = ({ onNext }) => {
  const [companySignup, updateCompanySignup] = useCompanySignupContext();
  const [generalInfo, setGeneralInfo] = useState(companySignup.generalInfo);
  
  const handleSubmit = (event) => {
    const {name, target} = event.target;
    updateCompanySignup({type: 'setGeneralInfo', payload: companySignup});
    onNext();
  };
  const handleChange = event => {
    const { name } = event;

    setGeneralInfo((prevGeneralInfo) => ({
      ...prevGeneralInfo,
      [name]: event.target.value
    }))
    return;
  }
  return (
    <Form 
      title='Información General'
      onSubmit={handleSubmit}
    >
      <Grid item xs={12}>
        <TextFieldWithLabel
          required
          fullWidth
          label="Nombre"
          id="name"
          name="name"
          type="text"
          variant="filled"
          placeholder="Escribe el nombre de tu compañía"
          value={generalInfo.name}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldWithLabel
          required
          fullWidth
          label="Razón social"
          id="socialReason"
          name="socialReason"
          type="text"
          variant="filled"
          placeholder="Escribe la razón social"
          value={generalInfo.name}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={4}>
        <TextFieldWithLabel 
          required
          label='N° de emplados'
          placeholder='Ingresa un número'
          type='number'
          variant='filled'
          name='numEmployees'
          id='numEmployees'
          value={generalInfo.numEmployees}
        /> 
      </Grid> 
      <Grid item xs={8}>
        <TextFieldWithLabel 
          required
          label='Giro'
          placeholder='Selecciona el giro de tu compañía'
          variant='filled'
          name='businessLine'
          id='businessLine'
          value={generalInfo.businessLine}
          
        />
      </Grid>
      <Grid item xs={6}>
        <TextFieldWithLabel 
          required
          multiline
          rows={3}
          label='Misión'
          type='text'
          placeholder='La razón de ser de tu compañía'
          variant='filled'
          name='businessLine'
          id='businessLine'
          value={generalInfo.businessLine}
          
        />
      </Grid>
      <Grid item xs={6}>
        <TextFieldWithLabel 
          required
          multiline
          rows={3}
          label='Visión'
          type='text'
          placeholder='Lo que quiere llegar a ser'
          variant='filled'
          name='businessLine'
          id='businessLine'
          value={generalInfo.businessLine}
          
        />
      </Grid>
    
      <Grid item xs={12} display="flex" justifyContent="flex-end">
        <Button type="submit" variant="contained" size="large">SIGUIENTE</Button>
      </Grid>
    </Form>
  );
};

export default Generalnfo;
