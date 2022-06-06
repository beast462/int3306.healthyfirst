import { ReactElement, useState } from 'react';

import Flexbox from '@/view/common/components/Flexbox';

import styled from '@emotion/styled';
import { FoodBankRounded } from '@mui/icons-material';

import { Navigations } from '../Navigations';
import FacilitiesTable from './FacilitiesTable/FacilitiesTable';
import FacilityDetails from './FacilityDetails/FacilityDetails';
import AddFacilityForm from './AddFacilityForm/AddFacilityForm';
import CertificateManagement from './CertificateManagement/CertificateManagement';

const Root = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Content = styled(Flexbox)`
  width: 400%;
  height: 100%;
  overflow: hidden;
  transition: margin 0.2s ease-out;

  &.first {
    margin-left: -100%;
  }

  &.third {
    margin-left: -200%;
  }

  &.fourth {
    margin-left: -300%;
  }
`;

const Segment = styled.div`
  height: 100%;
  width: calc(100% / 4);
  overflow: hidden;
`;

function FacilitiesManagement(): ReactElement {
  const [viewingSegment, setViewingSegment] = useState(1);

  return (
    <Root>
      <Content
        className={
          viewingSegment === 0
            ? ''
            : viewingSegment === 1
            ? 'first'
            : viewingSegment === 2
            ? 'third'
            : 'fourth'
        }
      >
        <Segment>
          <AddFacilityForm switchSegment={() => setViewingSegment(1)} />
        </Segment>

        <Segment>
          <FacilitiesTable
            switchSegment={(segId) => setViewingSegment(segId)}
          />
        </Segment>

        <Segment>
          <FacilityDetails
            switchSegment={(segId) => setViewingSegment(segId)}
          />
        </Segment>

        <Segment>
          <CertificateManagement switchSegment={() => setViewingSegment(2)} />
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
