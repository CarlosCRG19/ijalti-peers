import React, { useState, useMemo } from 'react';
import { useTheme, Grid } from '@mui/material';
import { useLocation, Navigate } from 'react-router-dom';

import { isEmptyObject } from '../../../utils';
import { VerticalStepper } from '../../../components';
import { AspirantSignupProvider } from '../../../contexts/aspirant-signup';
import steps from './steps';

const AspirantSignup = () => {
  const { palette } = useTheme();
  const { state } = useLocation();

  if (!state || isEmptyObject(state)) {
    return <Navigate to="/signup" />;
  }

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = useMemo(() => steps[currentStepIndex], [currentStepIndex]);

  const goToNextStep = () => setCurrentStepIndex(currentStepIndex + 1);
  const goToPreviousStep = () => setCurrentStepIndex(currentStepIndex - 1);

  return (
    <AspirantSignupProvider email={state.email} password={state.password}>
      <Grid
        container
        component="main"
        overflowY="scroll"
        sx={{ background: palette.gray.B }}
      >
        <Grid item xs={3} display="flex" justifyContent="center" mt={6}>
          <VerticalStepper steps={steps} activeStep={currentStepIndex} />
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="center" my={6}>
          <currentStep.Component onPrevious={goToPreviousStep} onNext={goToNextStep} />
        </Grid>
      </Grid>
    </AspirantSignupProvider>
  );
};

export default AspirantSignup;
