import * as Joi from 'joi';

import {
  MAX_FACILITY_NAME_LENGTH,
  MAX_OWNER_NAME_LENGTH,
} from '@/common/entity-constraints/facility.entitty-constraint';
import {
  MAX_ADDRESS_LENGTH,
  MAX_PHONE_LENGTH,
} from '@/common/entity-constraints/common.entity-constraint';

import Flexbox from '@/view/common/components/Flexbox';
import styled from '@emotion/styled';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import CustomValidatedInput from '@/view/common/components/CustomValidatedInput';
import FacilityTypeSelector from './FacilityTypeSelector/FacilityTypeSelector';
import ThreeLocationSelector from './ThreeLocationSelector/ThreeLocationSelector';

const validators = {
  facilityName: Joi.alternatives(
    Joi.string().max(MAX_FACILITY_NAME_LENGTH).required(),
    Joi.string().valid('').required(),
  ),
  ownerName: Joi.alternatives(
    Joi.string().max(MAX_OWNER_NAME_LENGTH).required(),
    Joi.string().valid('').required(),
  ),
  phone: Joi.alternatives(
    Joi.string()
      .min(10)
      .max(MAX_PHONE_LENGTH)
      .pattern(/^0[0-9]+$/)
      .required(),
    Joi.string().valid('').required(),
  ),
  address: Joi.alternatives(
    Joi.string().max(MAX_ADDRESS_LENGTH).required(),
    Joi.string().valid('').required(),
  ),
};

const Row = styled(Flexbox)`
  padding: 1rem 2rem 0.5rem 2rem;
  flex-wrap: wrap;
  -ms-flex-wrap: wrap;
`;

const useStyles = makeStyles((theme: Theme) => ({
  facilityName: {
    flex: 1,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      flex: 'unset',
    },
  },
  ownerName: {
    width: '33%',
    marginLeft: '1rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: theme.spacing(3),
      marginLeft: 0,
    },
  },
  phone: {
    width: '33%',
    marginLeft: '1rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: theme.spacing(3),
      marginLeft: 0,
    },
  },
  address: {
    width: '60%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  facilityTypeSelector: {
    flex: 1,
    marginLeft: '1rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      flex: 'unset',
      marginTop: theme.spacing(3),
      marginLeft: 0,
    },
  },
}));

function Inputs() {
  const classes = useStyles();

  return (
    <>
      <Row>
        <CustomValidatedInput
          validator={validators.facilityName}
          className={classes.facilityName}
          size="small"
          variant="outlined"
          label="Tên cơ sở"
          name="facilityName"
        />

        <CustomValidatedInput
          validator={validators.ownerName}
          className={classes.ownerName}
          size="small"
          variant="outlined"
          label="Chủ cơ sở"
          name="ownerName"
        />

        <CustomValidatedInput
          validator={validators.phone}
          className={classes.phone}
          size="small"
          variant="outlined"
          label="Điện thoại"
          name="phone"
        />
      </Row>

      <Row>
        <CustomValidatedInput
          validator={validators.address}
          className={classes.address}
          size="small"
          variant="outlined"
          label="Địa chỉ"
          name="address"
        />

        <FacilityTypeSelector
          className={classes.facilityTypeSelector}
          editMode={true}
        />
      </Row>

      <Row>
        <ThreeLocationSelector />
      </Row>
    </>
  );
}

export default Inputs;
