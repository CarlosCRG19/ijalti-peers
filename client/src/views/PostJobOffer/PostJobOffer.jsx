import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  BusinessCenter,
  LocationOn,
  AttachMoney,
  Info,
} from '@mui/icons-material';

import { useAPI } from '../../hooks';
import { Form, TagsInput } from '../../components';

const INITIAL_JOB_OFFER = {
  title: '',
  city: '',
  salary: '',
  description: '',
  requiredSkills: [],
  preferredSkills: [],
};

const PostJobOffer = () => {
  const [jobOffer, setJobOffer] = useState(INITIAL_JOB_OFFER);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');

  const api = useAPI();

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setJobOffer((prevJobOffer) => ({
      ...prevJobOffer,
      [name]: value,
    }));
  };

  const handleChangeSkills = (name, selectedSkills) => {
    setJobOffer((prevJobOffer) => ({
      ...prevJobOffer,
      [name]: selectedSkills,
    }));
  };

  const handleChangeSalary = (event) => {
    const { value } = event.target;
    if (/^$|^[1-9]+[0-9]*$/.test(value)) {
      setJobOffer((prevJobOffer) => ({
        ...prevJobOffer,
        salary: value,
      }));
    }
  };

  const handleSubmit = async () => {
    const formattedJobOffer = {
      ...jobOffer,
      requiredSkills: jobOffer.requiredSkills.map((ability) => ability.id),
      preferredSkills: jobOffer.preferredSkills.map((ability) => ability.id),
      salary: parseInt(jobOffer.salary, 10),
    };
    try {
      await api.jobOffer.create(formattedJobOffer);
    } catch (postError) {
      setError(postError.message);
    }
  };

  useEffect(() => {
    const getSkills = async () => {
      const skillList = await api.skill.getAll();
      setSkills(skillList);
    };



    getSkills();
  }, []);

  return (
    <Grid
      item
      xs={12}
      md={6}
      py={6}
      display="flex"
      direction="column"
      alignItems="center"
      sx={{ zIndex: 1 }}
    >
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
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <TextField
            name="salary"
            label="Salario mensual"
            variant="filled"
            value={jobOffer.salary}
            onChange={handleChangeSalary}
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
            name="requiredSkills"
            value={jobOffer.requiredSkills}
            onChange={handleChangeSkills}
            fullWidth
            tags={skills}
            id="tags"
            sx={{ backgroundColor: '#E7EDF3' }}
            required
            label="Habilidades Requeridas"
          />
        </Grid>
        <Grid item xs={12}>
          <TagsInput
            name="preferredSkills"
            value={jobOffer.preferredSkills}
            onChange={handleChangeSkills}
            tags={skills}
            fullWidth
            variant="outlined"
            id="tags"
            sx={{ backgroundColor: '#E7EDF3', innerHeight: '100px' }}
            label="Habilidades Sugeridas"
          />
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="end"
          sx={{ zIndex: 1 }}
        >
          <Button variant="text" onClick={() => setJobOffer(INITIAL_JOB_OFFER)}>Borrar</Button>
          <Button variant="contained" sx={{ ml: 2 }} type="submit">Publicar</Button>
        </Grid>
        {error && (
        <Grid item xs={12}>
          <Alert severity="error">{error}</Alert>
        </Grid>
        )}
      </Form>
    </Grid>
  );
};

export default PostJobOffer;
