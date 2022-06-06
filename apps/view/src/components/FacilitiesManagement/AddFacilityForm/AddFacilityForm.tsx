import { ReactElement, SyntheticEvent } from 'react';
import styled from '@emotion/styled';
import { Button, Divider, Paper, Toolbar, Typography } from '@mui/material';
import { ISegmentProps } from '../../AccountManagement';
import { connect, ConnectedProps } from 'react-redux';
import { notify } from '@/view/store/actions/app/notify';
import { ArrowLeft } from '@mui/icons-material';
import Inputs from './Inputs/Inputs';
import Flexbox from '@/view/common/components/Flexbox';
import { NotificationSeverity } from '@/view/common/types/Notification';
import { HttpStatus } from '@nestjs/common/enums';

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 0.5rem;
`;

const Container = styled(Paper)`
  width: 100%;
`;

const BtnContainer = styled(Flexbox)`
  justify-content: flex-end;
  padding: 1rem 2rem;
`;

const connector = connect(() => ({}), { notify });

function AddFacilityForm({
  switchSegment,
  notify,
}: ISegmentProps & ConnectedProps<typeof connector>): ReactElement {
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

    const newFacility = {
      name: target.facilityName.value,
      ownerName: target.ownerName.value,
      facilityTypeId: target.facilityType.value,
      facilityLocationCode: Math.max(
        +target.provinceCode.value,
        +target.districtCode.value,
        +target.wardCode.value,
      ),
      address: target.address.value,
      phone: target.phone.value,
    };

    const { statusCode, message } = await fetch('/api/facilities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newFacility),
    }).then((res) => res.json());

    if (statusCode === HttpStatus.OK) {
      notify('Thêm thành công', NotificationSeverity.SUCCESS);
      target.facilityName.value = '';
      target.ownerName.value = '';
      target.address.value = '';
      target.phone.value = '';
    } else {
      notify('Thêm không thành công', NotificationSeverity.ERROR, message);
    }
  };

  return (
    <Root>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button
            size="small"
            startIcon={<ArrowLeft />}
            onClick={switchSegment}
          >
            quay lại danh sách
          </Button>

          <Typography variant="h6">Thêm cơ sở mới</Typography>
        </Toolbar>

        <form onSubmit={handleSubmit}>
          <Inputs />

          <br />

          <Divider />

          <BtnContainer>
            <Button variant="contained" size="small" type="submit">
              Thêm cơ sở
            </Button>
          </BtnContainer>
        </form>
      </Container>
    </Root>
  );
}

export default connector(AddFacilityForm);
