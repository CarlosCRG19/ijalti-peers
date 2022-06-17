import React, { useState } from 'react';
import {
  useTheme, MenuItem, Button, Grid, Typography, Box, List, Paper, Collapse,
} from '@mui/material';
import {
  Form,
  DatePicker,
  SelectWithLabel,
  TagsInputWithLabel,
  TextFieldWithLabel,
  WorkExperienceSignup,
} from '..';

const INITIAL_WORK_EXPERIENCE = {
  title: '', at: '', startDate: null, endDate: null,
};

const AddWorkExperience = ({ onSubmit }) => {
  const [workExperience, setWorkExperience] = useState(INITIAL_WORK_EXPERIENCE);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setWorkExperience((prevWorkExperience) => ({
      ...prevWorkExperience,
      [name]: value,
    }
    ));
  };

  return (
    <Grid container spacing={3} padding="16px">

      <Button
        variant="contained"
        sx={{ height: '48px', width: '1373px' }}
        onClick={handleExpandClick}
      >
        {!expanded ? 'Agrega una experiencia' : 'Cancelar'}

      </Button>
      <Collapse
        in={expanded}
        timeout="auto"
        unmountOnExit
        sx={{ width: '100%' }}
      >
        <Grid container spacing={3}>

          <Grid item xs={6}>
            <TextFieldWithLabel
              size="regular"
              label="Posición"
              id="title"
              name="title"
              variant="filled"
              placeholder="Selecciona una posición"
              value={workExperience.title}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={2}>
            <Box display="flex" justifyContent="center" alignItems="end" sx={{ width: '100%', height: '100%' }}>
              <Button
                variant="contained"
                sx={{
                  height: '60px', width: '60px', borderRadius: '50%', fontSize: '24px',
                }}
                onClick={() => onSubmit(workExperience)}
                disabled={!Object.values({ ...workExperience, endDate: true }).every((value) => value)}
              >
                +
              </Button>
            </Box>
          </Grid>
        </Grid>

      </Collapse>
    </Grid>

  );
};

export default AddWorkExperience;
