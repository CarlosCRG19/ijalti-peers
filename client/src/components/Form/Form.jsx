import React from 'react';
import { Grid } from '@mui/material';

import './Form.css';

const Form = ({
  title, description, onSubmit, children,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(event);
  };

  const checkKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  return (
    <form className="form" onSubmit={handleSubmit} onKeyDown={(e) => checkKeyDown(e)}>
      <h2 className="form-title">{title}</h2>
      <p className="form-description">{description}</p>
      <Grid container spacing={3} sx={{ padding: '32px' }}>
        {children}
      </Grid>
    </form>
  );
};

export default Form;
