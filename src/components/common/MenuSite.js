import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components';

import sets from '../../images/Frame1.png' 
import rollSlog from '../../images/rollsslogn.png'
import pizza from '../../images/pizza.png'
import grilrols from '../../images/grilrols.png'
import makirolls from '../../images/makirolls.png'
import salat from '../../images/salat.png'
// import Layout from "../../components/layout"


const MenuSection = styled.section `
  margin: 0;
  position: sticky;
  top: 70px;
  z-index: 1;
  background: white;
  height: 10vw;
  border-bottom: 1px solid grey;
  width: 100%;
  ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: space-around;
    }
    li {
      list-style: none;
      margin: 0;
      padding: 0;
      text-decoration: none;
    }
    
    li a {
      text-decoration: none;
      
    }
    li a h4 {
      font-size: 1.5vw;
      text-align: center;
      margin: 0;
      padding: 0;    
      font-weight: 500;  
      text-decoration: none;
      white-space: nowrap;
    }
    img {
      margin: 0;
      padding: 0;
      }

      img:hover {
        transition: 0.5s;
        transform: scale(1.2);
    }
    .menu_content {
      width: 7vw;
      height: 95px;
    }
    .clearfix:before, .clearfix:after {
      content: "";
      display: table;
    }
    .clearfix:after {
      clear: both;
    }
    .clearfix:after {
      zoom: 1;
    }
    @media screen and (max-width: 768px) {
      height: 13vw;
      .menu_content {
        width: 10vw;
        height: 95px;
    }
    li a h4 {
      font-size: 1.5vw;
    }
  }
`

const MenuSite = () => (
    <MenuSection>
    <div className="navigation clearfix" >
    <nav>
    <ul className="menu_container">
      <li>
      <div className="menu_content">
        <Link to="/sety">
          <img src={sets} alt="сеты"></img>
          <h4>Сеты</h4>
        </Link>
        </div>
      </li>
      <li>
      <div className="menu_content">
        <Link to="/pizza">
          <img src={pizza} alt="сеты"></img>
          <h4>Пицца</h4>
        </Link>
        </div>
      </li>
      <li>
      <div className="menu_content">
        <Link to="/slozhnyeRolly">
          <img src={rollSlog} alt="сеты"></img>
          <h4>Сложные</h4>
        </Link>
        </div>
      </li>
      <li>
      <div className="menu_content">
        <Link to="/zapechenyeRolly">
          <img src={grilrols} alt="сеты"></img>
          <h4>Гриль</h4>
        </Link>
        </div>
      </li>
      <li>
      <div className="menu_content">
        <Link to="/klassicheskieRolly">
          <img src={makirolls} alt="сеты"></img>
          <h4>Маки роллы</h4>
        </Link>
        </div>
      </li>
      <li>
      <div className="menu_content">
        <Link to="/salaty">
          <img src={salat} alt="сеты"></img>
          <h4>Салаты</h4>
        </Link>
        </div>
      </li>
    </ul>
    </nav>
    </div>
    </MenuSection>
)

export default MenuSite

// import React from "react"
// import { Link } from "gatsby"
// import styled from 'styled-components';

// import sets from '../../images/Frame1.png' 
// import rollSlog from '../../images/rollsslogn.png'
// import pizza from '../../images/pizza.png'
// import grilrols from '../../images/grilrols.png'
// import makirolls from '../../images/makirolls.png'
// import salat from '../../images/salat.png'
// // import Layout from "../../components/layout"


// const MenuSection = styled.section `
//   margin-top: 40px;
//   position: sticky;
//   top: 70px;
//   z-index: 1;
//   /* background: red; */
//   /* display: block;
//   box-sizing: border-box; */
//   ul {
//       list-style: none;
//       margin: 0;
//       padding: 30px 0 10vmax 0;
//       border-bottom: 1px solid grey;
//       display: flex;
//       justify-content: space-around;
//       width: 100%;
//       background: white;
//       /* flex-wrap: wrap; */
//     }
//     li {
//       list-style: none;
//       margin: 0;
//       padding: 0;
//       text-decoration: none;
//     }
    
//     li a {
//       text-decoration: none;
      
//     }
//     li a h4 {
//       font-size: 1.5vw;
//       text-align: center;
//       margin: 0;
//       padding: 0;    
//       font-weight: 500;  
//       text-decoration: none;
//     }
//     img {
//       margin: 0;
//       padding: 0;
//       }

//       img:hover {
//         transition: 0.5s;
//         transform: scale(1.2);
//     }
//     .menu_content {
//       width: 10vw;
//       height: 95px;
//     }
//     @media screen and (max-width: 920px) {
//       ul {
//         padding: 30px 0 5vmin 0;
//     }
//   }
// `

// const MenuSite = () => (
//     <MenuSection>
//     <nav>
//     <ul className="menu_container">
//       <li>
//       <div className="menu_content">
//         <Link to="/sety">
//           <img src={sets} alt="сеты"></img>
//           <h4>Сеты</h4>
//         </Link>
//         </div>
//       </li>
//       <li>
//       <div className="menu_content">
//         <Link to="/pizza">
//           <img src={pizza} alt="сеты"></img>
//           <h4>Пицца</h4>
//         </Link>
//         </div>
//       </li>
//       <li>
//       <div className="menu_content">
//         <Link to="/slozhnyeRolly">
//           <img src={rollSlog} alt="сеты"></img>
//           <h4>Сложные роллы</h4>
//         </Link>
//         </div>
//       </li>
//       <li>
//       <div className="menu_content">
//         <Link to="/zapechenyeRolly">
//           <img src={grilrols} alt="сеты"></img>
//           <h4>Гриль роллы</h4>
//         </Link>
//         </div>
//       </li>
//       <li>
//       <div className="menu_content">
//         <Link to="/klassicheskieRolly">
//           <img src={makirolls} alt="сеты"></img>
//           <h4>Маки роллы</h4>
//         </Link>
//         </div>
//       </li>
//       <li>
//       <div className="menu_content">
//         <Link to="/salaty">
//           <img src={salat} alt="сеты"></img>
//           <h4>Салаты закуски</h4>
//         </Link>
//         </div>
//       </li>
//     </ul>
//     </nav>
//     </MenuSection>
// )

// export default MenuSite



