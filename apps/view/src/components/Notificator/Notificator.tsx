import { connect, ConnectedProps } from 'react-redux';

import { ApplicationState } from '@/view/store';
import { Slide } from '@mui/material';

import { SnackbarProvider, useSnackbar } from 'notistack';
import { useEffect } from 'react';
import NotificationItem from './NotificationItem/NotificationItem';
import { Notification } from '@/view/common/types/Notification';

const connector = connect(
  (state: ApplicationState) => ({
    next: state.app.nextNotification,
  }),
  {},
);

function Wrapper() {
  return (
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      TransitionComponent={Slide}
      content={(_, message) => (
        <NotificationItem notification={message as Notification} />
      )}
    >
      <ConnectedNotificator />
    </SnackbarProvider>
  );
}

function Notificator({ next }: ConnectedProps<typeof connector>) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (next === null) return;

    enqueueSnackbar(next, {
      key: next.id,
    });
  }, [next]);

  return null;
}

const ConnectedNotificator = connector(Notificator);

export default Wrapper;
