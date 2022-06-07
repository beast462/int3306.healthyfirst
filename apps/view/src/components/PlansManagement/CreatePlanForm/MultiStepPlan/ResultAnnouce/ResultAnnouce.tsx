import DatePicker from '@/view/common/components/DatePicker';
import { ApplicationState } from '@/view/store';
import { setStepData } from '@/view/store/actions/createPlan/setStepData';
import { Grid, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const connector = connect(
  (state: ApplicationState) => ({
    secondStepDate: state.createPlan.secondStepDate,
    thirdStepDate: state.createPlan.thirdStepDate,
  }),
  { setStepData },
);

function ResultAnnouce({
  secondStepDate,
  thirdStepDate,
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
            value={thirdStepDate.startDate}
            setValue={(value) => {
              setStepData({
                step: 'thirdStepDate',
                data: { startDate: value, endDate: value },
              });
            }}
            minDate={secondStepDate.endDate}
            label="Từ ngày"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            value={thirdStepDate.endDate}
            setValue={(value) =>
              setStepData({
                step: 'thirdStepDate',
                data: { startDate: thirdStepDate.startDate, endDate: value },
              })
            }
            minDate={thirdStepDate.startDate}
            label="Đến ngày"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default connector(ResultAnnouce);
