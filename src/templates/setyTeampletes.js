import React from 'react'
import { graphql } from 'gatsby';
import { connect } from 'react-redux';

//import loadable from "@loadable/component";
import SetyItem from "../components/SetyItem";
import {addedCart} from "../reducers/shopping-cart";
import * as R from 'ramda'

// const SetyItem = loadable(() => import('../components/SetyItem'))

const SetyTeamplate = ({data: {contentfulProduct,
    allContentfulProductHotRolly: {edges: hotRolls}, allContentfulProductSlognyeRolly: {edges: brandedRolls},
    allContentfulProductKlassika: {edges: smallRoll}, allContentfulProductSushi: {edges: sushi},
    allContentfulProductGunkan: {edges: gunkan},
}, addedToCart}) => {

    const product = hotRolls.concat(brandedRolls, smallRoll, sushi, gunkan)
    const nameProduct = contentfulProduct.description.toLowerCase().split(', ')
    const kitProduct = product.filter(({node: item}) => {
      return R.contains(item.name.toLowerCase(), nameProduct)
    })
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
        kitProduct={kitProduct}
        added={() => addedToCart({id: contentfulProduct.id, price: null,
            product: [{
                    id: contentfulProduct.id,
                    name: contentfulProduct.name,
                    price: contentfulProduct.price,
                    count: contentfulProduct.count,
                    image: contentfulProduct.image

            }
            ]}
        )}
    > </SetyItem>
    </>
    )}

const mapDispatchToProps = (dispatch) => ({
    addedToCart: (id, price, product) => dispatch(addedCart(id, price, product))
})

export default connect(null, mapDispatchToProps)(SetyTeamplate)

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
          image {
              fluid(maxWidth: 450) {
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

// "react-use-gesture": "^7.0.15",
// "react-spring": "^8.0.27",
// "express": "^4.17.1",
//     "moment": "^2.24.0",
// "@material-ui/lab": "^4.0.0-alpha.56",


// import VK, {Comments} from "react-vk";
// const Otzyvy = () => {
//     return (
//         <>
//             {/*<SEO title="Отзывы" />*/}
//             <section>
//                 {/* <VK apiId={7311665} onlyWidgets="true">
//         <Comments elementId="vk_comments" />
//       </VK> */}
//                 <div
//                     id="vk_comments"
//                     className="vk_comments"
//                     style={{ width: `85%`, height: `400px` }}
//                 >
//                 </div>
//             </section>
//         </>
//     )
// }



// "@mangoart/gatsby-plugin-purechat": "^1.0.2",
// {
//     resolve: `@mangoart/gatsby-plugin-purechat`,
//         options: {
//     enabled: true,
//         websiteId: `4ea5ea00-517c-43e9-bb61-33f55324d3cc`,
// // },
// }



// "react-virtualized-auto-sizer": "^1.0.2",
//     "react-window": "^1.8.5",
//     "react-window-infinite-loader": "^1.0.5",

  //   {
  //   resolve: "gatsby-plugin-google-tagmanager",
  //   options: {
  //     id: "UA-123121109-2",
  //     includeInDevelopment: false,
  //     defaultDataLayer: { platform: "gatsby" },
  //   },
  // },
// require('dotenv').config({
//   path: '.env'
// })
// "yarn": "1.15.2"
//
// let activeEnv =
//   process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

// console.log(`Using environment config: ${activeEnv}`)

// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// })] //

// {
//   resolve: `gatsby-plugin-prefetch-google-fonts`,
//   options: {
//     fonts: [
//       {
//         family: `Oswald`,
//         subsets: [`latin`, `cyrillic`],
//       },
//       {
//         family: 'Comfortaa',
//         variants: [`300`, `500`, `700`],
//         subsets: [`latin`, `cyrillic`]
//       },
//     ],
//     formats: [
//       `woff`,
//       `woff2`,
//       `ttf`,
//       `eot`
//     ],
//   },
// },



// offline ================================
// options: {
//           workboxConfig: {
//             importWorkboxFrom: `cdn`,
//             globDirectory: '/',
//             globPatterns: [
//               '**/*.{html,json,js,css}',
//             ],
//             modifyURLPrefix: {
//               "/": `sety/`,
//               "/": `pizza/`,
//               "/": `/`,
//             },
//             cacheId: `gatsby-plugin-offline`,
//             dontCacheBustURLsMatching: /(\.js$|\.css$|static\/)/,
//             runtimeCaching: [{
//                 urlPattern: /(\.js$|\.css$|static\/)/,
//                 handler: `CacheFirst`,
//               },
//               {
//                 urlPattern: /^https?:.*\page-data\/.*\/page-data\.json/,
//                 handler: `NetworkFirst`,
//               },
//               {
//                 urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
//                 handler: `StaleWhileRevalidate`,
//               },
//               {
//                 urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
//                 handler: `StaleWhileRevalidate`,
//               },
//             ],
//             skipWaiting: true,
//             clientsClaim: true,
//           },
//         },

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