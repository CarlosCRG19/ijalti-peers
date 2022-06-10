import React from 'react';

import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from '@mui/material';

const JobOfferCard = () => {
  return (
    <div className='card'>
      <CardActionArea>
        <Card className='card' elevation={3}>
          <CardContent>
            <Typography
              color="text.secondary"
              variant='subtitle1'
            >
              {"A"}
            </Typography>
            <Typography variant="h5">
              {"B"}
            </Typography>
            <Typography
              color="text.secondary"
              variant="caption"
              display="block"
              sx={{ paddingBottom: "12px" }}
            >
              {"C"}
            </Typography>
            <Typography variant="body">
              {"D"}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </div >
  );
};

export default JobOfferCard;