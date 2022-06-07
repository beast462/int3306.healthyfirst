import {
  ChangeEventHandler,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

import styled from '@emotion/styled';
import { IconButton, Menu, MenuItem, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FilterList, Settings } from '@mui/icons-material';
import { bySeconds } from '@/common/helpers/timespan';
import { debounce } from 'lodash';

interface IProps {
  findFacilities: (searchOpt: string, searchVal: string) => void;
  filterFacilities: (filterVal: string) => void;
}

const Root = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const useStyles = makeStyles(() => ({
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
    val: 'name',
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

const filterOptions = [
  { id: 0, val: 'all', label: 'Tất cả' },
  { id: 1, val: 'not', label: 'Chưa cấp' },
  { id: 2, val: 'expired', label: 'Hết hạn, chưa thu hồi' },
  { id: 3, val: 'revoked', label: 'Đã thu hồi, chưa cấp mới' },
  { id: 4, val: 'valid', label: 'Còn hiệu lực' },
];

function SearchBox({ findFacilities, filterFacilities }: IProps): ReactElement {
  const styles = useStyles();
  const [searchOpt, setSearchOpt] = useState(0);
  const [filterOpt, setFilterOpt] = useState(0);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>();
  const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null);
  const openOptMenu = Boolean(anchorEl1);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const openOptFilter = Boolean(anchorEl2);

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
          onClick={(event) => setAnchorEl1(event.currentTarget)}
        >
          <Settings />
        </IconButton>
        <Menu
          id="opt-menu"
          anchorEl={anchorEl1}
          open={openOptMenu}
          onClose={() => setAnchorEl1(null)}
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
                  findFacilities(searchOptions[opt.id].val, value);
                }}
                key={`searchOpt#${opt.id}`}
              >
                {opt.description}
              </MenuItem>
            );
          })}
        </Menu>
      </div>

      <div>
        <IconButton
          id="filter-btn"
          aria-controls={openOptFilter ? 'opt-filter' : undefined}
          aria-haspopup="true"
          aria-expanded={openOptFilter ? 'true' : undefined}
          onClick={(event) => setAnchorEl2(event.currentTarget)}
        >
          <FilterList />
        </IconButton>
        <Menu
          id="opt-filter"
          anchorEl={anchorEl2}
          open={openOptFilter}
          onClose={() => setAnchorEl2(null)}
          MenuListProps={{
            'aria-labelledby': 'filter-btn',
          }}
        >
          {filterOptions.map((opt) => {
            return (
              <MenuItem
                value={opt.id}
                selected={filterOpt === opt.id}
                onClick={() => {
                  setFilterOpt(opt.id);
                  filterFacilities(filterOptions[opt.id].val);
                }}
                key={`searchOpt#${opt.id}`}
              >
                {opt.label}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    </Root>
  );
}

export default SearchBox;
