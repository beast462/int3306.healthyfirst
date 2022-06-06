import { ReactElement, SyntheticEvent } from 'react';
import styled from '@emotion/styled';
import { Button, Divider, Paper, Toolbar, Typography } from '@mui/material';
import { ISegmentProps } from '../../AccountManagement';
import { connect, ConnectedProps } from 'react-redux';
import { notify } from '@/view/store/actions/app/notify';
import { ArrowLeft } from '@mui/icons-material';
import Inputs from './Inputs/Inputs';
import Flexbox from '@/view/common/components/Flexbox';

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
