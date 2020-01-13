import React from 'react'
import { graphql } from 'gatsby';
import SetyItem from '../components/SetyItem';
// import PizzaItem from '../components/PizzaItem';
// import { connect } from 'react-redux';
// import {withProductService} from './../components/hoc';

    const SetyTeamplate = ({
        data: {contentfulProduct}}) => { 

 return  (
     <>
    <SetyItem name={contentfulProduct.name}
        price={contentfulProduct.price}
        description={contentfulProduct.description}
        createdAt={contentfulProduct.createdAt}
        image={contentfulProduct.image.fluid}
    > </SetyItem>
    </>
    )}

    // const mapStateToProps = ({product}) => {
    //     return {product};
    // }
    // const mapDispatchToProps = (dispath) => {
    //     return {
    //     productLoaded: (newProduct) => {
    //         dispath({
    //             type: 'PRODUCT_LOADED',
    //             payload: newProduct
    //         })
    //     }
    //     };
    // }

export default SetyTeamplate
// export default connect(mapStateToProps, mapDispatchToProps)(SetyTeamplate)

export const query = graphql ` 
    query ($slug: String!) {
       contentfulProduct(slug: {eq: $slug}) {
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
 

