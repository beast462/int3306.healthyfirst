import * as Joi from 'joi';

import {
  MAX_DISPLAY_NAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_DISPLAY_NAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from '@/common/entity-constraints/user.entity-constraint';
import Flexbox from '@/view/common/components/Flexbox';
import ValidatedInput from '@/view/common/components/ValidatedInput';
import styled from '@emotion/styled';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { useState } from 'react';
import CustomValidatedInput from '@/view/common/components/CustomValidatedInput';
import LocationSelector from '@/view/components/AccountManagement/RegistrationForm/Inputs/LocationSelector/LocationSelector';
import FacilityTypeSelector from './FacilityTypeSelector/FacilityTypeSelector';

const validators = {
  username: Joi.alternatives(
    Joi.string()
      .token()
      .min(MIN_USERNAME_LENGTH)
      .max(MAX_USERNAME_LENGTH)
      .required(),
    Joi.string().valid('').required(),
  ),
  displayName: Joi.alternatives(
    Joi.string()
      .min(MIN_DISPLAY_NAME_LENGTH)
      .max(MAX_DISPLAY_NAME_LENGTH)
      .required(),
    Joi.string().valid('').required(),
  ),
  email: Joi.alternatives(
    Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    Joi.string().valid('').required(),
  ),
};

const Row = styled(Flexbox)`
  padding: 1rem 2rem 0.5rem 2rem;
  flex-wrap: wrap;
  -ms-flex-wrap: wrap;
`;

const useStyles = makeStyles((theme: Theme) => ({
  username: {
    width: '40%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  displayName: {
    flex: 1,
    marginLeft: '1rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      flex: 'unset',
      marginTop: theme.spacing(3),
      marginLeft: 0,
    },
  },
  email: {
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
  const [roleId, setRoleId] = useState<number>(0);

  return (
    <>
      <Row>
        <CustomValidatedInput
          validator={validators.username}
          className={classes.username}
          size="small"
          variant="outlined"
          label="Tên cơ sở"
          name="facilityName"
        />

        <CustomValidatedInput
          validator={validators.displayName}
          className={classes.displayName}
          size="small"
          variant="outlined"
          label="Chủ cơ sở"
          name="ownerName"
        />
      </Row>

      <Row>
        <CustomValidatedInput
          validator={validators.email}
          className={classes.email}
          size="small"
          variant="outlined"
          label="Điện thoại"
          name="phone"
        />

        <FacilityTypeSelector className={classes.facilityTypeSelector} />
      </Row>

      <Row>
        <CustomValidatedInput
          validator={validators.email}
          className={classes.email}
          size="small"
          variant="outlined"
          label="Địa chỉ"
          name="address"
        />
      </Row>

      <Row>
        <LocationSelector selectedRoleId={roleId} />
      </Row>
    </>
  );
}

export default Inputs;
