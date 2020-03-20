import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql} from "gatsby";
import { connect } from 'react-redux';
import { producSetsLoad, setAddedToCart } from "../actions";
import { useStylesCart } from '../components/common/style';
import Spinner from '../components/spinner/spinner'
import { Grid } from "@material-ui/core";
import loadable from "@loadable/component";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'))

const Napitki = ({
      data: {
        allContentfulProductNapitki: {
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
    <SEO title="Доставка напитков на дом" 
       description="Коктейль Голубая лагуна, Мохито. Фруктовые, охлаждающие коктейли"
    />
       <div className={classes.titleH1}>
           <h1 style={{fontFamily: `Oswald, cursive`,
               fontWeight: 600}}>Напитки</h1>
       </div>
    <Grid container justify="center">
        {
            !load ? <CardsMenuPage titleCategory="Напитки" slugCategogy="/napitki" visibleItems={product}
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
  
export default connect(mapStateToProps, mapDispatchToProps)(Napitki)

export const query = graphql `
    {
    allContentfulProductNapitki {
        edges {
            node {
                id
                price
                name
                weight
                    image {
                        fluid(maxWidth: 300, maxHeight: 300) {
                            ...GatsbyContentfulFluid
                        }
                    }
            }
        }
    }
        contentfulIconMenuLeftPanel(name: {eq: "Напитки"}) {
           image {
             fluid(maxWidth: 35) {
               ...GatsbyContentfulFluid
             }
           }
         }
        }
    `
