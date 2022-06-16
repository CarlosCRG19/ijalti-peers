import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useTheme,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
} from '@mui/material';

import {
  Cake, Work, School, Handyman,
} from '@mui/icons-material';

import useAPI from '../../../hooks/useAPI/useAPI';

const AspirantProfile = () => {
  const [aspirant, setAspirant] = useState({
    biography: '',
    birthDate: '',
    educationLevel: '',
    firstLastName: '',
    id: '',
    names: '',
    nationality: '',
    residenceCity: '',
    residenceCountry: '',
    residenceState: '',
    secondLastName: '',
    skills: [],
    workingStatus: '',
    yearsOfExperience: 0,
  });

  const translateEducation = {
    HIGH_SCHOOL: 'Preparatoria',
    UNIVERSITY: 'Universidad',
    MASTERS: 'Maestría',
    DOCTORATE: 'Doctorado',
  };

  const translateWorkingStatus = {
    EMPLOYED: 'Trabajando',
    UNEMPLOYED: 'Desempleado',
    SEARCHING: 'Buscando oportunidades',
  };

  const api = useAPI();
  const navigate = useNavigate();
  const params = useParams();
  const { palette } = useTheme();

  const getAspirant = async (idAspirant) => {
    try {
      const response = await api.aspirant.getAspirant(idAspirant);
      setAspirant(response.aspirant);
    } catch (error) {
      navigate('/');
    }
  };

  useEffect(() => {
    getAspirant(params.id);
  }, []);

  return (
    <Grid
      container
      component="main"
      display="flex"
      sx={{
        height: '100vh',
        background: palette.white,
        '&:after': {
          content: '""',
          position: 'absolute',
          width: '60vw',
          height: '100vh',
          right: '0',
          background: palette.gray.B,
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          clipPath: 'polygon(70% 0, 100% 0, 100% 100%, 0% 100%)',
        },
      }}
    >
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="start"
        sx={{ zIndex: 1, mt: '8px' }}
      >
        <Card
          sx={{
            width: '90%',
            padding: '32px',
            maxWidth: '1373px',
            overflow: 'auto',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardContent sx={{
            height: 'auto',
            minHeight: '334px',
            display: 'flex',

          }}
          >
            <Grid
              container
              columnSpacing={8}
            >
              <Grid
                item
                xs={12}
                md={3}
                display="flex"
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ zIndex: 1 }}
              >
                <div style={{
                  width: '200px',
                  height: '200px',
                  backgroundColor: 'gray',
                  borderRadius: '100%',

                }}
                />
                <Chip
                  label={translateWorkingStatus[aspirant.workingStatus]}
                  sx={{
                    backgroundColor: palette.green,
                    color: 'white',
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    mt: '16px',
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={5}
                display="flex"
                direction="column"
                alignItems="start"
                justifyContent="center"
                sx={{ zIndex: 1 }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{ fontWeight: 500 }}
                >
                  {aspirant.names}
                  {' '}
                  {aspirant.firstLastName}
                  {' '}
                  {aspirant.secondLastName}
                </Typography>

                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    color: palette.gray.C,
                    mb: '8px',
                  }}
                >
                  {aspirant.username}
                </Typography>

                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    color: palette.gray.C,
                    mb: '8px',
                  }}
                >
                  {aspirant.email}
                </Typography>

                <Typography
                  variant="paragraph"
                  sx={{ color: palette.gray.C, mb: '8px' }}
                >
                  {aspirant.biography}
                </Typography>

                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    color: palette.blue.lightest,
                  }}
                >
                  {aspirant.residenceCity}
                  {', '}
                  {aspirant.residenceState}
                  {', '}
                  {aspirant.residenceCountry}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                display="flex"
                direction="column"
                alignItems="start"
                justifyContent="space-evenly"
                sx={{ zIndex: 1 }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    color: palette.gray.C,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Cake sx={{ mr: '12px' }} />
                  {aspirant.birthDate.slice(0, 10)}
                </Typography>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    color: palette.gray.C,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Work sx={{ mr: '12px' }} />
                  {`${aspirant.yearsOfExperience} año${aspirant.yearsOfExperience > 1 ? 's' : ''} de experiencia laboral`}

                </Typography>

                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    color: palette.gray.C,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <School sx={{ mr: '12px' }} />
                  {translateEducation[aspirant.educationLevel]}
                </Typography>

                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    color: palette.gray.C,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Handyman sx={{ mr: '12px' }} />
                  {aspirant.skills.map((skill) => skill.name).join(', ')}

                </Typography>

              </Grid>
            </Grid>
          </CardContent>

        </Card>
      </Grid>
    </Grid>
  );
};

export default AspirantProfile;
