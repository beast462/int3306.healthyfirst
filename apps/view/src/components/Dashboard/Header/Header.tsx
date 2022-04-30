import { ApplicationState } from '@/view/store';
import { hideMenu as _hideMenu } from '@/view/store/actions/app/hideMenu';
import { showMenu as _showMenu } from '@/view/store/actions/app/showMenu';
import styled from '@emotion/styled';
import { ArrowLeftRounded, ArrowRightRounded, Menu } from '@mui/icons-material';
import {
  Avatar,
  IconButton,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Theme,
  Toolbar,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';

const Container = styled.div`
  width: 100%;
  display: flex;
  display: flexbox;
  display: -ms-flexbox;
  display: -webkit-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100vw',
    zIndex: theme.zIndex.appBar,
    backgroundColor: theme.palette.primary.main,
    '&, & *': {
      color: theme.palette.primary.contrastText,
    },
  },
  toolbar: {
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  avt: {
    [theme.breakpoints.down('md')]: {
      minWidth: '32px',
    },
  },
  avtText: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  menuBtn: {
    width: '1.5rem',
    height: '1.5rem',
    overflow: 'hidden',
    '& > .MuiIcon-ArrowRightRounded,.MuiIcon-ArrowLeftRounded': {
      display: 'none',
      fontSize: '3rem',
      marginLeft: '-0.75rem',
      marginTop: '-0.75rem',
    },
    [theme.breakpoints.up('md')]: {
      '& > .MuiIcon-Menu': {
        display: 'none',
      },
      '& > .MuiIcon-ArrowRightRounded.show': {
        display: 'block',
      },
      '& > .MuiIcon-ArrowLeftRounded.show': {
        display: 'block',
      },
    },
  },
}));

const connector = connect(
  (state: ApplicationState) => ({
    user: state.app.user,
    menuShown: state.app.showMenu,
  }),
  {
    hideMenu: _hideMenu,
    showMenu: _showMenu,
  },
);

function Header({
  user,
  menuShown,
  hideMenu,
  showMenu,
}: ConnectedProps<typeof connector>): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Container>
          <IconButton onClick={menuShown ? hideMenu : showMenu}>
            <div className={classes.menuBtn}>
              <Menu className={'MuiIcon-Menu'} />
              <ArrowRightRounded
                className={clsx(
                  'MuiIcon-ArrowRightRounded',
                  menuShown ? '' : 'show',
                )}
              />
              <ArrowLeftRounded
                className={clsx(
                  'MuiIcon-ArrowLeftRounded',
                  menuShown ? 'show' : '',
                )}
              />
            </div>
          </IconButton>

          <div>
            <ListItemButton dense>
              <ListItemAvatar className={classes.avt}>
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </ListItemAvatar>

              <ListItemText
                className={classes.avtText}
                primary={user?.displayName ?? ''}
                secondary={user?.role?.name ?? ''}
              />
            </ListItemButton>
          </div>
        </Container>
      </Toolbar>
    </div>
  );
}

export default connector(Header);
