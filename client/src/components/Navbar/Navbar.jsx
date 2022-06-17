import React, { useState, useEffect } from 'react';
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

import { useNavigate, Link, useParams } from 'react-router-dom';

import CompanySearchbar from '../CompanySearchbar';

import { useAuth } from '../../contexts/auth';
import './Navbar.css';
import { useAPI } from '../../hooks';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const api = useAPI();
  const params = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userInfo, setUserInfo] = useState();

  const getAspirant = async (idAspirant) => {
    try {
      const response = await api.aspirant.getAspirant(idAspirant);
      setUserInfo(response.aspirant);
    } catch (error) {
      console.log(error);
      navigate('/');
    }
  };

  const getCompany = async (idCompany) => {
    try {
      const response = await api.company.getById(idCompany);
      setUserInfo(response.company);
    } catch (error) {
      console.log(error);
      navigate('/');
    }
  };

  const getUserInfo = async () => {
    if (user.role === "company") {
      await getCompany(user.userId);
    } else if (user.role === "aspirant") {
      await getAspirant(user.userId);
    }
  }

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    getUserInfo();
  }, [])


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
          { userInfo && userInfo.profilePicture ?
            <img
              src={userInfo.profilePicture}
              style={{
                width: '50px', height: '50px', borderRadius: '100%', objectFit: 'cover'
              }} />
            :
            <Box
              sx={{
                width: '50px', height: '50px', background: 'gray', borderRadius: '100%',
              }}
            />
            }
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
          <MenuItem onClick={() => navigate(`profile/aspirant/${user.userId}`)}>Mi perfil</MenuItem>
          <MenuItem onClick={() => logout()} sx={{ justifySelf: 'end' }}>Cerrar sesión</MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default Navbar;
