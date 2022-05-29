import { connect, ConnectedProps } from 'react-redux';

import { ApplicationState } from '@/view/store';
import { openDialog } from '@/view/store/actions/app/openDialog';
import styled from '@emotion/styled';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import { DialogContents } from '../../DialogContents';

const BoldButton = styled(Button)`
  font-weight: bold;
`;

const connector = connect(
  (state: ApplicationState) => ({
    callback: state.app.confirmCallback,
  }),
  {
    openDialog,
  },
);

function Confirm({ callback, openDialog }: ConnectedProps<typeof connector>) {
  const handleClick = (accepted) => {
    openDialog(DialogContents.NONE);
    callback(accepted);
  };

  return (
    <>
      <DialogTitle>Xác nhận</DialogTitle>

      <DialogContent>
        <Typography>
          Bạn có chắc chắn muốn tiếp tục, hành động này không thể quay lại được.
        </Typography>
      </DialogContent>

      <DialogActions>
        <BoldButton onClick={handleClick.bind(null, true)}>đồng ý</BoldButton>

        <BoldButton variant="contained" onClick={handleClick.bind(null, false)}>
          huỷ bỏ
        </BoldButton>
      </DialogActions>
    </>
  );
}

export default connector(Confirm);
