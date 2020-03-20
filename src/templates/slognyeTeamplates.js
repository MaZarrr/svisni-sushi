import React from 'react'
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import {setAddedToCart, producSetsLoad} from '../actions';
import Spinner from '../components/spinner/spinner'
import loadable from "@loadable/component";

const SloghItem = loadable(() => import('../components/SloghItem'))

const SlognyeTeamplates = ({
    data: {contentfulProductSlognyeRolly}, setAddedToCart, producSetsLoad, product}) => { 
       const [load, setLoad] = React.useState(true)
        React.useEffect(() => {
            // producSetsLoad(contentfulProductSlognyeRolly)
            setLoad(false)
        }, [contentfulProductSlognyeRolly, producSetsLoad])
 return  (
    <>
    {!load ? <SloghItem
        name={contentfulProductSlognyeRolly.name}
        price={contentfulProductSlognyeRolly.price}
        description={contentfulProductSlognyeRolly.description}
        image={contentfulProductSlognyeRolly.image.fluid}
        added={() => setAddedToCart(contentfulProductSlognyeRolly.id, null, product)}
        weight={contentfulProductSlognyeRolly.weight}
        count={contentfulProductSlognyeRolly.count}
    >
    </SloghItem> : <Spinner />}
    </>
    )}

const mapStateToProps = ({ setList: {product} }) => {
    return {product};
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
           producSetsLoad: (newProduct) => {
               dispatch(producSetsLoad(newProduct))
           },
 setAddedToCart: (id, price, product) => {
     dispatch(setAddedToCart(id, price, product))
 }
    }  
};
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
 

   
   
