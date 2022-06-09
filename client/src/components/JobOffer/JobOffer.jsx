import React from 'react';

import PropTypes from 'prop-types';

import {
  Card,
  CardContent,
  Typography,
} from '@mui/material';

const JobOffer = ({
  title, city, salary, description,
}) => (
  <Card
    sx={{ borderRadius: '12px', mb: '16px' }}
  >
    <CardContent>
      <Typography variant="h4">
        {title}
      </Typography>
      <Typography variant="body1">
        {city}
      </Typography>
      <Typography variant="body1">
        $
        {salary}
        {' mensuales'}
      </Typography>
      <Typography variant="body1">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default JobOffer;

JobOffer.defaultProps = {
  title: '',
  city: '',
  salary: '',
  description: '',
};

JobOffer.propTypes = {
  title: PropTypes.string,
  city: PropTypes.string,
  salary: PropTypes.string,
  description: PropTypes.string,
};
