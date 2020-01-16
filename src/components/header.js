import { Link, graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import AppBars from './AppBars'
import "./header.css"

import styled  from 'styled-components';

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
const Header = () => {

// const [value, setValue] = useState(0)
// const [activee, setActivee] = React.useState('')

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

return (
  <>
  <header className="header">
    <HeaderContent>
    
  <nav className="navbar navbar-expand-lg navbar-light">
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
  <AppBars/>
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