import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import logosvisni from '../images/logosvisni.png'
import styled  from 'styled-components';

const HeaderStyled = styled.header `
  position: sticky;
  top: 0;
  z-index: 1;
  /* background: #5A5B5B; */
  background: white;
  /* margin-bottom: 1.45rem; */
  margin: 0;
  padding: 0;
  border-bottom: 0.2px solid grey;
  width: 100%;
  `
const HeaderContent = styled.div `
  /* max-width: 1200px; */
  padding: 0;
  margin: 0 auto;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-weight: 700;

*{
  margin: 0 auto;
  padding: 0;
}
  >a {
    text-decoration: none;
  }
li {
list-style: none;
text-decoration: none;
}
.d {
margin-right: 15px;
color: black;
text-decoration: none;
font-size: 1.5vw;
}
>div {
margin: auto 0;
display: flex;
flex-grow: 1;
}

.nav_navigation {
  /* background: black; */
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.nav_navigation a {
  margin: auto 0;
}

@media screen and (max-width: 768px) {
.d {
font-size: 2vw;
  }
}

`

const Header = ({ siteTitle }) => (
  <HeaderStyled>
    <HeaderContent>

     <nav className="nav_navigation">
     <Link to="/">
          <img  style={{
            maxWidth: `100px`,
            padding: `0`,
            margin: `0`,
          }} src={logosvisni} alt="svisniсуши"></img>
        </Link>
      <Link className="d" to="/akcii">Акции</Link>
      <Link className="d dm" to="/o-nas">О нас</Link>
      <Link className="d" to="/otzyvy">Отзывы</Link>
      <Link className="d" to="/dostavka-i-oplata">Доставка и оплата</Link>
      <Link className="d dm" to="/adres-i-kontakty">Адрес и контакты</Link>
      </nav>

    </HeaderContent>
  </HeaderStyled>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
