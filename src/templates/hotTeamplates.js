import React from 'react'
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import loadable from "@loadable/component";
import Spinner from '../components/spinner/spinner'
import {addedCart} from "../reducers/shopping-cart";

const HotItem = loadable(() => import('../components/HotItem'),{
    fallback: <Spinner />
})

const HotTeamplates = ({data: {contentfulProductHotRolly}, addedToCart}) => {
      
 return  (
     <>
   <HotItem
       name={contentfulProductHotRolly.name}
        price={contentfulProductHotRolly.price}
        description={contentfulProductHotRolly.description}
        image={contentfulProductHotRolly.image.fluid}
        added={() => addedToCart({id: contentfulProductHotRolly.id, price: null,
           product: [{
               node: {
                   id: contentfulProductHotRolly.id,
                   name: contentfulProductHotRolly.name,
                   price: contentfulProductHotRolly.price,
                   count: contentfulProductHotRolly.count,
                   image: contentfulProductHotRolly.image
               }
           }
           ]}
       )}
        weight={contentfulProductHotRolly.weight}
        count={contentfulProductHotRolly.count}
    >
    </HotItem>
    </>
    )}

const mapDispatchToProps = (dispatch) => ({
    addedToCart: (id, price, product) => dispatch(addedCart(id, price, product))
})


export default connect(null, mapDispatchToProps)(HotTeamplates)

export const query = graphql ` 
    query ($slug: String!) {
       contentfulProductHotRolly(slug: {eq: $slug}) {
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