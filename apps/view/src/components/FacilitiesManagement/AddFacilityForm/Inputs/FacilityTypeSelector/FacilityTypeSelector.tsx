import { useFacilityTypes } from '@/view/hooks/useFacilityTypes';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface IProps {
  className: string;
}

function FacilityTypeSelector({ className }: IProps) {
  const { facilityTypes } = useFacilityTypes();

  return (
    <FormControl className={className} size="small" fullWidth>
      <InputLabel>Loại hình kinh doanh</InputLabel>

      <Select label="Loại hình kinh doanh" name="facilityType" defaultValue={1}>
        {(facilityTypes ?? []).map((type) => {
          return (
            <MenuItem key={`facilityType#${type.id}`} value={type.id}>
              {type.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default FacilityTypeSelector;
