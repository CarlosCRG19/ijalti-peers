import React from 'react';
import {
  useTheme,
  Box,
  Grid,
  Typography,
} from '@mui/material';

import './Form.css';

const Form = (props) => {
  const {
    title,
    description,
    onSubmit,
    children,
    extraClass
  } = props;

  const { palette } = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(event);
  };

  return (
    <form className={"form" + extraClass} onSubmit={handleSubmit}>
      <Box
        display="flex"
        width="100%"
        padding="24px 0"
        alignItems="center"
        justifyContent="center"
        borderRadius="10px 10px 0 0"
        backgroundColor={palette.gray.A}
      >
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          fontWeight="medium"
          color={palette.blue.dark}
        >
          {title}
        </Typography>
      </Box>

      <Typography
        variant="body1"
        width="100%"
        fontStyle="italic"
        fontWeight="light"
        sx={{ p: '32px', pb: 0 }}
      >
        {description}
      </Typography>

      <Grid container spacing={3} padding="32px">
        {children}
      </Grid>
    </form>
  );
};

export default Form;
