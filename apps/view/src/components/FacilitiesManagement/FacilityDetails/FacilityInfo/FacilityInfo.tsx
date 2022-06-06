import styled from '@emotion/styled';
import { Divider, Typography } from '@mui/material';
import { ReactElement } from 'react';
import Inputs from './Inputs/Inputs';

interface IProps {
  facilityId?: number;
}

const Root = styled.div`
  width: 100%;
  height: 100%;
`;

function FacilityInfo({ facilityId }: IProps): ReactElement {
  return (
    <Root>
      <form>
        <Inputs />
      </form>
    </Root>
  );
}

export default FacilityInfo;
