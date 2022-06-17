import React from 'react';

import {
  useTheme, Card, CardContent, Typography, Box, Button,
} from '@mui/material';

const WorkExperienceProfile = ({
  title, at, startDate, endDate, id, onDelete, canDelete,
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

  console.log(startDate);

  return (

    <Card
      sx={{
        width: '90%',
        padding: '32px',
        maxWidth: '1373px',
        overflow: 'auto',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        mb: '32px',
      }}
    >
      <CardContent>
        <Typography variant="h4" sx={{ color: palette.gray.D }}>
          {title}
        </Typography>
        <Box display="flex" sx={{ mt: '16px' }}>
          <Typography variant="body1" sx={{ color: palette.blue.regular }}>
            {at}
            &nbsp;
          </Typography>
          <Typography variant="body1">
            {'| '}
            {monthConverter[parseInt(startDate.slice(5, 7) - 1, 10)]}
            {' de '}
            {startDate.slice(0, 4)}
            {' - '}
            { !endDate && 'Presente'}
            {' '}
            {endDate && monthConverter[parseInt(endDate.slice(5, 7) - 1, 10)]}
            {endDate && ' de '}
            {endDate && endDate.slice(0, 4)}
          </Typography>
        </Box>
        {canDelete && (
        <Box display="flex" justifyContent="end">
          <Button variant="text" onClick={() => onDelete(id)}>Eliminar</Button>
        </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkExperienceProfile;
