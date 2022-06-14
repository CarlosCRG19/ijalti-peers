import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useTheme,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  Button,
} from '@mui/material';

import {
  Email, LocalPhone, Work,
} from '@mui/icons-material';

import { JobOfferCard } from '../../../components';


import useAPI from '../../../hooks/useAPI/useAPI';
import './CompanyProfile.css'

const CompanyProfile = () => {
  const [company, setCompany] = useState({});
  const [jobOffers, setJobOffers] = useState([]);

  const api = useAPI();
  const navigate = useNavigate();
  const params = useParams();
  const { palette } = useTheme();

  const getCompany = async (idcompany) => {
    try {
      const response = await api.company.getById(idcompany);
      setCompany(response.company);
    } catch (error) {
      navigate('/');
    }
  };

  const getJobOffers = async () => {
    try {
      const response = await api.jobOffer.getByPage(1);
      setJobOffers(response.offers);
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
      component='main'
      display='flex'
      flexDirection='start'
      sx={{ marginBottom: '64px' }}
    >
      <Grid
        item
        xs={12}
        display='flex'
        justifyContent='center'
        alignItems='start'
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
            boxShadow: '6',
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
                display='flex'
                direction='column'
                alignItems='center'
                justifyContent='center'
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
                display='flex'
                direction='column'
                alignItems='start'
                justifyContent='center'
                sx={{ zIndex: 1 }}
              >
                <Typography
                  variant='h4'
                  component='h1'
                  sx={{ fontWeight: 500 }}
                >
                  {company.name}
                </Typography>

                <Typography
                  variant='h5'
                  component='h2'
                  sx={{
                    color: palette.gray.C,
                    mb: '8px',
                  }}
                >
                  {company.socialReason}
                </Typography>

                <Typography
                  variant='h6'
                  component='h2'
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
                display='flex'
                direction='column'
                alignItems='start'
                justifyContent='space-evenly'
                sx={{ zIndex: 1 }}
              >
                <Typography
                  variant='h6'
                  component='h3'
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
                  variant='h6'
                  component='h3'
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
                  variant='h6'
                  component='h3'
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
        container
        xs={12}
        display='flex'
        justifyContent='center'
        alignItems='start'
        sx={{ zIndex: 1, mt: '8px' }}
      >
        <Box className='company-job-offers'>
          <Grid container columnSpacing={2} className='company-job-offers-child' display='flex'>

            <Grid item md={8} xs={12} order={{ xs: 2, md: 1 }}>
              <Button
                onClick={() => navigate('/post-job-offer')}
                variant='contained'
                fullWidth
                sx={{ height: '48px' }}
              >NUEVA OFERTA +</Button>
              {jobOffers && jobOffers.map((offer) => (
                <JobOfferCard
                  key={offer.id}
                  position={offer.title}
                  company={offer.company}
                  description={offer.description}
                  date={offer.createdAt}
                  location={offer.city}
                  salary={offer.salary}
                  requiredSkills={offer.requiredSkills}
                  preferredSkills={offer.preferredSkills}
                  sxCard={{ boxShadow: '4', borderRadius: '12px' }}
                />
              ))}
            </Grid>

            <Grid item md={4} xs={12} order={{ xs: 1 }}>
              <Card
                sx={{ borderRadius: '12px', marginBottom: '32px' }}
              >
                <CardContent>
                  <Typography
                    variant='h6'
                    component='h3'
                  >
                    Misión
                  </Typography>
                  <Typography
                    variant='paragraph'
                  >
                    {company.mision}
                  </Typography>
                  <Typography
                    variant='h6'
                    component='h3'
                    sx={{ mt: '16px' }}
                  >
                    Visión
                  </Typography>
                  <Typography
                    variant='paragraph'
                  >
                    {company.vision}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Grid >
    </Grid >
  );
};

export default CompanyProfile;
