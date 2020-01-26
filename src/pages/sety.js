import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby";
import { connect } from 'react-redux';
import Img from 'gatsby-image';
import { producSetsLoad, setAddedToCart } from "../actions";

import "../components/sass/cart.css"

const Sety = ({data: {allContentfulProduct: {edges}}, 
    producSetsLoad, 
    setAddedToCart,
  }) => {
      
    useEffect(() => {
        const data = edges
        producSetsLoad(data); // action push to reduxStore

      }, [edges, producSetsLoad])

return (
    <section>
    <SEO title="Сеты" />
    <section className="section_cart">
    <div className="title"> 
        <div className="title_item">
            <h1>Сеты</h1>
        </div>
        {/* <div className="line" /> */}
        </div>
    <div className="conainer_product">
    {edges.map(({node: productSets}) => {
        const {id, name, slug, description, price, image: {fluid} } = productSets
        return (
            <article key={id} className="cart_items">
                <div className="cart">
                    <Link to={`/sety/${slug}`}> 
                    <div className="img_fluid">
                        <Img className="cart_image"
                        fluid={fluid}></Img>
                    </div>
                </Link>
                <div className="head_carts">
                    <header className="head_cart">
                        <h2>{name}</h2>
                        <b><span>300 гр</span></b>
                    </header>
                </div>
                    <div className="descript_products">
                        <p className="descript">{description}</p>
                    </div>
                    
                    <div className="head_count">
                    <p className="count_product">8 шт</p>
                    </div>

                    <div className="cart_added">
                        <p><b>{price} ₽</b></p>
                        <button 
                        onClick={() => setAddedToCart(id)}
                        // onClick={() => console.log('asdasd')}
                        className="btn btn-success"><i className="fa fa-shopping-basket"></i></button>
                    </div>
                    </div>
                </article> 
                )})}
                </div>
                </section>
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
    // productRequested: (loading) => {
    //     dispatch(productRequested(loading))
    // },
    setAddedToCart: (id) => {
        dispatch(setAddedToCart(id))
        }
    }  
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Sety)

export const querySets = graphql `
    {
        allContentfulProduct {
          edges {
            node {
                id
              slug
              name
              price
              description
              image {
                  fluid(maxWidth: 400) {
                    ...GatsbyContentfulFluid_tracedSVG
                  }
              }
              }
            }
          }
        }
    `
