import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { useAPI } from '../../../../hooks';
import { Form, TextFieldWithLabel } from '../../../../components';
import { useAspirantSignup } from '../../../../contexts/aspirant-signup';

const PublicProfile = ({ onPrevious }) => {
  const api = useAPI();
  const navigate = useNavigate();
  const { aspirantSignup, updateAspirantSignup, isCompleted } = useAspirantSignup();
  const {
    credentials,
    personalData,
    professionalExperience,
    publicProfile,
  } = aspirantSignup;

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newPublicProfile = { ...publicProfile, [name]: value };

    updateAspirantSignup({ type: 'setPublicProfile', payload: newPublicProfile });
  };

  const handleSubmit = async () => {
    const { email, password } = credentials;
    const aspirant = {
      ...personalData,
      ...professionalExperience,
      ...publicProfile,
    };

    // TODO: clean this filtering of properties
    aspirant.yearsOfExperience = +aspirant.yearsOfExperience;
    if (aspirant.skills) aspirant.skills = aspirant.skills.map((skill) => skill.id);

    const response = await api.aspirant.signup(email, password, aspirant);

    if (response) {
      localStorage.setItem('idToken', response.idToken);
      // TODO: Redirect to private route
      navigate('/');
    }
  };

  return (
    <Form
      title="Perfil Público"
      description="¡Casi terminamos! La siguiente será la información con la que los demás te conocerán."
      onSubmit={handleSubmit}
    >
      <Grid item xs={12}>
        <TextFieldWithLabel
          fullWidth
          label="Nombre de perfil"
          id="username"
          name="username"
          type="text"
          variant="filled"
          placeholder="Ingresa el nombre que aparecerá en tu perfil público"
          value={publicProfile.username}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextFieldWithLabel
          fullWidth
          multiline
          rows={4}
          label="Descripción"
          id="biography"
          name="biography"
          type="text"
          variant="filled"
          placeholder="Añade algo sobre ti"
          value={publicProfile.biography}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} display="flex" justifyContent="flex-end" gap="16px">
        <Button variant="text" size="large" onClick={onPrevious}>ANTERIOR</Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!isCompleted}
        >
          CREAR CUENTA
        </Button>
      </Grid>
    </Form>
  );
};

PublicProfile.propTypes = {
  onPrevious: PropTypes.func,
};

PublicProfile.defaultProps = {
  onPrevious: () => {},
};

export default PublicProfile;
