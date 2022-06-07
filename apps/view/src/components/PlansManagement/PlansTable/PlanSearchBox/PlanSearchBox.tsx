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
  findPlans: (searchOpt: string, searchVal: string) => void;
}

const Root = styled.div`
  display: flex;
  margin-top: 1rem;
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
  { id: 0, val: 'planId', label: 'ID', description: 'Tìm theo ID' },
  {
    id: 1,
    val: 'id',
    label: 'ID cơ sở',
    description: 'Tìm theo ID cơ sở',
  },
  {
    id: 2,
    val: 'name',
    label: 'Tên cơ sở',
    description: 'Tìm theo tên cơ sở',
  },
  {
    id: 3,
    val: 'ownerName',
    label: 'Chủ cơ sở',
    description: 'Tìm theo chủ cơ sở',
  },
];

function PlanSearchBox({ findPlans }: IProps): ReactElement {
  const styles = useStyles();
  const [searchOpt, setSearchOpt] = useState(0);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openOptMenu = Boolean(anchorEl);

  const handleChangeValue: ChangeEventHandler<HTMLInputElement> = debounce(
    (event) => {
      const newVal = event.target.value;
      setValue(newVal);
      findPlans(searchOptions[searchOpt].val, newVal);
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
                onClick={() => {
                  setSearchOpt(opt.id);
                  findPlans(searchOptions[opt.id].val, value);
                }}
                key={`searchOpt#${opt.id}`}
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

export default PlanSearchBox;
