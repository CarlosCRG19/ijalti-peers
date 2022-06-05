import {
  Grid,
  useTheme,
} from '@mui/material';
import React, { useState, useMemo } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { VerticalStepper } from '../../../components';
import { isEmptyObject } from '../../../utils';
import { CompanySignupProvider } from '../../../contexts/company-signup';
import steps from './steps';

const CompanySignup = () => {
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
    <CompanySignupProvider email={state.email} password={state.password}>
      <Grid
        container
        component="main"
        overflowY="scroll"
        sx={{ background: palette.gray.B, height: '100vh' }}
      >
        <Grid item xs={3} display="flex" justifyContent="center" mt="48px">
          <VerticalStepper steps={steps} activeStep={currentStepIndex} />
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="center" my="48px">
          <currentStep.Component onPrevious={goToPreviousStep} onNext={goToNextStep} />
        </Grid>
      </Grid>
    </CompanySignupProvider>
  );
};

export default CompanySignup;
