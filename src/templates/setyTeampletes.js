import React from 'react'
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import {addedCart} from "../reducers/shopping-cart";
import * as R from 'ramda'
import loadable from '@loadable/component'
import Spinner from  "../components/spinner/spinner"
const ProductItem = loadable(() => import('../components/SetyItem'), {
    fallback: <Spinner count={1}/>});

const SetyTeamplate = ({data: {contentfulProduct,
    allContentfulProductHotRolly: {edges: hotRolls}, allContentfulProductSlognyeRolly: {edges: brandedRolls},
    allContentfulProductKlassika: {edges: smallRoll}, allContentfulProductSushi: {edges: sushi},
    allContentfulProductGunkan: {edges: gunkan},
}, addedToCart, isSale}) => {

    const product = hotRolls.concat(brandedRolls, smallRoll, sushi, gunkan);
    const nameProduct = contentfulProduct.description.toLowerCase().split(', ');
    const kitProduct = product.filter(({node: item}) => {
      return R.contains(item.name.toLowerCase(), nameProduct)
    });

 return  (
     <>
    <ProductItem
        name={contentfulProduct.name}
        price={isSale && contentfulProduct.lanch ? contentfulProduct.lanchprice : contentfulProduct.price}
        description={contentfulProduct.description}
        createdAt={contentfulProduct.createdAt}
        weight={contentfulProduct.weight}
        count={contentfulProduct.count}
        back={"/sety"}
        image={contentfulProduct.image.fluid}
        kitProduct={kitProduct}
        added={() => addedToCart({id: contentfulProduct.id, price: null,
            product: [{
                    id: contentfulProduct.id,
                    name: contentfulProduct.name,
                    price: isSale && contentfulProduct.lanch ? contentfulProduct.lanchprice : contentfulProduct.price,
                    count: contentfulProduct.count,
                    image: contentfulProduct.image
                    }]}
                )}
            > </ProductItem>
        </>
    )};

const mapStateToProps = (state) => ({
     isSale: state.filters.isSale
});

const mapDispatchToProps = (dispatch) => ({
    addedToCart: (id, price, product) => dispatch(addedCart(id, price, product))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetyTeamplate)

export const query = graphql ` 
    query ($slug: String!) {
       contentfulProduct(slug: {eq: $slug}) {
           id
            slug
            name
            price
            weight
            lanchprice
            lanch
            defaultPrice
            count
            description
          image {
              fluid(maxWidth: 600, quality: 100) {
                  ...GatsbyContentfulFluid
                }
            }
        }
        allContentfulProductHotRolly {
            edges {
                node {
                    id
                    name
                    description
                    count
                    image {
                        fluid(maxWidth: 200, maxHeight: 200) {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }
        allContentfulProductSlognyeRolly {
            edges {
                node {
                    id
                    name
                    description
                    count
                    image {
                        fluid(maxWidth: 200, maxHeight: 200) {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }
        allContentfulProductSushi {
            edges {
                node {
                    id
                    name
                    count
                    description
                    price
                    image {
                       fluid(maxWidth: 200, maxHeight: 200) {
                           ...GatsbyContentfulFluid
                      }
                    }
                }
            }
       }
        allContentfulProductKlassika {
            edges {
                node {
                    id
                    name
                    price
                    description
                    count
                    image {
                        fluid(maxWidth: 200, maxHeight: 200) {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }
        allContentfulProductGunkan {
            edges {
                node {
                    id
                    name
                    count
                    description
                    price
                    weight
                    image {
                        fluid(maxWidth: 200, maxHeight: 200) {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }
    }
  `;



// "react-hot-loader": "^4.12.19",
//     "@material-ui/core": "4.9.10",
//     "@material-ui/icons": "^4.9.1",
//     "@material-ui/lab": "^4.0.0-alpha.56",
// "gatsby-plugin-react-redux": "^1.1.0-0",

// {
//     resolve: `gatsby-plugin-offline`,
//         options: {
//     precachePages: [
//         `/*`,
//         `/sety/*`,
//         `/pizza/*`,
//     ],
// },
// },

// "gatsby-plugin-offline": "^3.5.0",
// "gatsby-plugin-remove-serviceworker": "^1.0.0",

//

// {
//     resolve: `gatsby-plugin-offline`,
//         options: {
//     precachePages: [
//         `/*`,
//         `/sety/*`,
//         `/pizza/*`,
//     ],
// },
// },
// `gatsby-plugin-material-ui`,
// "gatsby-plugin-material-ui": "^2.1.10",


// "gatsby-plugin-web-font-loader": "^1.0.4",

// {
//     resolve: "gatsby-plugin-web-font-loader",
//         options: {
//     google: {
//         families: ["Oswald"],
//     },
//     typekit: {
//         families: ["Oswald"],
//     }
// },
// },

// `gatsby-plugin-remove-serviceworker`,