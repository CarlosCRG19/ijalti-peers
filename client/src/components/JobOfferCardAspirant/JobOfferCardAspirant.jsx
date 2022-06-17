import {
  React,
  useState,
  useEffect,
} from 'react';

import { useNavigate, Link } from 'react-router-dom';

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Typography,
  Box,
  List,
  ListItemText,
  useTheme,
} from '@mui/material';

import {
  CheckBox, CheckBoxOutlineBlank,
} from '@mui/icons-material';

import {
  styled,
} from '@mui/system';

import parseDateYYYYMMDD from '../../utils/parseDate';
import './JobOfferCard.css';
import { useAPI } from '../../hooks';
import { useAuth } from '../../contexts/auth';

const CardContentNoPadding = styled(CardContent)(
  `
  &:last-child{
    padding-bottom: 0px;
  }
  `,
);

const JobOfferCardAspirant = ({
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
  isInterested,
  onSuccess,
  sxCard,
}) => {
  const [expand, setExpand] = useState(true);
  const [expandMsg, setExpandMsg] = useState('Ver más');
  const [profilePicture, setProfilePicture] = useState();
  const { palette } = useTheme();
  const api = useAPI();
  const { user } = useAuth();

  if (!profilePictureURL) {
    profilePictureURL = '#';
  }

  if (salary) {
    salary = `$${salary}`;
  }

  const getCompany = async (idCompany) => {
    try {
      const response = await api.company.getById(idCompany);
      setProfilePicture(response.company.profilePicture);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleExpand = (state) => {
    setExpand(!expand);
    expand ? setExpandMsg('Ver menos') : setExpandMsg('Ver más');
    return state;
  };

  const handleInterest = async (currentInterested) => {
    try {
      if (currentInterested) {
        await api.aspirant.setUninterested(user.userId, id);
      } else {
        await api.aspirant.setInterested(user.userId, id);
      }
      onSuccess();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getCompany(company.id);
  }, []);

  return (
    <div className="job-offer-card">
      <Card props sx={sxCard}>
        <CardHeader
          avatar={
            <Avatar alt={company.name} src={profilePicture} />
          }
          title={(
            <Link
              style={{ textDecoration: 'none', fontSize: 20 }}
              variant="h6"
              to={`/profile/company/${company.id}`}
            >
              {company.name}
            </Link>
          )}
          action={(
            <Typography
              color={palette.blue.regular}
              sx={{ display: 'flex', cursor: 'pointer' }}
              onClick={() => handleInterest(isInterested)}
            >
              {isInterested ? (
                <>
                  <CheckBox />
                  Interesado
                </>
              ) : (
                <>
                  <CheckBoxOutlineBlank />
                  Interesado
                </>
              )}

            </Typography>
          )}
          subheader={parseDateYYYYMMDD(date)}
        />
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

export default JobOfferCardAspirant;
