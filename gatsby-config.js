const dotenv = require('dotenv')

if(process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

module.exports = {
  siteMetadata: {
    siteUrl: `https://svisni-sushi.ru`,
    title: `СвисниБар`,
    description: `Заказать роллы, пиццу и суши c 10 до 22:00 в службе доставки Свисни-Суши Уразово. 
    Доставка в Валуйки, на дом, приятные цены, именинникам скидки. Звонок 8-904-094-92-22`,
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
        display: `standalone`,
        icon: `src/images/logosvisni.png`, 
      },
    },
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-styled-components`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Comfortaa", "Oswald"],
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
        trackingId: "UA-123121109-2",
        cookieExpires: "1000000"
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://svisni-sushi.ru',
        sitemap: 'https://svisni-sushi.ru/sitemap.xml',
        policy: [{
          userAgent: '*',
          allow: '/',
          disallow: ['/cookie', '/korzina', '/offer', '/order-processed', '/order', '/privacy']
        }]
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
      resolve: "gatsby-plugin-guess-js",
      options: {
        GAViewID: `212087237`,
        minimumThreshold: 0.03,
        jwt: {
          client_email: `svisnisushi@svisni.iam.gserviceaccount.com`,
          private_key: `82459e3199ba0281496f6e1e02aab0f8a5e8b91a`,
        },
        period: {
          startDate: new Date("2020-2-2"),
          endDate: new Date(),
        },
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
      workboxConfig: {
        importWorkboxFrom: `cdn`,
        globDirectory: '/',
        globPatterns: [
          '**/*.{html,json,js,css}',
        ],
        cacheId: `gatsby-plugin-offline`,
        dontCacheBustURLsMatching: /(\.js$|\.css$|static\/)/,
        runtimeCaching: [{
        urlPattern: /(\.js$|\.css$|static\/)/,
        handler: `CacheFirst`,
        },
        {
          urlPattern: /^https?:.*\page-data\/.*\/page-data\.json/,
          handler: `NetworkFirst`,
        },
        {
          urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
          handler: `StaleWhileRevalidate`,
        },
        {
          urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
          handler: `StaleWhileRevalidate`,
        },
        ],
        skipWaiting: true,
        clientsClaim: true,
    },
  },
  },
  ],
}


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
