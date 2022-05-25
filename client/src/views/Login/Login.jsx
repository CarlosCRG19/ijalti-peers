import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import useAPI from '../../hooks/useAPI';

import Form from '../../components/Form';
import './Login.css';

const INITIAL_CREDENTIALS = { email: '', password: '' };

const Login = () => {
  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS);
  const [loginPersonal, setLoginPersonal] = useState(true);

  const api = useAPI();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response;
    if (loginPersonal) {
      response = await api.aspirant.login(credentials.email, credentials.password);
    } else {
      response = await api.company.login(credentials.email, credentials.password);
      localStorage.setItem('idCompany', response.company.id);
    }
    localStorage.setItem('idToken', response.idToken);
  };

  return (
    <main className="login">
      <Typography variant="h2" className="welcome">
        {loginPersonal ? 'Encuentra tu trabajo ideal' : 'Encuentra a los mejores ingenieros para tu equipo'}
      </Typography>
      <Form
        title="Bienvenido de vuelta"
        onSubmit={handleSubmit}
      >
        <Grid item xs={12}>
          <ButtonGroup fullWidth>
            <Button
              variant={loginPersonal ? 'contained' : 'outlined'}
              onClick={() => setLoginPersonal(true)}
            >
              Personal
            </Button>
            <Button
              variant={!loginPersonal ? 'contained' : 'outlined'}
              onClick={() => setLoginPersonal(false)}
            >
              Empresarial
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email"
            type="email"
            variant="filled"
            value={credentials.email}
            required
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="password"
            label="Password"
            type="password"
            variant="filled"
            value={credentials.password}
            required
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <div className="buttons">
          <Button variant="text" onClick={() => setCredentials(INITIAL_CREDENTIALS)}>Borrar</Button>
          <Button variant="contained" sx={{ margin: '0 0 0 1rem' }} type="submit">Ingresar</Button>
        </div>
      </Form>
    </main>
  );
};

export default Login;
