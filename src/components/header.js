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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon  from '@material-ui/icons/MoveToInbox';
import Img  from 'gatsby-image';
import Korzina from './korzinaComponent';
import ProgressBar from "./common/progressBar"
import Imgs from '../components/image';
import AppBars from './AppBars'
import ScrollTop from "./common/ScrollTop"
import Icon from '@material-ui/core/Icon';

import "./header.css"

const getImageData = graphql `
  query {
  set: file(relativePath: { eq: "icon-tab/set.png" }) {
      childImageSharp {
      fluid(maxWidth: 60) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  salad: file(relativePath: { eq: "icon-tab/salad.png" }) {
      childImageSharp {
      fluid(maxWidth: 60) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  bigRoll: file(relativePath: { eq: "icon-tab/big-roll-slogn.png" }) {
      childImageSharp {
      fluid(maxWidth: 60) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  smallRoll: file(relativePath: { eq: "icon-tab/small-roll.png" }) {
      childImageSharp {
      fluid(maxWidth: 60) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  drink: file(relativePath: { eq: "icon-tab/drink.png" }) {
      childImageSharp {
      fluid(maxWidth: 60) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  hotRoll: file(relativePath: { eq: "icon-tab/zapechenka.png" }) {
      childImageSharp {
      fluid(maxWidth: 60) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  sushi: file(relativePath: { eq: "icon-tab/sushi.png" }) {
      childImageSharp {
      fluid(maxWidth: 80) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  soup: file(relativePath: { eq: "icon-tab/soup.png" }) {
      childImageSharp {
      fluid(maxWidth: 60) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  pizza: file(relativePath: { eq: "icon-tab/pizza.png" }) {
      childImageSharp {
      fluid(maxWidth: 60) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  desert: file(relativePath: { eq: "icon-tab/desert.png" }) {
      childImageSharp {
      fluid(maxWidth: 80) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  gunkan: file(relativePath: { eq: "icon-tab/gunkan.png" }) {
      childImageSharp {
      fluid(maxWidth: 60) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  }
  `


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
    [theme.breakpoints.up('992')]: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 5,
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: -5,
    },
    backgroundColor: "tomato", 
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
  }
 
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const data = useStaticQuery(getImageData);
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
      name: 'Доставка и оплата', 
      link: '/dostavka-i-oplata'
    },
    {
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

    <AppBars data={data}/>

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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{backgroundColor: 'tomato'}}/> : <ChevronLeftIcon style={{backgroundColor: 'tomato'}}/>}
          </IconButton>
        </div>
        <Divider />
        <List> 
        <ListItem button component={Link} to="/sety" className={classes.iconDiv}>
        <Icon className={classes.iconImg}>
          <Img fluid={data.set.childImageSharp.fluid} className={classes.iconImg} alt="Сеты"></Img>
        </Icon>
          <ListItemText primary="Сеты" />
        </ListItem>

        <ListItem button component={Link} to="/pizza">
        <Icon className={classes.iconImg}>
          <Img fluid={data.pizza.childImageSharp.fluid} className={classes.iconImg} alt="Пицца"></Img>
        </Icon>
          <ListItemText primary="Пицца" />
        </ListItem>

        <ListItem button component={Link} to="/zapechenyeRolly">
        <Icon className={classes.iconImg}>
          <Img fluid={data.hotRoll.childImageSharp.fluid} className={classes.iconImg} alt="Горячие"></Img>
        </Icon>
          <ListItemText primary="Горячие" />
        </ListItem>

        <ListItem button component={Link} to="/slozhnyeRolly">
        <Icon className={classes.iconImg}>
          <Img fluid={data.bigRoll.childImageSharp.fluid} className={classes.iconImg} alt="Сложные"></Img>
        </Icon>
          <ListItemText primary="Сложные" />
        </ListItem>

        <ListItem button component={Link} to="/napitki">
        <Icon className={classes.iconImg}>
          <Img fluid={data.drink.childImageSharp.fluid} className={classes.iconImg} alt="Напитки"></Img>
        </Icon>
          <ListItemText primary="Напитки" />
        </ListItem>

        <ListItem button component={Link} to="/salaty">
        <Icon className={classes.iconImg}>
          <Img fluid={data.salad.childImageSharp.fluid} className={classes.iconImg} alt="Салаты"></Img>
        </Icon>
          <ListItemText primary="Салаты" />
        </ListItem>

        <ListItem button component={Link} to="/desert">
        <Icon className={classes.iconImg}>
          <Img fluid={data.desert.childImageSharp.fluid} className={classes.iconImg} alt="Десерты"></Img>
        </Icon>
          <ListItemText primary="Десерты" />
        </ListItem>

        <ListItem button component={Link} to="/zakyski">
        <Icon className={classes.iconImg}>
          <Img fluid={data.soup.childImageSharp.fluid} className={classes.iconImg} alt="Закуски"></Img>
        </Icon>
          <ListItemText primary="Закуски" />
        </ListItem>

        <ListItem button component={Link} to="/klassicheskieRolly">
        <Icon className={classes.iconImg}>
          <Img fluid={data.smallRoll.childImageSharp.fluid} className={classes.iconImg} alt="Маленькие роллы"></Img>
        </Icon>
          <ListItemText primary="Классические" />
        </ListItem>

        <ListItem button component={Link} to="/sushi">
        <Icon className={classes.iconImg}>
          <Img fluid={data.sushi.childImageSharp.fluid} className={classes.iconImg} alt="Суши"></Img>
        </Icon>
          <ListItemText primary="Суши" />
        </ListItem>

        <ListItem button component={Link} to="/gunkany">
        <Icon className={classes.iconImg}>
          <Img fluid={data.gunkan.childImageSharp.fluid} className={classes.iconImg} alt="Гунканы"></Img>
        </Icon>
          <ListItemText primary="Гунканы" />
        </ListItem>

        </List>
        <Divider />

        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
     <ScrollTop/>

    </div>

  );
}

export default Header