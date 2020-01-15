import React from 'react'
import { graphql } from 'gatsby';
// import PizzaItem from '../components/PizzaItem';

// const PizzaTeamplate = ({
//     data: {contentfulProductPizza}}) => { 
//         console.log(contentfulProductPizza)
        const PizzaTeamplate = (props) => { 
                console.log(props)
 return  (
     <>
   {/* <PizzaItem
        name={contentfulProductPizza.name}
        price={contentfulProductPizza.price}
        description={contentfulProductPizza.description}
        createdAt={contentfulProductPizza.createdAt}
        image={contentfulProductPizza.image.fluid}
    >
    </PizzaItem> */}
    </>
    )}

export default PizzaTeamplate

export const query = graphql ` 
    query ($slug: String!) {
        contentfulProductPizza(slug: {eq: $slug}) {
          name
          price
          description
          createdAt(formatString: "МММ Do, YYYY, h:mm:ss a")
          image {
              fluid(maxWidth: 400) {
                  ...GatsbyContentfulFluid
                }
            }
        }
    }
  `
 

   
   
