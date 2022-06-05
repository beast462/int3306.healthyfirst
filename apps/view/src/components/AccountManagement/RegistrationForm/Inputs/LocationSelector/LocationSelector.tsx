import { ReactElement, useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Theme,
} from '@mui/material';
import { useProvinces } from '@/view/hooks/useProvinces';
import { useDistricts } from '@/view/hooks/useDistricts';
import { Location } from '@/view/common/types/Location';
import { makeStyles } from '@mui/styles';

interface IProps {
  selectedRoleId: number;
}

const DEFAULT_PROVINCE = {
  code: 257,
  name: 'Hà Nội',
};

const DEFAULT_DISTRICT = {
  code: 65793,
  name: 'Quận Ba Đình',
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
    flex: 1,
    marginLeft: '1rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      flex: 'unset',
      marginLeft: 0,
      marginTop: theme.spacing(3),
    },
  },
}));

function LocationSelector({ selectedRoleId }: IProps): ReactElement {
  const styles = useStyles();

  const [selectedProvince, setSelectedProvince] =
    useState<Location>(DEFAULT_PROVINCE);
  const [selectedDistrict, setSelectedDistrict] = useState<Location>(
    selectedRoleId === 3 ? DEFAULT_DISTRICT : { code: -1, name: '' },
  );

  useEffect(() => {
    setSelectedDistrict({ code: -1, name: '' });
  }, [selectedRoleId === 3]);

  const provinces = useProvinces().provinces;
  const districts = (useDistricts().districts ?? []).filter(
    (district) => (district.code & 0xffff) === selectedProvince.code,
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
          disabled={selectedRoleId === 0}
        >
          {(provinces ?? []).map((province: Location) => {
            return (
              <MenuItem
                key={`province#${province.code}`}
                value={province.code}
                onClick={() => {
                  setSelectedProvince(province);
                  setSelectedDistrict({ code: -1, name: '' });
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
          disabled={selectedRoleId <= 2}
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
    </>
  );
}

export default LocationSelector;
