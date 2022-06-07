import { ReactElement, useState } from 'react';

import {
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
} from '@mui/material';
import CheckingFacility from './CheckingFacility/CheckingFacility';
import CheckingFS from './CheckingFS/CheckingFS';
import ResultAnnouce from './ResultAnnouce/ResultAnnouce';
import { usePurposes } from '@/view/hooks/usePurposes';

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <CheckingFacility />;
    case 1:
      return <CheckingFS />;
    case 2:
      return <ResultAnnouce />;
    default:
      throw new Error('Unknown step');
  }
}

function MultipleStepPlan(): ReactElement {
  const [activeStep, setActiveStep] = useState(0);
  const steps = (usePurposes().purposes ?? []).map((purpose) => purpose?.name);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{ mb: 4, minHeight: '400px' }}
    >
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}
      >
        <Typography variant="h5" align="center">
          Kế hoạch kiểm tra
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Quay lại
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1
                    ? 'Tạo kế hoạch'
                    : 'Tiếp tục'}
                </Button>
              </Box>
            </>
          )}
        </>
      </Paper>
    </Container>
  );
}

export default MultipleStepPlan;
