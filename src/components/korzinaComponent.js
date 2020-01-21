import React from "react"
import styled from 'styled-components';
import { Link } from 'gatsby';
import * as R from 'ramda'
import { connect } from 'react-redux';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import IconButton from '@material-ui/core/IconButton';


const KorzinaItem = styled.div `
  min-width: 100px;
  margin: 0 auto;
&:hover {
  transition: 0.1s ease-in;
  transform: scale(1.09);
} 
.gatsby-image-wrapper {
  margin: 0;
  padding: 0;
}
/* .korzina_content_txt {
  width: 100px;
  margin-right: 100px;
} */
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

const TextTotal = styled.span `
  ${props => props.styledAdded ? `animation-duration: 2s;
    animation-name: slidein;
    animation-iteration-count: infinite;
    animation-direction: reverse;` : `background: white;`} 

    @keyframes slidein {
      from {
        color: black;
      }

      to {
        color: tomato;
        font-weight: 800;
      }
}
`

const Korzina = ({ orderTotal, cartItems }) => {

    const totalCount = R.compose(
        R.sum,
        R.pluck('count')
      )(cartItems);

// const [activatess, setActivatess] = useState(0)
// const [styleDef, setStyleDef] = useState('')
// const [styleNew, setStyleNew] = useState(`background: white;`)


//   let prevProps = totalCount
//   if(prevProps > activatess){
//     setStyleNew() 
//   } else {
//     setStyleNew(`background: white;`)
//   }
//   setActivatess(prevProps)

// console.log(totalCount)
// console.log(activatess)
// console.log(styleNew)

return (
    <>
    <KorzinaItem >
        <Link className="korzina_img" to="/korzina">
          <div className="korzina_content">
            {/* <Img fluid={data.korzina.childImageSharp.fluid} style={{width: `65px`, margin: `0 auto`}} /> */}
            <IconButton style={{margin: 0, padding: 0, width: `60px`}} color="action" size='medium'>
            <div>
              <ShoppingBasketRoundedIcon/>
            </div>
            </IconButton>
            <div className="korzina_content korzina_content_txt">
              <b><TextTotal styledAdded={totalCount} className="txt_total">{totalCount} ({orderTotal} ₽)</TextTotal></b>
            </div>
          </div>
        </Link>
    </KorzinaItem>
    </>
        )
}

const mapStateToProps = ({ shoppingCart: {cartItems, orderTotal} }) => {
    return {cartItems, orderTotal};
  }

export default connect(mapStateToProps)(Korzina)

  // /*  */
  //   /* return props.styledAdded > prevProps ? `
  // animation-duration: 2s;
  // animation-name: slidein;
  // animation-iteration-count: 1;
  // animation-direction: reverse;` : 'background: white;' } */
  // /* transition: 0.1s ease-in-out;
  // transform: scale(1) translateX(0); */
