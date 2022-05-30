import { useRef, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { useUser } from '@/view/hooks/useUser';
import styled from '@emotion/styled';
import { Logout, Settings } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material';

const NoPaddingIconButton = styled(IconButton)`
  padding: 0;
`;

const connector = connect(() => ({}), {});

function UserMenu({}: ConnectedProps<typeof connector>) {
  const { user } = useUser();
  const [showMenu, setShowMenu] = useState(false);
  const entryRef = useRef<HTMLButtonElement>();

  const logout = async () => {
    await fetch('/api/user/logout', { method: 'POST' }).then((res) => res.json);

    window.location.reload();
  };

  return (
    <div>
      <NoPaddingIconButton ref={entryRef} onClick={() => setShowMenu(true)}>
        <Avatar sx={{ width: '36px', height: '36px' }}>
          {user?.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </NoPaddingIconButton>

      <Menu
        open={showMenu}
        anchorEl={entryRef.current}
        onClose={() => setShowMenu(false)}
      >
        <MenuList>
          <MenuItem divider>
            <ListItemAvatar>
              <Avatar>M</Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={
                <Typography fontWeight="bold">{user?.displayName}</Typography>
              }
              secondary="Vào trang cá nhân"
            />
          </MenuItem>

          <MenuItem dense>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>

            <ListItemText primary="Cài đặt" />
          </MenuItem>

          <MenuItem dense>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>

            <ListItemText primary="Đăng xuất" onClick={logout} />
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default connector(UserMenu);
