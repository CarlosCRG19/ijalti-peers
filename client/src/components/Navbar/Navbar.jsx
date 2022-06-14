import React from 'react';
import {
  Grid,
  Box,
  Button,
  Link as MuiLink
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
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
        <Link to="/" style={{textDecoration: "none"}}>
          <MuiLink variant="h3" underline="none">IJALTI PEERS</MuiLink>
        </Link>
        <Button onClick={() => logout()}>Cerrar sesión</Button>
      </Grid>
    </Grid>
  )
};

export default Navbar;
