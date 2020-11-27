import React from 'react';
import { Link } from "gatsby"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import useImageStaticHook from '../components/image';
import { useStyleHeader } from "./common/style";
import GatsbyImage from "gatsby-image";
import Hidden from "@material-ui/core/Hidden";
import loadable from "@loadable/component";
import {Grid} from "@material-ui/core";

// my components
import DrawerMenu from './DrawerMenu'
import AppBars from './AppBars'
const ScrollTop = loadable(() => import('./common/ScrollTop'));
const ProgressBar = loadable(() => import('./common/progressBar'));
const Korzina = loadable(() => import('./korzinaComponent'));

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
    const [{avatarImage, placeholderImage},] = useImageStaticHook();

  return (
      <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="fixed"
            className={classes.appBar}>
          <Toolbar>
              <Grid container>
              <Hidden smUp>
                  <Grid item xs={3} style={{margin: `auto auto`}}>
                        <DrawerMenu image={avatarImage.childImageSharp}/>
                  </Grid>
              </Hidden>

                <Hidden xsDown>

                <Grid item sm={2}>
                <Link to="/">
                    <GatsbyImage style={{width: 70, margin: `auto auto`}}
                                 fluid={placeholderImage.childImageSharp.fluid}
                                 alt={"логотип свисни суши"}/>
                  </Link>
                </Grid>

                <Grid item xs={8} component={`ul`} style={{margin: `auto 0`}}>
                  <Grid container>
              {
                  links.map(({name, link, id}) => (
                      <Grid item component={"li"} key={id} sm={3} style={{ textDecoration: `none`,
                        listStyle: `none`, fontFamily: 'Montserrat, sans-serif', textAlign: `center`}}>
                        <Link to={link} activeStyle={{ border: `solid 1px #FC5185`,
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
                    <Grid item xs={6}>
                        <Link to="/">
                            <GatsbyImage style={{width: 65, margin: `auto auto`}} fluid={placeholderImage.childImageSharp.fluid} alt={"логотип свисни суши"}/>
                        </Link>
                    </Grid>
                </Hidden>

                <Grid item xs={3} sm={2} style={{margin: `auto 0`}}>
                    <Korzina />
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
