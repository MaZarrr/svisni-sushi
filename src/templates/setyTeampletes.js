import React from 'react'
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import {addedCart} from "../reducers/shopping-cart";
import * as R from 'ramda'
import loadable from '@loadable/component'
import Spinner from  "../components/spinner/spinner"
const ProductItem = loadable(() => import('../components/SetyItem'), {
    fallback: <Spinner count={1}/>});

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

// `gatsby-plugin-loadable-components-ssr`,


  // {
  //     resolve: `gatsby-plugin-google-analytics`,
  //     options: {
  //       trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKINGID,
  //       head: true,
  //       defer: true,
  //       cookieExpires: "1000000"
  //     },
  //   },

// const createStore = require('./src/state/createStore').default;
// const { Provider } = require('react-redux'); 
// const React = require('react');
// const Layout = require('./src/components/layout').default;

// exports.wrapPageElement = ({ element, props }) => {
//     return <Layout {...props}>{element}</Layout>
// };

// exports.wrapRootElement = ({ element, props }) => {
//     return ( 
//         <Provider store={createStore}>
//                 {element}
//         </Provider>
//         )
// };

// exports.onRenderBody = ({
//         setPreBodyComponents, setHeadComponents
//      }) => {
    // setHeadComponents([
    //     <script
    //         key={1}
    //         type="text/javascript"
    //         dangerouslySetInnerHTML={{
    //             __html: `
    //             !function(){
    //             var t=document.createElement("script");
    //             t.type="text/javascript",
    //             t.async=!0,
    //             t.src="https://vk.com/js/api/openapi.js?168",
    //             t.onload=function(){
    //                 VK.Retargeting.Init("VK-RTRG-493440-aoKed"),
    //                 VK.Retargeting.Hit()
    //                 }, document.head.appendChild(t)}();
    //             `
    //         }}/>,
    //   <script key={2} type='text/javascript'
    //           dangerouslySetInnerHTML={{
    //             __html: `
    //            (function(d, w, m) {
    //               window.supportAPIMethod = m;
    //               var s = d.createElement('script');
    //               s.type ='text/javascript'; s.id = 'supportScript'; s.charset = 'utf-8';
    //               s.async = true;
    //               var id = '226d519661c50fd5e16477daf16d89eb';
    //               s.src = 'https://lcab.talk-me.ru/support/support.js?h='+id;
    //               var sc = d.getElementsByTagName('script')[0];
    //               w[m] = w[m] || function() { (w[m].q = w[m].q || []).push(arguments); };
    //               if (sc) sc.parentNode.insertBefore(s, sc);
    //               else d.documentElement.firstChild.appendChild(s);
    //                 })(document, window, 'TalkMe');
    //             `
    //           }}/>
    // ])
//  }




    // {
    //   resolve: `gatsby-plugin-offline`,
    //   options: {
    //     precachePages: [
    //       `/*`,
    //       `/sety/*`,
    //       `/pizza/*`,
    //       `/sale/*`,
    //       `/kombo/*`
    //     ],
    //   },
    // }

// GATSBY_EXPERIMENTAL_PAGE_BUILD_ON_DATA_CHANGES=true --log-pages
    // "build": "cross-env GATSBY_CONTENTFUL_OFFLINE=true gatsby build",

// develop": "cross-env GATSBY_EXPERIMENTAL_LAZY_DEVJS=true GATSBY_CONTENTFUL_OFFLINE=true GATSBY_EXPERIMENTAL_DEV_SSR=true gatsby develop --log-pages",
// {
//   "name": "svisni-sushi",
//   "private": true,
//   "description": "svisni sushi pizza",
//   "version": "1.0.1",
//   "author": "Vitaliy Nesterov <vitalistarkiii@gmail.com>",
//   "dependencies": {
//     "@loadable/component": "^5.12.0",
//     "@material-ui/core": "4.11.1",
//     "@material-ui/icons": "^4.9.1",
//     "@material-ui/lab": "^4.0.0-alpha.56",
//     "babel-plugin-styled-components": "^1.12.0",
//     "cross-env": "^7.0.2",
//     "dotenv": "^8.2.0",
//     "gatsby": "^2.32.4",
//     "gatsby-cli": "^2.19.1",
//     "gatsby-image": "^2.11.0",
//     "gatsby-plugin-facebook-pixel": "^1.0.5",
//     "gatsby-plugin-google-analytics": "^2.1.35",
//     "gatsby-plugin-google-tagmanager": "^2.1.25",
//     "gatsby-plugin-image": "^0.5.1",
//     "gatsby-plugin-manifest": "^2.12.0",
//     "gatsby-plugin-material-ui": "^2.1.10",
//     "gatsby-plugin-offline": "^3.10.1",
//     "gatsby-plugin-preload-link-crossorigin": "^1.0.2",
//     "gatsby-plugin-ramda": "^1.0.0",
//     "gatsby-plugin-react-helmet": "^3.10.0",
//     "gatsby-plugin-react-redux": "^1.1.0",
//     "gatsby-plugin-robots-txt": "^1.5.5",
//     "gatsby-plugin-sharp": "^2.14.1",
//     "gatsby-plugin-sitemap": "^2.12.0",
//     "gatsby-plugin-styled-components": "^3.5.0",
//     "gatsby-plugin-webfonts": "^1.1.4",
//     "gatsby-plugin-yandex-metrika": "^1.3.0",
//     "gatsby-source-contentful": "^4.6.2",
//     "gatsby-source-filesystem": "^2.11.0",
//     "gatsby-theme-material-ui": "^1.0.13",
//     "gatsby-transformer-remark": "^2.16.0",
//     "gatsby-transformer-sharp": "^2.12.0",
//     "moment": "^2.29.1",
//     "prop-types": "^15.7.2",
//     "ramda": "^0.26.1",
//     "react": "^17.0.1",
//     "react-content-loader": "^5.1.4",
//     "react-dom": "^17.0.1",
//     "react-helmet": "^6.1.0",
//     "react-number-format": "^4.4.1",
//     "react-redux": "^7.1.3",
//     "react-swipeable-views": "^0.13.9",
//     "react-swipeable-views-core": "^0.13.7",
//     "react-swipeable-views-utils": "^0.13.9",
//     "react-text-mask": "^5.4.3",
//     "react-transition-group": "^4.3.0",
//     "redaxios": "^0.3.0",
//     "redux": "^4.0.4",
//     "redux-act": "^1.8.0",
//     "redux-thunk": "^2.3.0",
//     "reselect": "^4.0.0",
//     "styled-components": "^5.2.1",
//     "uniqid": "^5.2.0"
//   },
//   "devDependencies": {
//     "@hot-loader/react-dom": "^17.0.1",
//     "prettier": "^1.19.1"
//   },


