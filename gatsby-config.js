require('dotenv').config();

module.exports = {
    siteMetadata: {
      siteUrl: `https://svisni-sushi.ru`,
      title: `Свистни Суши`,
      description: `Заказать роллы, пиццу и суши c 10 до 22:00 в службе доставки Свисни-Суши Уразово. Доставка в Валуйки, на дом, приятные цены, именинникам скидки.`,
      keywords: `доставка, заказать, роллы, суши, еду, сеты, пиццу, на заказ`,
      author: `Нестеров Виталий`,
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
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    'gatsby-transformer-remark',
    `gatsby-plugin-sharp`,
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
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    // {
    //   resolve: `gatsby-source-drupal`,
    //   options: { 
    //     baseUrl: `http://ovz1.vitalistarkiii.pv29m.vps.myjino.ru/drupal/`,
    //     fastBuilds: true,
    //     // apiBase: `api`, // optional, defaults to `jsonapi`
    //     // basicAuth: {
    //     //   username: 'admin', 
    //     //   password: 'jH5n22c(sss2ff',
    //     // },
    //     concurrentFileRequests: 60, // optional, defaults to `20`
    //     concurrentAPIRequests: 10,
    //     requestTimeoutMS: 120000
    //     // skipFileDownloads: true,
    //   },
    // },
    {
      resolve:`gatsby-plugin-sitemap`,
      options: {
        output: '/sitemap'
    },
    },
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
    // {
    //   resolve: 'gatsby-plugin-robots-txt',
    //   options: {
    //     host: 'https://svisni-sushi.ru',
    //     sitemap: 'https://svisni-sushi.ru/sitemap/sitemap-index.xml',
    //     policy: [{
    //       userAgent: '*',
    //       allow: '/',
    //       disallow: ['/korzina/', '/korzina/order', '/cookie', '/offer', '/privacy']
    //     }]
    //   }
    // },
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
