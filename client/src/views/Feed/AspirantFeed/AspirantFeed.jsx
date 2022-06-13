import {
  React,
  useState,
  useEffect
} from 'react';

import {
  Box,
  Card,
  CardContent,
  Pagination,
  Typography,
} from '@mui/material';

import './AspirantFeed.css'
import { JobOfferCard } from '../../../components';
import useAPI from '../../../hooks/useAPI/useAPI';



const AspirantFeed = () => {
  const [offers, setOffers] = useState();
  const [companies, setCompanies] = useState();
  const [aspirant, setAspirant] = useState();
  const [page, setPage] = useState(1);
  const api = useAPI();

  const getCompany = async (idcompany) => {
    try {
      const response = await api.company.getCompany(idcompany);
      setCompanies(response.company);
    } catch (error) {
      console.log(error);
    }
  };

  const getJobOffers = async (page) => {
    try {
      const response = await api.jobOffer.getByPage(page);
      setOffers(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAspirant = async (idAspirant) => {
    try {
      const response = await api.aspirant.getAspirant(idAspirant);
      setAspirant(response.aspirant);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    getJobOffers(pageNumber);
    const header = document.getElementById("header");
    header.scrollIntoView({behavior: "smooth"});
  }

  useEffect(() => {
    getJobOffers(page);
    getAspirant(localStorage.idAspirant);
  }, []);


  return (
    <div className='main-feed-content' id="header">
      <Box
        sx={{
          width: "100%",
          maxWidth: "720px"
        }}>
        <Card>
          <CardContent>
            {
              <Typography variant='h4'>
                Bienvenido de vuelta, {aspirant ? aspirant.names : " "}👋.
              </Typography>
            }
            <Typography variant='h5'>Estas son las ofertas más de trabajo más recientes.</Typography>
          </CardContent>
        </Card>
        {
          offers && offers.map((offer) => (
            <JobOfferCard
              key={offer.id}
              position={offer.title}
              company={"Google LLC"}
              profilePictureURL={"https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"}
              description={offer.description}
              date={offer.createdAt}
              location={offer.city}
              salary={offer.salary}
              requiredSkills={offer.requiredSkills}
              preferredSkills={offer.preferredSkills}
            />
          ))
        }

      </Box>
      <Pagination
        count={10}
        onChange={(e) => handlePageChange(e.target.textContent)}
        color="primary"
        sx={{ paddingTop: "32px" }}
      ></Pagination>
    </div>
  );
};


export default AspirantFeed;