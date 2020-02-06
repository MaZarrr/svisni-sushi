import React from "react"
import SEO from "../components/seo"
import styled  from 'styled-components';
import { graphql } from "gatsby";

import { connect } from 'react-redux';
import { producSetsLoad, setAddedToCart } from "../actions";
import MenuProduct from "../components/common/MenuProduct";


const SetySection = styled.section `
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0 auto;
    padding: 0;
    width: 100vw;

    .container {
        margin: 50px auto 50px 50px;
        padding: 0;
        border-bottom: 1px solid grey;
    }
` 

const Pizza = ({data: {allContentfulProductPizza, allContentfulIconMenuLeftPanel}}) => {

return (
    <section>
    <SEO title="Пицца" />
    <SetySection>
    <div className="container"> 
        <h1>Пицца</h1>
    </div>

    <MenuProduct 
    pizzaProduct={allContentfulProductPizza.edges} 
    imageInfo={allContentfulIconMenuLeftPanel.edges[1]}
    category="Пицца"
    path="pizza"
    />
    </SetySection>
    </section>
    )
}

const mapStateToProps = ({ setList: {product} }) => {
    return {product};
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
    producSetsLoad: (newProduct) => {
        dispatch(producSetsLoad(newProduct))
    },
    setAddedToCart: (id) => {
        dispatch(setAddedToCart(id))
        }
    }  
};

export default  connect(mapStateToProps, mapDispatchToProps)(Pizza)


export const query = graphql `
    {
        allContentfulProductPizza  {
          edges {
            node {
                id
              slug
              name
              price
              priceIn33cm
              description
              image {
                  fluid(maxWidth: 400) {
                    ...GatsbyContentfulFluid
                  }
              }
              }
            }
          }
        allContentfulIconMenuLeftPanel {
            edges {
                node {
                    image {
                        fluid(maxWidth: 70) {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }
        }
    `