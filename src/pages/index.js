import React from "react"
import SEO from "../components/seo"
import "../components/sass/index.css"
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import CardIndex from "../components/Card";
import CarouselSvisni from "../components/common/CarouselSvisni"
import {addedCart} from "../reducers/shopping-cart";
import {connect} from "react-redux";
import {graphql} from "gatsby";
import {loadIndexItems} from "../reducers/app";

const useStyleIndexPage = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: `100%`,
        marginBottom: 70
    }
}));

const IndexPage = ({data: {allContentfulContentIndex: {edges},
    allContentfulHomePageImageMenu: {edges: menu}}, addedCart, indexProduct, indexMenu}) => {

  const classes = useStyleIndexPage();
    React.useEffect(() => {
        loadIndexItems({edges, menu})
    }, [edges, menu]);

return (
  <section>
  <SEO title="Заказать любимые суши и роллы c доставкой в Валуйки"
  description="Бесплатная доставка суши, роллов, пиццы и воков в Валуйках.
  Наше меню суши порадует широким выбором и низкими ценами. Заказ еды c 10 до 22:00"/>

   <CarouselSvisni />
          <Grid item xs={12} className={classes.root}>
              <CardIndex addedCart={addedCart}
                         indexProduct={edges}
                         indexMenu={menu} />
          </Grid>
  </section>
  )
};

const mapStateToProps = (state) => ({
    indexProduct: state.app.indexProduct,
    indexMenu: state.app.indexMenu
});

const mapDispatchToProps = {
    addedCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)

// export default IndexPage

export const query = graphql `
    {
        allContentfulContentIndex {
            edges {
                node {
                    title
                    combos {
                        id
                        description
                        name
                        image {
                            fluid(maxWidth: 300) {
                                ...GatsbyContentfulFluid
                            }
                        }
                        price
                        slug
                    }
                    new {
                        ... on ContentfulProduct {
                            id
                            name
                            price
                            slug
                            image {
                                fluid(maxWidth: 300) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                            count
                            description
                        }
                        ... on ContentfulProductGunkan {
                            id
                            name
                            price
                            image {
                                fluid(maxWidth: 300) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                            count
                            description
                        }
                        ... on ContentfulProductPizza {
                            id
                            name
                            price
                            priceIn33cm
                            slug
                            image {
                                fluid(maxWidth: 300) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                            count
                            description
                        }
                        ... on ContentfulProductSlognyeRolly {
                            id
                            name
                            count
                            description
                            price
                            image {
                                fluid(maxWidth: 300) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                            slug
                        }
                    }
                }
            }
        }
        allContentfulHomePageImageMenu(sort: {fields: desc}) {
            edges {
                node {
                    id
                    slug
                    category
                    desc
                    image {
                        fluid(maxWidth: 300) {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }
    }
`

