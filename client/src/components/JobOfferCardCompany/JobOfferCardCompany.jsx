/* eslint-disable react/prop-types */
import {
  React,
  useState,
  useEffect,
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
  ListItemText,
  Divider,
  Modal,
  useTheme,
  Paper,
} from '@mui/material';

import {
  styled,
} from '@mui/system';

import parseDateYYYYMMDD from '../../utils/parseDate';
import './JobOfferCard.css';

import AspirantCard from '../AspirantCard';
import { useAPI } from '../../hooks';

const CardContentNoPadding = styled(CardContent)(
  `
  &:last-child{
    padding-bottom: 0px;
  }
  `,
);

const JobOfferCardCompany = ({
  id,
  position,
  company,
  description,
  profilePictureURL,
  date,
  location,
  salary,
  requiredSkills,
  preferredSkills,
  sxCard,
}) => {
  const [expand, setExpand] = useState(true);
  const [expandMsg, setExpandMsg] = useState('Ver más');
  const [interestedAspirants, setInterestedAspirants] = useState([]);
  const api = useAPI();

  const { palette } = useTheme();

  if (!profilePictureURL) {
    profilePictureURL = '#';
  }

  if (salary) {
    salary = `$${salary}`;
  }
  const handleExpand = (state) => {
    setExpand(!expand);
    expand ? setExpandMsg('Ver menos') : setExpandMsg('Ver más');
    return state;
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getInterestedAspirants = async (jobOfferId) => {
    try {
      const response = await api.jobOffer.getInterestedAspirants(jobOfferId);
      setInterestedAspirants(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInterestedAspirants(id);
  }, []);

  return (
    <div className="job-offer-card">
      <Card props sx={sxCard}>
        <CardHeader
          avatar={
            <Avatar alt={company.name} src={profilePictureURL} />
          }
          title={(
            <Link
              sx={{ cursor: 'pointer' }}
              underline="hover"
              variant="h6"
              to={`/profile/company/${company.id}`}
            >
              {company.name}
            </Link>
          )}
          action={(
            <Button onClick={handleOpen}>Aspirantes Interesados</Button>
          )}
          subheader={parseDateYYYYMMDD(date)}
        />

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: palette.gray.B,
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: '60vw',
          }}
          >
            <Typography variant="h3" textAlign="center">Aspirantes Interesados</Typography>
            <Box sx={{ maxHeight: '70vh', overflow: 'auto', px: 2 }}>
              <List>
                {interestedAspirants.map((aspirant) => (
                  <AspirantCard
                    key={`Card${aspirant.names}`}
                    aspirantId={`${aspirant.id}`}
                    aspirantName={`${aspirant.names} ${aspirant.firstLastName}`}
                    title={aspirant.title}
                    education={aspirant.educationLevel}
                    description={aspirant.biography}
                    experience={aspirant.yearsOfExperience}
                    abilitiesArray={aspirant.skills && aspirant.skills.map((skill) => skill.name)}
                    location={`${aspirant.residenceCity}, ${aspirant.residenceState}`}
                    pageURL={aspirant.pageURL}
                  />
                ))}
              </List>
            </Box>
          </Box>
        </Modal>

        <CardContentNoPadding>
          <div className="job-offer-header-info">
            <div>
              <Typography variant="h5" sx={{ placeSelf: 'center start' }}>{position}</Typography>

            </div>
            <div className="job-offer-subheader">
              <Typography variant="h6">{salary}</Typography>
              <Typography variant="h6">{location}</Typography>
            </div>
          </div>

          <Collapse in={!expand} timeout="auto" unmountOnExit>
            <Divider sx={{ mt: 1, background: palette.blue.lightest }} />
            <Box className="job-offer-body-info" sx={{ paddingBottom: '16px' }}>
              <div className="job-offer-abilities">
                <div>
                  <Typography variant="h6">Habilidades requeridas:</Typography>
                  <List sx={{ padding: '0px 0px 8px 0px' }}>
                    {
                      requiredSkills && requiredSkills.map((skill) => (
                        <ListItemText key={skill.name}>
                          -
                          {' '}
                          {skill.name}
                        </ListItemText>
                      ))
                    }
                  </List>
                </div>
                <div>

                  <Typography variant="h6">Habilidades sugeridas:</Typography>
                  <List sx={{ padding: '0px 0px 8px 0px' }}>
                    {
                      preferredSkills && preferredSkills.map((skill) => (
                        <ListItemText key={skill.name}>
                          -
                          {' '}
                          {skill.name}
                        </ListItemText>
                      ))
                    }
                  </List>
                </div>
              </div>

              <div>
                <Typography variant="body">{description}</Typography>
              </div>
            </Box>
          </Collapse>
          <CardActions>
            <Button
              fullWidth
              variant="text"
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

export default JobOfferCardCompany;
