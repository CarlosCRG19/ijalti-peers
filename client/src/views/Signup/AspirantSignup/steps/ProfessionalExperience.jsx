import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  useTheme, MenuItem, Button, Grid, Typography, Box, List, Paper,
} from '@mui/material';
import {
  Form,
  DatePicker,
  SelectWithLabel,
  TagsInputWithLabel,
  TextFieldWithLabel,
  WorkExperienceSignup,
} from '../../../../components';

import { useAPI } from '../../../../hooks';
import { useAspirantSignup } from '../../../../contexts/aspirant-signup';

const workingStatusChoices = [
  { label: 'Trabajando', value: 'EMPLOYED' },
  { label: 'Desempleado', value: 'UNEMPLOYED' },
  { label: 'Buscando oportunidades', value: 'SEARCHING' },
];

const educationLevelChoices = [
  { label: 'Preparatoria', value: 'HIGH_SCHOOL' },
  { label: 'Universidad', value: 'UNIVERSITY' },
  { label: 'Maestría', value: 'MASTERS' },
  { label: 'Doctorado', value: 'DOCTORATE' },
];

const INITIAL_WORK_EXPERIENCE = {
  title: '', at: '', startDate: null, endDate: null,
};

const ProfessionalExperience = ({ onPrevious, onNext }) => {
  const api = useAPI();
  const { palette } = useTheme();

  const {
    updateAspirantSignup,
    aspirantSignup: { professionalExperience },
  } = useAspirantSignup();

  const [skills, setSkills] = useState([]);

  const [workExperience, setWorkExperience] = useState(INITIAL_WORK_EXPERIENCE);

  const [fullWorkExperience, setFullWorkExperience] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newProfessionalExperience = { ...professionalExperience, [name]: value };

    updateAspirantSignup({
      type: 'setProfessionalExperience',
      payload: newProfessionalExperience,
    });
  };

  const handleChangeSkills = (name, newSkills) => {
    const newProfessionalExperience = { ...professionalExperience, [name]: newSkills };

    updateAspirantSignup({
      type: 'setProfessionalExperience',
      payload: newProfessionalExperience,
    });
  };

  const handleChangeWorkExperience = (event) => {
    const { name, value } = event.target;
    setWorkExperience((prevWorkExperience) => ({
      ...prevWorkExperience,
      [name]: value || null,
    }));
  };

  const handleChangeFullWorkExperience = () => {
    setFullWorkExperience((prevFullWorkExperience) => (
      [...prevFullWorkExperience, {
        ...workExperience,
        id: prevFullWorkExperience.length,
      }]
    ));

    const formattedFullWorkExperience = fullWorkExperience.map((experience) => {
      const newExperience = { ...experience };
      newExperience.startDate = String(newExperience.startDate);
      newExperience.endDate = newExperience.endDate ? String(newExperience.endDate) : null;
      return newExperience;
    });

    const formattedLastWorkExperience = {
      ...workExperience,
      startDate: workExperience.startDate.toISOString().slice(0, 10),
      endDate: workExperience.endDate ? workExperience.endDate.toISOString().slice(0, 10) : null,
      is: !!workExperience.endDate,
    };

    delete formattedFullWorkExperience.id;

    const newProfessionalExperience = {
      ...professionalExperience,
      workExperiences: [...formattedFullWorkExperience, formattedLastWorkExperience],
    };

    updateAspirantSignup({
      type: 'setProfessionalExperience',
      payload: newProfessionalExperience,
    });

    console.log(newProfessionalExperience);

    setWorkExperience(INITIAL_WORK_EXPERIENCE);
  };

  const handleDeleteWorkExperience = (id) => {
    setFullWorkExperience((prevFullWorkExperience) => (
      prevFullWorkExperience.filter((experience) => experience.id !== id)
    ));

    let counter = 0;
    setFullWorkExperience((prevFullWorkExperience) => (
      prevFullWorkExperience.map((experience) => {
        const newExperience = { ...experience };
        newExperience.id = counter;
        counter += 1;
        return newExperience;
      })
    ));
  };

  const displayWorkExperience = () => fullWorkExperience.map((experience) => (
    <WorkExperienceSignup
      title={experience.title}
      at={experience.at}
      startDate={experience.startDate}
      endDate={experience.endDate}
      id={experience.id}
      onDelete={handleDeleteWorkExperience}
      key={String(experience.id)}
    />
  ));

  const handleSubmit = () => {
    onNext();
  };

  useEffect(() => {
    const getSkills = async () => {
      const skillList = await api.skill.getAll();
      setSkills(skillList);
    };

    // const getCompanies = async () => {
    //   const atList = await api.at.getAll();
    //   setCompanies(atList);
    // };

    getSkills();
    // getCompanies();
  }, []);

  return (
    <Form
      title="Experiencia Profesional"
      description="¡Cuéntanos tu trayectoria! Así podremos conectarte con las mejores oportunidades."
      onSubmit={handleSubmit}
    >
      <Grid item xs={4}>
        <TextFieldWithLabel
          required
          fullWidth
          label="Años de experiencia"
          id="yearsOfExperience"
          name="yearsOfExperience"
          type="number"
          variant="filled"
          placeholder="Ingresa tus años activo"
          value={professionalExperience.yearsOfExperience}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={4}>
        <SelectWithLabel
          required
          fullWidth
          label="Status laboral"
          id="workingStatus"
          name="workingStatus"
          type="text"
          variant="filled"
          placeholder="Selecciona un status"
          value={professionalExperience.workingStatus}
          onChange={handleChange}
        >
          {workingStatusChoices.map((choice) => (
            <MenuItem key={choice.label} value={choice.value}>{choice.label}</MenuItem>
          ))}
        </SelectWithLabel>
      </Grid>
      <Grid item xs={4}>
        <SelectWithLabel
          required
          fullWidth
          label="Nivel de educación"
          id="educationLevel"
          name="educationLevel"
          type="text"
          variant="filled"
          placeholder="Selecciona un nivel"
          value={professionalExperience.educationLevel}
          onChange={handleChange}
        >
          {educationLevelChoices.map((choice) => (
            <MenuItem key={choice.label} value={choice.value}>{choice.label}</MenuItem>
          ))}
        </SelectWithLabel>
      </Grid>

      <Grid item xs={12}>
        <TagsInputWithLabel
          fullWidth
          size="regular"
          label="Habilidades técnicas"
          id="skills"
          name="skills"
          tags={skills}
          variant="filled"
          value={professionalExperience.skills}
          onChange={handleChangeSkills}
        />
      </Grid>

      <Grid item xs={4}>
        <Typography variant="h6" fontWeight="regular">Experiencia Laboral</Typography>
      </Grid>
      <Grid item xs={8}>
        <hr style={{ color: palette.gray.D, marginTop: '16px' }} />
      </Grid>

      <Grid item xs={6}>
        <TextFieldWithLabel
          size="regular"
          label="Posición"
          id="title"
          name="title"
          variant="filled"
          placeholder="Selecciona una posición"
          value={workExperience.title}
          onChange={handleChangeWorkExperience}
        />
      </Grid>

      <Grid item xs={6}>
        <TextFieldWithLabel
          size="regular"
          label="Empresa"
          id="at"
          name="at"
          variant="filled"
          placeholder="Selecciona una empresa"
          value={workExperience.at}
          onChange={handleChangeWorkExperience}
        />
      </Grid>

      <Grid item xs={5}>
        <DatePicker
          label="Fecha de inicio"
          id="startDate"
          name="startDate"
          type="text"
          variant="filled"
          placeholder="Selecciona una fecha"
          value={workExperience.startDate}
          onChange={handleChangeWorkExperience}
        />
      </Grid>

      <Grid item xs={5}>
        <DatePicker
          label="Fecha de término"
          id="endDate"
          name="endDate"
          type="text"
          variant="filled"
          placeholder="Selecciona una fecha"
          value={workExperience.endDate}
          onChange={handleChangeWorkExperience}
        />
      </Grid>

      <Grid item xs={2}>
        <Box display="flex" justifyContent="center" alignItems="end" sx={{ width: '100%', height: '100%' }}>
          <Button
            variant="contained"
            sx={{
              height: '60px', width: '60px', borderRadius: '50%', fontSize: '24px',
            }}
            onClick={handleChangeFullWorkExperience}
            disabled={!Object.values({ ...workExperience, endDate: true }).every((value) => value)}
          >
            +
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Paper sx={{
          maxHeight: 200, height: 200, overflow: 'auto', background: palette.gray.A,
        }}
        >
          <List>
            {displayWorkExperience()}
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12} display="flex" justifyContent="flex-end" gap="16px">
        <Button variant="text" size="large" onClick={onPrevious}>ANTERIOR</Button>
        <Button type="submit" variant="contained" size="large">SIGUIENTE</Button>
      </Grid>
    </Form>
  );
};

ProfessionalExperience.propTypes = {
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
};

ProfessionalExperience.defaultProps = {
  onNext: () => {},
  onPrevious: () => {},
};

export default ProfessionalExperience;
