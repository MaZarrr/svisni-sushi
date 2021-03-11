import { useStaticQuery, graphql } from "gatsby"

const ImageDel = () => {
  const data = useStaticQuery(graphql`{
  placeholderImage: file(relativePath: {eq: "logosvisni.png"}) {
    childImageSharp {
      gatsbyImageData(width: 120, quality: 100, layout: CONSTRAINED)
    }
  }
  avatarImage: file(relativePath: {eq: "logosvisni.png"}) {
    childImageSharp {
      gatsbyImageData(width: 90, quality: 100, layout: FIXED)
    }
  }
  emptyBasketImage: file(relativePath: {eq: "emptyCart.png"}) {
    childImageSharp {
      gatsbyImageData(width: 400, quality: 100, layout: CONSTRAINED)
    }
  }
  successImage: file(relativePath: {eq: "checked.png"}) {
    childImageSharp {
      gatsbyImageData(width: 300, quality: 100, layout: CONSTRAINED)
    }
  }
}
`);

  return [data]
}

export default ImageDel;
//