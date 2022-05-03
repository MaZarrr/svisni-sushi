require('dotenv').config();

const fetch = require("isomorphic-fetch");
const { createHttpLink, from  } = require('@apollo/client')
const { RetryLink } = require(`@apollo/client/link/retry`)

const retryLink = new RetryLink({
  delay: {
    initial: 100,
    max: 2000,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error, operation) =>
      Boolean(error) && ![500, 400].includes(error.statusCode),
  },
})



module.exports = {
    siteMetadata: {
      siteUrl: `https://svisni-sushi.ru`,
      title: `Свистни Суши`,
      description: `Заказать роллы, пиццу и суши c 10 до 22:00 в службе доставки Свисни-Суши Уразово. Доставка в Валуйки, на дом, приятные цены, именинникам скидки.`,
      keywords: `доставка, заказать, роллы, суши, еду, сеты, пиццу, на заказ`,
      author: `@mazarrr`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: "SvisniSushi",
        fieldName: "svisnisushi",
        // Create Apollo Link manually. Can return a Promise.
        createLink: pluginOptions => {
          return from([retryLink, createHttpLink({
            uri: 'http://localhost:3000/graphql',
            fetch,
            // headers: {
            //   Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            // },
          })
        ])
      }
    }
  },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    'gatsby-transformer-remark',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: 'blurred',
          breakpoints: [300, 600, 960, 1280, 1920]
        }
      }
    },
    {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `svisni-sushi`,
      short_name: `Свисни суши`,
      start_url: `/`,
      background_color: `#fa0000`,
      theme_color: `#fa0000`,
      display: `standalone`,
      icon: `src/images/logosvisni.png`,
    },
  },
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        pathToCreateStoreModule: './src/state/createStore',
        serialize: {
          space: 0,
          isJSON: true,
          unsafe: false,
          ignoreFunction: true,
        },
        cleanupOnClient: true
      },
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Montserrat:700, 600, 500, 400, 300:cyrillic"]
        }
      }
    },
   `gatsby-plugin-react-helmet`,
    // {
    //   resolve: `gatsby-source-contentful`,
    //   options: {
    //     spaceId: process.env.CONTENTFUL_SPACE_ID,
    //     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    //     pageLimit: 50,
    //     assetDownloadWorkers: 25
    //   },
    // },
    
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GATSBY_GOOGLE_ANALYTICS_TRACKINGID,
        ],
        pluginConfig: {
          head: false,
          defer: true
        },
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://svisni-sushi.ru',
        sitemap: 'https://svisni-sushi.ru/sitemap/sitemap-index.xml',
        policy: [{
          userAgent: '*',
          allow: '/',
          disallow: ['/korzina', '/korzina/order', '/cookie']
        }]
      }
    },
    {
      resolve: `gatsby-plugin-yandex-metrika`,
      options: {
        trackingId: process.env.GATSBY_TRACKINGID_YAMETRIKA,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        trackHash: true,
        afterBody: true,
        defer: true,
        useCDN: true
      }
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [
          `/*`,
          `/sety/*`,
          `/sale/*`,
          `/kombo/*`
        ],
      },
    }
  ]
};
