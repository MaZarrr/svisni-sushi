import React from 'react'
import { graphql } from 'gatsby';
import HotItem from '../components/HotItem';
import { connect } from 'react-redux';
import {setAddedToCart} from '../actions';

const HotTeamplates = ({
    data: {contentfulProductHotRolly}, setAddedToCart, product}) => { 
      
 return  (
     <>
   <HotItem
       name={contentfulProductHotRolly.name}
        price={contentfulProductHotRolly.price}
        description={contentfulProductHotRolly.description}
        image={contentfulProductHotRolly.image.fluid}
         added={() => setAddedToCart(contentfulProductHotRolly.id, null, product)}
        weight={contentfulProductHotRolly.weight}
        count={contentfulProductHotRolly.count}
    >
    </HotItem>
    </>
    )}

const mapStateToProps = ({ setList: {product} }) => {
    return {product};
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
    setAddedToCart: (id, price, product) => {
        dispatch(setAddedToCart(id, price, product))
    }
    }  
};
export default connect(mapStateToProps, mapDispatchToProps)(HotTeamplates)

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