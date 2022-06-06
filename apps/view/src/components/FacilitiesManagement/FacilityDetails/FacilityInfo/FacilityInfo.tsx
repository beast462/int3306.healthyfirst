import Flexbox from '@/view/common/components/Flexbox';
import { NotificationSeverity } from '@/view/common/types/Notification';
import { ApplicationState } from '@/view/store';
import { notify } from '@/view/store/actions/app/notify';
import { changeEditMode } from '@/view/store/actions/facilityDetail/changeEditMode';
import styled from '@emotion/styled';
import { EditRounded, CancelRounded, SaveRounded } from '@mui/icons-material';
import { Button, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { HttpStatus } from '@nestjs/common/enums';
import { ReactElement, SyntheticEvent } from 'react';
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
  { changeEditMode, notify },
);

function FacilityInfo({
  facility,
  editMode,
  changeEditMode,
  notify,
}: ConnectedProps<typeof connector>): ReactElement {
  const styles = useStyles();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    if (+target.provinceCode.value === -1) {
      notify('Thêm không thành công', NotificationSeverity.ERROR, [
        'Vui lòng chọn tỉnh/thành phố',
      ]);
      return;
    }

    if (+target.districtCode.value === -1) {
      notify('Thêm không thành công', NotificationSeverity.ERROR, [
        'Vui lòng chọn quận/huyện',
      ]);
      return;
    }

    if (+target.wardCode.value === -1) {
      notify('Thêm không thành công', NotificationSeverity.ERROR, [
        'Vui lòng chọn phường/xã',
      ]);
      return;
    }

    const updatedFacility = {
      id: facility.id,
      name: target.facilityName.value,
      address: target.address.value,
      ownerName: target.ownerName.value,
      phone: target.phone.value,
      facilityLocationCode: Math.max(
        +target.provinceCode.value,
        +target.districtCode.value,
        +target.wardCode.value,
      ),
      facilityTypeId: +target.facilityType.value,
    };

    const { statusCode, message } = await fetch(
      `/api/facilities/${facility.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(updatedFacility),
      },
    ).then((res) => res.json());

    if (statusCode === HttpStatus.OK) {
      notify('Lưu thành công', NotificationSeverity.SUCCESS);
      changeEditMode(false);
    } else {
      notify('Lưu không thành công', NotificationSeverity.ERROR, message);
    }
  };

  return (
    <Root>
      <form onSubmit={handleSubmit}>
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
