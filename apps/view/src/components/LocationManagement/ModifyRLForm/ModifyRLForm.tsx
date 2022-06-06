import { ReactElement, SyntheticEvent, useState } from 'react';

import Flexbox from '@/view/common/components/Flexbox';
import { ApplicationState } from '@/view/store';
import styled from '@emotion/styled';
import {
  ArrowLeft,
  CancelRounded,
  EditRounded,
  SaveRounded,
} from '@mui/icons-material';
import { Button, Divider, Paper, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { connect, ConnectedProps } from 'react-redux';
import { ISegmentProps } from '../../AccountManagement';
import LocationSelector from '../../AccountManagement/RegistrationForm/Inputs/LocationSelector/LocationSelector';
import { useProvinces } from '@/view/hooks/useProvinces';
import { useDistricts } from '@/view/hooks/useDistricts';
import { HttpStatus } from '@nestjs/common/enums';
import { notify } from '@/view/store/actions/app/notify';
import { NotificationSeverity } from '@/view/common/types/Notification';
import { useSWRConfig } from 'swr';
import { swrHookKeys } from '@/view/common/constants/swrHookKeys';

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 0.5rem;
  box-sizing: border-box;
`;

const Container = styled(Paper)`
  width: 100%;
  height: 100%;
`;
const Row = styled(Flexbox)`
  padding: 1rem 2rem 0.5rem 2rem;
  flex-wrap: wrap;
  -ms-flex-wrap: wrap;
`;

const connector = connect(
  (state: ApplicationState) => ({
    userId: state.locationManager.userId,
    roleId: state.locationManager.roleId,
    responsibleLocation: state.locationManager.responsibleLocationCode,
  }),
  { notify },
);

const useStyles = makeStyles(() => ({
  btnGroup: {
    flexDirection: 'row-reverse',
    '& button': {
      borderRadius: '8px',
    },
  },
}));

function ModifyRLForm({
  userId,
  roleId,
  responsibleLocation,
  switchSegment,
  notify,
}: ISegmentProps & ConnectedProps<typeof connector>): ReactElement {
  const { mutate } = useSWRConfig();
  const styles = useStyles();
  const [editMode, setEditMode] = useState(false);

  const province = (useProvinces().provinces ?? []).find(
    (p) => p.code === (responsibleLocation & 0xffff),
  );
  const district = (useDistricts().districts ?? []).find(
    (d) => d.code === (responsibleLocation & 0xffffff),
  );

  const handleSaveClick = async (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const modifiedSpecialist = {
      userId: userId,
      responsibleLocationCode: Math.max(
        target.provinceCode.value,
        target.districtCode.value,
      ),
    };

    const { statusCode } = await fetch(
      `/api/responsible-area/userid/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(modifiedSpecialist),
      },
    ).then((res) => res.json());

    if (statusCode === HttpStatus.OK) {
      notify('Phân vùng thành công', NotificationSeverity.SUCCESS);
      setEditMode(false);
      mutate(swrHookKeys.USE_MANAGED_SPECIALISTS);
    } else {
      notify('Phân vùng không thành công', NotificationSeverity.ERROR, [
        'Mất kết nối',
      ]);
    }
  };

  return (
    <Root>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Button
            size="small"
            startIcon={<ArrowLeft />}
            onClick={() => {
              setEditMode(false);
              switchSegment();
            }}
          >
            quay lại danh sách
          </Button>

          <Typography variant="h6">Phân vùng quản lý</Typography>
        </Toolbar>
        <form onSubmit={handleSaveClick}>
          <Row>
            <LocationSelector
              disabled={!editMode}
              userId={userId}
              selectedRoleId={roleId}
              province={province}
              district={district}
            />
          </Row>
          <Divider />
          <Flexbox className={styles.btnGroup}>
            <Button
              variant="contained"
              sx={
                editMode
                  ? { display: 'none' }
                  : { margin: '1rem 2rem 1rem 0', height: '40px' }
              }
              startIcon={<EditRounded />}
              onClick={() => setEditMode(true)}
            >
              Chỉnh sửa
            </Button>
            <Button
              variant="outlined"
              sx={
                !editMode
                  ? { display: 'none' }
                  : { margin: '1rem 2rem 1rem 0', height: '40px' }
              }
              startIcon={<CancelRounded />}
              onClick={() => setEditMode(false)}
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
      </Container>
    </Root>
  );
}

export default connector(ModifyRLForm);
