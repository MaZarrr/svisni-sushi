import React from 'react'
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import Spinner from '../components/spinner/spinner'
import loadable from "@loadable/component";
import {getProduct} from "../reducers/app";
import {addedCart} from "../reducers/shopping-cart";

const SloghItem = loadable(() => import('../components/SloghItem'))

const SlognyeTeamplates = ({data: {contentfulProductSlognyeRolly}, addedToCart, loadProduct, product}) => {

    const [load, setLoad] = React.useState(true)
        React.useEffect(() => {
            // loadProduct(contentfulProductSlognyeRolly)
            setLoad(false)
        }, [contentfulProductSlognyeRolly])
 return  (
    <>
    {!load ? <SloghItem
        name={contentfulProductSlognyeRolly.name}
        price={contentfulProductSlognyeRolly.price}
        description={contentfulProductSlognyeRolly.description}
        image={contentfulProductSlognyeRolly.image.fluid}
        added={() => addedToCart(contentfulProductSlognyeRolly.id, null, product)}
        weight={contentfulProductSlognyeRolly.weight}
        count={contentfulProductSlognyeRolly.count}>
    </SloghItem> : <Spinner />}
    </>
    )}

const mapStateToProps = (state) => ({
    product: state.app.product
})

const mapDispatchToProps = (dispatch) => ({
    loadProduct: (newProduct) => dispatch(getProduct(newProduct)),
    addedToCart: (id, price, product) => dispatch(addedCart(id, price, product))
})
export default connect(mapStateToProps, mapDispatchToProps)(SlognyeTeamplates)

export const query = graphql ` 
    query ($slug: String!) {
        contentfulProductSlognyeRolly(slug: {eq: $slug}) {
        id
        slug
        name
        price
        weight
        count
        description
          image {
              fluid(maxWidth: 400) {
                  ...GatsbyContentfulFluid
                }
            }
        }
    }
  `
 

   
   
