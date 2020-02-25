import React from 'react'
import { graphql } from 'gatsby';
import SetyItem from '../components/SetyItem';
import { connect } from 'react-redux';
import {setAddedToCart} from '../actions';


const SetyTeamplate = ({
    data: {contentfulProduct}, setAddedToCart}) => { 

 return  (
     <>
    <SetyItem 
        name={contentfulProduct.name}
        price={contentfulProduct.price}
        description={contentfulProduct.description}
        createdAt={contentfulProduct.createdAt}
        weight={contentfulProduct.weight}
        count={contentfulProduct.count}
        image={contentfulProduct.image.fluid}
        added={() => setAddedToCart(contentfulProduct.id)}
    > </SetyItem>
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

export default connect(mapStateToProps, mapDispatchToProps)(SetyTeamplate)

export const query = graphql ` 
    query ($slug: String!) {
       contentfulProduct(slug: {eq: $slug}) {
           id
            slug
            name
            price
            weight
            count
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
    // "react-vk": "^5.0.2",
    //  precachePages: [`/*`],
// "alias": {
//     "react-dom": "@hot-loader/react-dom"
//   },

  // import wrapWithProvider from "./wrap-with-provider"
// import wrapWithProvider from "./wrap-with-provider"
// export const wrapRootElement = wrapWithProvider
    // "react-transition-group": "4.0.0",
  
//   "react-swipeable-views": "^0.13.4",
//   "react-swipeable-views-core": "^0.13.4",
//   "react-swipeable-views-utils": "^0.13.4",
//    
// "gatsby-theme-material-ui": "^1.0.7",
//  export const query = graphql ` 
//  query ($slug: String!) {
//     contentfulProduct(slug: {eq: $slug}) {
//        image {
//            fluid(maxWidth: 400) {
//                ...GatsbyContentfulFluid
//              }
//          }
//      }
//  }
// `