import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { producSetsLoad, setAddedToCart } from "../actions";
import { Grid } from "@material-ui/core";
import { useStylesCart } from '../components/common/style'
import Spinner from '../components/spinner/spinner'
import loadable from "@loadable/component";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Kombo = ({
      data: {
        allContentfulProductKombo: {
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
    <SEO title="Доставка с 10:00 до 22:00 комбо наборов из суши, роллов, пиццы и лапши Вок" />
        <div className={classes.titleH1}>
            <h1 style={{fontFamily: `Oswald, cursive`,
                fontWeight: 600}}>Комбо</h1>
        </div>
    <Grid container justify="center">
        {
            !load ? <CardsMenuPage titleCategory="Комбо" slugCategogy="/kombo" visibleItems={product}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Kombo)

export const querySets = graphql `
    {
        allContentfulProductKombo {
          edges {
            node {
                id
              slug
              name
              price
              weight
              count
              description
              image {
                  fluid(maxWidth: 310) {
                    ...GatsbyContentfulFluid
                  }
              }
              }
            }
          }
           contentfulIconMenuLeftPanel(name: {eq: "Комбо"}) {
            image {
              fluid {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
    `

