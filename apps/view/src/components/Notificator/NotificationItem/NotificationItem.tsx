import { useSnackbar } from 'notistack';
import { forwardRef } from 'react';

import { Notification } from '@/view/common/types/Notification';
import styled from '@emotion/styled';
import { ArrowDropDownRounded, Close } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  IconButton,
  Typography,
} from '@mui/material';

interface IProps {
  notification: Notification;
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

const NotificationItem = forwardRef<HTMLDivElement, IProps>(
  ({ notification: { id, severity, message, details } }, ref) => {
    const { closeSnackbar } = useSnackbar();

    return (
      <Alert
        ref={ref}
        variant="filled"
        severity={severity}
        action={
          <IconButton size="small" onClick={() => closeSnackbar(id)}>
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
                <Typography
                  component="div"
                  key={`detail#${index}`}
                  variant="caption"
                >
                  {detail}
                </Typography>
              ))}
            </AccordionDetails>
          </NoPaddingAccordion>
        )}
      </Alert>
    );
  },
);

export default NotificationItem;
