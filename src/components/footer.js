import React from "react"
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby"
import { Typography } from "@mui/material";
import { SocialButtons } from "./common/SocialButtons";
import styled  from "@emotion/styled";


const FooterSection = styled.footer `
    background-color: #303032;
    color: white;
    padding: 30px 0 30px 0;

    @media screen and (max-width: 768px) {
    padding-left: 10px;
    }
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
    max-width: 500px;
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
    margin: 0 auto;
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
        <Link to="/"><Typography variant={"body1"} style={{color: "white"}}>Главная</Typography></Link>
        {/* <Link to="/sale"><Typography variant={"body1"} style={{color: "white"}}>Акции</Typography></Link> */}
        <Link to="/dostavka-i-oplata"><Typography variant={"body1"} style={{color: "white"}}>Доставка и оплата</Typography></Link>
        <Link to="/adres-i-kontakty"><Typography variant={"body1"} style={{color: "white"}}>Адрес и контакты</Typography></Link>
        {/* <Link to="/vacancy"><Typography variant={"body1"} style={{color: "white"}}>Вакансии</Typography></Link> */}
    </li>
  </div>
  
  <div className="footer_items">

    <li className="footer_item footer_info_st">
      <Link to="/o-nas"><Typography variant={"body1"} style={{color: "white"}}>О нас</Typography></Link>
      <Link to="/privacy"><Typography variant={"body1"} style={{color: "white"}}>Условия обработки персональных данных</Typography></Link>
      <Link to="/cookie"><Typography variant={"body1"} style={{color: "white"}}>Политика обработки файлов Cookie</Typography></Link>
      <Link to="/offer"><Typography variant={"body1"} style={{color: "white"}}>Договор оферты</Typography></Link>
    </li>
  </div>

  <div className="footer_items">
  <div className="footer_item footer_social">
  <p>Узнавайте об акциях первыми — <span className="txt_social">подписывайтесь на наши группы в соцсетях</span></p>
    <SocialButtons />
   </div>
  </div>
  </div>
  </FooterUl>
</FooterSection>
);
}

export default Footer;

  // {/* <div id="vk_groups"></div> */}
  // {/* <div></div> */}