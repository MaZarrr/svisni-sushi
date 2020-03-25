import React from 'react'
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import loadable from "@loadable/component";
import {addedCart} from "../reducers/shopping-cart";
import Spinner from '../components/spinner/spinner'

const PizzaItem = loadable(() => import('../components/PizzaItem'), {
    fallback: <Spinner />
})

const PizzaTeamplate = ({data: {contentfulProductPizza}, addedToCart, productPizza}) => {
      
 return  (
     <>
   <PizzaItem
        name={contentfulProductPizza.name}
        price={contentfulProductPizza.price}
        priceIn33={contentfulProductPizza.priceIn33cm}
        description={contentfulProductPizza.description}
        image={contentfulProductPizza.image.fluid} 
        added={() => addedToCart(contentfulProductPizza.id, contentfulProductPizza.price, productPizza)}
        weight33={contentfulProductPizza.weight33}
        weight={contentfulProductPizza.weight}
        count={contentfulProductPizza.count}>
    </PizzaItem>
    </>
    )}

const mapStateToProps = (state) => ({
    productPizza: state.app.productPizza,
})

const mapDispatchToProps = (dispatch) => ({
    addedToCart: (id, price, productPizza) => dispatch(addedCart(id, price, productPizza))
})

export default connect(mapStateToProps, mapDispatchToProps)(PizzaTeamplate)

export const query = graphql ` 
    query ($slug: String!) {
        contentfulProductPizza(slug: {eq: $slug}) {
           id
           slug
           price
           name
           priceIn33cm
           weight
           weight33
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
 

   
   
