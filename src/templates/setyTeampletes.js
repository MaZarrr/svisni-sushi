import React from 'react'
import { connect } from 'react-redux';
import {addedCart} from "../reducers/shopping-cart";
import * as R from 'ramda'
import { graphql } from 'gatsby'
import loadable from '@loadable/component'
import Spinner from  "../components/spinner/spinner-new"

const ProductItem = loadable(() => import('../components/SetyItem'), {
    fallback: <Spinner />});

const SetyTeamplate = ({ data: { contentfulProduct,
    allContentfulProductHotRolly: {edges: hotRolls}, allContentfulProductSlognyeRolly: {edges: brandedRolls},
    allContentfulProductKlassika: {edges: smallRoll}, allContentfulProductSushi: {edges: sushi},
    allContentfulProductGunkan: {edges: gunkan},
}, addedToCart, isSale }) => {

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
        back={"/sety/"}
        image={contentfulProduct.image}
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
              gatsbyImageData
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
                    gatsbyImageData
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
                    gatsbyImageData
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
                    gatsbyImageData
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
                    gatsbyImageData
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
                    gatsbyImageData
                  }
                }
            }
        }
    }
 `




// `gatsby-plugin-postcss`,

// {
//   resolve: `gatsby-theme-material-ui`,
//     options: {
//   webFontsConfig: {
//     fonts: {
//       google: [
//         {
//           family: `Montserrat`,
//           variants: [`500`, `800`],
//         },
//       ],
//     },
//     formats: ['woff2'],
//       useMinify: true,
//       usePreload: true
//   },
// },
// },



// "postcss": "^8.2.8",
//   `gatsby-plugin-react-helmet`,
// "gatsby-plugin-react-helmet": "^4.0.0",


// "gatsby-plugin-webfonts": "^2.0.0",
//   "gatsby-plugin-material-ui": "^2.1.10",
// {
//   resolve: `gatsby-plugin-sharp`,
//      options: {
//      stripMetadata: true,
//      defaultQuality: 100,
// },
// },

// GATSBY_CONTENTFUL_OFFLINE=true
// "browserslist": [
//   ">0.25%",
//   "not dead"
// ],

// "gatsby-plugin-webfonts": "^2.0.0",
// "gatsby-plugin-material-ui": "^2.1.10",

// options: {
//   webFontsConfig: {
//     fonts: {
//       google: [
//         {
//           family: `Montserrat`,
//           variants: [`500`, `800`],
//         },
//       ],
//     },
//   },
// },


// {
//   resolve: `gatsby-plugin-webfonts`,
//     options: {
//   fonts: {
//     google: [
//       {
//         family: "Montserrat",
//         variants: ["500", "800"],
//       },
//     ],
//   },
//   formats: ['woff2'],
//     useMinify: true,
//     usePreload: true,
//     usePreconnect: true,
// },
// },
// "gatsby-theme-material-ui": "^1.0.13",

// "gatsby-plugin-preload-link-crossorigin": "^1.0.2",

// {
//   resolve: `gatsby-source-contentful`,
//     options: {
//   spaceId: "o3pzpw68fwfi",
//     accessToken: "V5vHDhqcjgBFBNucB7_7HHHcBWq_zm5IKZXHMbktuN4",
//     pageLimit: 50,
//     assetDownloadWorkers: 25
// },
// },

//    "@hot-loader/react-dom": "^17.0.1",

//    "gatsby-image": "^2.11.0",
// {
//   resolve: `gatsby-plugin-google-analytics`,
//     options: {
//   trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKINGID,
//     head: true,
//     defer: true
// },
// },