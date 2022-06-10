import React from 'react';

import {
  Typography,
} from '@mui/material';

import './AspirantFeed.css'
import { JobOfferCard } from '../../../components';
import { Box } from '@mui/system';
const AspirantFeed = () => {
  return (
    <div className='main-feed-content'>
      <Box
        sx={{
          width: "100%",
          maxWidth: "720px"
        }}>
        <JobOfferCard
          position={"Desarrollador frontend"}
          company={"Google LLC"}
          profilePictureURL={"https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"}
          description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mauris nunc, gravida sit amet porttitor ac, eleifend consectetur risus. Proin luctus justo lectus, nec dapibus nunc interdum vel. Quisque volutpat diam ut ullamcorper iaculis. Aenean vestibulum lectus quis dapibus maximus. Nulla pharetra feugiat libero sed feugiat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla lorem, lobortis sed enim non, maximus commodo elit."}
        />
        <JobOfferCard
          position={"Diseñador Gráfico"}
          company={"Adobe"}
          description={"Proin luctus tempor magna, nec finibus justo egestas sed. Aenean iaculis arcu turpis, eget ultricies ligula condimentum et. Nulla ex nulla, fermentum posuere arcu nec, vulputate sollicitudin dui. Aenean a luctus velit. Ut gravida tortor mollis, tristique risus eleifend, congue augue. Nulla rhoncus gravida augue, eu sollicitudin massa consectetur non. Suspendisse sed quam vitae nibh euismod consectetur."}
        />
        <JobOfferCard
          position={"Baquetón"}
          company={"Engibeers"}
          description={"No description provided."}
        />
      </Box>
    </div>
  );
};


export default AspirantFeed;