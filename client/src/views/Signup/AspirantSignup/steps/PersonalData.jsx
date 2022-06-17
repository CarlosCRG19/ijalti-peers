import React from 'react';
import PropTypes from 'prop-types';
import {
  useTheme,
  Alert,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import { DatePicker, Form, TextFieldWithLabel } from '../../../../components';
import { useAspirantSignup } from '../../../../contexts/aspirant-signup';

const PersonalData = ({ onNext }) => {
  const { palette } = useTheme();
  const {
    updateAspirantSignup,
    aspirantSignup: { personalData },
  } = useAspirantSignup();

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newPersonalData = { ...personalData, [name]: value };

    updateAspirantSignup({ type: 'setPersonalData', payload: newPersonalData });
  };

  const handleSubmit = () => {
    onNext();
  };

  return (
    <Form
      title="Datos Personales"
      description="¡Queremos conocerte más! Por favor, completa la siguiente información."
      onSubmit={handleSubmit}
    >
      <Grid item xs={12}>
        <Alert severity="warning">Esta informacion debe coincidir con la de tu identificación oficial</Alert>
      </Grid>

      <Grid item xs={12}>
        <TextFieldWithLabel
          required
          fullWidth
          label="Nombre(s)"
          id="names"
          name="names"
          type="text"
          variant="filled"
          placeholder="Escribe tu(s) nombre(s)"
          value={personalData.names}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={6}>
        <TextFieldWithLabel
          required
          fullWidth
          label="Primer apellido"
          id="firstLastName"
          name="firstLastName"
          type="text"
          variant="filled"
          placeholder="Escribe tu primer apellido"
          value={personalData.firstLastName}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <TextFieldWithLabel
          fullWidth
          label="Segundo apellido"
          id="secondLastName"
          name="secondLastName"
          type="text"
          variant="filled"
          placeholder="Escribe tu segundo apellido"
          value={personalData.secondLastName}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={4}>
        <DatePicker
          required
          fullWidth
          label="Fecha de nacimiento"
          id="birthDate"
          name="birthDate"
          type="text"
          variant="filled"
          placeholder="Selecciona una fecha"
          value={personalData.birthDate}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={8}>
        <TextFieldWithLabel
          required
          fullWidth
          label="Nacionalidad"
          id="nationality"
          name="nationality"
          type="text"
          variant="filled"
          placeholder="Selecciona una nacionalidad"
          value={personalData.nationality}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={4}>
        <Typography variant="h6" fontWeight="regular">Ubicación actual</Typography>
      </Grid>
      <Grid item xs={8}>
        <hr style={{ color: palette.gray.D, marginTop: '16px' }} />
      </Grid>

      <Grid item xs={4}>
        <TextFieldWithLabel
          required
          fullWidth
          label="País"
          id="residenceCountry"
          name="residenceCountry"
          type="text"
          variant="filled"
          placeholder="Elige un país"
          value={personalData.residenceCountry}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={4}>
        <TextFieldWithLabel
          required
          fullWidth
          label="Estado"
          id="residenceState"
          name="residenceState"
          type="text"
          variant="filled"
          placeholder="Elige un estado"
          value={personalData.residenceState}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={4}>
        <TextFieldWithLabel
          required
          fullWidth
          label="Municipio"
          id="residenceCity"
          name="residenceCity"
          type="text"
          variant="filled"
          placeholder="Elige un municipio"
          value={personalData.residenceCity}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} display="flex" justifyContent="flex-end">
        <Button type="submit" variant="contained" size="large">SIGUIENTE</Button>
      </Grid>
    </Form>
  );
};

PersonalData.propTypes = {
  onNext: PropTypes.func,
};

PersonalData.defaultProps = {
  onNext: () => {},
};

export default PersonalData;
