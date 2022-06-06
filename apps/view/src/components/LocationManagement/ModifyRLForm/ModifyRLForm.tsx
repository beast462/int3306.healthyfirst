import { ReactElement, useState } from 'react';

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
  {},
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
}: ISegmentProps & ConnectedProps<typeof connector>): ReactElement {
  const styles = useStyles();
  const [editMode, setEditMode] = useState(false);

  const province = useProvinces().provinces.find(
    (p) => p.code === (responsibleLocation & 0xffff),
  );
  const district = useDistricts().districts.find(
    (d) => d.code === (responsibleLocation & 0xffffff),
  );

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
          >
            Lưu
          </Button>
        </Flexbox>
      </Container>
    </Root>
  );
}

export default connector(ModifyRLForm);
