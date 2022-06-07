import { useDistricts } from '@/view/hooks/useDistricts';
import { useProvinces } from '@/view/hooks/useProvinces';
import { useResponsibleLocation } from '@/view/hooks/useResponsibleLocation';
import { useRoles } from '@/view/hooks/useRoles';
import { useUser } from '@/view/hooks/useUser';
import { useWards } from '@/view/hooks/useWards';
import styled from '@emotion/styled';
import { Info } from '@mui/icons-material';
import { Paper, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { Navigations } from '../Navigations';

const Root = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.5rem 0.5rem;
  box-sizing: border-box;
`;

const Container = styled(Paper)`
  width: 100%;
  height: 50%;
  padding: 'auto';
  display: flex;
  justify-content: center;
  align-items: center;
`;

function capitalize(str: string | undefined) {
  const strs = str.split(' ');
  return strs
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ');
}

function Overview(): ReactElement {
  const { user } = useUser();
  const { roles } = useRoles();
  const { responsibleLocationCode } = useResponsibleLocation().data ?? {
    responsibleLocation: 0,
  };

  console.log(responsibleLocationCode);
  const currentUserProvince = (useProvinces().provinces ?? []).find(
    (p) => p.code === (responsibleLocationCode & 0xffff),
  );
  const currentUserDistrict = (useDistricts().districts ?? []).find(
    (d) => d.code === (responsibleLocationCode & 0xffffff),
  );
  const currentUserWard = (useWards().wards ?? []).find(
    (w) => w.code === responsibleLocationCode,
  );

  console.log(currentUserProvince, currentUserDistrict, currentUserWard);

  let res = 'Việt Nam';
  if (currentUserProvince)
    res =
      `${capitalize(currentUserProvince.type)} ${capitalize(
        currentUserProvince.name,
      )}` +
      ', ' +
      res;
  if (currentUserDistrict)
    res =
      `${capitalize(currentUserDistrict.type)} ${capitalize(
        currentUserDistrict.name,
      )}` +
      ', ' +
      res;
  if (currentUserWard)
    res =
      `${capitalize(currentUserWard.type)} ${capitalize(
        currentUserWard.name,
      )}` +
      ', ' +
      res;

  return (
    <Root>
      <Container>
        <div style={{ margin: 'auto' }}>
          <Typography variant="h5" textAlign="center">{`Chào mừng ${
            roles ? roles[user?.roleId - 1].description : ''
          } ${user?.displayName} đến với HealthyFirst`}</Typography>

          <Typography
            variant="h6"
            textAlign="center"
          >{`Khu vực quản lý: ${res}`}</Typography>
        </div>
      </Container>
    </Root>
  );
}

Navigations.getInstance().registerNavigation('/overview', {
  icon: <Info />,
  label: 'Overview',
  childOf: null,
})(Overview);
