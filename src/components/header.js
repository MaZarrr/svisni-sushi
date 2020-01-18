import React from 'react';
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
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { Link } from "gatsby"
import Img  from 'gatsby-image';
import Korzina from './korzinaComponent';
import ProgressBar from "./common/progressBar"
import Imgs from '../components/image';
import AppBars from './AppBars'


import "./header.css"

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    zIndex: '1000'
  },
  appBar: {
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
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
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
 
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const links = [ 
    {
      name: 'Акции', 
      link: '/akcii'
    },
    {
      name: 'О нас', 
      link: '/o-nas'
    },
    {
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
          {/* <div className="head_container"> */}
          <div className="icon_start">
            <Link to="/">
              <Imgs />
            </Link>
          </div>
          <ul className={clsx(classes.content_link)}>
        { 
          links.map(({name, link}) => { 
          return (
          <li key={name} 
            className="nav-item">
            <Link to={link} 
              activeClassName="active"
              className="nav-link">
              {name}
            <span className="sr-only">(current)
            </span></Link>
          </li>
        )})
        }
        <ProgressBar/>
    </ul>
    <Korzina />
          </Typography>
        </Toolbar>

        <AppBars />

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
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
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
     

    </div>

  );
}

export default Header





// {/* <Typography paragraph>
// Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
// ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
// facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
// gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
// donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
// adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
// Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
// imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
// arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
// donec massa sapien faucibus et molestie ac.
// </Typography>
// <Typography paragraph>
// Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
// facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
// tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
// consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
// vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
// hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
// tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
// nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
// accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
// </Typography> */}




{/* <li className="head head_social_md">
<div className="head">

    <div className="head_item header_social">
    <div className="head_social">
      <div className="head_social_img">
      <a href="https://vk.com/sushi_urazovo">
        <Img fluid={vk}  style={{width: `30px`}} />
      </a>
      </div>
      <div className="head_social_img"> 
      <a href="https://www.instagram.com/svisni_sushi">
        <Img fluid={inst}  style={{width: `30px`}} />
      </a>
      </div>
      <div className="head_social_img">
      <a href="https://ok.ru/group/55132913991911">
        <Img fluid={ok}  style={{width: `30px`}} />
      </a>
      </div>
    </div>       
    </div>
  </div> 
</li> */}



// import PropTypes from "prop-types"
// import React from "react"
// import AppBars from './AppBars'


// import styled  from 'styled-components';

// import Imgs from '../components/image';

// import ProgressBar from "./common/progressBar"


// const HeaderContent = styled.div `
//    font-family: 'Comfortaa', cursive;
//     font-weight: 900;

// >a {
//     text-decoration: none;
//   }

// li {
//   list-style: none;
//   text-decoration: none;
// }
// .d {
//   margin-right: 15px;
//   color: white;
//   text-decoration: none;
//   font-size: 1.5vw;
// }
// >div {
//   margin: auto 0;
//   display: flex;
//   flex-grow: 1;
// }

// /* @media screen and (max-width: 768px) {

// } */
// `
// const Header = () => {
// // const [value, setValue] = useState(0)
// // const [activee, setActivee] = React.useState('')



// return (
//   <>
//   <ProgressBar/>
//   <header className="header">
//     <HeaderContent>
    
//   <nav className="navbar navbar-expand-lg navbar-light">
//       <div className="icon_start">
//        <Link to="/">
//           <Imgs />
//         </Link>
//       </div>
      
//     {/* <div className="company_media">
//       <ul>
//       <li className="nav-item">
//           <h5 className="phone_text"><a className="company_phone" href="tel:+79040949222">+7(904)094-92-22 </a> </h5>
//         </li>
//         <li className="nav-item">
//           <p className="company_job">Работаем с 10 до 22.00</p>
//         </li>
//         <li>
//         <div className="head">
//             <div className="head_item header_social">
//             <div className="head_social">
//               <div className="head_social_img">
//               <a href="https://vk.com/sushi_urazovo">
//               <Img fluid={vk}  style={{width: `30px`}} />
//               </a>
//               </div>
//               <div className="head_social_img"> 
//               <a href="https://www.instagram.com/svisni_sushi">
//               <Img fluid={inst}  style={{width: `30px`}} />
//               </a>
//               </div>
//               <div className="head_social_img">
//               <a href="https://ok.ru/group/55132913991911">
//               <Img fluid={ok}  style={{width: `30px`}} />
//               </a>
//               </div>
//             </div>       
//             </div>
//           </div>
        
//         </li>
//       </ul>
//   </div> */}
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>

//   <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
//   <div className="company info_xs">
//       <ul className="info_content">
//       <li className="nav_item_phone">
//           <p className="company_adress">Уразово</p>
//         </li>
//         <li className="nav_item_phone">
//          <a className="company_phone" href="tel:+79040949222">8(904)094-92-22 </a>
//         </li>
//       </ul>
//   </div>
 

  
//     <div className="company info_xl">
//       <ul>
//       <li className="nav_item_phone dotted">
//           <h5 className="phone_text"><a className="company_phone" href="tel:+79040949222">+7(904)094-92-22 </a> </h5>
//         </li>
//         <li className="nav_item_phone dotted">
//           <p className="company_job">Работаем с 10 до 22.00</p>
//         </li>
//         <li className="nav_item_phone">
//           <p className="company_adress">ул.3-го Интернационала д.48а, Уразово</p>
//         </li>
//       </ul>
//   </div>
    
//   </div>
// </nav>

//   </HeaderContent>
//   <AppBars/>
//   </header> 
//   </>
//   )
// }

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// }

// Header.defaultProps = {
//   siteTitle: ``,
// }

//==========================================================================







//           {/* const isActive = active === name
//           const clazz = isActive ? 'focus' : '' */}
// {/* 
//           <li key={name} 
//           className={`nav-link ${clazz}`} 
//              onClick={() => setActive(name)}> */}




  // {/* <nav className="navbar navbar-light bg-light navbar-expand-lg">
  // <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  //   <span className="navbar-toggler-icon"></span>
  // </button>

  // <div className="collapse navbar-collapse" id="navbarSupportedContent">
  //   <ul className="navbar-nav mr-auto">
  //     <li className="nav-item active">
  //       <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
  //     </li>
  //   </ul>
  //   </div>
  // </nav> */}