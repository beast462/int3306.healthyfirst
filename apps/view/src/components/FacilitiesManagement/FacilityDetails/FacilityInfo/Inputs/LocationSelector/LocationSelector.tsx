import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ReactElement, useState } from 'react';

interface ILocation {
  id: number;
  name: string;
}

const DEFAULT_PROVINCE = {
  id: 257,
  name: 'Hà Nội',
};

const DEFAULT_DISTRICT = {
  id: 65793,
  name: 'Quận Ba Đình',
}

const DEFAULT_WARD = {
  id: 167837953,
  name: 'Phường Đội Cấn',
}

interface IProps {
  className?: string;
}

function LocationSelector({ className }: IProps): ReactElement {
  const [selectedProvince, setSelectedProvince] = useState(DEFAULT_PROVINCE);
  const [selectedDistrict, setSelectedDistrict] = useState(DEFAULT_DISTRICT);
  const [selectedWard, setSelectedWard] = useState(DEFAULT_WARD);

  const { provinces } = useProvinces();
  const { districts } = useDistricts(selectedProvince.id);
  const { wards } = useWards(selectedDistrict.id);

  return (
    <div>
      <FormControl size="small" fullWidth>
        <InputLabel>Tỉnh</InputLabel>
        <Select
          label="Tỉnh"
          name="provinceId"
          onChange={(event) => {
            setSelectedProvince(event.target.value as ILocation);
          }}
        >
          {(provinces ?? []).map((province) => {
            return (
              <MenuItem key={`province#${province.id}`} value={province}>
                {province.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel>Quận / Huyện / Thành phố</InputLabel>
        <Select label="Quận / Huyện / Thành phố" name="districtId">
          {(districts ?? []).map((district) => {
            return (
              <MenuItem key={`district#${district.id}`} value={district.id}>
                {district.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel>Phường / Xã</InputLabel>
        <Select label="Phường / Xã" name="districtId">
          {(wards ?? []).map((ward) => {
            return (
              <MenuItem key={`ward#${ward.id}`} value={ward.id}>
                {ward.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default LocationSelector;
