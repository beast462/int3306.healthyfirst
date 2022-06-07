import DatePicker from '@/view/common/components/DatePicker';
import { ApplicationState } from '@/view/store';
import { setStepData } from '@/view/store/actions/createPlan/setStepData';
import { Grid, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const connector = connect(
  (state: ApplicationState) => ({
    firstStepDate: state.createPlan.firstStepDate,
    secondStepDate: state.createPlan.secondStepDate,
  }),
  { setStepData },
);

function CheckingFS({
  firstStepDate,
  secondStepDate,
  setStepData,
}: ConnectedProps<typeof connector>): ReactElement {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Lấy mẫu và giám định
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <DatePicker
            value={secondStepDate.startDate}
            setValue={(value) => {
              setStepData({
                step: 'secondStepDate',
                data: { startDate: value, endDate: value },
              });
            }}
            minDate={firstStepDate.endDate}
            label="Từ ngày"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            value={secondStepDate.endDate}
            setValue={(value) =>
              setStepData({
                step: 'secondStepDate',
                data: { startDate: secondStepDate.startDate, endDate: value },
              })
            }
            minDate={secondStepDate.startDate}
            label="Đến ngày"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default connector(CheckingFS);
