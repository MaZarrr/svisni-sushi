require('dotenv').config();

module.exports = {
  siteMetadata: {
    siteUrl: `https://svisni-sushi.ru`,
    title: `Свистни Суши`,
    description: `Заказать роллы, пиццу и суши c 10 до 22:00 в службе доставки Свисни-Суши Уразово. Доставка в Валуйки, на дом, приятные цены, именинникам скидки.`,
    keywords: `доставка, заказать, роллы, суши, еду, сеты, пиццу, на заказ`,
    author: `@mazarrr`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    'gatsby-transformer-remark',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        stripMetadata: true,
        defaultQuality: 100,
      },
    },
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
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-material-ui`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Oswald"],
        },
        typekit: {
          families: ["Oswald"],
        }
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATSBY_GOOGLE_ANALYTICS_TRACKINGID,
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
          disallow: ['/slozhnyeRolly', '/klassicheskieRolly', '/zapechenyeRolly']
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
        defer: false
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      },
    }
  ]
};
