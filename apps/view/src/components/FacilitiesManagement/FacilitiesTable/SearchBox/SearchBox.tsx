import { ReactElement, useState } from 'react';

import styled from '@emotion/styled';
import { MenuItem, Select, TextField, Theme } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { makeStyles } from '@mui/styles';
import { Settings } from '@mui/icons-material';

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
  { val: 0, label: 'ID' },
  { val: 1, label: 'Tên cơ sở' },
  { val: 2, label: 'Chủ cơ sở' },
];

function SearchBox(): ReactElement {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [searchOpt, setSearchOpt] = useState(0);

  return (
    <Root>
      <TextField
        placeholder="Tìm kiếm (đang làm)"
        size="small"
        className={styles.searchBox}
        helperText={`Bạn đang tìm kiếm theo ${searchOptions[searchOpt].label}`}
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
