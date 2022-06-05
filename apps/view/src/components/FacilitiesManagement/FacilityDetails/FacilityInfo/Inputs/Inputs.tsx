import CustomValidatedInput from '@/view/common/components/CustomValidatedInput';
import Flexbox from '@/view/common/components/Flexbox';
import { CancelRounded, EditRounded, SaveRounded } from '@mui/icons-material';
import { Button, Divider, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as Joi from 'joi';
import { ReactElement, useState } from 'react';
import LocationSelector from './LocationSelector/LocationSelector';

const validator = {
  facilityName: Joi.alternatives(
    Joi.string().token().min(3).max(64).required(),
    Joi.string().valid('').required(),
  ),
};

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    width: '100%',
    margin: '1rem 0rem',
    justifyContent: 'space-between',
    '&#locationSelector': {
      [theme.breakpoints.down('md')]: {
        display: 'block',
      },
    },
  },

  btnGroup: {
    flexDirection: 'row-reverse',
    '& button': {
      borderRadius: '8px',
    },
  },
}));

function Inputs(): ReactElement {
  const styles = useStyles();
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <div>
        <CustomValidatedInput
          required
          className={styles.row}
          validator={validator.facilityName}
          size="medium"
          variant="outlined"
          label="Tên cơ sở"
          name="facilityName"
        />
      </div>

      <div>
        <CustomValidatedInput
          className={styles.row}
          validator={validator.facilityName}
          size="medium"
          variant="outlined"
          label="Chủ cơ sở"
          name="ownerName"
        />
      </div>

      <div>
        <CustomValidatedInput
          className={styles.row}
          validator={validator.facilityName}
          size="medium"
          variant="outlined"
          label="Điện thoại"
          name="phone"
        />
      </div>

      <div>
        <CustomValidatedInput
          className={styles.row}
          validator={validator.facilityName}
          size="medium"
          variant="outlined"
          label="Địa chỉ"
          name="address"
        />
      </div>

      <Flexbox className={styles.row} id="locationSelector">
        <LocationSelector />
      </Flexbox>

      <Divider />

      <Flexbox className={styles.btnGroup}>
        <Button
          variant="contained"
          sx={{ margin: '1rem 0', height: '40px' }}
          startIcon={<EditRounded />}
        >
          Chỉnh sửa
        </Button>
        <Button
          variant="outlined"
          sx={{ margin: '1rem 0.5rem 1rem 0', height: '40px' }}
          startIcon={<CancelRounded />}
        >
          Huỷ
        </Button>
        <Button
          variant="contained"
          sx={{ margin: '1rem 0.5rem', height: '40px' }}
          startIcon={<SaveRounded />}
        >
          Lưu
        </Button>
      </Flexbox>
    </>
  );
}

export default Inputs;
