import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { producSetsLoad, setAddedToCart } from "../actions";
import Spinner from '../components/spinner/spinner'

import { Grid } from "@material-ui/core";
import { useStylesCart } from '../components/common/style';
import loadable from "@loadable/component";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const SmallRolls = ({
            data: {
                allContentfulProductKlassika: {
                    edges: setyProduct
                },
                contentfulIconMenuLeftPanel: {
                    image
                }
            },
    producSetsLoad, 
    setAddedToCart, product
  }) => {
  
  const [load, setLoad] = React.useState(true)
  const classes = useStylesCart();

  useEffect(() => {
    const data = setyProduct
    producSetsLoad(data); // action push to reduxStore
    setLoad(false)
  }, [setyProduct, producSetsLoad])

return ( 
   <section>
    <SEO title="Вкусные недорогие роллы. Заказать доставку на дом в Валуйки" />
     <h1 className={classes.titleH1}>Классические роллы</h1>
    <Grid container justify="center">
        {
            !load ? <CardsMenuPage titleCategory="Классические" slugCategogy="/small-rolls" visibleItems={product}
                                   setAddedToCart={setAddedToCart} image={image} product={product}/> : <Spinner />
        }
        </Grid>
      </section>
    )
}

const mapStateToProps = ({ setList: {product} }) => {
    return {product};
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
    producSetsLoad: (newProduct) => {
        dispatch(producSetsLoad(newProduct))
    },
    setAddedToCart: (id, price, product) => {
     dispatch(setAddedToCart(id, price, product))
   }
    }  
};
  
export default connect(mapStateToProps, mapDispatchToProps)(SmallRolls)

export const query = graphql `
    {
       allContentfulProductKlassika {
           edges {
               node {
                   id
                   name
                   price
                   variant
                   description
                   weight
                   count
                     image {
                         fluid(maxWidth: 300, maxHeight: 300) {
                             ...GatsbyContentfulFluid
                         }
                     }
               }
           }
       }
         contentfulIconMenuLeftPanel(name: {eq: "Классические"}) {
            image {
                fluid(maxWidth: 35) {
                    ...GatsbyContentfulFluid
                }
            }
        }
        }
    `

