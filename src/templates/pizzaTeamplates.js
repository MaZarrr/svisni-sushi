import React from 'react'
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import loadable from "@loadable/component";
import {addedCart} from "../reducers/shopping-cart";
import Spinner from '../components/spinner/spinner'

const PizzaItem = loadable(() => import('../components/PizzaItem'), {
    fallback: <Spinner />
})

const PizzaTeamplate = ({data: {contentfulProductPizza}, addedToCart, location}) => {

 return  (
     <>
   <PizzaItem
        name={contentfulProductPizza.name}
        price={contentfulProductPizza.price}
        priceIn33={contentfulProductPizza.priceIn33cm}
        description={contentfulProductPizza.description}
        image={contentfulProductPizza.image.fluid}
        added={() => addedToCart({ id: contentfulProductPizza.id, productPrice: contentfulProductPizza.price,
            product: [{
            node: {
                    id: contentfulProductPizza.id,
                    name: contentfulProductPizza.name,
                    price: contentfulProductPizza.price,
                    priceIn33cm: contentfulProductPizza.priceIn33cm,
                    count: contentfulProductPizza.count,
                    image: contentfulProductPizza.image
                }
            }
        ]
        })}
        weight33={contentfulProductPizza.weight33}
        weight={contentfulProductPizza.weight}
        count={contentfulProductPizza.count}>
    </PizzaItem>
    </>
    )}

const mapDispatchToProps = (dispatch) => ({
    addedToCart: (id, price, productPizza) => dispatch(addedCart(id, price, productPizza))
})

export default connect(null, mapDispatchToProps)(PizzaTeamplate)

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
 

   
   
