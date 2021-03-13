import React from 'react';
import { Link } from "gatsby"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { StaticImage } from "gatsby-plugin-image";
import Hidden from "@material-ui/core/Hidden";
import loadable from "@loadable/component";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles"

import DrawerMenu from './DrawerMenu'
import AppBars from './AppBars'
import ScrollTop from './common/ScrollTop'
// import ProgressBar from './common/progressBar'
// import Baskets from './korzinaComponent'

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
  }
];

const Header = () => {
    const classes = useStyleHeader();

    return (
      <>
      <div className={classes.root}>

        <AppBar
            position="fixed"
            classes={{colorPrimary: classes.colorPrimary}}
            className={classes.appBar}>
          <Toolbar>
              <Grid container>
              <Hidden smUp>
                  <Grid item xs={4} style={{margin: `auto auto`}}>
                        <DrawerMenu />
                  </Grid>
              </Hidden>

                <Hidden xsDown>
                <Grid item sm={1}>
                  <Link to="/">
                    <StaticImage layout="constrained"
                                 loading={"eager"}
                                 style={{maxWidth: 70}}
                                 placeholder="tracedSVG"
                                 src="../images/logosvisni.png"
                                 alt={"Свисни суши в Уразово"}/>
                  </Link>
                </Grid>

                <Grid item xs={9} component={`ul`} style={{margin: `auto 0`}}>
                <Grid container>
                {
                  links.map(({name, link, id}) => (
                      <Grid item component={"li"} key={id} sm={3} style={{ textDecoration: `none`,
                        listStyle: `none`, fontFamily: 'Montserrat, sans-serif', textAlign: `center`}}>
                        <Link to={link}  activeStyle={{ border: `solid 1px #FC5185`,
                          borderBottomWidth: `3px`,
                          borderRadius: `8px`,
                          padding: 10,
                          color: `blueviolet`}}>
                            {name}
                        </Link>
                      </Grid>

                  ))
                }
                </Grid>
                </Grid>
                </Hidden>

                <Hidden smUp>
                    <Grid item xs={4} style={{display: `flex`, justifyContent: `center`}}>
                        <Link to="/">
                            <StaticImage layout="constrained"
                                         loading={"eager"}
                                         placeholder="tracedSVG"
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

        <Hidden smDown>
          <ScrollTop/>
        </Hidden>

        <ProgressBar/>
      </div>
      <AppBars/>
</>
  );
};

export default Header

export const useStyleHeader = makeStyles(theme => ({
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
