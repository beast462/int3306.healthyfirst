import { Specialist } from '@/common/models/specialist';
import NowrapCell from '@/view/common/components/NowrapCell';
import { useDistricts } from '@/view/hooks/useDistricts';
import { useProvinces } from '@/view/hooks/useProvinces';
import { useRoles } from '@/view/hooks/useRoles';
import { useWards } from '@/view/hooks/useWards';
import { TableRow } from '@mui/material';

interface IProps {
  specialist: Specialist;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function stringifyLocation(locationCode: number) {
  const { provinces } = useProvinces();
  const { districts } = useDistricts();
  const { wards } = useWards();

  const province = provinces.find((p) => p.code === (locationCode & 0xff));
  const district = districts.find((d) => d.code === (locationCode & 0xffff));
  const ward = wards.find((w) => w.code === (locationCode & 0xffffff));

  return `${capitalize(ward.type)} ${ward?.name}, ${capitalize(
    district.type,
  )} ${district?.name}, ${capitalize(province.type)} ${province?.name}`;
}

function AccountItem({ specialist }: IProps) {
  const { roles } = useRoles();

  return (
    <TableRow>
      <NowrapCell>{specialist.id}</NowrapCell>
      <NowrapCell>{specialist.displayName}</NowrapCell>
      <NowrapCell>{specialist.email}</NowrapCell>
      <NowrapCell>{roles[specialist.roleId].description}</NowrapCell>
      <NowrapCell>{stringifyLocation(specialist.locationCode)}</NowrapCell>
    </TableRow>
  );
}

export default AccountItem;
