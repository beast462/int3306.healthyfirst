import { Divider, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

function NotFound(): React.ReactElement {
  const navigate = useNavigate();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ width: '100vw', height: '100vh' }}
    >
      <Grid container alignItems="center" justifyContent="center">
        <Typography variant="h4" fontWeight="bold">
          404
        </Typography>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Divider orientation="vertical" flexItem />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Typography variant="h5">This page could not be found.</Typography>
      </Grid>

      <br />

      <Grid item>
        <Typography
          onClick={() => navigate(-1)}
          color="GrayText"
          component="u"
          style={{ cursor: 'pointer' }}
        >
          Back to previous page.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default NotFound;
