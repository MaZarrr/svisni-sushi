import { Link, graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React, {useState, useEffect, useCallback} from "react"

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


import "./header.css"

import styled  from 'styled-components';

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AppBar from '@material-ui/core/AppBar';
import Imgs from '../components/image';
import Img  from 'gatsby-image';

const HeaderContent = styled.div `
   font-family: 'Comfortaa', cursive;
    font-weight: 900;

>a {
    text-decoration: none;
  }

li {
  list-style: none;
  text-decoration: none;
}
.d {
  margin-right: 15px;
  color: white;
  text-decoration: none;
  font-size: 1.5vw;
}
>div {
  margin: auto 0;
  display: flex;
  flex-grow: 1;
}

@media screen and (max-width: 768px) {
.d {
    font-size: 2vw;
  }
}
`
const AppBarStyle = styled(AppBar) `
position: sticky;
top: 200px;
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

const Header = () => {
const [scrolled, setScrolled] = useState(false)
const [lastScrollTop, setLastScrollTop] = useState(0)
const [value, setValue] = useState(0)
// const [activee, setActivee] = React.useState('')

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


const data = useStaticQuery(graphql`
query {
  vk: file(relativePath: { eq: "social-img/vk.png" }) {
    childImageSharp {
      fluid(maxWidth: 50) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  ok: file(relativePath: { eq: "social-img/odnoklassniki.png" }) {
    childImageSharp {
      fluid(maxWidth: 50) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  inst: file(relativePath: { eq: "social-img/instagram.png" }) {
    childImageSharp {
      fluid(maxWidth: 50) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
}
`)

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

  // function a11yProps(index) {
  //   return {
  //     id: `scrollable-auto-tab-${index}`,
  //     'aria-controls': `scrollable-auto-tabpanel-${index}`,
  //   };
  // }

return (
  <>

  <header className="header">
    <HeaderContent>
    
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="icon_start">
       <Link to="/">
          <Imgs />
        </Link>
      </div>
      
    <div className="company_media">
      <ul>
      <li className="nav-item">
          <h5 className="phone_text"><a className="company_phone" href="tel:+79040949222">+7(904)094-92-22 </a> </h5>
        </li>
        <li className="nav-item">
          <p className="company_job">Работаем с 10 до 22.00</p>
        </li>
        <li>
        <div className="head">
            <div className="head_item header_social">
            <div className="head_social">
              <div className="head_social_img">
              <a href="https://vk.com/sushi_urazovo">
              <Img fluid={data.vk.childImageSharp.fluid}  style={{width: `30px`}} />
              </a>
              </div>
              <div className="head_social_img"> 
              <a href="https://www.instagram.com/svisni_sushi">
              <Img fluid={data.inst.childImageSharp.fluid}  style={{width: `30px`}} />
              </a>
              </div>
              <div className="head_social_img">
              <a href="https://ok.ru/group/55132913991911">
              <Img fluid={data.ok.childImageSharp.fluid}  style={{width: `30px`}} />
              </a>
              </div>
            </div>       
            </div>
          </div>
        
        </li>
      </ul>
  </div>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
  <div className="company info_xs">
      <ul className="info_content">
      <li className="nav_item_phone">
          <p className="company_adress">Уразово</p>
        </li>
        <li className="nav_item_phone">
         <a className="company_phone" href="tel:+79040949222">8(904)094-92-22 </a>
        </li>
      </ul>
  </div>
 
    <ul className="navbar-nav mt-2 mt-lg-0">
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
        <li className="head head_social_md">
        <div className="head">
            <div className="head_item header_social">
            <div className="head_social">
              <div className="head_social_img">
              <a href="https://vk.com/sushi_urazovo">
                <Img fluid={data.vk.childImageSharp.fluid}  style={{width: `30px`}} />
              </a>
              </div>
              <div className="head_social_img"> 
              <a href="https://www.instagram.com/svisni_sushi">
                <Img fluid={data.inst.childImageSharp.fluid}  style={{width: `30px`}} />
              </a>
              </div>
              <div className="head_social_img">
              <a href="https://ok.ru/group/55132913991911">
                <Img fluid={data.ok.childImageSharp.fluid}  style={{width: `30px`}} />
              </a>
              </div>
            </div>       
            </div>
          </div>
        </li>
    </ul>
  
    <div className="company info_xl">
      <ul>
      <li className="nav_item_phone dotted">
          <h5 className="phone_text"><a className="company_phone" href="tel:+79040949222">+7(904)094-92-22 </a> </h5>
        </li>
        <li className="nav_item_phone dotted">
          <p className="company_job">Работаем с 10 до 22.00</p>
        </li>
        <li className="nav_item_phone">
          <p className="company_adress">ул.3-го Интернационала д.48а, Уразово</p>
        </li>
      </ul>
  </div>
    
  </div>
</nav>

  </HeaderContent>
  
  </header> 
  
  <div className={scrolled ? 'app_bar scroll_bar_show' : 'app_bar' }>
  <AppBarStyle position="sticky" color="default" >
  <Tabs
  indicatorColor="primary"
  textColor="primary"
  variant="scrollable"
  value={value}
  scrollButtons="on"
  aria-label="scrollable force tabs example"
  >
    <Tab className="tabs" component={Link} to="/sety" value={0} label="Сеты" onClick={() => setValue(0)}
        icon={<img src={set}  alt="Сеты"></img>}/>
 
      <Tab className="tabs"  to="/pizza" component={Link} value={1} label="Пицца" onClick={() => setValue(1)} 
        icon={
      <img src={pizza} alt="сеты"></img>
        }
      />

      <Tab className="tabs" to="/slozhnyeRolly" component={Link} label="Сложные роллы" onClick={() => setValue(2)} 
          icon={
        <img src={bigRoll} alt="Сложные роллы"></img>
        }>
        </Tab>

      <Tab className="tabs" to="/zapechenyeRolly" component={Link} label="Горячие роллы" onClick={() => setValue(3)}
        icon={<img src={hotRoll} alt="сеты"></img>
        }
      />

      <Tab className="tabs" to="/klassicheskieRolly" component={Link} label="Классические"onClick={() => setValue(4)} 
        icon={
       <img src={smallRoll} alt="сеты"></img>
        }
      />

      <Tab className="tabs" to="/sety" component={Link} label="Напитки" onClick={() => setValue(5)} 
          icon={<img src={drink} alt="сеты"></img>
        }
      />

      <Tab className="tabs" to="/salaty" component={Link} label="Салаты" onClick={() => setValue(6)} 
        icon={<img src={salad} alt="сеты"></img>
        }
      />

      <Tab className="tabs" to="/sety" component={Link} label="Закуски" onClick={() => setValue(7)} 
        icon={<img src={soup} alt="сеты"></img>
        }
      />

      <Tab className="tabs" to="/sety" component={Link} label="Десеты" onClick={() => setValue(8)}  
          icon={
       <img src={desert} alt="сеты"></img>
        }
      />

      <Tab className="tabs" to="/sety" component={Link} label="Суши" onClick={() => setValue(9)} 
          icon={<img src={sushi} alt="сеты"></img>
        }
      />

      <Tab className="tabs" to="/sety" component={Link} label="Гунканы" onClick={() => setValue(10)} 
          icon={<img src={gunkan} alt="сеты"></img>
        }
      />
      {/* </TabsStyle> */}
  </Tabs>
</AppBarStyle>
</div>

</>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header







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