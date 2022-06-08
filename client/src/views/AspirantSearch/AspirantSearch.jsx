import React, { useEffect, useState } from 'react';

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
import { maxWidth } from '@mui/system';

const INITIAL_SEARCH = {
  requiredSkills: [],
  education: '',
  experience: '',
  city: '',
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

  const handleChange = (event) => {
    setAlert("");
    const { name, value } = event.target;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));

  };

  const handleSubmit = async () => {
    try {
      setSearchResults([]);
      const aspirants = await aspirant.filterBySkills(search.requiredSkills.map((sk) => sk.id));
      setSearchResults(aspirants);
      if (aspirants.length === 0) {
        setAlert("No se encontraron aspirantes para esta búsqueda.");
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeSkills = (name, selectedSkills) => {
    setAlert("");
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: selectedSkills,
    }));
  };

  const clearSearch = () => {
    setSearch(INITIAL_SEARCH);
    setSearchResults([]);
    setAlert("");
  };

  useEffect(() => {
    const getSkills = async () => {
      const skills = await skill.getAll();
      setSkills(skills);
    };

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
            label={"Educación"}
            itemsarray={educationLevelChoices.map(education => education.name)}
            value={search.education}
            onChange={handleChange}
            icon={<School />}
            sx={{ backgroundColor: '#E7EDF3' }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            name="experience"
            label="Años de experiencia"
            value={search.experience}
            variant="outlined"
            onChange={handleChange}
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
            name="city"
            label="Ciudad"
            value={search.city}
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
                maxWidth: "720px",
                width: "100%"
              }}
            >
              {alert}</Alert>
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
              description={aspirant.biography}
              experience={aspirant.experience}
              habilitiesArray={aspirant.skills && aspirant.skills.map((skill) => skill.name)}
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