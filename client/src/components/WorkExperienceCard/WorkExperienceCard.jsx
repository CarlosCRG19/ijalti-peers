import React from 'react';

import {
  useTheme, Card, CardContent, Typography, Box, Button,
} from '@mui/material';

const WorkExperienceCard = ({
  title, company, startDate, endDate, id, onDelete,
}) => {
  const { palette } = useTheme();

  const monthConverter = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre',
  };

  return (
    <Card
      sx={{ m: '16px', borderRadius: '4px' }}
    >
      <CardContent>
        <Typography variant="h4" sx={{ color: palette.gray.D }}>
          {title}
        </Typography>
        <Box display="flex" sx={{ mt: '16px' }}>
          <Typography variant="body1" sx={{ color: palette.orange }}>
            {company}
            &nbsp;
          </Typography>
          <Typography variant="body1">
            {'| '}
            {monthConverter[startDate.getMonth()]}
            {' de '}
            {startDate.getFullYear()}
            {' - '}
            {' '}
            {monthConverter[endDate.getMonth()]}
            {' de '}
            {endDate.getFullYear()}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="end">
          <Button variant="text" onClick={() => onDelete(id)}>Eliminar</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WorkExperienceCard;
