import { LocationEntity } from '@/common/entities';
import { useLocations } from '@/view/hooks/useLocations';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { ReactElement, useState } from 'react';

interface ILocation {
  id: number;
  name: string;
}

type Location = Partial<Omit<LocationEntity, 'id' | 'type'>>;

const DEFAUTLT_COUNTRY_CODE = 1;

const DEFAULT_PROVINCE = {
  code: 257,
  name: 'Hà Nội',
};

const DEFAULT_DISTRICT = {
  code: 65793,
  name: 'Quận Ba Đình',
};

const DEFAULT_WARD = {
  code: 167837953,
  name: 'Phường Đội Cấn',
};

interface IProps {
  className?: string;
}

function LocationSelector({ className }: IProps): ReactElement {
  const [selectedProvince, setSelectedProvince] =
    useState<Location>(DEFAULT_PROVINCE);
  const [selectedDistrict, setSelectedDistrict] =
    useState<Location>(DEFAULT_DISTRICT);
  const [selectedWard, setSelectedWard] = useState<Location>(DEFAULT_WARD);

  const provinces = useLocations(DEFAUTLT_COUNTRY_CODE).locations;
  const districts = useLocations(selectedProvince.code).locations;
  const wards = useLocations(selectedDistrict.code).locations;

  return (
    <div>
      <FormControl size="small" fullWidth>
        <InputLabel>Tỉnh</InputLabel>
        <Select
          label="Tỉnh"
          name="provinceCode"
          onChange={(event) => {
            setSelectedProvince(event.target.value as Location);
          }}
        >
          {(provinces ?? []).map((province: Location) => {
            return (
              <MenuItem key={`province#${province.code}`} value={province.code}>
                {province.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel>Quận / Huyện / Thành phố</InputLabel>
        <Select label="Quận / Huyện / Thành phố" name="districtCode">
          {(districts ?? []).map((district: Location) => {
            return (
              <MenuItem key={`district#${district.code}`} value={district.code}>
                {district.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel>Phường / Xã</InputLabel>
        <Select label="Phường / Xã" name="wardCode">
          {(wards ?? []).map((ward: Location) => {
            return (
              <MenuItem key={`ward#${ward.code}`} value={ward.code}>
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
