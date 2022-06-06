import { ReactElement, useState } from 'react';

import Flexbox from '@/view/common/components/Flexbox';

import styled from '@emotion/styled';
import { FoodBankRounded } from '@mui/icons-material';

import { Navigations } from '../Navigations';
import FacilitiesTable from './FacilitiesTable/FacilitiesTable';
import FacilityDetails from './FacilityDetails/FacilityDetails';
import AddFacilityForm from './AddFacilityForm/AddFacilityForm';

const Root = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Content = styled(Flexbox)`
  width: 300%;
  height: 100%;
  overflow: hidden;
  transition: margin 0.2s ease-out;

  &.next {
    margin-left: -100%;
  }

  &.third {
    margin-left: -200%;
  }
`;

const Segment = styled.div`
  height: 100%;
  width: calc(100% / 3);
  overflow: hidden;
`;

function FacilitiesManagement(): ReactElement {
  const [viewingSegment, setViewingSegment] = useState(0);

  console.log(viewingSegment);

  return (
    <Root>
      <Content
        className={
          viewingSegment === 0 ? '' : viewingSegment === 1 ? 'next' : 'third'
        }
      >
        <Segment>
          <FacilitiesTable
            switchSegment={(segId) => setViewingSegment(segId)}
          />
        </Segment>

        <Segment>
          <FacilityDetails switchSegment={() => setViewingSegment(0)} />
        </Segment>

        <Segment>
          <AddFacilityForm switchSegment={() => setViewingSegment(0)} />
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
