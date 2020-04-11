const dotenv = require('dotenv')

if(process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

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
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [
        `/*`,
        `/sety/*`,
        `/pizza/*`,
        `/hot-rolls/*`,
        `/branded-rolls/*`
      ],
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
        typekit: {
          families: ["Oswald"],
        }
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
          disallow: ['/slozhnyeRolly', '/klassicheskieRolly', '/zapechenyeRolly']
        }]
      }
    },
    {
    resolve: `gatsby-plugin-yandex-metrika`,
      options: {
        trackingId: '57341296',
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        trackHash: true
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
          client_email: "svisnisushi@svisni.iam.gserviceaccount.com",
          private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDEVOeslwNCiw0x\nNEoy0mibdmflVwd3sXe159RQhQk/jMeeNpCbsBIiH2UrZxcGE/L9U6hJaBPc2/8z\nw0+UVuHOU/LM+EiPM5NkOWXYiqAlBsPLi2Cv8DHbJKQzHkchLGMKf7uvMiniTpQv\nfVDdt/IKK/2o6uwnGETL2A/WySmZH3p2CgfCJrvyknA6dfxTPKXOXnPcQTQOgnNA\n6S9boLUFC1rqPxrg6bObkkJAKfWtcUJVnGY+iamvz1n/SGlgZsq2kAVUbWge9buY\np3sQkm2wXgDcOUmIdbCLmqWa+To80F7xyak9+uH6vg2SKVYkKeTRC4s60j8hYl4+\n/v6UqD97AgMBAAECggEANtRZYP9Jh0drFz85q4jMcwI10Lwl1z0GKBSG3DfTFd7c\njqhBaWFaJxJqgB0JtoZSuYGoAVwiE++SjWOxsUU0SZlzON/r76YhNv+6nCdWwxBp\nFMqnZWsomUFZ4/bEOZT6Ud/LTAmv3cZBJyQRteHdpA6WCBsXeXGTIPSFs9+5EMxW\n+6rdzuWO6Z0x7eCc/NM9f2HTUN9udHcomBm68zf2l/O59dTNJrqTmrP8UfVyus/c\nNZl3sOvP+nMsLbXBhnfMUj18kzu7xx3OSGLTgsBmneXQPv3K+1cvqvTRJaaHgHWR\nDPmXwsyuDtRJVsyQKzoNyNk0aWn/Dm3TTld4M/OotQKBgQDj4hmCSEps9v+7RDBk\n2drQNmxLPqAuukXf1MiE2cw2rEcrZdoxY3goQIMzrfUP3p9b4gZ5uivQLs+HABzE\nUMgOaCk908PJS0ey2xEVQHMchJDpUxwTSn3i04cVYL2eAUIbFX4n2WImNeKHWp0A\nIUN0dMGSVFP9ubel/UwuDvub7QKBgQDcjjiMcedcbc/LkjwuI0DHNojqnzL3GwVD\nR4Eyne500pqhiF6wIp8oqIvij7Ey7fCqJ0a15hSyvB0q32upJGLvuPchH0ssBbmG\nqEUAOSAL1u2TOg7h5cpjHSluTVRxPkZ4BmpPEZOfh116BNwuoF1PAm24RWIkRxlz\n64bYZBtsBwKBgQC05lKrqqlyUK13wkzMcmiSavGS1dcg4PwBEJBRbff/2sjweX05\nQaYsBfJhPxHQFEDbFtVfIlwPemmB2KP9b8cwMJ20l/vPOrRjFiY8gZofpFjI8BHU\neojuXE7auJ4t5P/OMkSga5/Ph20ZV+RUKxO6Sck0WT8HprtTyH0F/xzbjQKBgQC4\nBW4HOK5af0EGUFAoCr/st4LLh+MFLCVa+llA+2bPUD02k8q1WV3ElcSJV2z42nCX\n98dW087nRm9rqxhv+u0VqRWBLFQTOf+O6+0Of5tOZZi545IxRwJzagx8fMb86YHw\neSHQMREj5NTIjy+LM8BGwPb87d8x96S0BIrxF62NlwKBgQC9uqT88gnxP4GkLO1s\n2gFc7EoI4La/5PS6/J5bVXDGxaiREZTpaE5laLEWU7j1k4HteJJ+0R6n+xALmbCO\nxZmLp3imu5BlCVQp6i00+xaOarD7BgbGJdUQPLAqS8/xXoauaTe0CODorLCkb0/r\nUQFjg9OHoC9epIcqNuh8Z84o/Q==\n-----END PRIVATE KEY-----\n",
        },
        period: {
          startDate: new Date("2020-2-2"),
          endDate: new Date(),
        },
      },
    }
  ]
}

// {
//   resolve: `gatsby-plugin-nprogress`,
//       options: {
//   color: `tomato`,
//       minimum: 0.2,
//       showSpinner: false,
// },
// },