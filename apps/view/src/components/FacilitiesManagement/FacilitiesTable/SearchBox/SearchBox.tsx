import {
  ChangeEventHandler,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

import styled from '@emotion/styled';
import { MenuItem, Select, TextField, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Settings } from '@mui/icons-material';
import { bySeconds } from '@/common/helpers/timespan';
import { debounce } from 'lodash';

interface IProps {
  findFacilities: (searchOpt: string, searchVal: string) => void;
}

const Root = styled.div`
  display: flex;
  margin: 1rem 1rem 0rem 1rem;
`;

const useStyles = makeStyles((theme: Theme) => ({
  searchBox: {
    flex: 2,
    margin: '0',
  },
  select: {
    height: '40px',
    width: '40px',
    padding: '1rem',
  },
}));

const searchOptions = [
  { val: 'id', label: 'ID' },
  { val: 'facilityName', label: 'Tên cơ sở' },
  { val: 'ownerName', label: 'Chủ cơ sở' },
];

function SearchBox({ findFacilities }: IProps): ReactElement {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [searchOpt, setSearchOpt] = useState(0);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>();

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = debounce(
    (event) => {
      const newVal = event.target.value;
      setValue(newVal);
      findFacilities(searchOptions[searchOpt].val, newVal);
    },
    bySeconds(0.5),
  );

  useEffect(() => {
    inputRef.current && (inputRef.current.value = value);
  }, [value]);

  return (
    <Root>
      <TextField
        placeholder="Tìm kiếm (đang làm)"
        size="small"
        className={styles.searchBox}
        helperText={`Bạn đang tìm kiếm theo ${searchOptions[searchOpt].label}`}
        ref={inputRef}
        onChange={handleChangeValue}
      />

      <Select
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        onChange={(event) =>
          setSearchOpt(event.target.value as unknown as number)
        }
        IconComponent={Settings}
        className={styles.select}
        value=""
      >
        <MenuItem value={0}>Tìm theo ID</MenuItem>
        <MenuItem value={1}>Tìm theo tên cơ sở</MenuItem>
        <MenuItem value={2}>Tìm theo chủ cơ sở</MenuItem>
      </Select>
    </Root>
  );
}

export default SearchBox;
