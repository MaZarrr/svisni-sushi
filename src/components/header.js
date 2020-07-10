import React from 'react';
import { Link } from "gatsby"
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Korzina from './korzinaComponent';
import ProgressBar from "./common/progressBar"
import useImageHook from '../components/image';
import AppBars from './AppBars'

import ScrollTop from "./common/ScrollTop"

import "./header.css"
import {useStyleHeader} from "./common/style";
import DrawerMenu from './DrawerMenu'
import GatsbyImage from "gatsby-image";

const Header = () => {
  const classes = useStyleHeader()
   const [{avatarImage, placeholderImage},] = useImageHook();

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
  ]
  return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="fixed"
            className={classes.appBar}>
          <Toolbar>
            <DrawerMenu className={classes.menuButton} image={avatarImage.childImageSharp}/>
            <div className={clsx(classes.content_header)}>
              <ul className={clsx(classes.content_link)}>
                <div className="icon_start">
                  <Link to="/">
                    <GatsbyImage fluid={placeholderImage.childImageSharp.fluid} alt={"логотип свисни суши"}/>
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
            </div>
            <div className="icon_start_xs">
              <Link to="/">
                <GatsbyImage fluid={placeholderImage.childImageSharp.fluid} alt={"логотип свисни суши"}/>
              </Link>
            </div>

            <Korzina />
          </Toolbar>
          <AppBars/>
        </AppBar>

        <ScrollTop/>
        <ProgressBar/>
      </div>

  );
}

export default Header
