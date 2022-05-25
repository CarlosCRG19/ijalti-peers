import React, { useState } from 'react'

import {
  Button,
  Grid,
  InputAdornment,
  TextField
} from '@mui/material';

import {
  Handyman,
  HandymanOutlined,
  LocationOn,
  School,
  Translate,
} from '@mui/icons-material';

import './AspirantSearch.css'
import Form from '../../components/Form/Form'
import AspirantCard from '../../components/AspirantCard';



const AspirantSearch = () => {

  const [search, setSearch] = useState("");

  const testSkills = ["JavaScript", "Programación orientada a objetos", "C++", "d", "e", "f"]
  const searchResults = [
    {
      aspirantName: "Valeria García",
      title: "Ing. en Tecnologías Computacionales",
      experience: "5",
      description: "Valeria has been looking for a job for the past weeks but she has not found one that matches her interests and aspirations. A colleague [...]",
      habilitiesArray: ["JavaScript", "Programación Orientada Objetos", "Python", "C++"],
      pageURL: ""
    },
    {
      aspirantName: "José Sanchez",
      title: "Lic. en Informática",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non nunc sapien. Nullam odio sapien, gravida ut commodo et, scelerisque quis augue.",
      experience: "0",
      habilitiesArray: ["Java", "C++", "C", "C#"],
      pageURL: ""
    },
    {
      aspirantName: "Carlos Cesar Tocayo",
      title: "Desarrollador de graficas computacionales",
      description: "Nulla placerat, nibh ac sollicitudin pretium, urna lectus placerat tellus, sit amet suscipit lectus sapien sit amet est. Vivamus lobortis, neque quis hendrerit euismod, neque purus interdum torto.",
      experience: "0",
      habilitiesArray: ["Unity", "Unreal Engine", "C++", "C#"],
      pageURL: ""
    },
  ]
  const handleChange = (event) => {
    const { name, value } = event.target;

    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    const formattedSearch = {
      ...search
    };
    console.log(searchResults);
  };

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
            name="requiredAbilities"
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


        <Grid item xs={12}>
          <TextField
            name="suggestedAbilities"
            label="Habilidades Sugeridas"
            variant="filled"
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HandymanOutlined />
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
          <Button variant="text">Limpiar</Button>
          <Button variant="contained" sx={{ margin: '0 0 0 1rem' }} type="submit">Buscar</Button>
        </div>
      </Form>


      <div className='cards'>
        {
          searchResults.map(aspirant => (
            <AspirantCard
              aspirantName={aspirant.aspirantName}
              title={aspirant.title}
              description={aspirant.description}
              experience={aspirant.experience}
              habilitiesArray={aspirant.habilitiesArray}
              pageURL={aspirant.pageURL}
            />
          ))
        }
      </div>

    </main>
  )
}

export default AspirantSearch