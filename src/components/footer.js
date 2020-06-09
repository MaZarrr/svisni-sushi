import React from "react"
import styled  from 'styled-components';
import Img  from 'gatsby-image';
import { graphql, useStaticQuery, Link } from "gatsby"
import Image from './image';

const Footer = styled.footer `
   background-color: #303032;
   color: white;
   margin-top: 50px;
   padding: 30px 0 30px 0;
   font-family: 'Comfortaa', cursive;
   font-style: normal;
    font-weight: 400;

  @media screen and (max-width: 768px) {
  padding-left: 10px;
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
    @media screen and (max-width: 767px) {
      max-width: 85%;
    }
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

.footer_info {
  display: flex;
}

  .footer_social img {
    max-width: 35px;
  }

  .social_container {
    display: flex;
    margin: 0;
  }
  .social_img {
    max-width: 30px;
    margin: 0 50px 0 0;
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

export default () => {
 
 const data = useStaticQuery(graphql `
  {
      allContentfulSocial {
        edges {
          node {
            id
            url
            name
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

return (
    <Footer>
    <FooterUl className="footer">
    <div className="footer_items foter_t">
      <li className="footer_item foooter_logo">
        <Link to="/">
          <Image />
        </Link>
      </li>
      <li><strong>Свисни Суши</strong></li>
    </div>

    <div className="footer_info">
    <div className="footer_items">
      <li className="footer_item footer_info_st">
        <Link to="/">Главная</Link>
        <Link to="/sale">Акции</Link>
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
    <div className="footer_item footer_social">
    <p>Узнавайте об акциях первыми — <span className="txt_social">подписывайтесь на наши группы в соцсетях</span></p>
    <ul className="social_container">
    {data.allContentfulSocial.edges.map(({node})=> (
      <li className="social_img"  key={node.id}>
        <a href={node.url}>
        <Img fluid={node.image.fluid} style={{width: `30px`}} alt={node.name}/>
        </a>
      </li>   
    ))}
     </ul>
     </div>
    </div>
    </div>
    </FooterUl>
  </Footer>
)
}
