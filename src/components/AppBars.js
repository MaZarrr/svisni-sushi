import React, {useState, useLayoutEffect, useRef} from "react"
import { Link, useStaticQuery, graphql  } from "gatsby"
import PropTypes from 'prop-types';
import "./header.css"
import Img  from 'gatsby-image';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

import styled  from 'styled-components';

const AppBarStyle = styled(AppBar) `
.tabs {
  font-family: 'Neucha', cursive;
  font-weight: 700;
  color: darkslategray;
  background-color: white;
  text-decoration: none;
  letter-spacing: 1px;
  }
`
  // We can inject some CSS into the DOM.
const styles = theme =>( {
  root: {
    position: 'fixed',
    transition: '1s',
    top: '65px',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    [theme.breakpoints.down('992')]: {
      display: 'none',
    }
  },
  st: {
    transition: '0.8s',
    top: '-30%',
  },
});


function AppBars(props) {
  const { classes, children, className, data, ...other 
  } = props;

  const [hideOnScroll, setHideOnScroll] = useState(true)

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

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait)
        }
      } else {
        callBack()
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
  
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

  return (
    <AppBarStyle className={clsx(!hideOnScroll ? classes.st : classes.root, className)} {...other}>
    <Tabs
      indicatorColor="primary"
      textColor="primary"
      variant="scrollable"
      value={0}
      scrollButtons="on"
      aria-label="scrollable force tabs example"
    >
        <Tab className="tabs" component={Link} to="/sety" value={0} label="Сеты" {...a11yProps(0)}
          icon={<Img fluid={data.set.childImageSharp.fluid} style={{width: `65px`}} alt="Сеты"></Img>}/>
   
        <Tab className="tabs"  to="/pizza" component={Link} value={1} label="Пицца" {...a11yProps(1)}
          icon={<Img fluid={data.pizza.childImageSharp.fluid} style={{width: `65px`}} alt="Пицца"></Img>}/>
  
        <Tab className="tabs" to="/slozhnyeRolly" component={Link} label="Сложные роллы" {...a11yProps(2)}
            icon={<Img fluid={data.bigRoll.childImageSharp.fluid} style={{width: `65px`}} alt="Сложные роллы"></Img>}>
          </Tab>

        <Tab className="tabs" to="/zapechenyeRolly" component={Link} label="Горячие роллы" {...a11yProps(3)}
          icon={<Img fluid={data.hotRoll.childImageSharp.fluid} style={{width: `65px`}} alt="Запеченые роллы"></Img>}/>
  
        <Tab className="tabs" to="/klassicheskieRolly" component={Link} label="Классические" {...a11yProps(4)} 
          icon={<Img fluid={data.smallRoll.childImageSharp.fluid} style={{width: `65px`}} alt="Классические роллы"></Img>}/>
  
        <Tab className="tabs" to="/napitki" component={Link} label="Напитки" {...a11yProps(5)} 
            icon={<Img fluid={data.drink.childImageSharp.fluid} style={{width: `65px`}} alt="Напитки"></Img>}/>
  
        <Tab className="tabs" to="/salaty" component={Link} label="Салаты" {...a11yProps(6)}
          icon={<Img fluid={data.salad.childImageSharp.fluid} style={{width: `65px`}} alt="Салаты"></Img>}/>

        <Tab className="tabs" to="/sety" component={Link} label="Закуски" {...a11yProps(7)}
          icon={<Img fluid={data.soup.childImageSharp.fluid} style={{width: `65px`}} alt="Закуски"></Img>}/>
  
        <Tab className="tabs" to="/sety" component={Link} label="Десеты" {...a11yProps(8)}  
            icon={<Img fluid={data.desert.childImageSharp.fluid} style={{width: `65px`}} alt="Десеты"></Img>}/>
  
        <Tab className="tabs" to="/sety" component={Link} label="Суши" {...a11yProps(9)}
            icon={<Img fluid={data.sushi.childImageSharp.fluid} style={{width: `65px`}} alt="Суши"></Img>}/>
  
        <Tab className="tabs" to="/sety" component={Link} label="Гунканы" {...a11yProps(10)} 
            icon={<Img fluid={data.gunkan.childImageSharp.fluid} style={{width: `65px`}}  alt="Гунканы"></Img>}/>
    </Tabs>
  </AppBarStyle>
  );
}

AppBars.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(AppBars);

//  const ins = useMemo(() => (false), []);
//   const inst = useMemo(() => (0), []);
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
