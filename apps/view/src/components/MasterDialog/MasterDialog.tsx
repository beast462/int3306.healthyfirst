import { ApplicationState } from '@/view/store';
import { openDialog } from '@/view/store/actions/app/openDialog';
import { Dialog } from '@mui/material';
import { connect, ConnectedProps } from 'react-redux';
import Components, { DialogContents } from './DialogContents';

const connector = connect(
  (state: ApplicationState) => ({
    contentIndex: state.app.dialogContent,
  }),
  { openDialog },
);

function MasterDialog({
  contentIndex,
  openDialog,
}: ConnectedProps<typeof connector>) {
  const Component = Components[contentIndex];

  return (
    <Dialog
      open={contentIndex !== DialogContents.NONE}
      onClose={() => openDialog(DialogContents.NONE)}
    >
      {Component && <Component />}
    </Dialog>
  );
}

export default connector(MasterDialog);
