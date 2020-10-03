import React, {useEffect} from "react"
import SEO from "../components/seo"
import { graphql } from "gatsby";
import { connect } from 'react-redux';
import { Grid } from "@material-ui/core";
import {useStyleH1} from "../components/common/style";
import loadable from "@loadable/component";
import { productLoaded } from "../reducers/app";
import {defaultTo} from "ramda";

const CardsMenuPage = loadable(()=>import('../components/CardsMenuPage'));

const Wok = ({data: {allContentfulProductWok: {edges: productsWok}, contentfulIconMenuLeftPanel: {image}},
                   dispatch, product: wok, productWok }) => {

    const { title } = useStyleH1();
    const product = defaultTo(wok, productWok);
    useEffect(() => {
        dispatch(productLoaded(productsWok)) // action push to reduxStore
    }, [productsWok, dispatch]);

    return (
        <section>
            <SEO title="Доставка лапши Вок. Заказать лапшу wok в Валуйки"
                 description="Заказать wok с доставкой. Вок с морепродуктами, овощами, курицей, свининой всего от 190 руб"/>
            <h1 className={title}>Вок</h1>
            <Grid container justify="center" itemScope itemType="http://schema.org/ItemList">
                <CardsMenuPage titleCategory="Wok" slugCategogy="/wok" visibleItems={product}
                               image={image} product={product}/>
            </Grid>
        </section>
    )
};

const mapStateToProps = (state) => ({
    product: state.app.product,
    productWok: state.shoppingCart.newWok
});

export default connect(mapStateToProps, null)(Wok)

export const queryWok = graphql `
    {
        allContentfulProductWok {
            edges {
                node {
                    id
                    name
                    price
                    weight
                    count
                    description
                    private
                    image {
                        fluid(maxWidth: 400) {
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }
        contentfulIconMenuLeftPanel(name: {eq: "Вок"}) {
            image {
                fluid(maxWidth: 50) {
                    ...GatsbyContentfulFluid
                }
            }
        }
    }
`