import React from 'react';
import { useStaticQuery, graphql, Link } from "gatsby"
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
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
import RoomIcon from '@material-ui/icons/Room';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import "./header.css"
import {useStyleHeader} from "./common/style";
import AlarmIcon from '@material-ui/icons/Alarm';
import {Fade} from "@material-ui/core";
import Popper from '@material-ui/core/Popper';

const Header = (props) => {
  const classes = useStyleHeader()
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

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

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'transitions-popper' : undefined;

  const links = [
    {
      id: 1,
      name: 'Акции', 
      link: '/sale'
    },
    {
      id: 2,
      name: 'О нас', 
      link: '/o-nas'
    },
    // {
    //   id: 3,
    //   name: 'Отзывы', 
    //   link: '/otzyvy'
    // },
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
        {/*<div className={classes.topBarInfo}>*/}
        {/*<Grid container direction="row">*/}
        {/*  <Grid item xs={3}>*/}
        {/*    <Typography variant="button" align='center' component="p">*/}
        {/*       с 10:00 до 22:00*/}
        {/*    </Typography>*/}
        {/*  </Grid>*/}
        {/*  <Grid item xs={12} sm={6}>*/}
        {/*    <Typography variant="body2" align='center' component="p">*/}
        {/*      Бесплатная доставка по Уразово от 500р*/}
        {/*    </Typography>*/}
        {/*  </Grid>*/}
        {/*  <Grid item xs={3}>*/}
        {/*    <Typography variant="button" align='center' component='p' >*/}
        {/*      <a href='tel:+79040949222' style={{color: `white`}}> +7(904)094-92-22</a>*/}
        {/*    </Typography>*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
        {/*</div>*/}
        <Toolbar>
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
    </ul>
    </Typography>
    <div className="icon_start_xs">
      <Link to="/">
        <Imgs />
      </Link>
    </div>
          {props.clockSale &&
              <div style={{margin: `auto auto auto 0`}}>
              <IconButton style={{margin: `auto 0 auto auto`, height: `100%`}}>
                <AlarmIcon aria-describedby={id} onClick={handleClick} style={{color: `tomato`, fontSize: 22}} />
              </IconButton>
                <Popper style={{zIndex: 1500}} id={id} open={openPopover} anchorEl={anchorEl} transition>
                  {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={350}>
                        <div className={classes.paper}>Акция счастливые часы! <b>Скидка к заказу 10%.</b></div>
                      </Fade>
                  )}
                </Popper>
              </div>
          // <Typography variant="caption"
          //             style={{
          //               color: `tomato`,
          //               fontSize: `11px`,
          //               textAlign: 'center',
          //               backgroundColor: 'grey',
          //               padding: '15px'
          //             }}
          // >
          //   Счастливые часы</Typography>
          }
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
             <ListItem button component={Link} to="/sale"  activeStyle={{ color: "#000",
               backgroundColor: `#f0ecec`,
               boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
             }}>
              <ListItemIcon>
              <Icon className="fa fa-percent" style={{ marginLeft: `3px`}} color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Акции" />
            </ListItem>
            <ListItem button component={Link} to="/adres-i-kontakty" activeStyle={{ color: "#000",
              backgroundColor: `#f0ecec`,
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
            }}>
              <ListItemIcon><RoomIcon color="primary"/></ListItemIcon>
              <ListItemText primary="Адрес" />
            </ListItem>
            <ListItem button component={Link} to="/dostavka-i-oplata" activeStyle={{ color: "#000",
              backgroundColor: `#f0ecec`,
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
            }}>
              <ListItemIcon><LocalTaxiIcon color="action"/></ListItemIcon>
              <ListItemText primary="Доставка" />
            </ListItem>
        </List>
         <Divider />
        <List >
        {data.allContentfulIconMenuLeftPanel.edges.map(({node: iconButton})=> (
        <ListItem key={iconButton.id} button component={Link}
          activeStyle={{ color: "#000",
            backgroundColor: `#f0ecec`,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          }} to={`/${iconButton.slug}`}>
        <Icon className={classes.iconImg}>
          <Img fluid={iconButton.image.fluid} className={classes.iconImg} alt={iconButton.name}></Img>
        </Icon>
          <ListItemText className={classes.iconDiv} primary={iconButton.name} />
        </ListItem>
        ))}
        <Divider />
        </List>
      </Drawer>
     <ScrollTop/>
    <ProgressBar/>
    </div>

  );
}

export default Header
