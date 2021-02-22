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
        back={"/sety/"}
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
              fluid(maxWidth: 400, quality: 90) {
                  ...GatsbyContentfulFluid_noBase64
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
                        fluid(maxWidth: 100, maxHeight: 100) {
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
                       fluid(maxWidth: 100, maxHeight: 100) {
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
                        fluid(maxWidth: 100, maxHeight: 100) {
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
                        fluid(maxWidth: 100, maxHeight: 100) {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }
    }
  `;

    // `gatsby-plugin-preload-link-crossorigin`,
  


    // {
    //   resolve: `gatsby-source-contentful`,
    //   options: {
    //     spaceId: process.env.CONTENTFUL_SPACE_ID,
    //     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    //     pageLimit: 50,
    //     assetDownloadWorkers: 25
    //   },
    // },


    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/src/pages`,
    //     name: 'pages',
    //   },
    // },

   // {
   //    resolve: `gatsby-plugin-sharp`,
   //    options: {
   //      stripMetadata: true,
   //      defaultQuality: 100,
   //    },
   //  },

    // {
    //   resolve: `gatsby-plugin-facebook-pixel`,
    //   options: {
    //     pixelId: "1086855725085525",
    //   },
    // },


  // {
  //     resolve: `gatsby-plugin-react-redux`,
  //     options: {
  //       // [required] - path to your createStore module
  //       pathToCreateStoreModule: './src/state/createStore',
  //       // [optional] - options passed to `serialize-javascript`
  //       // info: https://github.com/yahoo/serialize-javascript#options
  //       // will be merged with these defaults:
  //       serialize: {
  //         space: 0,
  //         // if `isJSON` is set to `false`, `eval` is used to deserialize redux state,
  //         // otherwise `JSON.parse` is used
  //         isJSON: true,
  //         unsafe: false,
  //         ignoreFunction: true,
  //       },
  //       // [optional] - if true will clean up after itself on the client, default:
  //       cleanupOnClient: true,
  //       // [optional] - name of key on `window` where serialized state will be stored, default:
  //       windowKey: '__PRELOADED_STATE__',
  //     },
  //   },


   // {
   //    resolve: `gatsby-theme-material-ui`,
   //    options: {
   //      webFontsConfig: {
   //        fonts: {
   //          google: [
   //            {
   //              family: `Montserrat`,
   //              variants: [`500`, `600`, `800`],
   //              formatAgents: {
   //                eot: `Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E)`,
   //                ttf: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.59.8 (KHTML, like Gecko) Version/5.1.9 Safari/534.59.8`,
   //                woff: `Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko`,
   //                woff2: `Mozilla/5.0 (Windows NT 10.0; Win64; x64; ServiceUI 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393`,
   //              },
   //            },
   //          ],
   //        },
   //        formats: ['woff2', 'woff']
   //      },
   //    },
   //  },




// export const onServiceWorkerUpdateReady = async (args) => {
//   const permissionResponse = await Notification.requestPermission()
//   console.log(permissionResponse)
//   if (permissionResponse === "granted") {
//     await args.serviceWorker.showNotification("Website update", {
//       body:
//         "Our website just got a little bit better. We reloaded the site with the update to ensure a smooth experience for you."
//     })
//   }
//   window.location.reload(true)
// }

// Этот сайт был обновлен с новыми данными. Вы хотите перезагрузить сайт, чтобы получить новые данные?

// exports.onServiceWorkerUpdateReady = () => window.location.reload(true);







  //      setPreBodyComponents([
//         <script
//             key={1}
//             dangerouslySetInnerHTML={{
//          __html: `
// (function () {
//     window['yandexChatWidgetCallback'] = function() {
//         try {
//             window.yandexChatWidget = new Ya.ChatWidget({
//                 guid: '02c1500f-bc2c-401d-957d-e332c8c69b28',
//                 buttonText: 'Напишите нам',
//                 title: 'Чат',
//                 theme: 'light',
//                 collapsedDesktop: 'hover',
//                 collapsedTouch: 'always'
//             });
//         } catch(e) { }
//     };
//     var n = document.getElementsByTagName('script')[0],
//         s = document.createElement('script');
//     s.async = true;
//     s.charset = 'UTF-8';
//     s.src = 'https://yastatic.net/s3/chat/widget.js';
//     n.parentNode.insertBefore(s, n);
// })();
//         `
//          }}/>
//      ])



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

// "gatsby-plugin-favicon": "^3.1.6",

// "babel-plugin-styled-components": "^1.12.0",
// "gatsby-plugin-styled-components": "^3.5.0",
// "styled-components": "^5.2.1",
// `gatsby-plugin-styled-components`,

// {
//     rel: `stylesheet`,
//         href: `https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css`,
//     integrity: `sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T`,
//     crossorigin: `anonymous`
// },
// {
//     rel: "stylesheet",
//         href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
// },
// "@material-ui/styles": "4.11.1",

