// import React from "react"
import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "logosvisni.png" }) {
        childImageSharp {
          fluid(maxWidth: 120, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      },
      avatarImage: file(relativePath: { eq: "avatar.jpg" }) {
        childImageSharp {
          fixed(width: 90, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return [data]
}

