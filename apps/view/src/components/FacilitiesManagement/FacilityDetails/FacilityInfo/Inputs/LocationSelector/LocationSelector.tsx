import { LocationEntity } from '@/common/entities';
import { useDistricts } from '@/view/hooks/useDistricts';
import { useLocations } from '@/view/hooks/useLocations';
import { useProvinces } from '@/view/hooks/useProvinces';
import { useWards } from '@/view/hooks/useWards';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';

type Location = Partial<Omit<LocationEntity, 'id' | 'type'>>;

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

  const provinces = useProvinces().provinces;
  const districts = useDistricts().districts.filter(
    (district) => (district.code & 0xffff) === selectedProvince.code,
  );
  const wards = useWards().wards.filter(
    (ward) => (ward.code & 0xffffff) === selectedDistrict.code,
  );

  return (
    <div>
      <FormControl size="small" fullWidth>
        <InputLabel>Tỉnh</InputLabel>
        <Select
          label="Tỉnh"
          name="provinceCode"
          value={selectedProvince.code}
          sx={{ textTransform: 'capitalize' }}
        >
          {(provinces ?? []).map((province: Location) => {
            return (
              <MenuItem
                key={`province#${province.code}`}
                value={province.code}
                onClick={() => {
                  setSelectedProvince(province);
                }}
                sx={{ textTransform: 'capitalize' }}
              >
                {province.name.toLowerCase()}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel>Quận / Huyện / Thành phố</InputLabel>
        <Select
          label="Quận / Huyện / Thành phố"
          name="districtCode"
          value={selectedDistrict.code}
          sx={{ textTransform: 'capitalize' }}
        >
          {(districts ?? []).map((district: Location) => {
            return (
              <MenuItem
                key={`district#${district.code}`}
                value={district.code}
                onClick={() => {
                  setSelectedDistrict(district);
                }}
                sx={{ textTransform: 'capitalize' }}
              >
                {district.name.toLowerCase()}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl size="small" fullWidth>
        <InputLabel>Phường / Xã</InputLabel>
        <Select
          label="Phường / Xã"
          name="wardCode"
          value={selectedWard.code}
          sx={{ textTransform: 'capitalize' }}
        >
          {(wards ?? []).map((ward: Location) => {
            return (
              <MenuItem
                key={`ward#${ward.code}`}
                value={ward.code}
                onClick={() => {
                  setSelectedWard(ward);
                }}
                sx={{ textTransform: 'capitalize' }}
              >
                {ward.name.toLowerCase()}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default LocationSelector;
