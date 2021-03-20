import React, { useEffect } from "react";
import { Router } from "@reach/router";

import VegetariansMenu from "../components/VegetariansMenu";
import { graphql, navigate } from "gatsby";

const BounceToHome = () => {
  useEffect(() => {
    navigate('/', { replace: true })
  }, [])
  return null
}


const SpecialMenu = ({ data: {allContentfulVegetarian: {edges: vegan}} }) => {
  return (
    <div>
      <Router>
        <VegetariansMenu menu={vegan[0].node.vegeraeianMenu} path="special-menu/vegetarian/" />
        <BounceToHome default />
      </Router>
    </div>

  )
}

export default SpecialMenu;

export const query = graphql `
 {
  allContentfulVegetarian {
    edges {
      node {
        id
        vegeraeianMenu {
          ... on ContentfulProduct {
            id
            name
            count
            slug
            description
            image {
              gatsbyImageData
            }
            weight
            price
            defaultPrice
          }
          ... on ContentfulProductHotRolly {
            id
            name
            count
            description
            price
            image {
              gatsbyImageData
            }
          }
          ... on ContentfulProductPizza {
            id
            name
            count
            description
            pizzaSale
            price
            weight
            slug
            priceIn33cm
             image {
              gatsbyImageData
            }
          }
          ... on ContentfulProductSalat {
            id
            name
            description
            price
            image {
              gatsbyImageData
            }
          }
          ... on ContentfulProductSlognyeRolly {
            id
            name
            image {
              gatsbyImageData
            }
            description
            count
            price
          }
          ... on ContentfulProductZakuski {
            id
            name
            price
            image {
              gatsbyImageData
            }
            description
            count
          }
        }
      }
    }
  }
}
`