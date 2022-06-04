/* eslint-disable react/prop-types */
import React from 'react';
import {
  useTheme,
  Box,
  Step,
  Stepper,
  StepLabel,
  StepContent,
  Typography,
} from '@mui/material';

const VerticalStepper = ({ steps = [], activeStep = {} }) => {
  const { palette } = useTheme();

  return (
    <Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>
              <Typography variant="body1" color={palette.gray.D}>{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="caption" color={palette.gray.C}>{step.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default VerticalStepper;
