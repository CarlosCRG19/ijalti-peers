import {
  React,
  useState,
  useEffect
} from 'react';

import {
  Typography,
} from '@mui/material';

import './AspirantFeed.css'
import { JobOffer, JobOfferCard } from '../../../components';
import { Box } from '@mui/system';

import useAPI from '../../../hooks/useAPI/useAPI';
const AspirantFeed = () => {
  const [offers, setOffers] = useState();
  const [companies, setCompanies] = useState();
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
      console.log(response[0]);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getJobOffers(1);
  }, []);


  return (
    <div className='main-feed-content'>
      <Box
        sx={{
          width: "100%",
          maxWidth: "720px"
        }}>

        <JobOfferCard
          position={"Diseñador Gráfico"}
          company={"Amazon"}
          profilePictureURL={""}
          description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mauris nunc, gravida sit amet porttitor ac, eleifend consectetur risus. Proin luctus justo lectus, nec dapibus nunc interdum vel. Quisque volutpat diam ut ullamcorper iaculis. Aenean vestibulum lectus quis dapibus maximus. Nulla pharetra feugiat libero sed feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla lorem, lobortis sed enim non, maximus commodo elit."}
          date={"2022-06-10"}
        />


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
    </div>
  );
};


export default AspirantFeed;