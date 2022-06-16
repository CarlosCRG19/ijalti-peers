import React from 'react';

import {
  Card,
  CardActionArea,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import {
  LocationOn,
} from '@mui/icons-material';

import './AspirantCard.css';
import { useNavigate } from 'react-router-dom';

const educationLevelChoices = [
  { name: 'Preparatoria', id: 'HIGH_SCHOOL' },
  { name: 'Universidad', id: 'UNIVERSITY' },
  { name: 'Maestría', id: 'MASTERS' },
  { name: 'Doctorado', id: 'DOCTORATE' },
];

const AspirantCard = ({
  aspirantId, aspirantName, education, description, experience, abilitiesArray, location,
}) => {
  const navigate = useNavigate();
  // Limit to n habilities
  if (!abilitiesArray) {
    abilitiesArray = ['Hubo un error al cargar las habilidades de este aspirante'];
  } else {
    const maxHabilities = 3;
    abilitiesArray = abilitiesArray.slice(0, maxHabilities);
  }

  // Handle years of experience
  let experienceMessage = `${experience} años de experiencia`;
  if (experience == 1) {
    experienceMessage = `${experience} año de experiencia`;
  } else if (experience === 0 || experience == '0') {
    experienceMessage = 'Primera oportunidad de trabajo';
  }

  // Convert experience from id to name
  const convertEducation = () => {
    for (let i = 0; i < educationLevelChoices.length; i++) {
      if (educationLevelChoices[i].id == education) {
        return educationLevelChoices[i].name;
      }
    }
  };

  return (
    <CardActionArea
      sx={{ marginTop: '32px' }}
      onClick={() => window.open(`/profile/aspirant/${aspirantId}`, '_blank')}
    >
      <Card className="card" elevation={3}>
        <div>
          <CardContent>
            <Typography
              color="text.secondary"
              variant="subtitle1"
            >
              {convertEducation()}
            </Typography>
            <Typography variant="h5">
              {aspirantName}
            </Typography>
            <Typography
              color="text.secondary"
              variant="caption"
              display="block"
              sx={{ paddingBottom: '12px' }}
            >
              {experienceMessage}
            </Typography>
            <Typography variant="body">
              {description}
            </Typography>
          </CardContent>
        </div>

        <div>
          <List
            sx={{ paddingBottom: '0px' }}
          >
            {
              abilitiesArray.map((item) => (
                <ListItem
                  key={item}
                  sx={{ paddingBottom: '0px' }}
                >
                  <ListItemText secondary={item} />
                </ListItem>
              ))
            }
            <ListItem>
              <ListItemIcon>
                <LocationOn />
                <ListItemText primary={location} />
              </ListItemIcon>
            </ListItem>
          </List>

        </div>
      </Card>
    </CardActionArea>
  );
};

export default AspirantCard;
