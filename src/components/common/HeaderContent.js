import styled from 'styled-components';

export const HeaderStyled = styled.header `
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  margin: 0;
  padding: 0;
  border-bottom: 0.2px solid grey;
  width: 100%;
  `
const HeaderContent = styled.div `
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