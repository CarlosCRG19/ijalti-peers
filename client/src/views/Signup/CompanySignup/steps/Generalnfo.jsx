import React from 'react';
import { Grid, Button } from '@mui/material';
import { Form, TextFieldWithLabel } from '../../../../components';
import { useCompanySignupContext } from '../../../../contexts/company-signup';

const Generalnfo = ({ onNext }) => {
  const {
    updateCompanySignup,
    companySignup: { generalInfo },
  } = useCompanySignupContext();

  const handleSubmit = () => {
    onNext();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newGeneralInfo = { ...generalInfo, [name]: value };

    updateCompanySignup({ type: 'setGeneralInfo', payload: newGeneralInfo });
  };

  return (
    <Form
      title="Información General"
      onSubmit={handleSubmit}
      description="¡Queremos conocer tu empresa! Por favor, completa la siguiente información."
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
          value={generalInfo.socialReason}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={4}>
        <TextFieldWithLabel
          required
          label="N° de emplados"
          placeholder="Ingresa un número"
          type="number"
          variant="filled"
          name="numEmployees"
          id="numEmployees"
          value={generalInfo.numEmployees}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={8}>
        <TextFieldWithLabel
          required
          label="Giro"
          placeholder="Selecciona el giro de tu compañía"
          variant="filled"
          name="businessLine"
          id="businessLine"
          value={generalInfo.businessLine}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextFieldWithLabel
          required
          multiline
          rows={3}
          label="Misión"
          type="text"
          placeholder="La razón de ser de tu compañía"
          variant="filled"
          name="mision"
          id="mision"
          value={generalInfo.mision}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextFieldWithLabel
          required
          multiline
          rows={3}
          label="Visión"
          type="text"
          placeholder="Lo que quiere llegar a ser"
          variant="filled"
          name="vision"
          id="vision"
          value={generalInfo.vision}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="flex-end">
        <Button type="submit" variant="contained" size="large">SIGUIENTE</Button>
      </Grid>
    </Form>
  );
};

export default Generalnfo;
