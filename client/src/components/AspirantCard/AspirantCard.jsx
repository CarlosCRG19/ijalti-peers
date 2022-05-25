import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import './AspirantCard.css';

const AspirantCard = ({
  aspirantName, title, description, experience, habilitiesArray, pageURL
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
            sx={{paddingBottom: "12px"}}
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
        </List>
        <CardActions className='button'>
          <Button size="small">Ver aspirante</Button>
        </CardActions>
      </div>
    </Card>
  );
};


export default AspirantCard;


