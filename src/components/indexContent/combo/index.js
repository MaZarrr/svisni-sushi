import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import KomboContent from "./KomboContent";
import KomboMobileContent from "./KomboMobileContent";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import { Hidden } from "@material-ui/core";

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

const ComboProduct = () => {

  const  { allContentfulContentIndex: { edges : indexProduct }} = useStaticQuery(graphql`
   query {
      allContentfulContentIndex {
        edges {
        node {
        combos {
          id
          description
          name
          __typename
          price
          slug
          image {
            gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
          }
        }
    }
  }
}
}
`)
  return (
    <>
      <Title>Комбо из пиццы суши роллов</Title>
      {/*Комбо компьютер*/}
      <Hidden xsDown>
        <Grid container justify={"space-between"} style={{ width: `100%`, marginBottom: 50 }}>
          <KomboContent product={indexProduct[1]} />
        </Grid>
      </Hidden>

      {/* Комбо телефон */}
      <Hidden smUp> <KomboMobileContent product={indexProduct[1]} /> </Hidden>
    </>
  )
}

export default ComboProduct