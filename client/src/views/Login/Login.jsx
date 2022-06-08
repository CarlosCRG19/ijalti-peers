import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useTheme,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Grid,
  Typography,
  Alert,
} from '@mui/material';

import { TextFieldWithLabel } from '../../components';

import useAPI from '../../hooks/useAPI';

const INITIAL_CREDENTIALS = { email: '', password: '' };

const Login = () => {
  const [isAspirantSignup, setIsApirantSignup] = useState(true);
  const [credentials, setCredentials] = useState(INITIAL_CREDENTIALS);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { palette } = useTheme();

  const canLogin = useCallback(() => {
    const { email, password } = credentials;

    let isValidSignup = true;
    if (!email || !password) isValidSignup = false;

    return isValidSignup;
  }, [credentials]);

  const api = useAPI();

  const handleCredentialsChange = (event) => {
    const { name, value } = event.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = credentials;
    try {
      let response;
      if (isAspirantSignup) {
        response = await api.aspirant.login(email, password);
      } else {
        response = await api.company.login(email, password);
        localStorage.setItem('idCompany', response.company.id);
      }
      localStorage.setItem('idToken', response.idToken);
      navigate(`/profile/aspirant/${response.aspirant.id}`);
    } catch (loginError) {
      setError(loginError.message);
    }
  };

  return (
    <Grid
      container
      component="main"
      alignItems="center"
      sx={{
        height: '100vh',
        background: palette.white,
        '&:after': {
          content: '""',
          position: 'absolute',
          width: '60vw',
          height: '100vh',
          right: '0',
          background: palette.gray.B,
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          clipPath: 'polygon(70% 0, 100% 0, 100% 100%, 0% 100%)',
        },
      }}
    >
      <Grid item md={6} display={{ xs: 'none', md: 'flex' }} justifyContent="center" sx={{ zIndex: 1 }}>
        <Typography variant="h2" component="p" sx={{ fontWeight: 500, width: '640px' }}>
          {isAspirantSignup ? 'Encuentra tu trabajo ideal' : 'Encuentra a los mejores ingenieros para tu equipo' }
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        direction="column"
        alignItems="center"
        sx={{ zIndex: 1 }}
      >
        <Card elevation={5} sx={{ width: '640px', borderRadius: '12px' }}>
          <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            width: '100%',
            padding: '40px 40px 0px',
          }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 500 }}
            >
              Bienvenido de vuelta
            </Typography>
            <ButtonGroup
              variant="contained"
              fullWidth
              sx={{
                boxShadow: 'none',
                marginBottom: '8px',
              }}
            >
              <Button
                onClick={() => setIsApirantSignup(true)}
                variant={isAspirantSignup ? 'contained' : 'outlined'}
              >
                Personal
              </Button>
              <Button
                onClick={() => setIsApirantSignup(false)}
                variant={isAspirantSignup ? 'outlined' : 'contained'}
              >
                Empresarial
              </Button>
            </ButtonGroup>

            <TextFieldWithLabel
              label="¿Cuál es tu correo electrónico?"
              id="email"
              type="email"
              name="email"
              variant="filled"
              placeholder="Ejemplo: tu@correo.com"
              required
              fullWidth
              value={credentials.email}
              onChange={handleCredentialsChange}
            />

            <TextFieldWithLabel
              label="¿Cuál es tu contraseña?"
              id="password"
              type="password"
              name="password"
              variant="filled"
              placeholder="Escribe tu contraseña"
              required
              fullWidth
              value={credentials.password}
              onChange={handleCredentialsChange}
            />

          </CardContent>
          <Button
            variant="contained"
            disableElevation
            fullWidth
            disabled={!canLogin()}
            onClick={handleSubmit}
            sx={{
              fontSize: '24px',
              padding: '16px',
              marginTop: '40px',
            }}
          >
            COMENZAR
          </Button>
          {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
          )}
        </Card>
        <Button
          variant="text"
          onClick={() => navigate('/signup')}
          sx={{
            color: palette.blue.lightest,
            marginTop: '24px',
            textDecoration: 'underline',
          }}
        >
          TODAVÍA NO TENGO CUENTA
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
