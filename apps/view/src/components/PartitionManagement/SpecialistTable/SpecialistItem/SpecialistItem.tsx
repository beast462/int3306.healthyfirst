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

function capitalize(str: string | undefined) {
  const strs = str.split(' ');
  return strs
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ');
}

function stringifyLocation(locationCode: number) {
  const { provinces } = useProvinces();
  const { districts } = useDistricts();
  const { wards } = useWards();

  const province = provinces.find((p) => p.code === (locationCode & 0xffff));
  const district = districts.find((d) => d.code === (locationCode & 0xffffff));
  const ward = wards.find((w) => w.code === (locationCode & 0xffffffff));

  let res = '';
  if (province)
    res += `${capitalize(province.type)} ${capitalize(province.name)}`;
  if (district)
    res =
      `${capitalize(district.type)} ${capitalize(district.name)}` + ', ' + res;
  if (ward)
    res = `${capitalize(ward.type)} ${capitalize(ward.name)}` + ', ' + res;
  return res;
}

function SpecialistItem({ specialist }: IProps) {
  const { roles } = useRoles();

  return (
    <TableRow>
      <NowrapCell>{specialist.userId}</NowrapCell>
      <NowrapCell>{specialist.displayName}</NowrapCell>
      <NowrapCell>{specialist.email}</NowrapCell>
      <NowrapCell>{roles[specialist.roleId - 1].description}</NowrapCell>
      <NowrapCell>
        {stringifyLocation(specialist.responsibleLocationCode)}
      </NowrapCell>
    </TableRow>
  );
}

export default SpecialistItem;
