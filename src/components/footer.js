import React from "react"
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby"
import { Typography } from "@material-ui/core";
import styled from 'styled-components';

const FooterSection = styled.footer `
   background-color: #303032;
   color: white;
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
    padding: 20px 30px 0 30px;
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

const Footer = () => {

return (
  <FooterSection>
  <FooterUl className="footer">
  <div className="footer_items foter_t">
    <li className="footer_item foooter_logo">
      <Link to="/">
          <StaticImage
            src="../images/logosvisni.png"
            alt={"логотип свисни суши"} />
      </Link>
    </li>
    <li><strong><Typography variant={"subtitle1"}>Свисни Суши</Typography></strong></li>
  </div>

  <div className="footer_info">
  <div className="footer_items">
    <li className="footer_item footer_info_st">
        <Link to="/"><Typography variant={"subtitle1"}>Главная</Typography></Link>
        <Link to="/sale"><Typography variant={"subtitle1"}>Акции</Typography></Link>
        <Link to="/dostavka-i-oplata"><Typography variant={"subtitle1"}>Доставка и оплата</Typography></Link>
        <Link to="/adres-i-kontakty"><Typography variant={"subtitle1"}>Адрес и контакты</Typography></Link>
        <Link to="/vacancy"><Typography variant={"subtitle1"}>Вакансии</Typography></Link>
    </li>
  </div>
  
  <div className="footer_items">
    <li className="footer_item footer_info_st">
      <Link to="/o-nas"><Typography variant={"subtitle1"}>О нас</Typography></Link>
      <Link to="/privacy"><Typography variant={"subtitle1"}>Условия обработки персональных данных</Typography></Link>
      <Link to="/cookie"><Typography variant={"subtitle1"}>Политика обработки файлов Cookie</Typography></Link>
      <Link to="/offer"><Typography variant={"subtitle1"}>Договор оферты</Typography></Link>
    </li>
  </div>

  <div className="footer_items">
  <div className="footer_item footer_social">
  <p>Узнавайте об акциях первыми — <span className="txt_social">подписывайтесь на наши группы в соцсетях</span></p>
      <div style={{display: `flex`}}>
          <div style={{marginRight: 15}}>
              <a href="https://ok.ru/group/55132913991911" aria-label="odnoklassniki">Мы в одноклассниках</a>
          </div>
          <div style={{marginRight: 15}}>
              <a href="https://vk.com/sushi_urazovo" aria-label="vk">Мы в вконтакте</a>
          </div>
          <div>
              <a href="https://www.instagram.com/svisni_sushi/" aria-label="instagram">Мы в инстаграм</a>
          </div>
      </div>
   </div>
  </div>
  </div>
  </FooterUl>
</FooterSection>
);
}

export default Footer;