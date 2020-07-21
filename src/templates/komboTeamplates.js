import React from 'react'
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import KomboItem from "../components/KomboItem";
// import {addedCart} from "../reducers/shopping-cart";
import * as R from 'ramda'

const KomboTeamplate = ({data: {contentfulProductKombo}}) => {
    console.log(contentfulProductKombo)
    // const product = hotRolls.concat(brandedRolls, smallRoll, sushi, gunkan)
    // const nameProduct = contentfulProduct.description.toLowerCase().split(', ')
    // const kitProduct = product.filter(({node: item}) => {
    //     return R.contains(item.name.toLowerCase(), nameProduct)
    // })
    return  (
        <KomboItem
                name={contentfulProductKombo.name}
                price={contentfulProductKombo.price}
                description={contentfulProductKombo.description}
                weight={contentfulProductKombo.weight}
                count={contentfulProductKombo.count}
                image={contentfulProductKombo.image.fluid}
                edit={contentfulProductKombo.edit}
                products={{sostavDefault: contentfulProductKombo.sostavDefault,
                    ContentfulProductSlognyeRolly: contentfulProductKombo.productsKomboRolls,
                    ContentfulProductWok: contentfulProductKombo.productsKomboWok,
                    ContentfulProductNapitki: contentfulProductKombo.productsKomboNapitki,
                    ContentfulProductPizza: contentfulProductKombo.productsCombo

                }}

                // sostavDefault={contentfulProductKombo.sostavDefault}
                // productsKomboRolls={contentfulProductKombo.productsKomboRolls}
                // productsKomboWok={contentfulProductKombo.productsKomboWok}
                // productsKomboNapitki={contentfulProductKombo.productsKomboNapitki}
                // productsComboPizza={contentfulProductKombo.productsCombo}
        >

        </KomboItem>

            //     added={() => addedToCart({id: contentfulProduct.id, price: null,
            //         product: [{
            //             id: contentfulProduct.id,
            //             name: contentfulProduct.name,
            //             price: contentfulProduct.price,
            //             count: contentfulProduct.count,
            //             image: contentfulProduct.image
            //
            //         }
            //         ]}
            //     )}

    )};

// const mapDispatchToProps = (dispatch) => ({
//     addedToCart: (id, price, product) => dispatch(addedCart(id, price, product))
// })

// export default connect(null, mapDispatchToProps)(KomboTeamplate)
export default KomboTeamplate

export const query = graphql `
    query ($slug: String!) {
        contentfulProductKombo(slug: {eq: $slug}) {
                    id
                    name
                    count
                    description
                    price
                    edit
                    slug
                    weight
                    image {
                        fluid(maxWidth: 390) {
                            ...GatsbyContentfulFluid
                        }
                    }
                    sostavDefault {
                        ... on ContentfulProductHotRolly {
                            id
                            name
                            description
                            image {
                                fluid(maxWidth: 250) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                        }
                        ... on ContentfulProductNapitki {
                            id
                            name
                            description
                            image {
                                fluid(maxWidth: 250) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                        }
                        ... on ContentfulProductPizza {
                            id
                            name
                            description
                            image {
                                fluid(maxWidth: 250) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                        }
                        ... on ContentfulProductSlognyeRolly {
                            id
                            name
                            description
                            image {
                                fluid(maxWidth: 250) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                        }
                        ... on ContentfulProductWok {
                            id
                            name
                            description
                            image {
                                fluid(maxWidth: 250) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                        }
                    }
                    productsKomboWok {
                        id
                        name
                        description
                        price
                        image {
                            fluid(maxWidth: 250) {
                                ...GatsbyContentfulFluid
                            }
                        }
                    }
                    productsKomboRolls {
                        ... on ContentfulProductSlognyeRolly {
                            id
                            name
                            price
                            description
                            image {
                                fluid(maxWidth: 250) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                        }
                        ... on ContentfulProductHotRolly {
                            id
                            name
                            price
                            description
                            image {
                                fluid(maxWidth: 250) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                        }
                    }
                    productsKomboNapitki {
                        id
                        image {
                            fluid(maxWidth: 250) {
                                ...GatsbyContentfulFluid
                            }
                        }
                        name
                        price
                    }
                    productsCombo {
                        id
                        name
                        price
                        image {
                            fluid(maxWidth: 250) {
                                ...GatsbyContentfulFluid
                            }
                        }
                        count
                        description
                    }
        }
    }`;