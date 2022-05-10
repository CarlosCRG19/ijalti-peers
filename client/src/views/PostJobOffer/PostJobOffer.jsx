import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
} from '@mui/material';
import {
  BusinessCenter,
  LocationOn,
  AttachMoney,
  Info,
  Handyman,
} from '@mui/icons-material';

import axios from 'axios';

import Form from '../../components/Form';
import './PostJobOffer.css';

const INITIAL_JOB_OFFER = {
  title: '',
  city: '',
  salary: '',
  description: '',
  requiredAbilities: '',
  suggestedAbilities: '',
};

const PostJobOffer = () => {
  const [jobOffer, setJobOffer] = useState(INITIAL_JOB_OFFER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setJobOffer((prevJobOffer) => ({
      ...prevJobOffer,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const res = await axios.post('http://localhost:3000/job-offers/', {
      ...jobOffer,
      company: 'b00d8a63-2166-47de-a97a-1cf6c03371b7',
    });

    console.log(jobOffer);
  };

  return (
    <Form
      title="Publica una oferta"
      description="Llena todos los campos para publicar una nueva oferta de trabajo"
      onSubmit={handleSubmit}
    >
      <Grid item xs={12}>
        <TextField
          name="title"
          label="Título"
          variant="filled"
          value={jobOffer.title}
          required
          fullWidth
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BusinessCenter />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="city"
          label="Ubicación"
          variant="filled"
          value={jobOffer.city}
          onChange={handleChange}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name="salary"
          label="Salario mensual"
          variant="filled"
          value={jobOffer.salary}
          onChange={handleChange}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoney />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="description"
          label="Descripción"
          variant="filled"
          value={jobOffer.description}
          onChange={handleChange}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Info />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="requiredAbilities"
          label="Habilidades Requeridas"
          variant="filled"
          value={jobOffer.requiredAbilities}
          onChange={handleChange}
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Handyman />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="suggestedAbilities"
          label="Habilidades Sugeridas (Opcional)"
          variant="filled"
          value={jobOffer.suggestedAbilities}
          onChange={handleChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Handyman />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <div className="buttons">
        <Button variant="text" onClick={() => setJobOffer(INITIAL_JOB_OFFER)}>Borrar</Button>
        <Button variant="contained" sx={{ margin: '0 0 0 1rem' }} type="submit">Publicar</Button>
      </div>
    </Form>
  );
};

export default PostJobOffer;
