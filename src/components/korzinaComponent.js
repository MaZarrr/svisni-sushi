import React from 'react'
import styled from 'styled-components';
import { Link, graphql, useStaticQuery } from 'gatsby';
import * as R from 'ramda'
import Img  from 'gatsby-image';
import { connect } from 'react-redux';

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

const Korzina = ({ orderTotal, cartItems }) => {
  
    const totalPrice = R.compose(
        R.sum,
        R.pluck('count')
      )(cartItems);

    const data = useStaticQuery(graphql`
    query {
      korzina: file(relativePath: { eq: "icon-tab/korzina.png" }) {
        childImageSharp {
          fluid(maxWidth: 120) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)
return (
    <>
    <KorzinaItem>
        <Link className="korzina_img" to="/korzina">
          <div className="korzina_content">
            <Img fluid={data.korzina.childImageSharp.fluid} />
          </div>
          <div className="korzina_content">
          <b><span>{orderTotal} ({totalPrice} ₽)</span></b>     
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

