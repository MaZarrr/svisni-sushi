import React from 'react'
import { graphql } from 'gatsby';
import KlassikaItem from '../components/SloghItem';

const KlassikaTeamplates = ({
    data: {contentfulProductKlassika}}) => { 
      
 return  (
     <>
   <KlassikaItem
        name={contentfulProductKlassika.name}
        price={contentfulProductKlassika.price}
        description={contentfulProductKlassika.description}
        image={contentfulProductKlassika.image.fluid}
    >
    </KlassikaItem>
    </>
    )}

export default KlassikaTeamplates

export const query = graphql ` 
    query ($slug: String!) {
        contentfulProductKlassika(slug: {eq: $slug}) {
          name
          price
          description
          weight
          count
          image {
              fluid(maxWidth: 400) {
                  ...GatsbyContentfulFluid
                }
            }
        }
    }
  `