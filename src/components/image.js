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
      avatarImage: file(relativePath: { eq: "logosvisni.png" }) {
        childImageSharp {
          fixed(width: 90, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      },
      emptyBasketImage: file(relativePath: { eq: "emptyCart.png" }) {
        childImageSharp {
          fluid(maxWidth: 400, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      },
        successImage: file(relativePath: { eq: "checked.png" }) {
            childImageSharp {
                fluid(maxWidth: 300, quality: 100) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
  `);

  return [data]
}

