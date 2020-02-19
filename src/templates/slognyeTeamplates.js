import React from 'react'
import { graphql } from 'gatsby';
import SloghItem from '../components/SloghItem';
import { connect } from 'react-redux';
import {setAddedToCart} from '../actions';

const SlognyeTeamplates = ({
    data: {contentfulProductSlognyeRolly}, setAddedToCart}) => { 
      
 return  (
     <>
   <SloghItem
        name={contentfulProductSlognyeRolly.name}
        price={contentfulProductSlognyeRolly.price}
        description={contentfulProductSlognyeRolly.description}
        image={contentfulProductSlognyeRolly.image.fluid}
        added={() => setAddedToCart(contentfulProductSlognyeRolly.id)}
        weight={contentfulProductSlognyeRolly.weight}
        count={contentfulProductSlognyeRolly.count}
    >
    </SloghItem>
    </>
    )}

        const mapStateToProps = ({ setList: {product, loading} }) => {
    return {product, loading};
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
    setAddedToCart: (id) => {
        dispatch(setAddedToCart(id))
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
 

   
   
