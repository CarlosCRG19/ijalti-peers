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
  Pagination,
} from '@mui/material';

import {
  Email, LocalPhone, Work,
} from '@mui/icons-material';

import { JobOfferCardAspirant, JobOfferCardCompany } from '../../../components';

import useAPI from '../../../hooks/useAPI/useAPI';
import './CompanyProfile.css';
import { useAuth } from '../../../contexts/auth';

const CompanyProfile = () => {
  const [company, setCompany] = useState({});
  const [jobOffers, setJobOffers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState();

  const api = useAPI();
  const navigate = useNavigate();
  const params = useParams();
  const { palette } = useTheme();

  const { user } = useAuth();

  const getCompany = async (idcompany) => {
    try {
      const response = await api.company.getById(idcompany);
      setCompany(response.company);
    } catch (error) {
      navigate('/');
    }
  };

  const getJobOffers = async (companyID, currentPage) => {
    try {
      const response = await api.jobOffer.getByCompanyID(companyID, currentPage);
      setJobOffers(response.offers);
    } catch (error) {
      navigate('/');
    }
  };

  const handleDeleteJobOffer = async (id) => {
    if (!confirm('¿Eliminar esta oferta de trabajo?')) return;

    try {
      const response = await api.jobOffer.delete(id);
      getJobOffers(params.id, page);
    } catch (error) {
      navigate('/')
    }
  };

  const getPageCount = async (companyID, page) => {
    const response = await api.jobOffer.getByCompanyID(companyID, page);
    setPageCount(Math.ceil(response.totalCount / 10));
  };

  const handlePageChange = (e, value) => {
    setPage(value);
    getJobOffers(company.id, value);
    const target = document.getElementById("scroll-target");
    target.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    getCompany(params.id);
    getJobOffers(params.id, page);
    getPageCount(params.id, page);
  }, []);

  return (
    <Grid
      container
      component="main"
      display="flex"
      flexDirection="start"
      sx={{ marginBottom: '64px' }}
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
                display="flex"
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ zIndex: 1 }}
              >
                {company.profilePicture ?
                  <img
                    src={company.profilePicture}
                    style={{
                      width: '200px',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '100%'
                    }} />
                  :
                  <div style={{
                    width: '200px',
                    height: '200px',
                    backgroundColor: 'gray',
                    borderRadius: '100%',
                  }}
                  />
                }
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
        container
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="start"
        sx={{ zIndex: 1, mt: '8px' }}
      >
        <Box className="company-job-offers">
          <Grid container columnSpacing={2} className="company-job-offers-child" display="flex">

            <Grid container item md={8} xs={12} order={{ xs: 2, md: 1 }}>
              {user.userId === params.id && (
                <Button
                  id="scroll-target"
                  onClick={() => navigate('/post-job-offer')}
                  variant="contained"
                  fullWidth
                  sx={{ height: '48px', mb: '32px' }}
                >
                  NUEVA OFERTA +

                </Button>
              )}
              {user.userId === params.id ? jobOffers && jobOffers.map((offer) => (
                <JobOfferCardCompany
                  key={offer.id}
                  id={offer.id}
                  position={offer.title}
                  company={offer.company}
                  description={offer.description}
                  date={offer.createdAt}
                  location={offer.city}
                  salary={offer.salary}
                  requiredSkills={offer.requiredSkills}
                  preferredSkills={offer.preferredSkills}
                  interestedAspirants={offer.interestedAspirants}
                  profilePictureURL={company.profilePicture}
                  sxCard={{ boxShadow: '4', borderRadius: '12px' }}
                  onDelete={handleDeleteJobOffer}
                />
              )) : jobOffers && jobOffers.map((offer) => (
                <JobOfferCardAspirant
                  key={offer.id}
                  id={offer.id}
                  position={offer.title}
                  company={offer.company}
                  description={offer.description}
                  date={offer.createdAt}
                  location={offer.city}
                  salary={offer.salary}
                  requiredSkills={offer.requiredSkills}
                  preferredSkills={offer.preferredSkills}
                  onSuccess={() => getJobOffers(params.id, page)}
                  isInterested={offer.interested}
                  sxCard={{ boxShadow: '4', borderRadius: '12px' }}
                />
              ))}

              <div style={{ display: 'grid', placeItems: 'center', width: '100%' }}>
                <Pagination
                  count={pageCount}
                  onChange={handlePageChange}
                  color="primary"
                  sx={{ paddingTop: '32px' }}
                />
              </div>
            </Grid>

            <Grid item md={4} xs={12} order={{ xs: 1 }}>
              <Card
                sx={{ borderRadius: '12px', marginBottom: '32px' }}
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
