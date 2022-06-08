import React from 'react';
import {
  Grid,
  Box,
  Link,
} from '@mui/material';
import './Navbar.css';

const Navbar = () => (
  <Grid
    container
    component="nav"
    fullWidth
  >
    <Grid
      xs={12}
      item
      fullWidth
      display="flex"
      sx={{ background: 'white' }}
    >
      <Box
        component="img"
        sx={{ zIndex: '1', mx: '12px' }}
        alt="The house from the offer."
        src="https://www.ijalti.org.mx/wp-content/uploads/2019/05/favicon.png"
      />
      <Link href="/" variant="h3" underline="none">IJALTI PEERS</Link>
    </Grid>
  </Grid>
);

export default Navbar;
