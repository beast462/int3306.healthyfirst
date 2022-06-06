import Flexbox from '@/view/common/components/Flexbox';
import { ApplicationState } from '@/view/store';
import { TextField, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as Joi from 'joi';
import { ReactElement, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FacilityTypeSelector from '../../../AddFacilityForm/Inputs/FacilityTypeSelector/FacilityTypeSelector';
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

  flexCtn: {
    display: 'flex',
    margin: '1rem 0rem',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },

  phone: {
    width: '50%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },

  facilityTypeSelector: {
    flex: 1,
    marginLeft: '1rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      flex: 'unsets',
      marginLeft: 0,
      marginTop: '2rem',
    },
  },

  btnGroup: {
    flexDirection: 'row-reverse',
    '& button': {
      borderRadius: '8px',
    },
  },
}));

const connector = connect(
  (state: ApplicationState) => ({
    facility: state.facilityDetail.facility,
    editMode: state.facilityDetail.editMode,
  }),
  {},
);

function Inputs({
  facility,
  editMode,
}: ConnectedProps<typeof connector>): ReactElement {
  const styles = useStyles();
  const [name, setName] = useState(facility.name);
  const [ownerName, setOwnerName] = useState(facility.ownerName);
  const [address, setAddress] = useState(facility.address);
  const [phone, setPhone] = useState(facility.phone);

  useEffect(() => {
    setName(facility.name);
    setOwnerName(facility.ownerName);
    setAddress(facility.address);
    setPhone(facility.phone);
  }, [facility]);

  return (
    <>
      <div>
        <TextField
          required
          className={styles.row}
          size="medium"
          variant="outlined"
          label="Tên cơ sở"
          name="facilityName"
          value={name}
          onChange={(event) => editMode && setName(event.target.value)}
        />
      </div>

      <div>
        <TextField
          className={styles.row}
          size="medium"
          variant="outlined"
          label="Chủ cơ sở"
          name="ownerName"
          value={ownerName}
          onChange={(event) => editMode && setOwnerName(event.target.value)}
        />
      </div>

      <Flexbox className={styles.flexCtn}>
        <TextField
          className={styles.phone}
          size="medium"
          variant="outlined"
          label="Điện thoại"
          name="phone"
          value={phone}
          onChange={(event) => editMode && setPhone(event.target.value)}
        />

        <FacilityTypeSelector
          className={styles.facilityTypeSelector}
          size="medium"
          editMode={editMode}
          initType={facility.facilityTypeId}
        />
      </Flexbox>

      <div>
        <TextField
          className={styles.row}
          size="medium"
          variant="outlined"
          label="Địa chỉ"
          name="address"
          value={address}
          onChange={(event) => editMode && setAddress(event.target.value)}
        />
      </div>

      <Flexbox className={styles.row} id="locationSelector">
        <LocationSelector
          location={facility.facilityLocationCode}
          editMode={editMode}
        />
      </Flexbox>
    </>
  );
}

export default connector(Inputs);
