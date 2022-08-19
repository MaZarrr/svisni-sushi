import React from 'react';
import { Link } from "gatsby"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { StaticImage } from "gatsby-plugin-image";
import Hidden from "@mui/material/Hidden";
import loadable from "@loadable/component";
import { Grid, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

import DrawerMenu from './DrawerMenu'
import AppBars from './AppBars'

const ProgressBar = loadable(() => import('./common/progressBar'));
const Baskets = loadable(() => import('./korzinaComponent'));

const links = [
  {
    id: 1,
    name: 'Акции',
    link: '/sale/'
  },
  {
    id: 2,
    name: 'О нас',
    link: '/o-nas'
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
  },
];

const Header = () => {
    const classes = useStyleHeader();

    return <>
    <div className={classes.root}>
      <AppBar
          position="fixed"
          className={classes.appBar}
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            width: `100%`,
            height: `75px`,
            backgroundColor: "white",
          }}
          >
        <Toolbar>
            <Grid container>
            <Hidden smUp>
                <Grid item xs={4} style={{margin: `auto auto`}}>
                      <DrawerMenu />
                </Grid>
            </Hidden>

              <Hidden smDown>
              <Grid item sm={1}>
                <Link to="/">
                  <StaticImage layout="constrained"
                               loading={"eager"}
                               style={{maxWidth: 70}}
                               placeholder="blurred"
                               src="../images/logosvisni.png"
                               alt={"Свисни суши в Уразово"}/>
                </Link>
              </Grid>

              <Grid item 
              xs={9} 
              component={`ul`} 
              style={{margin: `auto 0`, display: `flex`, justifyContent: `space-around`}}>
                {
                links.map(({name, link, id}) => (
                    <li key={id} 
                    style={{ 
                      textDecoration: `none`,
                      listStyle: `none`, 
                      textAlign: `center`
                      }}>
                        <Typography> 
                      <Link to={link} activeStyle={{
                        border: `solid 1px #FC5185`,
                        borderBottomWidth: `3px`,
                        borderRadius: `8px`,
                        padding: 8,
                        color: 'red'
                        }} >
                        {name}
                      </Link>
                      </Typography> 
                    </li>
                ))
              }
              </Grid>
              </Hidden>

              <Hidden smUp>
                  <Grid item xs={4} style={{display: `flex`, justifyContent: `center`}}>
                      <Link to="/">
                          <StaticImage layout="constrained"
                                       loading={"eager"}
                                       placeholder="blurred"
                                       style={{maxWidth: 65}}
                                       src="../images/logosvisni.png"
                                       alt={"Свисни суши в Уразово"}/>
                      </Link>
                  </Grid>
              </Hidden>

              <Grid item xs={4} sm={2} style={{margin: `auto 0`, display: `flex`, justifyContent: `flex-end`}}>
                  <Baskets />
              </Grid>
          </Grid>

        </Toolbar>
      </AppBar>

      <ProgressBar/>
    </div>
    <AppBars/>
</>;
};

export default Header

export const useStyleHeader = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginBottom: '55px',
    justifyContent: 'space-between',
    zIndex: '1000'
  },
  appBar: {
    display: 'flex',
    justifyContent: 'space-around',
    width: `100%`,
    height: `75px`,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "white",
    // [theme.breakpoints.down('md')]: {
    //   height: `69px`,
    // }
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
  }
}));
