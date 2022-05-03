import {
  Drawer,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ApplicationState } from '@/view/store';
import { hideMenu as _hideMenu } from '@/view/store/actions/app/hideMenu';
import clsx from 'clsx';
import { ReactElement, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useBreakpoints } from '@/view/hooks/useBreakpoints';
import { Navigations } from '../../Navigations';

export const menuFullWidth = 260;

/**
 * Menu will be full screen on < $menuFullWidth
 * Menu will be floating on $menuFullWidth - md
 * Menu will be a part of body on > md
 */
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
}));

const connector = connect(
  (state: ApplicationState) => ({
    show: state.app.showMenu,
  }),
  {
    hideMenu: _hideMenu,
  },
);

function Menu({
  show,
  hideMenu,
}: ConnectedProps<typeof connector>): ReactElement {
  const classes = useStyles();
  const checker = useBreakpoints();
  const navigations = useMemo(() => {
    const allMenu = Navigations.getInstance().getAllNavigations();

    return allMenu.filter((nav) => nav[1].tabProps);
  }, []);

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
          <ListItemButton key={`nav.menu@${nav[0]}`}>
            <ListItemAvatar>{nav[1].tabProps.avatar}</ListItemAvatar>
            <ListItemText
              primary={nav[1].tabProps.label}
              secondary={nav[1].tabProps.caption}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default connector(Menu);
