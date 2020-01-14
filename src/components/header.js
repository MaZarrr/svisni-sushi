import { Link, graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

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
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-weight: 700;

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
@media screen and (min-width: 768px) {
  margin-top: 0;
}
`

const KorzinaItem = styled.div `
  background-color: white;
  width: 17vh;
  position: fixed;
  top: 55%;
  right: 0;
  z-index: 100;
  margin: 0;
  padding: 8px 5px 8px 5px;
  border-radius: 30%;
  border: 2px solid lightgrey;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.35);

  transition: 0.1s ease-in-out;
  transform: scale(1) translateX(0);

&:hover {
  transition: 0.1s ease-in;
  transform: scale(1.09) translateX(-6px);
}

.korzina_img {
  text-decoration: none;
  margin: 0;
  padding: 0;
}

.korzina_content {
  text-align: center;
  font-size: 14px;
}
`

const TabsStyle = styled(Tab) `
  text-decoration: none;

  .tabs {
    text-decoration: none;
  }
`  

const Header = (props) => {
// const [activee, setActivee] = React.useState('')

const data = useStaticQuery(graphql`
query {
  korzina: file(relativePath: { eq: "icon-tab/korzina.png" }) {
    childImageSharp {
      fluid(maxWidth: 120) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
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

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

return (
  <>

  <header>
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
  
  <AppBarStyle position="sticky" color="default" >
  <Tabs
  indicatorColor="primary"
  textColor="primary"
  variant="scrollable"
  scrollButtons="on"
  aria-label="scrollable force tabs example"
  >
    <TabsStyle className="tabs" component={Link} to="/sety" value={0} label="Сеты" state={{choice: "Сеты"}}  {...a11yProps(0)} 
        icon={<img src={set}  alt="Сеты"></img>}>
    </TabsStyle>
 
      <Tab className="tabs"  to="/pizza" component={Link} value={1} label="Пицца" {...a11yProps(1)} 
        icon={
      <img src={pizza} alt="сеты"></img>
        }
      />

      <Tab to="/slozhnyeRolly" component={Link} label="Сложные роллы" {...a11yProps(2)} 
          icon={
        <img src={bigRoll} alt="Сложные роллы"></img>
        }>
        </Tab>

      <Tab to="/zapechenyeRolly" activeClassName="active" component={Link} label="Горячие роллы" {...a11yProps(3)} 
        icon={<img src={hotRoll} alt="сеты"></img>
        }
      />

      <Tab to="/klassicheskieRolly" component={Link} label="Классические роллы" {...a11yProps(4)} 
        icon={
       <img src={smallRoll} alt="сеты"></img>
        }
      />

      <Tab to="/sety" component={Link} label="Напитки" {...a11yProps(5)} 
          icon={<img src={drink} alt="сеты"></img>
        }
      />

      <Tab to="/salaty" component={Link} label="Салаты" {...a11yProps(6)} 
        icon={<img src={salad} alt="сеты"></img>
        }
      />

      <Tab to="/sety" component={Link} label="Закуски" {...a11yProps(7)} 
        icon={<img src={soup} alt="сеты"></img>
        }
      />

      <Tab to="/sety" component={Link} label="Десеты" {...a11yProps(8)} 
          icon={
       <img src={desert} alt="сеты"></img>
        }
      />

      <Tab to="/sety" component={Link} label="Суши" {...a11yProps(9)} 
          icon={<img src={sushi} alt="сеты"></img>
        }
      />

      <Tab to="/sety" component={Link} label="Гунканы" {...a11yProps(10)} 
          icon={<img src={gunkan} alt="сеты"></img>
        }
      />
      {/* </TabsStyle> */}
  </Tabs>
</AppBarStyle>
  
<KorzinaItem>
    <Link className="korzina_img" to="/korzina">
      <div className="korzina_content">
        <Img fluid={data.korzina.childImageSharp.fluid} />
      </div>
      <div className="korzina_content">
      <b><span>{props.numItems} ({props.total} ₽)</span></b>     
      </div>
    </Link>
  </KorzinaItem>

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