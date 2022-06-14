import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Alert,
  Button,
  Grid,
  InputAdornment,
  TextField,
} from '@mui/material';

import {
  AccessTimeFilled,
  LocationOn,
  School,
} from '@mui/icons-material';

import './AspirantSearch.css';
import Form from '../../components/Form/Form';
import AspirantCard from '../../components/AspirantCard';
import { TagsInput } from '../../components';
import useAPI from '../../hooks/useAPI/useAPI';
import SelectWithIcon from '../../components/SelectWithIcon/SelectWithIcon';
import createQuery from '../../utils/createQuery';

import { useAuth } from '../../contexts/auth';

const INITIAL_SEARCH = {
  requiredSkills: [],
  education: '',
  educationLabel: '',
  experience: '',
  location: '',
};

const educationLevelChoices = [
  { name: 'Preparatoria', id: 'HIGH_SCHOOL' },
  { name: 'Universidad', id: 'UNIVERSITY' },
  { name: 'Maestría', id: 'MASTERS' },
  { name: 'Doctorado', id: 'DOCTORATE' },
];

const AspirantSearch = () => {
  const [search, setSearch] = useState(INITIAL_SEARCH);
  const [searchResults, setSearchResults] = useState([]);
  const [skills, setSkills] = useState([]);
  const [alert, setAlert] = useState('');
  const { aspirant, skill } = useAPI();

  const navigate = useNavigate();

  const { user } = useAuth();

  const handleChange = (event) => {
    setAlert('');
    const { name, value } = event.target;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setAlert('');
    try {
      setSearchResults([]);

      const query = createQuery(search);
      if (!query) {
        setAlert('Favor de llenar al menos un campo.');
        return;
      }

      const aspirants = await aspirant.searchAspirants(query);
      setSearchResults(aspirants);

      if (aspirants.length === 0) {
        setAlert('No se encontraron aspirantes para esta búsqueda.');
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeNumber = (event) => {
    setAlert('');
    if (event.target.value < 0) {
      return;
    }
    setSearch((prevSearch) => ({
      ...prevSearch,
      [event.target.name]: event.target.value,
    }));
  };

  const handleChangeSkills = (name, selectedSkills) => {
    setAlert('');
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: selectedSkills,
    }));
  };

  const handleChangeEducation = (event) => {
    setAlert('');
    for (let i = 0; i < educationLevelChoices.length; i++) {
      if (educationLevelChoices[i].name === event.target.value) {
        setSearch((prevSearch) => ({
          ...prevSearch,
          educationLabel: educationLevelChoices[i].name,
          education: educationLevelChoices[i].id,
        }));
      }
    }
  };

  const clearSearch = () => {
    setSearch(INITIAL_SEARCH);
    setSearchResults([]);
    setAlert('');
  };

  useEffect(() => {
    const getSkills = async () => {
      const skills = await skill.getAll();
      setSkills(skills);
    };
    if (user.role !== 'company') {
      navigate('/login');
    }

    getSkills();
  }, []);

  return (
    <main className="main-content-overwrite">
      <Form
        title="Buscar aspirantes"
        description="Completa al menos uno de los campos para realizar una búsqueda"
        extraClass="form-overwrite"
        onSubmit={handleSubmit}
      >

        <Grid item xs={12}>
          <TagsInput
            fullWidth
            name="requiredSkills"
            label="Habilidades"
            variant="outlined"
            tags={skills}
            sx={{ backgroundColor: '#E7EDF3' }}
            onChange={handleChangeSkills}
            value={search.requiredSkills}
          />
        </Grid>

        <Grid item xs={6}>
          <SelectWithIcon
            label="Educación"
            itemsarray={educationLevelChoices.map((education) => education.name)}
            value={search.educationLabel}
            onChange={handleChangeEducation}
            icon={<School />}
            sx={{ backgroundColor: '#E7EDF3' }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            name="experience"
            label="Años de experiencia mínima"
            value={search.experience}
            variant="outlined"
            onChange={handleChangeNumber}
            type="number"
            fullWidth
            sx={{ backgroundColor: '#E7EDF3' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeFilled />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="location"
            label="Estado"
            value={search.location}
            variant="outlined"
            onChange={handleChange}
            fullWidth
            sx={{ backgroundColor: '#E7EDF3' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <div className="buttons">
          <Button variant="text" onClick={clearSearch}>Limpiar</Button>
          <Button variant="contained" sx={{ margin: '0 0 0 1rem' }} type="submit">Buscar</Button>
        </div>

        {alert && (
          <Grid item xs={12}>
            <Alert
              severity="info"
              sx={{
                maxWidth: '720px',
                width: '100%',
              }}
            >
              {alert}

            </Alert>
          </Grid>
        )}
      </Form>

      <div className="cards">
        {
          searchResults && searchResults.map((aspirant) => (
            <AspirantCard
              key={`Card${aspirant.names}`}
              aspirantName={`${aspirant.names} ${aspirant.firstLastName}`}
              title={aspirant.title}
              education={aspirant.educationLevel}
              description={aspirant.biography}
              experience={aspirant.yearsOfExperience}
              abilitiesArray={aspirant.skills && aspirant.skills.map((skill) => skill.name)}
              location={`${aspirant.residenceCity}, ${aspirant.residenceState}`}
              pageURL={aspirant.pageURL}
            />
          ))
        }
      </div>
    </main>
  );
};

export default AspirantSearch;
