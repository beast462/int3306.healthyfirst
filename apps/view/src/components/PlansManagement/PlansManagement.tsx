import { ReactElement, useState } from 'react';
import { Assignment } from '@mui/icons-material';
import { Navigations } from '../Navigations';
import Flexbox from '@/view/common/components/Flexbox';
import styled from '@emotion/styled';
import PlansTable from './PlansTable/PlansTable';
import CreatePlanForm from './CreatePlanForm/CreatePlanForm';

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

function PlanManagement(): ReactElement {
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
          <CreatePlanForm switchSegment={() => setViewingSegment(1)} />
        </Segment>

        <Segment>
          <PlansTable switchSegment={(segId) => setViewingSegment(segId)} />
        </Segment>
      </Content>
    </Root>
  );
}

export default PlanManagement;

Navigations.getInstance().registerNavigation('/plan-management', {
  icon: <Assignment />,
  label: 'Quản lý kế hoạch thanh kiểm tra',
  childOf: null,
})(PlanManagement);
