import { LocationEntity } from '@/common/entities';
import { useDistricts } from '@/view/hooks/useDistricts';
import { useProvinces } from '@/view/hooks/useProvinces';
import { useWards } from '@/view/hooks/useWards';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ReactElement, useState } from 'react';

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

const useStyles = makeStyles((theme: Theme) => ({
  province: {
    flex: 1,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      flex: 'unset',
    },
  },
  district: {
    width: '33%',
    marginLeft: '1rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: theme.spacing(3),
      marginLeft: 0,
    },
  },
  ward: {
    width: '33%',
    marginLeft: '1rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: theme.spacing(3),
      marginLeft: 0,
    },
  },
}));

function ThreeLocationSelector(): ReactElement {
  const styles = useStyles();

  const [selectedProvince, setSelectedProvince] =
    useState<Location>(DEFAULT_PROVINCE);
  const [selectedDistrict, setSelectedDistrict] =
    useState<Location>(DEFAULT_DISTRICT);
  const [selectedWard, setSelectedWard] = useState<Location>(DEFAULT_WARD);

  const provinces = useProvinces().provinces ?? [];
  const districts = (useDistricts().districts ?? []).filter(
    (district) => (district.code & 0xffff) === selectedProvince.code,
  );
  const wards = (useWards().wards ?? []).filter(
    (ward) => (ward.code & 0xffffff) === selectedDistrict.code,
  );

  return (
    <>
      <FormControl size="small" className={styles.province}>
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
                  setSelectedDistrict({ code: -1, name: '' });
                  setSelectedWard({ code: -1, name: '' });
                }}
                sx={{ textTransform: 'capitalize' }}
              >
                {province.name.toLowerCase()}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl size="small" className={styles.district}>
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
                  setSelectedWard({ code: -1, name: '' });
                }}
                sx={{ textTransform: 'capitalize' }}
              >
                {district.name.toLowerCase()}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl size="small" className={styles.ward}>
        <InputLabel>Phường / Xã</InputLabel>
        <Select
          label="Phường / Xã"
          name="wardCode"
          value={selectedWard.code}
          disabled={selectedDistrict.code === -1}
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
    </>
  );
}

export default ThreeLocationSelector;
