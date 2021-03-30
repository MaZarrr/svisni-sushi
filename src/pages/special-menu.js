import React, { useEffect } from "react";
import { Router } from "@reach/router";

import SpecialMenu from "../components/VegetariansMenu";
import { graphql, navigate } from "gatsby";

const BounceToHome = () => {
  useEffect(() => {
    navigate('/', { replace: true })
  }, [])
  return null
}


const SpecialMenuProduct = ({ data: {contentfulSpecialMenu} }) => {
  return (
      <Router>
        <SpecialMenu menu={contentfulSpecialMenu} path="special-menu/:menuID" />
        <BounceToHome default />
      </Router>
  )
}

export default SpecialMenuProduct

export const query = graphql`
query MyQuery($slug: String!) {
  contentfulSpecialMenu(slug: {eq: $slug}) {
    categoryName
    iconImage {
          gatsbyImageData
        }
    products {
      ... on ContentfulProduct {
        id
        name
        image {
          gatsbyImageData
        }
        slug
        count
        description
        price
      }
      ... on ContentfulProductGunkan {
        id
        name
        count
        description
        image {
          gatsbyImageData
        }
        weight
        price
      }
      ... on ContentfulProductHotRolly {
        id
        name
        count
        description
        image {
          gatsbyImageData
        }
        price
        slug
        variant
        weight
      }
      ... on ContentfulProductKlassika {
        id
        name
        count
        description
        image {
          gatsbyImageData
        }
        price
        slug
        weight
      }
      ... on ContentfulProductKombo {
        id
        name
        count
        image {
          gatsbyImageData
        }
        description
        price
        slug
        weight
      }
      ... on ContentfulProductPizza {
        id
        name
        count
        description
        image {
          gatsbyImageData
        }
        slug
        price
        priceIn33cm
        weight33
      }
      ... on ContentfulProductSalat {
        id
        name
        description
        image {
          gatsbyImageData
        }
        price
        slug
        weight
      }
      ... on ContentfulProductSlognyeRolly {
        id
        name
        count
        description
        image {
          gatsbyImageData
        }
        slug
        weight
        price
      }
      ... on ContentfulProductWok {
        id
        name
        count
        description
        image {
          gatsbyImageData
        }
        price
        weight
      }
      ... on ContentfulProductZakuski {
        id
        name
        count
        description
        image {
          gatsbyImageData
        }
        price
        weight
      }
    }
  }
}
`
