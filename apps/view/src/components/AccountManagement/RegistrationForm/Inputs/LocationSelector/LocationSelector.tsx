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
import { useUser } from '@/view/hooks/useUser';
import { useResponsibleLocation } from '@/view/hooks/useResponsibleLocation';

interface IProps {
  selectedRoleId: number;
  disabled?: boolean;
  userId?: number;
  province?: Location;
  district?: Location;
}

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

function LocationSelector({
  selectedRoleId,
  disabled = false,
  userId = 0,
  province = { code: 257, name: 'Hà Nội' },
  district = { code: 65793, name: 'Quận Ba Đình' },
}: IProps): ReactElement {
  const styles = useStyles();
  const { user } = useUser();
  const { responsibleLocationCode } = useResponsibleLocation().data;
  const currentUserProvince = (useProvinces().provinces ?? []).find(
    (p) => p.code === responsibleLocationCode,
  );

  const [selectedProvince, setSelectedProvince] = useState<Location>(province);
  const [selectedDistrict, setSelectedDistrict] = useState<Location>(
    selectedRoleId === 3 ? district : { code: -1, name: '' },
  );

  useEffect(() => {
    setSelectedDistrict({ code: -1, name: '' });
  }, [selectedRoleId === 3]);

  useEffect(() => {
    setSelectedProvince(user.roleId !== 2 ? province : currentUserProvince);
    setSelectedDistrict(
      selectedRoleId === 3 ? district : { code: -1, name: '' },
    );
  }, [userId]);

  const provinces = useProvinces().provinces ?? [];
  const districts = (useDistricts().districts ?? []).filter(
    (district) => (district.code & 0xffff) === selectedProvince.code,
  );

  return (
    <>
      <FormControl size="small" className={styles.province} disabled={disabled}>
        <InputLabel>Tỉnh</InputLabel>
        <Select
          label="Tỉnh"
          name="provinceCode"
          value={selectedProvince.code}
          sx={{ textTransform: 'capitalize' }}
          disabled={
            selectedRoleId === 0 ||
            disabled ||
            (user.roleId === 2 && userId === 0)
          }
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
          disabled={selectedRoleId <= 2 || disabled}
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
