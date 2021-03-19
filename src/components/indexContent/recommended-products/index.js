import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import SelectionContent from "./SelectionContent";
import SelectionContentMobile from "./SelectionContentMobile";
import styled from "styled-components";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  width: 100%;
  padding-bottom: 20px;
  @media (max-width: 600px) {
    font-size: 22px;
    padding-top: 20px;
    padding-right: 20px;
    padding-bottom: 0; 
  }
`

const RecommendedProducts = () => {

  const RecommendedProduct = useStaticQuery(
    graphql`
    query {
      allContentfulContentIndex {
        edges {
        node {
        new {
          __typename
          ... on Node {
            ... on ContentfulProduct {
              id
              name
              price
              slug
              description
              image {
               gatsbyImageData(placeholder: TRACED_SVG, formats: [WEBP, AUTO])
              }
            }
            ... on ContentfulProductPizza {
              id
              name
              __typename
              price
              priceIn33cm
              slug
              description
              image {
                gatsbyImageData(placeholder: TRACED_SVG, formats: [WEBP, AUTO])
              }
            }
            ... on ContentfulProductSlognyeRolly {
              id
              name
              description
              __typename
              price
              image {
               gatsbyImageData(placeholder: TRACED_SVG, formats: [WEBP, AUTO])
              }
            }
            ... on ContentfulProductHotRolly {
              id
              name
              __typename
              description
              price
              image {
                 gatsbyImageData(placeholder: TRACED_SVG, formats: [WEBP, AUTO])
              }
            }
            ... on ContentfulProductKombo {
              id
              name
              __typename
              count
              description
              price
              image {
                gatsbyImageData(placeholder: TRACED_SVG, formats: [WEBP, AUTO])
              }
            }
          ... on ContentfulProductSalat {
            id
            name
            __typename
            price
            description
            weight
            __typename
            image {
                 gatsbyImageData(placeholder: TRACED_SVG, formats: [WEBP, AUTO])
            }
          }
        }
      }
    }
  }
}
}
`)
const { allContentfulContentIndex: { edges : indexProduct }} = RecommendedProduct;
  return (
  <>
    <Title variant={"h2"}>Блюда которые понравятся каждому</Title>
    <Hidden smUp>
      <SelectionContentMobile product={indexProduct[0]} />
    </Hidden>
    <Hidden xsDown>
    <Grid container justify={"space-between"} style={{width: `100%`, marginBottom: 50}}>
        <SelectionContent product={indexProduct[0]} />
    </Grid>
    </Hidden>
  </>
  )
}

export default RecommendedProducts;