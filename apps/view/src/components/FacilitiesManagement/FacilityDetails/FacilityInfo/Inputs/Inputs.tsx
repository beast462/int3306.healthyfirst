import CustomValidatedInput from '@/view/common/components/CustomValidatedInput';
import Flexbox from '@/view/common/components/Flexbox';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as Joi from 'joi';
import { ReactElement } from 'react';

const validator = {
  facilityName: Joi.alternatives(
    Joi.string().token().min(3).max(64).required(),
    Joi.string().valid('').required(),
  ),
};

const useStyles = makeStyles((theme: Theme) => ({
  row: {
    width: '100%',
    margin: '0.5rem 0',
  },
}));

function Inputs(): ReactElement {
  const styles = useStyles();

  return (
    <>
      <div>
        <CustomValidatedInput
          className={styles.row}
          validator={validator.facilityName}
          size="small"
          variant="outlined"
          label="Tên cơ sở"
          name="facilityName"
        />
      </div>

      <div>
        <CustomValidatedInput
          className={styles.row}
          validator={validator.facilityName}
          size="small"
          variant="outlined"
          label="Chủ cơ sở"
          name="ownerName"
        />
      </div>

      <div>
        <CustomValidatedInput
          className={styles.row}
          validator={validator.facilityName}
          size="small"
          variant="outlined"
          label="Điện thoại"
          name="phone"
        />
      </div>

      <div>
        <CustomValidatedInput
          className={styles.row}
          validator={validator.facilityName}
          size="small"
          variant="outlined"
          label="Địa chỉ"
          name="address"
        />
      </div>
    </>
  );
}

export default Inputs;
