import { ReactElement, useState } from 'react';

import Flexbox from '@/view/common/components/Flexbox';

import styled from '@emotion/styled';
import { FoodBankRounded } from '@mui/icons-material';

import { Navigations } from '../Navigations';
import FacilitiesTable from './FacilitiesTable/FacilitiesTable';

const Root = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Content = styled(Flexbox)`
  width: 200%;
  height: 100%;
  overflow: hidden;
  transition: margin 0.2s ease-out;

  &.next {
    margin-left: -100%;
  }
`;

const Segment = styled.div`
  height: 100%;
  width: 50%;
  overflow: hidden;
`;

function FacilitiesManagement(): ReactElement {
  const [viewingSegment, setViewingSegment] = useState(0);

  return (
    <Root>
      <Content className={viewingSegment === 0 ? '' : 'next'}>
        <Segment>
          <FacilitiesTable switchSegment={() => setViewingSegment(1)} />
        </Segment>

        <Segment>
          dasdfjeghfuighrhgewruihgewigherighewriguhewighewughewighru
        </Segment>
      </Content>
    </Root>
  );
}

export default FacilitiesManagement;

Navigations.getInstance().registerNavigation('/facility-management', {
  icon: <FoodBankRounded />,
  label: 'Quản lý cơ sở',
  childOf: null,
})(FacilitiesManagement);
