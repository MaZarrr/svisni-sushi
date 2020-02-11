import React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby"
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Img  from 'gatsby-image';
import Korzina from './korzinaComponent';
import ProgressBar from "./common/progressBar"
import Imgs from '../components/image';
import AppBars from './AppBars'
import ScrollTop from "./common/ScrollTop"
import Icon from '@material-ui/core/Icon';

import "./header.css"

const drawerWidth = 190;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    zIndex: '1000'
  },
  appBar: {
    display: 'flex',
    justifyContent: 'space-around',
    width: `100%`,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "white", 
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    fontSize: `10px`,
    color: `tomato`,
    border: `1px solid tomato`,
    // [theme.breakpoints.up('992')]: {
    //   display: 'none',
    // },
    // [theme.breakpoints.down('sm')]: {
    //   marginLeft: 5,
    // },
    // [theme.breakpoints.down('md')]: {
    //   marginLeft: -5,
    // },
    // backgroundColor: "tomato", 
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    [theme.breakpoints.up('992')]: {
      display: 'none',
    }
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7.2) + 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  content_header: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%'
  },
  content_link: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: 'auto 0',
    width: '100%',
    [theme.breakpoints.down('992')]: {
      display: 'none',
    }
  },
  button: {
    maxWidth: '20px',
  },
  iconImg: {
    height: '25px',
    // width: '10vw',
    width: '25px',
    marginRight: 17,
  },
  iconDiv: {
    span: {
      fontFamily: 'Neucha, cursive',
      fontWeight: 800
    }
  }
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
 
  const data = useStaticQuery(graphql `
  {
    allContentfulIconMenuLeftPanel(sort: {fields: deck}) {
    edges {
      node {
        id
        name
        slug
        image {
          fluid(maxWidth: 50) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
  }
  `)

  
  const links = [ 
    {
      id: 1,
      name: 'Акции', 
      link: '/akcii'
    },
    {
      id: 2,
      name: 'О нас', 
      link: '/o-nas'
    },
    {
      id: 3,
      name: 'Отзывы', 
      link: '/otzyvy'
    },
    {
      id: 4,
      name: 'Доставка и оплата', 
      link: '/dostavka-i-oplata'
    },
    {
      id: 5,
      name: 'Адрес и контакты', 
      link: '/adres-i-kontakty'
    }
  ]

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
 
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
        <div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          </div>
          <Typography variant="h6" noWrap className={clsx(classes.content_header)}>
      
          <ul className={clsx(classes.content_link)}>
          <div className="icon_start">
            <Link to="/">
              <Imgs />
            </Link>
          </div>
        { 
          links.map(({name, link, id}) => (
          <li key={id} className="nav-item">
            <Link to={link} 
              activeClassName="active"
              className="nav-link">
              {name}
          </Link>
          </li> 
        ))
        }
    <ProgressBar/>
    </ul>       
    </Typography>
    <div className="icon_start icon_start_xs">
            <Link to="/">
              <Imgs />
            </Link>
          </div>
    <Korzina />
    </Toolbar>

    <AppBars/>

    </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton size="small" onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{backgroundColor: `tomato`}}/> 
            : <ChevronLeftIcon style={{backgroundColor: `tomato`}}/>}
          </IconButton>
        </div>
        <Divider />
        <List> 
        {data.allContentfulIconMenuLeftPanel.edges.map(({node: iconButton})=> (
        <ListItem key={iconButton.id} button component={Link} 
        activeStyle={{ color: "tomato", 
        borderBottom: `1px solid tomato`,
        borderTop: `1px solid tomato`
        }} to={`/${iconButton.slug}`}>
        <Icon className={classes.iconImg}>
          <Img fluid={iconButton.image.fluid} className={classes.iconImg} alt={iconButton.name}></Img>
        </Icon>
          <ListItemText className={classes.iconDiv} primary={iconButton.name} />
        </ListItem>
        ))}
        </List>
        <Divider />
      </Drawer>
     <ScrollTop/>

    </div>

  );
}

export default Header
