import React from 'react'

import {
  Card,
  CardActionArea,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';

import {
  LocationOn
} from '@mui/icons-material'

import './AspirantCard.css';

const AspirantCard = ({
  aspirantName, title, description, experience, habilitiesArray, location, pageURL
}) => {

  //Limit to n habilities
  if (!habilitiesArray) {
    habilitiesArray = ["Hubo un error al cargar las habilidades de este aspirante"]
  } else {
    const maxHabilities = 3;
    habilitiesArray = habilitiesArray.slice(0, maxHabilities);
  }

  //Handle years of experience
  let experienceMessage = `${experience} años de experiencia`
  if (!experience) {
    experienceMessage = ""
  } else if (experience === 0 || experience == "0") {
    experienceMessage = "Primera oportunidad de trabajo"
  }

  return (
    <CardActionArea sx={{ marginTop: "32px" }}>
      <Card className='card' elevation={3}>
        <div>
          <CardContent>
            <Typography
              color="text.secondary"
              variant='subtitle1'
            >
              {title}
            </Typography>
            <Typography variant="h5" >
              {aspirantName}
            </Typography>
            <Typography
              color="text.secondary"
              variant="caption"
              display="block"
              sx={{ paddingBottom: "12px" }}
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
            sx={{ paddingBottom: "0px" }}
          >
            {
              habilitiesArray.map(item => (
                <ListItem
                  key={item}
                  sx={{ paddingBottom: "0px" }}>
                  <ListItemText secondary={item} />
                </ListItem>
              ))
            }
            <ListItem >
              <ListItemIcon><LocationOn />
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


