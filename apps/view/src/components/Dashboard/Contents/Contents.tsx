import { ReactElement, useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import styled from '@emotion/styled';

import { Navigations } from '../../Navigations';

const Root = styled.div`
  flex: 1;
  height: 100%;
  padding: 0.5rem 0.75rem;
  overflow: hidden;
  background-color: #f4f4f4;
`;

function Contents(): ReactElement {
  const navigations = useMemo(() => {
    const allMenu = Navigations.getInstance().getAllNavigations();

    return allMenu;
  }, []);

  return (
    <Root>
      <Routes>
        <Route path="/" element={<Navigate to={navigations[0][0]} />} />

        {navigations.map(([path, { element: Element }]) => (
          <Route
            key={`route.contents@${path}`}
            path={path}
            element={<Element />}
          />
        ))}
      </Routes>
    </Root>
  );
}

export default Contents;
