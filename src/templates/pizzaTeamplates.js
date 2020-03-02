import React from 'react'
import { graphql } from 'gatsby';
import PizzaItem from '../components/PizzaItem';
import { connect } from 'react-redux';
import {setAddedToCart} from '../actions';

const PizzaTeamplate = ({
    data: {contentfulProductPizza}, setAddedToCart, productPizza}) => { 
      console.log(productPizza);
      
 return  (
     <>
   <PizzaItem
        name={contentfulProductPizza.name}
        price={contentfulProductPizza.price}
        priceIn33={contentfulProductPizza.priceIn33cm}
        description={contentfulProductPizza.description}
        image={contentfulProductPizza.image.fluid} 
        added={() => setAddedToCart(contentfulProductPizza.id, contentfulProductPizza.price, productPizza)}
        weight33={contentfulProductPizza.weight33}
        weight={contentfulProductPizza.weight}
        count={contentfulProductPizza.count}>
    </PizzaItem>
    </>
    )}

    const mapStateToProps = ({ setList: {productPizza} }) => {
    return {productPizza};
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
       setAddedToCart: (id, price, productPizza) => {
           dispatch(setAddedToCart(id, price, productPizza))
       }
    }  
};

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
 

   
   
