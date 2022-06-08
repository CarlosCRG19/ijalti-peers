import React from 'react';
import {
  useTheme, Grid, Box, Button, ButtonGroup,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();

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
        // justifyContent="center"
        alignItems="center"
      >
        <Box
          component="img"
          sx={{ zIndex: '1' }}
          alt="The house from the offer."
          src="https://cdn.shopify.com/s/files/1/0557/6910/4582/files/4-IJALTI.png"
        />
      </Grid>
      <Grid
        item
        xs={7}
        sx={{ zIndex: '1' }}
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <ButtonGroup variant="contained">
          <Button onClick={() => navigate('/login')}>Login</Button>
          <Button onClick={() => navigate('/signup')}>Signup</Button>
          <Button onClick={() => navigate('/post-job-offer')}>Post job offer</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
