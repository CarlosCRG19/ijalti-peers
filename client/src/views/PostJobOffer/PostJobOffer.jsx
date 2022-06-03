import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
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
  requiredSkills: [],
  suggestedSkills: [],
};

const PostJobOffer = () => {
  const [jobOffer, setJobOffer] = useState(INITIAL_JOB_OFFER);

  const [skills, setSkills] = useState([]);

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
      suggestedSkills: jobOffer.suggestedSkills.map((ability) => ability.id),
      company: localStorage.idCompany,
    };
    await api.jobOffer.create(formattedJobOffer);
  };

  useEffect(() => {
    const getSkills = async () => {
      const skillList = await api.skill.getAll();
      setSkills(skillList);
    };

    if (!localStorage.idToken || !localStorage.idCompany) {
      navigate('/login');
    }

    getSkills();
  }, []);

  return (
    <main className="main-content">
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
            variant="filled"
            id="tags"
            sx={{ backgroundColor: '#E7EDF3' }}
            required
            label="Habilidades Requeridas"
          />
        </Grid>
        <Grid item xs={12}>
          <TagsInput
            name="suggestedSkills"
            value={jobOffer.suggestedSkills}
            onChange={handleChangeSkills}
            tags={skills}
            fullWidth
            variant="outlined"
            id="tags"
            sx={{ backgroundColor: '#E7EDF3', innerHeight: '100px' }}
            label="Habilidades Sugeridas"
          />
        </Grid>
        <div className="buttons">
          <Button variant="text" onClick={() => setJobOffer(INITIAL_JOB_OFFER)}>Borrar</Button>
          <Button variant="contained" sx={{ margin: '0 0 0 1rem' }} type="submit">Publicar</Button>
        </div>
      </Form>
    </main>
  );
};

export default PostJobOffer;
