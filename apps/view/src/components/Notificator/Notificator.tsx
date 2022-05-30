import { connect, ConnectedProps } from 'react-redux';

import { bySeconds } from '@/common/helpers/timespan';
import { ApplicationState } from '@/view/store';
import { hideNotification } from '@/view/store/actions/app/hideNotification';
import { ArrowDropDownRounded, Close } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  IconButton,
  Slide,
  SlideProps,
  Snackbar,
  Typography,
} from '@mui/material';
import styled from '@emotion/styled';

function Transition(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

const NoPaddingAccordion = styled(Accordion)`
  &,
  & * {
    padding: 0 !important;
    background-color: transparent;
    color: inherit !important;
    box-shadow: none;
    height: auto;
    min-height: 0px !important;
    margin: 0 !important;
  }
`;

const connector = connect(
  (state: ApplicationState) => ({
    open: state.app.notification.open,
    severity: state.app.notification.severity,
    message: state.app.notification.message,
    details: state.app.notification.details,
  }),
  {
    hideNotification,
  },
);

function Notificator({
  open,
  severity,
  message,
  details,
  hideNotification,
}: ConnectedProps<typeof connector>) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={open}
      autoHideDuration={bySeconds(2)}
      onClose={hideNotification}
      TransitionComponent={Transition}
    >
      <Alert
        variant="filled"
        severity={severity}
        action={
          <IconButton size="small" onClick={hideNotification}>
            <Close fontSize="inherit" />
          </IconButton>
        }
      >
        <Typography>{message}</Typography>

        {details.length > 0 && (
          <NoPaddingAccordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownRounded color="inherit" />}
            >
              <Typography variant="body2">Chi tiết</Typography>
            </AccordionSummary>

            <AccordionDetails>
              {details.map((detail, index) => (
                <Typography key={`detail#${index}`} variant="caption">
                  {detail}
                </Typography>
              ))}
            </AccordionDetails>
          </NoPaddingAccordion>
        )}
      </Alert>
    </Snackbar>
  );
}

export default connector(Notificator);
