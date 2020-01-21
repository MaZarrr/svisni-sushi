import React, {useState, useEffect, useCallback, useMemo} from "react"
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


function ClassNames(props) {
  const { classes, children, className, data, ...other 
  } = props;

  const ins = useMemo(() => (false), []);
  const inst = useMemo(() => (0), []);
  const [scrolled, setScrolled] = useState(ins)
  const [lastScrollTop, setLastScrollTop] = useState(inst)
  console.log(data)

  const scrolling = useCallback(() => {
    let st = window.scrollY
      if(st > lastScrollTop && lastScrollTop > 70) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
    setLastScrollTop(st)
    
  }, [lastScrollTop])
 
  
  useEffect(() => {
    console.log(lastScrollTop)
    console.log(scrolled)
    window.addEventListener('scroll', scrolling)
   return ()=> window.removeEventListener('scroll', scrolling)
  }, [scrolling])

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

  return (
    <AppBarStyle className={clsx(scrolled ? classes.st : classes.root, className)} {...other}>
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

ClassNames.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(ClassNames);






