import React, {useEffect} from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled  from 'styled-components';
import { graphql, Link } from "gatsby";

import { connect } from 'react-redux';
import Img from 'gatsby-image';
import { producSetsLoad, setAddedToCart } from "../actions";


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
    .container h1 {
        /* font-size: 5vw; */
    }
    header h2 {
        font-size: 18px;
        text-align: center;
    }
    .descript{
        text-align: center;
        font-size: 14px;
        height: 45px;
    }

   a header h2 {
       text-decoration: none;
       list-style: none;
       color: black;
   }

    ul.d {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: space-between;
    }
    p b {
        font-size: 22px;
    }
    li {
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .conainer_product {
        width: 400px;
        display: flex;
        justify-content: center;
        margin-bottom: 50px;
    }
    article {
        display: flex;
        justify-content: center;
        /* min-height: 400px; */
    }
    .img_fluid {
        width: 300px;
        text-align: center;
        margin: 0 auto;
    }

    .container_cart {
        height: 150px;
        margin: 0;
        padding: 0;
    }
` 

const Pizza = ({data: {allContentfulProductPizza: {edges}}, 
    product, producSetsLoad, 
    setAddedToCart
  }) => {

    useEffect(() => {
        const data = edges
        producSetsLoad(data); // action push to reduxStore
      })

return (
    <Layout>
    <SEO title="Пицца" />
    <SetySection>
    <div className="container"> 
        <h1>Пицца</h1>
    </div>
    {edges.map(({node: productSets}) => {
        const {id, name, slug, description, price, image: {fluid} } = productSets
        return (
        <div key={id} className="conainer_product"> 
            <article>
                <div>
                <Link to={`/pizza/${slug}`}> 
                    <div className="img_fluid">
                        <Img style={{maxWidth: 300, height: 300}}
                        fluid={fluid}></Img>
                    </div>
                <header>
                    <h2>{name}</h2>
                </header>
                </Link>
                <ul className="container_cart">
                    <p className="descript">{description}</p>
                <ul className="d">
                    <p><b>от {price}</b> РУБ.</p>
                    <button 
                    onClick={() => setAddedToCart(id)}
                    className="btn btn-success"><i className="fa fa-cart-plus fa-lg"></i></button>
                </ul>
                </ul>
                </div>
            </article>
        </div>
    )})}
  
    </SetySection>
    </Layout>
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
        }
    `