// =====================================================================================

// require('dotenv').config();

// module.exports = {
//     siteMetadata: {
//       siteUrl: `https://svisni-sushi.ru`,
//       title: `Свистни суши`,
//       description: `Заказать роллы, пиццу и суши c 10 до 22:00 в службе доставки Свисни-Суши Уразово. Доставка в Валуйки, на дом, приятные цены, именинникам скидки.`,
//       keywords: `доставка, заказать, роллы, суши, еду, сеты, пиццу, на заказ`,
//       author: `@mazarrr`,
//   },
//   plugins: [
//     `gatsby-transformer-sharp`,
//    `gatsby-transformer-remark`,
//    `gatsby-plugin-sharp`,
//    `gatsby-plugin-react-helmet`,
//    `gatsby-plugin-material-ui`,
//     `gatsby-plugin-styled-components`,
//     {
//       resolve: `gatsby-source-filesystem`,
//       options: {
//         name: `images`,
//         path: `${__dirname}/src/images`,
//       },
//     },
//     {
//     resolve: `gatsby-plugin-manifest`,
//     options: {
//       name: `svisni-sushi`,
//       short_name: `Свисни суши`,
//       start_url: `/`,
//       background_color: `#663399`,
//       theme_color: `#663399`,
//       display: `standalone`,
//       icon: `src/images/logosvisni.png`,
//     },
//   },
//   {
//     resolve: `gatsby-plugin-react-redux`,
//     options: {
//       pathToCreateStoreModule: './src/state/createStore',
//       serialize: {
//         space: 0,
//         isJSON: true,
//         unsafe: false,
//         ignoreFunction: true,
//       },
//       cleanupOnClient: true,
//       windowKey: '__PRELOADED_STATE__',
//     },
//   },
//    {
//     resolve: `gatsby-source-contentful`,
//     options: {
//       spaceId: process.env.CONTENTFUL_SPACE_ID,
//       accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
//     },
//   },
//     {
//       resolve: `gatsby-plugin-webfonts`,
//       options: {
//         fonts: {
//           google: [
//             {
//               family: "Montserrat",
//               variants: ["500", "600", "800"],
//             },
//           ],
//         },
//         formatAgents: {
//           eot: `Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E)`,
//           ttf: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.59.8 (KHTML, like Gecko) Version/5.1.9 Safari/534.59.8`,
//           woff: `Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko`,
//           woff2: `Mozilla/5.0 (Windows NT 10.0; Win64; x64; ServiceUI 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14393`,
//         },
//         formats: ['woff2', 'woff']
//       },
//     },
//     `gatsby-plugin-ramda`,
//     `gatsby-plugin-sitemap`,
//     {
//       resolve: `gatsby-plugin-google-analytics`,
//       options: {
//         trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKINGID,
//         cookieExpires: "1000000"
//       },
//     },
//     {
//       resolve: 'gatsby-plugin-robots-txt',
//       options: {
//         host: 'https://svisni-sushi.ru',
//         sitemap: 'https://svisni-sushi.ru/sitemap.xml',
//         policy: [{
//           userAgent: '*',
//           allow: '/',
//           disallow: ['/korzina', '/korzina/order', '/cookie']
//         }]
//       }
//     },
//     {
//       resolve: `gatsby-plugin-yandex-metrika`,
//       options: {
//         trackingId: process.env.GATSBY_TRACKINGID_YAMETRIKA,
//         clickmap: true,
//         trackLinks: true,
//         accurateTrackBounce: true,
//         webvisor: true,
//         trackHash: true,
//         afterBody: true,
//         defer: false
//       }
//     },
//     {
//       resolve: `gatsby-plugin-offline`,
//       options: {
//         precachePages: [
//           `/*`,
//           `/sety/*`,
//           `/pizza/*`,
//           `/sale/*`,
//           `/kombo/*`
//         ],
//       },
//     }
//   ]
// };


  // ================================================================================

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

