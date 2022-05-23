import styled from '@emotion/styled';
import { AccountCircle } from '@mui/icons-material';
import {
  List,
  ListItemAvatar,
  ListItemText,
  Button,
  ListItemButton,
  Avatar,
} from '@mui/material';
import { ReactElement } from 'react';

const Root = styled.div`
  padding-top: 1rem;
  width: 100%;
`;

function UserInfo(): ReactElement {
  const handleLogout = async () => {
    await fetch('/api/user/logout', { method: 'POST' }).then((res) => res.json);

    window.location.reload();
  };

  return (
    <Root>
      <List>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar>
              <AccountCircle />
            </Avatar>
          </ListItemAvatar>

          <ListItemText
            secondary={
              <Button variant="text" onClick={handleLogout}>
                <b>Log out</b>
              </Button>
            }
          />
        </ListItemButton>
      </List>
    </Root>
  );
}

export default UserInfo;
