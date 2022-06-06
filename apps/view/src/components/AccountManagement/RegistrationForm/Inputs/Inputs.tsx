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

import RolesSelector from './RolesSelector/RolesSelector';
import LocationSelector from './LocationSelector/LocationSelector';
import { useState } from 'react';

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
  roleSelector: {
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
        <ValidatedInput
          validator={validators.username}
          className={classes.username}
          size="small"
          variant="outlined"
          label="Tên đăng nhập"
          name="username"
        />

        <ValidatedInput
          validator={validators.displayName}
          className={classes.displayName}
          size="small"
          variant="outlined"
          label="Họ và tên"
          name="displayName"
        />
      </Row>

      <Row>
        <ValidatedInput
          validator={validators.email}
          className={classes.email}
          size="small"
          variant="outlined"
          label="Email"
          name="email"
        />

        <RolesSelector
          className={classes.roleSelector}
          onRoleSelected={(roleId) => setRoleId(roleId)}
        />
      </Row>
      <Row>
        <LocationSelector selectedRoleId={roleId} />
      </Row>
    </>
  );
}

export default Inputs;
