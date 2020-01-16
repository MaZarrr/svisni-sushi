import React, {useState, useEffect, useCallback} from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import "./header.css"

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';

import styled  from 'styled-components';
import PropTypes from 'prop-types';

import set from '../images/icon-tab/set.png'
import salad from '../images/icon-tab/salad.png'
import bigRoll from '../images/icon-tab/big-roll-slogn.png'
import smallRoll from '../images/icon-tab/small-roll.png'
import drink from '../images/icon-tab/drink.png'
import hotRoll from '../images/icon-tab/zapechenka.png'
import sushi from '../images/icon-tab/sushi.png'
import soup from '../images/icon-tab/soup.png'
import pizza from '../images/icon-tab/pizza.png'
import desert from '../images/icon-tab/desert.png'
import gunkan from '../images/icon-tab/gunkan.png'

const AppBarStyle = styled(AppBar) `
.tabs {
  font-family: 'Neucha', cursive;
  font-weight: 700;
  color: darkslategray;
  background-color: white;
  text-decoration: none;
  transition: 0.1s;
  transform: scale(1);
  letter-spacing: 1px;
  &:hover {
    transition: 0.1s;
    transform: scale(1.05);
    color: darkslateblue;
    }
  }
@media screen and (min-width: 768px) {
  margin-top: 0;
}
`

// We can inject some CSS into the DOM.
const styles = {
  root: {
    transition: '1s',
    position: 'sticky',
    top: '80px',
    zindex: '999',
    // background: 'tomato',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // borderRadius: 3,
    // border: 0,
    // color: 'white',
    // height: 48,
    // padding: '0 30px',
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  st: {
    transition: '1s',
    top: '-30%',
  },
};
function ClassNames(props) {
  const { classes, children, className, ...other } = props;
  const [scrolled, setScrolled] = useState(false)
  const [lastScrollTop, setLastScrollTop] = useState(0)

  const scrolling = useCallback(() => {
    let st = window.scrollY
      if(st > lastScrollTop) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
    setLastScrollTop(st)
    
  }, [lastScrollTop])
  
  
  useEffect(() =>{
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
          icon={<img src={set}  alt="Сеты"></img>}/>
   
        <Tab className="tabs"  to="/pizza" component={Link} value={1} label="Пицца" {...a11yProps(1)}
          icon={
        <img src={pizza} alt="сеты"></img>
          }
        />
  
        <Tab className="tabs" to="/slozhnyeRolly" component={Link} label="Сложные роллы" {...a11yProps(2)}
            icon={
          <img src={bigRoll} alt="Сложные роллы"></img>
          }>
          </Tab>
  
        <Tab className="tabs" to="/zapechenyeRolly" component={Link} label="Горячие роллы" {...a11yProps(3)}
          icon={<img src={hotRoll} alt="сеты"></img>
          }
        />
  
        <Tab className="tabs" to="/klassicheskieRolly" component={Link} label="Классические" {...a11yProps(4)} 
          icon={
         <img src={smallRoll} alt="сеты"></img>
          }
        />
  
        <Tab className="tabs" to="/sety" component={Link} label="Напитки" {...a11yProps(5)} 
            icon={<img src={drink} alt="сеты"></img>
          }
        />
  
        <Tab className="tabs" to="/salaty" component={Link} label="Салаты" {...a11yProps(6)}
          icon={<img src={salad} alt="сеты"></img>
          }
        />
  
        <Tab className="tabs" to="/sety" component={Link} label="Закуски" {...a11yProps(7)}
          icon={<img src={soup} alt="сеты"></img>
          }
        />
  
        <Tab className="tabs" to="/sety" component={Link} label="Десеты" {...a11yProps(8)}  
            icon={
         <img src={desert} alt="сеты"></img>
          }
        />
  
        <Tab className="tabs" to="/sety" component={Link} label="Суши" {...a11yProps(9)}
            icon={<img src={sushi} alt="сеты"></img>
          }
        />
  
        <Tab className="tabs" to="/sety" component={Link} label="Гунканы" {...a11yProps(10)} 
            icon={<img src={gunkan} alt="сеты"></img>
          }
        />
        {/* </TabsStyle> */}
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






