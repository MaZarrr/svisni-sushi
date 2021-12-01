import React, { memo } from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
// import montserratBold from '../assets/Montserrat-ExtraBold.woff2'
// import montserratMedium from '../assets/Montserrat-Medium.woff2'

const Seo = memo(function Seo({ description, lang, meta, title, keywords, pathname = null, noindex = false }) {

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
    const metaDescription = description || site.siteMetadata.description
    const metaKeywords = keywords || site.siteMetadata.keywords
    const canonical = pathname !== null ? `${site.siteMetadata.siteUrl}${pathname}` : null
    const noindexTxt = noindex ? "noindex" : false
      console.log(noindex);
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      description={metaDescription}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      defer={false}
      link={[
        canonical ? { rel: "canonical", href: canonical } : {}
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: metaKeywords
        },
        noindexTxt ? {
          name: "robots",
          content: noindexTxt
        } : {},
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `viewport`,
          content: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        },
        {
          name: "google-site-verification",
          content: "Dl5O_rAjIGCzaRIsDM6M4jsV2gz4zAePxeTghWzZbvE",
        },
        {
          name: `wmail-verification`,
          content: `3f3d80ea360609afbf541ab3ad672f4a`,
        },
        {
          name: "yandex-verification",
          content: "d47803efe98f2440"
        }
      ].concat(meta)}
    />
  )
})

Seo.defaultProps = {
  lang: `ru`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default Seo

// {
//   rel: "preload",
//     href: montserratBold,
//   as: "font",
//   type: "font/woff2",
//   crossOrigin: "anonymous",
// },
// {
//   rel: "preload",
//     href: montserratMedium,
//   as: "font",
//   type: "font/woff2",
//   crossOrigin: "anonymous",
// },