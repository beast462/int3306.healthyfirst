import { useFacilityTypes } from '@/view/hooks/useFacilityTypes';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';

interface IProps {
  className?: string;
  size?: 'small' | 'medium';
  editMode?: boolean;
  initType?: number;
}

function FacilityTypeSelector({
  className,
  size = 'small',
  editMode = false,
  initType = 1,
}: IProps) {
  const { facilityTypes } = useFacilityTypes();
  const [facilityType, setFacilityType] = useState(facilityTypes[0]);

  useEffect(() => {
    setFacilityType(facilityTypes[initType - 1]);
  }, [initType]);

  return (
    <FormControl className={className} size={size} fullWidth>
      <InputLabel>Loại hình kinh doanh</InputLabel>

      <Select
        label="Loại hình kinh doanh"
        name="facilityType"
        defaultValue={1}
        value={facilityType.id}
      >
        {(facilityTypes ?? []).map((type) => {
          return (
            <MenuItem
              key={`facilityType#${type.id}`}
              value={type.id}
              onClick={() => editMode && setFacilityType(type)}
            >
              {type.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default FacilityTypeSelector;
