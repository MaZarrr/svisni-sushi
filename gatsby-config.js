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
        short_name: `Свисни суши`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `fullscreen`,
        // display: `minimal-ui`,
        icon: `src/images/logosvisni.png`, // This path is relative to the root of the site.
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
    {
    resolve: "gatsby-plugin-google-tagmanager",
    options: {
      id: "UA-123121109-2",
      includeInDevelopment: false,
      defaultDataLayer: { platform: "gatsby" },
    },
  },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-123121109-2"
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
    resolve: `gatsby-plugin-yandex-metrika`,
      options: {
        trackingId: '57341296',
        webvisor: true,
        trackHash: true,
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
    {
      resolve: `@mangoart/gatsby-plugin-purechat`,
      options: {
        enabled: true,
        websiteId: `4ea5ea00-517c-43e9-bb61-33f55324d3cc`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/*`],
        workboxConfig: {
          importWorkboxFrom: `local`,
          globDirectory: '/',
          globPatterns: [
            '**\/*.{js,css,html,png,jpg,jpeg}',
          ],
          // modifyURLPrefix: {
            // If `pathPrefix` is configured by user, we should replace
            // the default prefix with `pathPrefix`.
          //   "/": `${pathPrefix}/`,
          // },
          cacheId: `gatsby-plugin-offline`,
          // Don't cache-bust JS or CSS files, and anything in the static directory,
          // since these files have unique URLs and their contents will never change
          dontCacheBustURLsMatching: /(\.js$|\.css$|static\/)/,
          runtimeCaching: [{
              // Use cacheFirst since these don't need to be revalidated (same RegExp
              // and same reason as above)
              urlPattern: /(\.js$|\.css$|static\/)/,
              handler: `CacheFirst`,
            },
            {
              // page-data.json files are not content hashed
              urlPattern: /^https?:.*\page-data\/.*\/page-data\.json/,
              handler: `NetworkFirst`,
            },
            {
              // Add runtime caching of various other page resources
              urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
              handler: `StaleWhileRevalidate`,
            },
            {
              // Google Fonts CSS (doesn't end in .css so we need to specify it)
              urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
              handler: `StaleWhileRevalidate`,
            },
          ],
          skipWaiting: true,
          clientsClaim: true,
        }
      },
    },
  ],
}


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
