import { ReactElement, SyntheticEvent } from 'react';

import { swrHookKeys } from '@/view/common/constants/swrHookKeys';
import { ISegmentProps } from '@/view/common/interfaces/Segment';
import styled from '@emotion/styled';
import { ArrowRight, MultipleStop } from '@mui/icons-material';
import {
  Button,
  Divider,
  Paper,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useSWRConfig } from 'swr';
import { makeStyles } from '@mui/styles';
import MultipleStepPlan from './MultiStepPlan/MultipleStepPlan';
import { connect, ConnectedProps } from 'react-redux';
import { notify } from '@/view/store/actions/app/notify';
import { NotificationSeverity } from '@/view/common/types/Notification';
import { HttpStatus } from '@nestjs/common/enums';

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 0.5rem;
`;

const Container = styled(Paper)`
  width: 100%;
  height: fit-content;
`;

const useStyles = makeStyles(() => ({
  form: {
    textAlign: 'center',
    margin: '1rem 0 1rem 0',
  },
}));

const connector = connect(() => ({}), { notify });

function CreatePlanForm({
  switchSegment,
  notify,
}: ISegmentProps & ConnectedProps<typeof connector>): ReactElement {
  const { mutate } = useSWRConfig();
  const styles = useStyles();

  const handleCheck = async (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    if (
      target.facilityId.value === '' ||
      typeof +target.facilityId.value !== 'number' ||
      +target.facilityId.value <= 0
    ) {
      notify('ID cơ sở không hợp lệ', NotificationSeverity.ERROR);
      return;
    }

    const { statusCode, message, body } = await fetch(
      `/api/checking-plan/facilityid/${+target.facilityId.value}`,
    ).then((res) => res.json());

    if (statusCode === HttpStatus.OK) {
      if (body.length > 0) {
        notify(
          'Cơ sở này đang có lịch hẹn, vui lòng chọn cơ sở khác',
          NotificationSeverity.ERROR,
        );
      } else {
        notify(
          'Bạn có thể tạo kế hoạch kiểm tra',
          NotificationSeverity.SUCCESS,
        );
      }
    } else {
      notify('Có lỗi xảy ra', NotificationSeverity.ERROR, message);
    }
  };

  return (
    <Root>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Tạo kế hoạch mới</Typography>

          <Button
            size="small"
            endIcon={<ArrowRight />}
            onClick={() => {
              switchSegment();
              mutate(swrHookKeys.USE_CHECKING_PLANS);
            }}
          >
            quay lại danh sách
          </Button>
        </Toolbar>

        <Divider />
        <div style={{ margin: '1rem 0', minHeight: '72px' }}>
          <form onSubmit={handleCheck} className={styles.form}>
            <TextField
              label="Nhập ID cơ sở"
              name="facilityId"
              size="medium"
              variant="outlined"
            />
            <Button
              variant="contained"
              sx={{ height: '56px', marginLeft: '1rem' }}
              type="submit"
            >
              Kiểm tra
            </Button>
          </form>
        </div>
        <MultipleStepPlan />
      </Container>
    </Root>
  );
}

export default connector(CreatePlanForm);
