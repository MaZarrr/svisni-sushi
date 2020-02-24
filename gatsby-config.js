const dotenv = require('dotenv')

if(process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

module.exports = {
  siteMetadata: {
    siteUrl: `https://svisni-sushi.ru`,
    title: `СвисниБар`,
    description: `Заказать пиццу, суши, роллы с доставкой - Валуйки`,
    author: `@mazarrr`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `svisni-sushi`,
        short_name: `SvisniSushi`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `fullscreen`,
        // display: `minimal-ui`,
        icon: `src/images/logosvisni.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/*`],
      },
    },
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Comfortaa", "Oswald", "Neucha"],
        },
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "1816115975"
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://svisni-sushi.ru',
        sitemap: 'https://svisni-sushi.ru/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
    resolve: "gatsby-plugin-google-tagmanager",
    options: {
      id: "G-Z1XLFFGKW2",
      includeInDevelopment: false,
      defaultDataLayer: { platform: "gatsby" },
    },
  },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `tomato`,
        minimum: 0.2,
        showSpinner: false,
      },
    },
  ],
}

  // {
  //   resolve: 
  //   options: {
  //     precachePages: [`/*`],
  //      workboxConfig: {
  //        importWorkboxFrom: `cdn`,
  //      },
  // }
  // },
// {
//   resolve: `gatsby-plugin-yandex-metrika`,
//   options: {
//     trackingId: 'YOUR_YANDEX_METRIKA_TRACKING_ID',
//     webvisor: true,
//     trackHash: true,
//   },
// },
// require('dotenv').config({
//   path: '.env'
// })
// "yarn": "1.15.2"

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
