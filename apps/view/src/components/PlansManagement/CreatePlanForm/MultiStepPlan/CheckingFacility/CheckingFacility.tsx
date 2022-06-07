import DatePicker from '@/view/common/components/DatePicker';
import { ApplicationState } from '@/view/store';
import { setStepData } from '@/view/store/actions/createPlan/setStepData';
import { Grid, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const connector = connect(
  (state: ApplicationState) => ({
    firstStepDate: state.createPlan.firstStepDate,
  }),
  { setStepData },
);

function CheckingFacility({
  firstStepDate,
  setStepData,
}: ConnectedProps<typeof connector>): ReactElement {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Kiểm tra tại cơ sở
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <DatePicker
            value={firstStepDate.startDate}
            setValue={(value) => {
              setStepData({
                step: 'firstStepDate',
                data: { startDate: value, endDate: value },
              });
            }}
            label="Từ ngày"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            value={firstStepDate.endDate}
            setValue={(value) =>
              setStepData({
                step: 'firstStepDate',
                data: { startDate: firstStepDate.startDate, endDate: value },
              })
            }
            minDate={firstStepDate.startDate}
            label="Đến ngày"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default connector(CheckingFacility);
