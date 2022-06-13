import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useTheme,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
} from '@mui/material';

import {
  Email, LocalPhone, Work,
} from '@mui/icons-material';

import { JobOffer } from '../../../components';

import useAPI from '../../../hooks/useAPI/useAPI';

const CompanyProfile = () => {
  const [company, setCompany] = useState({});
  const [jobOffers, setJobOffers] = useState([]);

  const api = useAPI();
  const navigate = useNavigate();
  const params = useParams();
  const { palette } = useTheme();

  const getCompany = async (idcompany) => {
    try {
      const response = await api.company.getCompany(idcompany);
      setCompany(response.company);
    } catch (error) {
      navigate('/error');
    }
  };

  const getJobOffers = async () => {
    try {
      const response = await api.jobOffer.getAll();
      setJobOffers(response);
    } catch (error) {
      navigate('/');
    }
  };

  useEffect(() => {
    getCompany(params.id);
    getJobOffers();
  }, []);

  return (
    <Grid
      container
      component="main"
      display="flex"
      flexDirection="start"
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
        sx={{ zIndex: 1, my: '16px' }}
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
                  {company.name}
                </Typography>

                <Typography
                  variant="h5"
                  component="h2"
                  sx={{
                    color: palette.gray.C,
                    mb: '8px',
                  }}
                >
                  {company.socialReason}
                </Typography>

                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    color: palette.blue.lightest,
                  }}
                >
                  {company.address}
                  {', '}
                  {company.postalCode}
                  {', '}
                  {company.locationCity}
                  {', '}
                  {company.locationState}
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
                  <Work sx={{ mr: '12px' }} />
                  {company.businessLine}
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
                  <LocalPhone sx={{ mr: '12px' }} />
                  {company.phone1}
                  {' | '}
                  {company.phone2}
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
                  <Email sx={{ mr: '12px' }} />
                  {company.contactEmail}
                </Typography>

              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="start"
        sx={{ zIndex: 1, mt: '8px' }}
      >
        <Box sx={{ width: '90%' }}>
          <Grid container columnSpacing={2}>
            <Grid item xs={8}>
              {jobOffers.map((jobOffer) => (
                <JobOffer
                  title={jobOffer.title}
                  city={jobOffer.city}
                  salary={jobOffer.salary}
                  description={jobOffer.description}
                  id={jobOffer.id}
                />
              ))}
            </Grid>
            <Grid item xs={4}>
              <Card
                sx={{ borderRadius: '12px' }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    component="h3"
                  >
                    Misión
                  </Typography>
                  <Typography
                    variant="paragraph"
                  >
                    {company.mision}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ mt: '16px' }}
                  >
                    Visión
                  </Typography>
                  <Typography
                    variant="paragraph"

                  >
                    {company.vision}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CompanyProfile;
