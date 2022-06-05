import { ReactElement } from 'react';
import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import { ISegmentProps } from '../../AccountManagement';
import { connect, ConnectedProps } from 'react-redux';
import { notify } from '@/view/store/actions/app/notify';

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
`;

const Container = styled(Paper)`
  width: 100%;
`;

const connector = connect(() => ({}), { notify });

function AddFacilityForm({
  switchSegment,
  notify,
}: ISegmentProps & ConnectedProps<typeof connector>): ReactElement {
  return (
    <Root>
      <Container></Container>
    </Root>
  );
}

export default connector(AddFacilityForm);
