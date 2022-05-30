import clsx from 'clsx';
import { ReactElement, useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { useBreakpoints } from '@/view/hooks/useBreakpoints';
import { ApplicationState } from '@/view/store';
import { hideMenu } from '@/view/store/actions/app/hideMenu';
import { showMenu } from '@/view/store/actions/app/showMenu';
import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import { Navigations } from '../../Navigations';
import UserInfo from './UserInfo/UserInfo';

export const menuFullWidth = 260;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      height: '100vh',
      width: '100vw',
    },
    [theme.breakpoints.between(menuFullWidth, 'md')]: {},
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      height: '100%',
    },
  },
  paper: {
    position: 'relative',
    height: '100%',
    backgroundColor: '#111827',
    color: '#fff',
    [theme.breakpoints.up(menuFullWidth)]: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: `calc(${theme.spacing(9)} + 0px)`,
      '&.show': {
        width: menuFullWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
      },
    },
    [theme.breakpoints.down(menuFullWidth)]: {
      width: '100%',
    },
  },
  listItem: {
    color: '#D1D5DB',
    display: 'flex',
    borderRadius: '10px',
    margin: '5px 1rem',
    '&:hover': {
      backgroundColor: '#ffffff14',
    },
    '& div': {
      minWidth: 'fit-content',
      width: 'fit-content',
      padding: '0 5px',
    },

    '&.Mui-selected': {
      color: '#10B981',
      backgroundColor: '#ffffff14',
    },
  },
}));

const connector = connect(
  (state: ApplicationState) => ({
    show: state.app.showMenu,
  }),
  {
    showMenu,
    hideMenu,
  },
);

function Menu({
  show,
  hideMenu,
  showMenu,
}: ConnectedProps<typeof connector>): ReactElement {
  const classes = useStyles();
  const checker = useBreakpoints();
  const navigations = useMemo(() => {
    const allMenu = Navigations.getInstance().getAllNavigations();

    return allMenu.filter((nav) => nav[1].tabProps);
  }, []);
  const location = useLocation();

  useEffect(() => {
    if (checker.up('md')) {
      showMenu();
    }
  }, [checker.up('md')]);

  return (
    <Drawer
      anchor="left"
      className={classes.root}
      open={show}
      onClose={hideMenu}
      variant={checker.up('md') ? 'permanent' : 'temporary'}
      PaperProps={{ className: clsx(classes.paper, { show }), elevation: 4 }}
    >
      <List>
        {navigations.map((nav) => (
          <ListItemButton
            key={`nav.menu@${nav[0]}`}
            component={Link}
            to={`${nav[0]}`}
            selected={location.pathname === nav[0]}
            className={classes.listItem}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              {nav[1].tabProps.icon}
            </ListItemIcon>
            <ListItemText
              primary={nav[1].tabProps.label}
              secondary={nav[1].tabProps.caption}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      <UserInfo />
    </Drawer>
  );
}

export default connector(Menu);
