import { ReactElement } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import Flexbox from '@/view/common/components/Flexbox';
import { useBreakpoints } from '@/view/hooks/useBreakpoints';
import { ApplicationState } from '@/view/store';
import { hideMenu } from '@/view/store/actions/app/hideMenu';
import { showMenu } from '@/view/store/actions/app/showMenu';
import styled from '@emotion/styled';
import { Menu } from '@mui/icons-material';
import { IconButton, Theme, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';

import UserMenu from './UserMenu/UserMenu';

const Container = styled(Flexbox)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 'calc(100%vw - 260px)',
    [theme.breakpoints.down('md')]: {
      width: '100%vw',
    },
    zIndex: theme.zIndex.appBar,
    boxShadow: '0px 2px 5px rgba(0 0 0 / 30%)',
    '&, & *': {
      color: 'black',
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
    color: 'black',
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
    },
  },
}));

const connector = connect(
  (state: ApplicationState) => ({
    menuShown: state.app.showMenu,
  }),
  {
    hideMenu,
    showMenu,
  },
);

function Header({
  menuShown,
  hideMenu,
  showMenu,
}: ConnectedProps<typeof connector>): ReactElement {
  const classes = useStyles();
  const checker = useBreakpoints();

  return (
    <div className={classes.root}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <Container>
          <IconButton
            disabled={checker.up('md')}
            onClick={menuShown ? hideMenu : showMenu}
          >
            <div className={classes.menuBtn}>
              <Menu className={'MuiIcon-Menu'} />
            </div>
          </IconButton>

          <UserMenu />
        </Container>
      </Toolbar>
    </div>
  );
}

export default connector(Header);
