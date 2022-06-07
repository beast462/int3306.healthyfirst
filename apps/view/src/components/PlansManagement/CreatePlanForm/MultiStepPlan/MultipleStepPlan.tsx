import { ReactElement, useEffect, useState } from 'react';

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
import { connect, ConnectedProps } from 'react-redux';
import { notify } from '@/view/store/actions/app/notify';
import { ApplicationState } from '@/view/store';
import { HttpStatus } from '@nestjs/common/enums';
import { useUser } from '@/view/hooks/useUser';

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

const connector = connect(
  (state: ApplicationState) => ({
    facilityId: state.createPlan.facilityId,
    canCreate: state.createPlan.canCreate,
    firstStepDate: state.createPlan.firstStepDate,
    secondStepDate: state.createPlan.secondStepDate,
    thirdStepDate: state.createPlan.thirdStepDate,
  }),
  { notify },
);

function MultipleStepPlan({
  facilityId,
  canCreate,
  firstStepDate,
  secondStepDate,
  thirdStepDate,
  notify,
}: ConnectedProps<typeof connector>): ReactElement {
  const [activeStep, setActiveStep] = useState(0);
  const steps = (usePurposes().purposes ?? []).map((purpose) => purpose?.name);
  const { id } = useUser().user ?? { id: 0 };

  const handleNext = async () => {
    setActiveStep(activeStep + 1);
    if (activeStep + 1 === steps.length) {
      const planStartDate = firstStepDate.startDate.toISOString().slice(0, 10);
      const planEndDate = thirdStepDate.endDate.toISOString().slice(0, 10);

      const { statusCode, message, body } = await fetch(`/api/checking-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          facilityId: facilityId,
          createdAt: planStartDate,
          checkedAt: planEndDate,
        }),
      }).then((res) => res.json());

      if (statusCode === HttpStatus.OK) {
        for (let i = 1; i < 4; ++i) {
          const timeSent =
            i === 1
              ? firstStepDate.startDate
              : i === 2
              ? secondStepDate.startDate
              : thirdStepDate.startDate;

          const timeEnd =
            i === 1
              ? firstStepDate.endDate
              : i === 2
              ? secondStepDate.endDate
              : thirdStepDate.endDate;

          const activity = {
            checkingPlanId: body.id,
            createdAt: timeSent.toISOString().slice(0, 10),
            checkedAt: timeEnd.toISOString().slice(0, 10),
            inspectorId: id,
            inspectionActivityId: i,
            passed: 0,
          };

          const { statusCode } = await fetch(`/api/checking-activity`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(activity),
          }).then((res) => res.json());

          console.log(statusCode);
        }
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={
        canCreate
          ? { mb: 4, minHeight: '400px', display: 'flex' }
          : { display: 'none' }
      }
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

export default connector(MultipleStepPlan);
