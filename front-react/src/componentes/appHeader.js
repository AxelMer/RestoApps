import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import { makeStyles, Drawer, AppBar, CssBaseline, Toolbar, List, Typography } from '@material-ui/core';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  button:{
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
}));

export default function ClippedDrawer() {
  const classes = useStyles();
  let valorText = ['Home', 'Adm. de Cuenta', 'Adm. Salon', 'Adm. Menu'];
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        <Typography variant="h5" component="span" noWrap>
          Resto APP
          </Typography>
          <Typography variant="h6" component="span" noWrap className={classes.title}>
          </Typography>
          <Button className={classes.button} variant="contained"noWrap component="span" >
            Cerrar Sesion 
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
            {}
          {['home', 'adm-cuenta', 'adm-salon', 'adm-menu'].map((text, index) => (
            <ListItem  button key={text} component={Link} to={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={valorText[index]} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
                
      </main>
    </div>
  );
}
