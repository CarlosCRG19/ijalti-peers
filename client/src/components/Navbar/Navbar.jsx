import React, { useState } from 'react';
import {
  Grid,
  Box,
  Button,
  Link as MuiLink,
  Typography,
  Menu,
  MenuItem,
  Fade,
} from '@mui/material';

import { Search } from '@mui/icons-material';

import { useNavigate, Link } from 'react-router-dom';

import CompanySearchbar from '../CompanySearchbar';

import { useAuth } from '../../contexts/auth';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid
      container
      component="nav"
      fullWidth
      spacing={0}
      sx={{ background: 'white', py: 1 }}
    >
      <Grid
        xs={2}
        lg={4}
        item
        display="flex"
      >
        <Box
          component="img"
          sx={{ zIndex: '1', mx: 2, cursor: 'pointer' }}
          alt="The house from the offer."
          src="https://www.ijalti.org.mx/wp-content/uploads/2019/05/favicon.png"
          onClick={() => navigate('/')}
        />

        <Link to="/" style={{ textDecoration: 'none' }}>
          <MuiLink variant="h3" underline="none" display={{ xs: 'none', lg: 'flex' }}>IJALTI PEERS</MuiLink>
        </Link>
      </Grid>
      {/* <Grid
        xs={1}
        sm={2}
        display={{ md: 'none' }}
      /> */}
      <Grid
        xs={8}
        lg={4}
        item
        display="flex"
      >
        {user.role === 'company'
          ? (
            <Button onClick={() => navigate('/aspirant-search')}>
              <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                <Search />
                Busca aspirantes
              </Typography>
            </Button>
          )
          : <CompanySearchbar />}
      </Grid>
      <Grid
        xs={1}
        lg={3}
      />
      <Grid
        xs={1}
        item
        display="flex"
        justifyContent="end"
      >
        <Button
          sx={{ justifySelf: 'end' }}
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Box sx={{
            width: '100%', height: '100%', background: 'gray', borderRadius: '100%',
          }}
          />
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {user.role === 'aspirant' && <MenuItem onClick={() => navigate(`profile/aspirant/${user.userId}`)}>Mi perfil</MenuItem>}
          <MenuItem onClick={() => logout()} sx={{ justifySelf: 'end' }}>Cerrar sesión</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default Navbar;
