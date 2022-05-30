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
} from '@mui/icons-material';

import { useAPI } from '../../hooks';
import { Form, TagsInput } from '../../components';

import './PostJobOffer.css';

const INITIAL_JOB_OFFER = {
  title: '',
  city: '',
  salary: '',
  description: '',
  requiredAbilities: [],
  suggestedAbilities: [],
};

const skills = ['Python', 'C++', 'JavaScript'];

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

  const handleChangeAbilities = (name, selectedItem) => {
    setJobOffer((prevJobOffer) => ({
      ...prevJobOffer,
      [name]: selectedItem,
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
          sx={{ backgroundColor: '#E7EDF3' }}
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
          type="number"
          label="Salario mensual"
          variant="filled"
          value={jobOffer.salary}
          onChange={handleChange}
          sx={{ backgroundColor: '#E7EDF3' }}
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
          sx={{ backgroundColor: '#E7EDF3' }}
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
        <TagsInput
          name="requiredAbilities"
          value={jobOffer.requiredAbilities}
          handleChangeAbilities={handleChangeAbilities}
          fullWidth
          tags={skills}
          variant="filled"
          id="tags"
          sx={{ backgroundColor: '#E7EDF3' }}
          required
          label="Habilidades Requeridas"
        />
      </Grid>
      <Grid item xs={12}>
        <TagsInput
          name="suggestedAbilities"
          value={jobOffer.suggestedAbilities}
          handleChangeAbilities={handleChangeAbilities}
          fullWidth
          variant="outlined"
          id="tags"
          sx={{ backgroundColor: '#E7EDF3', innerHeight: '100px' }}
          label="Habilidades Sugeridas"
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
