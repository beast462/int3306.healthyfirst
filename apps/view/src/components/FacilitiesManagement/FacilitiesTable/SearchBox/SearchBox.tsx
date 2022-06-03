import {
  ChangeEventHandler,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

import styled from '@emotion/styled';
import { IconButton, Menu, MenuItem, TextField, Theme } from '@mui/material';
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
    '& > div': {
      width: '0 !important',
    },
  },
}));

const searchOptions = [
  { id: 0, val: 'id', label: 'ID', description: 'Tìm theo ID' },
  {
    id: 1,
    val: 'facilityName',
    label: 'Tên cơ sở',
    description: 'Tìm theo tên cơ sở',
  },
  {
    id: 2,
    val: 'ownerName',
    label: 'Chủ cơ sở',
    description: 'Tìm theo chủ cơ sở',
  },
];

function SearchBox({ findFacilities }: IProps): ReactElement {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [searchOpt, setSearchOpt] = useState(0);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openOptMenu = Boolean(anchorEl);

  console.log(searchOpt);

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
        placeholder="Tìm kiếm ..."
        size="small"
        className={styles.searchBox}
        helperText={`Bạn đang tìm kiếm theo ${searchOptions[searchOpt].label}`}
        ref={inputRef}
        onChange={handleChangeValue}
      />

      <div>
        <IconButton
          id="menu-btn"
          aria-controls={openOptMenu ? 'opt-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openOptMenu ? 'true' : undefined}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <Settings />
        </IconButton>
        <Menu
          id="opt-menu"
          anchorEl={anchorEl}
          open={openOptMenu}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            'aria-labelledby': 'menu-btn',
          }}
        >
          {searchOptions.map((opt) => {
            return (
              <MenuItem
                value={opt.id}
                selected={searchOpt === opt.id}
                onClick={() => setSearchOpt(opt.id)}
              >
                {opt.description}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    </Root>
  );
}

export default SearchBox;
