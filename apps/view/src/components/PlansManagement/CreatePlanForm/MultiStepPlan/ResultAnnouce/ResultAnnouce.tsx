import DatePicker from '@/view/common/components/DatePicker';
import { Grid, Typography } from '@mui/material';
import { ReactElement, useState } from 'react';

function ResultAnnouce(): ReactElement {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Thông báo kết quả
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <DatePicker
            value={start}
            setValue={(value) => {
              setStart(value);
              setEnd(value);
            }}
            label="Từ ngày"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            value={end}
            setValue={setEnd}
            minDate={start}
            label="Đến ngày"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default ResultAnnouce;
