import React from 'react'
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import Spinner from '../components/spinner/spinner'
import loadable from "@loadable/component";
import {addedCart} from "../reducers/shopping-cart";

const SloghItem = loadable(() => import('../components/SloghItem'))

const SlognyeTeamplates = ({data: {contentfulProductSlognyeRolly}, addedToCart}) => {

    const [load, setLoad] = React.useState(true)
        React.useEffect(() => {
            setLoad(false)
        }, [contentfulProductSlognyeRolly])

 return  (
    <>
    {!load ? <SloghItem
        name={contentfulProductSlognyeRolly.name}
        price={contentfulProductSlognyeRolly.price}
        description={contentfulProductSlognyeRolly.description}
        image={contentfulProductSlognyeRolly.image.fluid}
        added={() => addedToCart({id: contentfulProductSlognyeRolly.id, price: null,
            product: [{
                node: {
                    id: contentfulProductSlognyeRolly.id,
                    name: contentfulProductSlognyeRolly.name,
                    price: contentfulProductSlognyeRolly.price,
                    count: contentfulProductSlognyeRolly.count,
                    image: contentfulProductSlognyeRolly.image
                }
            }
        ]}
        )}
        weight={contentfulProductSlognyeRolly.weight}
        count={contentfulProductSlognyeRolly.count}>
    </SloghItem> : <Spinner />}
    </>
    )}

const mapDispatchToProps = (dispatch) => ({
    addedToCart: (id, price, product) => dispatch(addedCart(id, price, product))
})
export default connect(null, mapDispatchToProps)(SlognyeTeamplates)

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
 

   
   
