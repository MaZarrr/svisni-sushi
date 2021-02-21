import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

// const SEO = ({ description, lang, meta, title, keywords, pathname = null, noindex }) => {
const SEO = ({ description, lang, meta, title, keywords, noindex }) => {
  const { pathname } = useLocation()

// const {
//         title,
//         keywords,
//         siteUrl,
//         description,
//         author
//   } = site.siteMetadata

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            keywords
            siteUrl
            description
            author
          }
        }
      }
    `
  )

  const seo = {
    title: title || site.siteMetadata.title,
    description: description || site.siteMetadata.description,
    metaKeywords: keywords || site.siteMetadata.keywords,
    canonical: pathname !== null ? `${site.siteMetadata.siteUrl}${pathname}` : null,
    noindexTxt: noindex ?  "noindex" : null,
    // image: `${siteUrl}${image || defaultImage}`,
    url: `${site.siteMetadata.siteUrl}${pathname}`,
  }

    // const metaDescription = description || site.siteMetadata.description
    // const metaKeywords = keywords || site.siteMetadata.keywords
    // const canonical = pathname !== null ? `${site.siteMetadata.siteUrl}${pathname}` : null
    // const noindexTxt = noindex ?  "noindex" : null
      // <meta name="image" content={seo.image} />
      // {seo.image && <meta name="twitter:image" content={seo.image} />}
      // 

  return (
    <Helmet title={seo.title}>
      <meta name="description" content={seo.description} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      <meta property="og:type" content="website" />
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.metaKeywords && (
        <meta name="keywords" content={seo.metaKeywords} />
      )}
      {seo.noindexTxt && (
        <meta name="robots" content={seo.noindexTxt} />
      )}
       <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
       <meta name="google-site-verification" content="Dl5O_rAjIGCzaRIsDM6M4jsV2gz4zAePxeTghWzZbvE" />
        <meta name="wmail-verification" content="3f3d80ea360609afbf541ab3ad672f4a" />
        <meta name="yandex-verification" content="d47803efe98f2440" />
       {canonical && <link rel="canonical" href={seo.canonical} />}
       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"/>
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
}

// const query = graphql`
//   query SEO {
//     site {
//       siteMetadata {
//              title
//             keywords
//             siteUrl
//             description
//             author
//       }
//     }
//   }
// `











// import React, { memo } from "react"
// import PropTypes from "prop-types"
// import { Helmet } from "react-helmet"
// import { useStaticQuery, graphql } from "gatsby"


// const SEO = memo(function Seosite({ description, lang, meta, title, keywords, pathname = null, noindex }) {

//   const { site } = useStaticQuery(
//     graphql`
//       query {
//         site {
//           siteMetadata {
            // title
            // keywords
            // siteUrl
            // description
            // author
//           }
//         }
//       }
//     `
//   )

//     const metaDescription = description || site.siteMetadata.description
//     const metaKeywords = keywords || site.siteMetadata.keywords
//     const canonical = pathname !== null ? `${site.siteMetadata.siteUrl}${pathname}` : null
//     const noindexTxt = noindex ?  "noindex" : null

//   return (
//     <Helmet
//       htmlAttributes={{
//         lang,
//       }}
//       title={title}
//       description={metaDescription}
//       titleTemplate={`%s | ${site.siteMetadata.title}`}
//       defer={false}
//       link={[
//           {
//           href: `https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css`,
//           rel: `stylesheet`,
//           integrity: `sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN`,
//           crossorigin: `anonymous`
//         },
//         canonical ? { rel: "canonical", href: canonical } : {}
//       ]}
//       meta={[
//         {
//           name: `description`,
//           content: metaDescription,
//         },
//         {
//           name: `keywords`,
//           content: metaKeywords
//         },
//         noindexTxt ? {
//           name: "robots",
//           content: noindexTxt
//         } : {},
//         {
//           property: `og:title`,
//           content: title,
//         },
//         {
//           property: `og:description`,
//           content: metaDescription,
//         },
//         {
//           property: `og:type`,
//           content: `website`,
//         },
//         {
//           name: `twitter:card`,
//           content: `summary`,
//         },
//         {
//           name: `twitter:creator`,
//           content: site.siteMetadata.author,
//         },
//         {
//           name: `twitter:title`,
//           content: title,
//         },
//         {
//           name: `twitter:description`,
//           content: metaDescription,
//         },
        // {
        //   name: `viewport`,
        //   content: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        // },
        // {
        //   name: "google-site-verification",
        //   content: "Dl5O_rAjIGCzaRIsDM6M4jsV2gz4zAePxeTghWzZbvE",
        // },
        // {
        //   name: `wmail-verification`,
        //   content: `3f3d80ea360609afbf541ab3ad672f4a`,
        // },
        // {
        //   name: "yandex-verification",
        //   content: "d47803efe98f2440"
//         }
//       ].concat(meta)}
//     />
//   )
// })

// SEO.defaultProps = {
//   lang: `ru`,
//   meta: [],
//   description: ``,
// }

// SEO.propTypes = {
//   description: PropTypes.string,
//   lang: PropTypes.string,
//   meta: PropTypes.arrayOf(PropTypes.object),
//   title: PropTypes.string.isRequired,
// }

// export default SEO
