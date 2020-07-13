import React, {useState, useRef, useEffect} from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import PropTypes from 'prop-types';
import "./header.css"
import Img  from 'gatsby-image';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

import styled  from 'styled-components';
import {Hidden} from "@material-ui/core";

const AppBarStyle = styled(AppBar) `
.tabs {
  font-family: Comfortaa, cursive;
  font-weight: 800;
  font-size: 13px;
  background-color: white;
  text-decoration: none;
  letter-spacing: 1px;
  }
`;
  // We can inject some CSS into the DOM.
const styles = theme =>( {
  root: {
    position: 'fixed',
    transition: '1.1s',
    top: '65px',
    background: `#ffcccc`,
  },
  st: {
    background: `#e0e0e0`,
    transition: '1s',
    top: '-20%',
  },
  imageMenu: {
    width: 48
  }
});

const AppBars = (props) => {
  const { classes, children, className, ...other 
  } = props;

  const [hideOnScroll, setHideOnScroll] = useState(true)
  const [value, setValue] = React.useState(1);

   const handleChange = (event, newValue) => {
     setValue(newValue);
   };

  const data = useStaticQuery(graphql `
  {
    allContentfulIconMenuLeftPanel(sort: {fields: deck}) {
    edges {
      node {
        id
        name
        deck
        slug
        image {
          fluid(maxWidth: 70) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
  }
  `)

  const isBrowser = typeof window !== `undefined` // проверить, готов ли DOM и существует ли контекст окна. Самый простой способ сделать 
  // это - проверить, определено ли окно.

function getScrollPosition({ element, useWindow }) { // функция, чтобы получить текущую позицию прокрутки
  if (!isBrowser) return { x: 0, y: 0 } // проверяем, работает ли он в браузере иначе, просто возвращаем {x: 0, y: 0} значения по умолчанию.

  const target = element ? element.current : document.body // мы проверяем, запрашивал ли пользователь 
  // положение прокрутки всей страницы или какого-либо конкретного элемента внутри нее.
  const position = target.getBoundingClientRect()
  
  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top }
}

function useScrollPosition(effect, deps, element, useWindow, wait) {

  const position = useRef(getScrollPosition({ useWindow })) // сохранить координаты текущей позиции, введем переменную положения с состоянием.
  // Это удобно для хранения любого изменяемого значения примерно так же, как вы используете поля экземпляров в классах
  // это значение с состоянием, которое не будет вызывать повторный рендеринг при каждом изменении состояния.

  let throttleTimeout = null

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow }) 
    effect({ prevPos: position.current, currPos })
    position.current = currPos
    throttleTimeout = null
  }
// && window.screen.width > 769
  useEffect(() => {
      const handleScroll = () => {
      if(window.screen.width > 769) {
        if (wait) {
          if (throttleTimeout === null) {
            throttleTimeout = setTimeout(callBack, wait)
        }
      } else {
        callBack()
      }
    }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, deps)
}

useScrollPosition(({ prevPos, currPos }) => {
  const isShow = currPos.y > prevPos.y
  if (isShow !== hideOnScroll) setHideOnScroll(isShow)
}, [hideOnScroll])
  
  function a11yProps(index){
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

  return (
    <AppBarStyle className={clsx(!hideOnScroll  ? classes.st : classes.root, className)} {...other}>
    <Tabs
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      value={value}
      onChange={handleChange}
      scrollButtons="on"
    >
    {data.allContentfulIconMenuLeftPanel.edges.map(({node: menu}, index) => (
      <Tab key={menu.id} className="tabs" component={Link} to={`/${menu.slug}`} 
      value={index + 1} label={menu.name} {...a11yProps(menu.deck)}
           icon={<Hidden xsDown><Img fluid={menu.image.fluid} className={classes.imageMenu} imgStyle={{maxWidth: 65}} alt={menu.name} /></Hidden>}/>
    ))}
    </Tabs>
  </AppBarStyle>
  );
};

AppBars.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(AppBars);







//   const [scrolled, setScrolled] = useState(ins)
//   const [lastScrollTop, setLastScrollTop] = useState(inst)

  // const scrolling = useCallback(() => {
  //   let st = window.scrollY
  //     if(st > lastScrollTop && lastScrollTop > 70) {
  //     setScrolled(true)
  //   } else {
  //     setScrolled(false)
  //   }
  //   setLastScrollTop(st)
    
  // }, [lastScrollTop])


  // useEffect(() => {
  //   console.log(lastScrollTop)
  //   console.log(scrolled)
  //   // console.log(data)
  //   window.addEventListener('scroll', scrolling)
  //  return () => window.removeEventListener('scroll', scrolling)
  // }, [scrolling])
