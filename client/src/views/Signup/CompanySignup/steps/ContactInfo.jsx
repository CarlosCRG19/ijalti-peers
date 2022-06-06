import React from 'react';
import { Grid, Button } from '@mui/material';
import { Form, TextFieldWithLabel } from '../../../../components';
import { useCompanySignupContext } from '../../../../contexts/company-signup';

const ContactInfo = ({ onNext, onPrevious }) => {
  const {
    updateCompanySignup,
    companySignup: { contactInfo },
  } = useCompanySignupContext();

  const handleSubmit = () => {
    onNext();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newContactInfo = { ...contactInfo, [name]: value };

    updateCompanySignup({ type: 'setContactInfo', payload: newContactInfo });
  };

  return (
    <Form
      title="Información de Contacto"
      onSubmit={handleSubmit}
    >
      <Grid item xs={12} fullwidth>
        <TextFieldWithLabel
          required
          label="Correo"
          placeholder="Escribe el correo principal de contacto"
          variant="filled"
          type="text"
          name="contactEmail"
          value={contactInfo.contactEmail}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={4} fullwidth>
        <TextFieldWithLabel
          required
          label="Código Postal"
          placeholder="Escribe tu código postal"
          variant="filled"
          type="number"
          name="postalCode"
          value={contactInfo.postalCode}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={4} fullwidth>
        <TextFieldWithLabel
          required
          label="Estado"
          placeholder="Elige un estado"
          variant="filled"
          type="text"
          name="locationState"
          value={contactInfo.locationState}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={4} fullwidth>
        <TextFieldWithLabel
          required
          label="Municipio"
          placeholder="Elige un municipio"
          variant="filled"
          type="text"
          name="locationCity"
          value={contactInfo.locationCity}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} fullwidth>
        <TextFieldWithLabel
          required
          label="Dirección"
          placeholder="Escribe la dirección principal de tu compañía"
          variant="filled"
          type="text"
          name="address"
          value={contactInfo.address}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6} fullwidth>
        <TextFieldWithLabel
          required
          label="Teléfono"
          placeholder="Escribe el teléfono de tu compañía"
          variant="filled"
          type="number"
          name="phone1"
          value={contactInfo.phone1}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6} fullwidth>
        <TextFieldWithLabel
          required
          label="Teléfono secundario"
          placeholder="Escribe el teléfono secundario"
          variant="filled"
          type="number"
          name="phone2"
          value={contactInfo.phone2}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="flex-end">
        <Button variant="text" size="large" onClick={onPrevious}>ANTERIOR</Button>
        <Button type="submit" variant="contained" size="large">SIGUIENTE</Button>
      </Grid>
    </Form>
  );
};

export default ContactInfo;
