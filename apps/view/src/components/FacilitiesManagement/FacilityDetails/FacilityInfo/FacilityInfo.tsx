import Flexbox from '@/view/common/components/Flexbox';
import { ApplicationState } from '@/view/store';
import { changeEditMode } from '@/view/store/actions/facilityDetail/changeEditMode';
import styled from '@emotion/styled';
import { EditRounded, CancelRounded, SaveRounded } from '@mui/icons-material';
import { Button, Divider, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ReactElement, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Inputs from './Inputs/Inputs';

interface IProps {
  facilityId?: number;
}

const Root = styled.div`
  width: 100%;
  height: fit-content;
  overflow-y: auto;
`;

const useStyles = makeStyles(() => ({
  btnGroup: {
    flexDirection: 'row-reverse',
    '& button': {
      borderRadius: '8px',
    },
  },
}));

const connector = connect(
  (state: ApplicationState) => ({
    facility: state.facilityDetail.facility,
    editMode: state.facilityDetail.editMode,
  }),
  { changeEditMode },
);

function FacilityInfo({
  facility,
  editMode,
  changeEditMode,
}: ConnectedProps<typeof connector>): ReactElement {
  const styles = useStyles();

  return (
    <Root>
      <form>
        <Inputs />
        <Divider />

        <Flexbox className={styles.btnGroup}>
          <Button
            variant="contained"
            sx={
              editMode
                ? { display: 'none' }
                : { margin: '1rem 0rem 1rem 0', height: '40px' }
            }
            startIcon={<EditRounded />}
            onClick={() => changeEditMode(true)}
          >
            Chỉnh sửa
          </Button>
          <Button
            variant="outlined"
            sx={
              !editMode
                ? { display: 'none' }
                : { margin: '1rem 0rem 1rem 0', height: '40px' }
            }
            startIcon={<CancelRounded />}
            onClick={() => changeEditMode(false)}
          >
            Huỷ
          </Button>
          <Button
            variant="contained"
            sx={
              !editMode
                ? { display: 'none' }
                : { margin: '1rem 1rem 1rem 0', height: '40px' }
            }
            startIcon={<SaveRounded />}
            type="submit"
          >
            Lưu
          </Button>
        </Flexbox>
      </form>
    </Root>
  );
}

export default connector(FacilityInfo);
