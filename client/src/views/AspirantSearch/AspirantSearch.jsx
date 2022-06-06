import React, { useState } from 'react'

import {
  Button,
  Grid,
  InputAdornment,
  TextField
} from '@mui/material';

import {
  Handyman,
  LocationOn,
  School,
  Translate,
} from '@mui/icons-material';

import './AspirantSearch.css'
import Form from '../../components/Form/Form'
import AspirantCard from '../../components/AspirantCard';
import SelectCity from '../../components/SelectCity';

const exampleSearchResults = [
  {
    aspirantName: "Valeria García",
    title: "Ing. en Tecnologías Computacionales",
    experience: "5",
    description: "Valeria has been looking for a job for the past weeks but she has not found one that matches her interests and aspirations. A colleague [...]",
    habilitiesArray: ["JavaScript", "Programación Orientada Objetos", "Python", "C++"],
    location: "Guadajara",
    pageURL: ""
  },
  {
    aspirantName: "José Sanchez",
    title: "Lic. en Informática",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nunc sapien. Nullam odio sapien, gravida ut commodo et, scelerisque quis augue.",
    experience: "0",
    habilitiesArray: ["Java", "C++", "C", "C#"],
    location: "Zapopan",
    pageURL: ""
  },
  {
    aspirantName: "Carlos Cesar Tocayo",
    title: "Desarrollador de graficas computacionales",
    description: "Nulla placerat, nibh ac sollicitudin pretium, urna lectus placerat tellus, sit amet suscipit lectus sapien sit amet est. Vivamus lobortis, neque quis hendrerit euismod, neque purus interdum torto.",
    experience: "0",
    habilitiesArray: ["Unity", "Unreal Engine", "C++", "C#"],
    location: "Zapopan",
    pageURL: ""
  },
]

const INITIAL_SEARCH = {
  requiredSkills: '',
  education: '',
  languages: '',
  loation: ''
};

const AspirantSearch = () => {

  const [search, setSearch] = useState(INITIAL_SEARCH);

  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
  };
  

  const handleSearch = async () => {
    console.log(search);
    setSearchResults(exampleSearchResults);
  };

  const clean = () => {
    //setSearchResults(INITIAL_SEARCH);
    console.log("clear");
  }

  return (
    <main className='main-content-overwrite'>

      <Form
        title="Buscar aspirantes"
        description="Completa al menos uno de los campos para realizar una búsqueda"
        extraClass="form-overwrite"
        onSubmit={handleSearch}
      >

        <Grid item xs={12}>
          <TextField
            name="requiredSkills"
            label="Habilidades requeridas"
            variant="filled"
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Handyman />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            name="education"
            label="Educación"
            variant="filled"
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <School />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            name="languages"
            label="Idiomas"
            variant="filled"
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Translate />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name="city"
            label="Ubicación"
            variant="filled"
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <div className="buttons">
          <Button variant="text" onClick={() => setSearch(INITIAL_SEARCH)}>Limpiar</Button>
          <Button variant="contained" sx={{ margin: '0 0 0 1rem' }} type="submit">Buscar</Button>
        </div>
      </Form>


      <div className='cards'>
        {
          searchResults.map(aspirant => (
            <AspirantCard
              key={"Card" + aspirant.aspirantName}
              aspirantName={aspirant.aspirantName}
              title={aspirant.title}
              description={aspirant.description}
              experience={aspirant.experience}
              habilitiesArray={aspirant.habilitiesArray}
              location={aspirant.location}
              pageURL={aspirant.pageURL}
            />
          ))
        }
      </div>

    </main>
  )
}

export default AspirantSearch