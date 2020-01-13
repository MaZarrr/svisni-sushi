import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.css"
import { Link } from "gatsby"

import vk from "../images/social-img/vk.png"
import inst from "../images/social-img/instagram.png"
import ok from "../images/social-img/odnoklassniki.png"

import logosvisni from "../images/logosvisni.png"
import styled  from 'styled-components';
import * as R from 'ramda'

import ErrorBoundary from './error-boundary/error-boundary';
import { connect } from 'react-redux';


const Footer = styled.footer `
   background-color: #303032;
   color: white;
   font-weight: bold;
   margin-top: 50px;
   padding: 30px 0 30px 0;
`

const FooterUl = styled.ul `
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
 
  
  .footer_item {
    display: flex;
    flex-direction: column;
  }

  .footer_item p {
    max-width: 300px;
  }

 .footer_item a {
    text-decoration: none;
    color: white;
  }

  .footer_info_st a {
    margin-top: 8px;
    padding: 0 5px;
    background-color: #291E1E;
    border-radius: 5px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.53);
    transition: 0.05s;
    transform: scale(1);
  }

  .footer_info_st a:hover {
    transition: 0.2s;
    transform: scale(1.03);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.9);
  }

  .footer_items {
    padding: 0 30px 0 30px;
  }

  .footer_items li {
    list-style: none;
    margin: auto 0;
  }

  .foter_t {
    text-align: center;
  }

  .foooter_logo {
    max-width: 120px;
  }

  /* .footer_social{
    display: flex;
  } */

.footer_info {
  display: flex;
}

  .footer_social img {
    max-width: 35px;
  }

  .social_container {
    display: flex;
  }
  .social_img {
    max-width: 35px;
    margin: 0 5px 0 0;
  }

  .social_img:hover {
    transition: 0.2s;
    transform: scale(1.1);
  }

  @media screen and (max-width: 768px) {
    .footer_items {
      padding: 0;
    }
    
    .footer_info {
      display: block;
}
.foter_t {
  display: none;
}

  }
  .txt_social {
    color: yellow;
  }

`

const Layout = ({ children, orderTotal, cartItems }) => {

const totalCount = R.compose(
  R.sum,
  R.pluck('count')
)(cartItems);


  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
    <ErrorBoundary>
    <Header siteTitle={data.site.siteMetadata.title} numItems={totalCount} total={orderTotal} />
     
      <div
        style={{
          margin: `0`,
          maxWidth: `100vw`,
          padding: `0`,
        }}
      >
        <main>
        {children}
        </main>
  
        <Footer>
          <FooterUl className="footer">
          <div className="footer_items foter_t">
            <li className="footer_item foooter_logo">
              <Link to="/">
                <img src={logosvisni} alt="На главную"></img>
              </Link>
            </li>
            <li>
              Свисни Суши
            </li>
          </div>

          <div className="footer_info">
          <div className="footer_items">
            <li className="footer_item footer_info_st">
              <Link to="/">Меню</Link>
              <Link to="/akcii">Акции</Link>
              <Link to="/dostavka-i-oplata">Доставка и оплата</Link>
              <Link to="/adres-i-kontakty">Адрес и контакты</Link>
            </li>
          </div>
          
          <div className="footer_items">
            <li className="footer_item footer_info_st">
              <Link to="/o-nas">О нас</Link>
              <Link to="/privacy">Условия обработки персональных данных</Link>
              <Link to="/cookie">Политика обработки файлов Cookie</Link>
              <Link to="/offer">Договор оферты</Link>
            </li>
          </div>

          <div className="footer_items mt-3">
            <li className="footer_item footer_social">
            <p>Узнавайте об акциях первыми — <span className="txt_social">подписывайтесь на наши группы в соцсетях</span></p>
            <div className="social_container">
              <div className="social_img">
              <a href="https://vk.com/sushi_urazovo">
                <img src={vk} alt="Вконтакте"></img>
              </a>
              </div>
              <div className="social_img"> 
              <a href="https://www.instagram.com/svisni_sushi">
                <img src={inst} alt="Инстаграмм"></img>
              </a>
              </div>
              <div className="social_img">
              <a href="https://ok.ru/group/55132913991911">
                <img src={ok} alt="Одноклассники"></img>
              </a>
              </div>
            </div>       
            </li>
          </div>
          </div>
          </FooterUl>
        </Footer>
      </div>
  </ErrorBoundary>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
const mapStateToProps = ({ shoppingCart: {cartItems, orderTotal} }) => {
  return {cartItems, orderTotal};
}

export default  connect(mapStateToProps)(Layout)


// © {new Date().getFullYear()}, Built with
// {` `}
// <a href="https://www.gatsbyjs.org">Gatsby</a>