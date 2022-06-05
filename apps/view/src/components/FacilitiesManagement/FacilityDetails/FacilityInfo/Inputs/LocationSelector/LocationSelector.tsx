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
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
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

const useStyles = makeStyles((theme: Theme) => ({
  province: {
    margin: 0,
    width: '200px',
    minWidth: 'fit-content',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      display: 'block',
      margin: '1rem 0',
    },
  },

  district: {
    margin: '0 1rem',
    width: '200px',
    minWidth: 'fit-content',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      display: 'block',
      margin: '1rem 0',
    },
  },

  ward: {
    margin: 0,
    width: '200px',
    minWidth: 'fit-content',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      display: 'block',
      margin: '1rem 0',
    },
  },
}));

function LocationSelector({ className }: IProps): ReactElement {
  const styles = useStyles();

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
    <>
      <FormControl size="medium" className={styles.province}>
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

      <FormControl size="medium" className={styles.district}>
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

      <FormControl size="medium" className={styles.ward}>
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

export default LocationSelector;
