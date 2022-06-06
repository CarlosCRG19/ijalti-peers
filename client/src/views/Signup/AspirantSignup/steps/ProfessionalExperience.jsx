import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Button, Grid } from '@mui/material';
import {
  Form,
  SelectWithLabel,
  TagsInputWithLabel,
  TextFieldWithLabel,
} from '../../../../components';
import { useAPI } from '../../../../hooks';
import { useAspirantSignup } from '../../../../contexts/aspirant-signup';

const workingStatusChoices = [
  { label: 'Trabajando', value: 'EMPLOYED' },
  { label: 'Desempleado', value: 'UNEMPLOYED' },
  { label: 'Contratando', value: 'HIRING' },
  { label: 'Buscando oportunidades', value: 'SEARCHING' },
];

const educationLevelChoices = [
  { label: 'Preparatoria', value: 'HIGH_SCHOOL' },
  { label: 'Universidad', value: 'UNIVERSITY' },
  { label: 'Maestría', value: 'MASTERS' },
  { label: 'Doctorado', value: 'DOCTORATE' },
];

const ProfessionalExperience = ({ onPrevious, onNext }) => {
  const api = useAPI();
  const {
    updateAspirantSignup,
    aspirantSignup: { professionalExperience },
  } = useAspirantSignup();

  const [skills, setSkills] = useState([]);

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

  const handleSubmit = () => {
    onNext();
  };

  useEffect(() => {
    const getSkills = async () => {
      const skillList = await api.skill.getAll();
      setSkills(skillList);
    };

    getSkills();
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
