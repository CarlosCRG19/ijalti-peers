import {
  React,
  useState,
} from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Link,
  Typography,
  Box,
  List,
  ListItemText
} from '@mui/material';

import {
  styled,
} from '@mui/system';

import parseDateYYYYMMDD from '../../utils/parseDate';
import './JobOfferCard.css'

const CardContentNoPadding = styled(CardContent)(
  `
  &:last-child{
    padding-bottom: 0px;
  }
  `
);

const JobOfferCard = ({
  position,
  company,
  description,
  profilePictureURL,
  date,
  location,
  salary,
  requiredSkills,
  preferredSkills,
}) => {
  const [expand, setExpand] = useState(true);
  const [expandMsg, setExpandMsg] = useState('Ver más');

  const navigate = useNavigate();
  if (!profilePictureURL) {
    profilePictureURL = "#"
  }

  if (salary) {
    salary = "$" + salary
  }
  const handleExpand = (state) => {
    setExpand(!expand);
    expand ? setExpandMsg("Ver menos") : setExpandMsg("Ver más");
    return state;
  }

  return (
    <div className='job-offer-card'>
      <Card>
        <CardHeader
          avatar={
            <Avatar alt={company.name} src={profilePictureURL} />
          }
          title={
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              variant='h6'
              onClick={() => navigate(`/profile/company/${company.id}`)}
            >
              {company.name}
            </Link>
          }
          subheader={parseDateYYYYMMDD(date)}
        >
        </CardHeader>
        <CardContentNoPadding>
          <div className='job-offer-header-info'>
            <div>
              <Typography variant='h5' sx={{ placeSelf: "center start" }}>{position}</Typography>

            </div>
            <div className='job-offer-subheader'>
              <Typography variant='h6'>{salary}</Typography>
              <Typography variant='h6'>{location}</Typography>
            </div>
          </div>



          <Collapse in={!expand} timeout="auto" unmountOnExit>
            <Box className="job-offer-body-info" sx={{ paddingBottom: "16px" }}>
              <div className='job-offer-abilities'>
                <div>
                  <Typography variant='h6'>Habilidades requeridas:</Typography>
                  <List sx={{ padding: "0px 0px 8px 0px" }}>
                    {
                      requiredSkills && requiredSkills.map((skill) => (
                        <ListItemText key={skill.name}>- {skill.name}</ListItemText>
                      ))
                    }
                  </List>
                </div>
                <div>

                  <Typography variant='h6'>Habilidades sugeridas:</Typography>
                  <List sx={{ padding: "0px 0px 8px 0px" }}>
                    {
                      preferredSkills && preferredSkills.map((skill) => (
                        <ListItemText key={skill.name}>- {skill.name}</ListItemText>
                      ))
                    }
                  </List>
                </div>
              </div>

              <div>
                <Typography variant='body'>{description}</Typography>
              </div>
            </Box>
          </Collapse>
          <CardActions>
            <Button
              fullWidth
              variant='text'
              onClick={handleExpand}
            >
              {expandMsg}
            </Button>
          </CardActions>
        </CardContentNoPadding>
      </Card>
    </div>
  );
};

export default JobOfferCard;