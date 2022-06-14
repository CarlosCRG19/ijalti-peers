import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';

import { useAPI } from '../../../../hooks';
import { Form, TextFieldWithLabel } from '../../../../components';
import { useAuth } from '../../../../contexts/auth';
import { useCompanySignupContext } from '../../../../contexts/company-signup';

const ProfileInfo = ({ onPrevious }) => {
  const api = useAPI();
  const navigate = useNavigate();
  const { storeCredentials } = useAuth();
  const { companySignup, updateCompanySignup } = useCompanySignupContext();
  const {
    credentials,
    generalInfo,
    contactInfo,
    profileInfo,
  } = companySignup;

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newProfileInfo = { ...profileInfo, [name]: value };

    updateCompanySignup({ type: 'setProfileInfo', payload: newProfileInfo });
  };

  const handleSubmit = async () => {
    const { email, password } = credentials;
    const company = {
      ...generalInfo,
      ...contactInfo,
      ...profileInfo,
    };

    // TODO: change this to have a better capture of data
    company.postalCode = +company.postalCode;
    company.numEmployees = +company.numEmployees;
    company.phone1 = +company.phone1;
    company.phone1 = +company.phone2;

    const { idToken, company: { id, name } } = await api.company.signup(email, password, company);

    storeCredentials('company', idToken, id, name);
    navigate('/post-job-offer');
  };

  return (
    <Form
      title="Perfil público"
      onSubmit={handleSubmit}
      description="¡Casi terminamos! La siguiente será la información con la que los demás te conocerán."
    >
      <Grid item xs={12}>
        <TextFieldWithLabel
          label="Nombre de perfil"
          required
          name="username"
          placeholder="Ingresa el nombre que aparecerá en tu perfil público"
          variant="filled"
          value={profileInfo.username}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="flex-end">
        <Button variant="text" size="large" onClick={onPrevious}>ANTERIOR</Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
        >
          Enviar
        </Button>
      </Grid>
    </Form>
  );
};

export default ProfileInfo;
