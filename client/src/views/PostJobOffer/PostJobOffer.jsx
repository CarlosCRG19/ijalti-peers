import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  BusinessCenter,
  LocationOn,
  AttachMoney,
  Info,
  Handyman,
} from '@mui/icons-material';

import { useAPI } from '../../hooks';
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
  // NOTE: for the purpose of the second sprint deployment,
  //       a select input for companies have been temporarily added
  const [companies, setCompanies] = useState([]);

  const api = useAPI();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setJobOffer((prevJobOffer) => ({
      ...prevJobOffer,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await api.jobOffer.create(jobOffer);
  };

  useEffect(() => {
    const getCompanies = async () => {
      const companyList = await api.company.getAll();
      setCompanies(companyList);
    };

    getCompanies();
  }, []);

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
          sx={{ backgroundColor: '#E7EDF3' }}
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
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="selectCompany">Compañía</InputLabel>
          <Select
            labelId="selectCompany"
            label="Compañía"
            name="company"
            value={companies.find((company) => company.id === jobOffer.company)}
            handleChange={handleChange}
          >
            {companies.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                {company.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <div className="buttons">
        <Button variant="text" onClick={() => setJobOffer(INITIAL_JOB_OFFER)}>Borrar</Button>
        <Button variant="contained" sx={{ margin: '0 0 0 1rem' }} type="submit">Publicar</Button>
      </div>
    </Form>
  );
};

export default PostJobOffer;
