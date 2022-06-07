import { ReactElement, SyntheticEvent } from 'react';

import { swrHookKeys } from '@/view/common/constants/swrHookKeys';
import { ISegmentProps } from '@/view/common/interfaces/Segment';
import styled from '@emotion/styled';
import { ArrowRight } from '@mui/icons-material';
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

function CreatePlanForm({ switchSegment }: ISegmentProps): ReactElement {
  const { mutate } = useSWRConfig();
  const styles = useStyles();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
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
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField
              label="Nhập ID cơ sở"
              name="facilityId"
              size="medium"
              variant="outlined"
            />
            <Button
              variant="contained"
              sx={{ height: '56px', marginLeft: '1rem' }}
            >
              Tạo kế hoạch
            </Button>
          </form>
        </div>
      </Container>
    </Root>
  );
}

export default CreatePlanForm;
