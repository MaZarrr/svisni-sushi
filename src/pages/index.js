import React from "react"
import SEO from "../components/seo"
import "../components/sass/index.css"
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import CardIndex from "../components/Card";
import CarouselSvisni from "../components/common/CarouselSvisni"
import {addedCart} from "../reducers/shopping-cart";
import {connect} from "react-redux";
import { graphql, useStaticQuery } from "gatsby"

import {loadIndexItems} from "../reducers/app";
import {isEmpty} from "ramda";

const useStyleIndexPage = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: `100%`,
        marginBottom: 70
    }
}));

const IndexPage = ({loadIndexItems, addedCart, indexProduct: product, indexMenu: menus}) => {

    const { allContentfulContentIndex: {edges}, allContentfulHomePageImageMenu: {edges: menu}} = useStaticQuery(graphql`
         query {
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
                               __typename
                               ... on Node {
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
                                   ... on ContentfulProductZakuski {
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
                                   }
                                   ... on ContentfulProductKombo {
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
        `);

    const classes = useStyleIndexPage();
    React.useEffect(() => {
        loadIndexItems({edges, menu})
    }, [edges, menu, loadIndexItems]);

    console.log("edges", edges);

    const indexProduct = isEmpty(product) ? edges : product;
    const indexMenu = isEmpty(menus) ? menu : menus;

    return (
        <section>
            <SEO title="Заказать любимые суши и роллы c доставкой в Валуйки"
                 description="Бесплатная доставка суши, роллов, пиццы и воков в Валуйках.
  Наше меню суши порадует широким выбором и низкими ценами. Заказ еды c 10 до 22:00"/>

            <CarouselSvisni />
            <Grid item xs={12} className={classes.root}>
                <CardIndex addedCart={addedCart}
                           indexProduct={indexProduct}
                           indexMenu={indexMenu} />
            </Grid>
        </section>
    )};

const mapStateToProps = (state) => ({
    indexProduct: state.app.indexProduct,
    indexMenu: state.app.indexMenu
});

const mapDispatchToProps = {
    addedCart,
    loadIndexItems,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)

// export const query = graphql `
//     {
//         allContentfulContentIndex {
//             edges {
//                 node {
//                     title
//                     combos {
//                         id
//                         description
//                         name
//                         image {
//                             fluid(maxWidth: 300) {
//                                 ...GatsbyContentfulFluid
//                             }
//                         }
//                         price
//                         slug
//                     }
//                     new {
//                         __typename
//                         ... on Node {
//                             ... on ContentfulProduct {
//                                 id
//                                 name
//                                 price
//                                 slug
//                                 image {
//                                     fluid(maxWidth: 300) {
//                                         ...GatsbyContentfulFluid
//                                     }
//                                 }
//                                 count
//                                 description
//                             }
//                             ... on ContentfulProductGunkan {
//                                 id
//                                 name
//                                 price
//                                 image {
//                                     fluid(maxWidth: 300) {
//                                         ...GatsbyContentfulFluid
//                                     }
//                                 }
//                                 count
//                                 description
//                             }
//                             ... on ContentfulProductPizza {
//                                 id
//                                 name
//                                 price
//                                 priceIn33cm
//                                 slug
//                                 image {
//                                     fluid(maxWidth: 300) {
//                                         ...GatsbyContentfulFluid
//                                     }
//                                 }
//                                 count
//                                 description
//                             }
//                             ... on ContentfulProductSlognyeRolly {
//                                 id
//                                 name
//                                 count
//                                 description
//                                 price
//                                 image {
//                                     fluid(maxWidth: 300) {
//                                         ...GatsbyContentfulFluid
//                                     }
//                                 }
//                                 slug
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//         allContentfulHomePageImageMenu(sort: {fields: desc}) {
//             edges {
//                 node {
//                     id
//                     slug
//                     category
//                     desc
//                     image {
//                         fluid(maxWidth: 300) {
//                             ...GatsbyContentfulFluid
//                         }
//                     }
//                 }
//             }
//         }
//     }
// `
//