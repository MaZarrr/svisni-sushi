import React from 'react'
import { graphql } from 'gatsby';
import KomboItem from "../components/KomboItem";

const KomboTeamplate = ({data: {contentfulProductKombo}}) => {
    return  (
        <KomboItem
                id={contentfulProductKombo.id}
                name={contentfulProductKombo.name}
                price={contentfulProductKombo.price}
                description={contentfulProductKombo.description}
                weight={contentfulProductKombo.weight}
                count={contentfulProductKombo.count}
                image={contentfulProductKombo.image.fluid}
                edit={contentfulProductKombo.edit}
                slug={contentfulProductKombo.slug}
                products={{sostavDefault: contentfulProductKombo.sostavDefault,
                    ContentfulProductHotRolly: contentfulProductKombo.productsKomboRolls,
                    ContentfulProductSlognyeRolly: contentfulProductKombo.productsKomboRolls,
                    ContentfulProductWok: contentfulProductKombo.productsKomboWok,
                    ContentfulProductNapitki: contentfulProductKombo.productsKomboNapitki,
                    ContentfulProductPizza: contentfulProductKombo.productsCombo,
                    ContentfulProductKlassika: contentfulProductKombo.contentfulProductKlassika,
                    ContentfulProductSouse: contentfulProductKombo.contentfulProductSouses,
                    ContentfulProductZakuski: contentfulProductKombo.productsKomboZakuski
                }}>
        </KomboItem>
    )};

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
                        fluid(maxWidth: 600) {
                            ...GatsbyContentfulFluid
                        }
                    }
                    sostavDefault {
                        ... on ContentfulProductZakuski {
                            id
                            name
                            image {
                                fluid(maxWidth: 250) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                        }
                        ... on ContentfulProductSouse {
                            id
                            name
                            image {
                                fluid(maxWidth: 250) {
                                    ...GatsbyContentfulFluid
                                }
                            } 
                        }
                        ... on ContentfulProductKlassika {
                            id
                            name
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
                    contentfulProductKlassika {
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
                    contentfulProductSouses {
                id
                name
                price
                image {
                    fluid(maxWidth: 250) {
                        ...GatsbyContentfulFluid
                    }
                }
                count
            }
                    productsKomboZakuski {
                id
                name
                price
                count
                image {
                    fluid(maxWidth: 250) {
                        ...GatsbyContentfulFluid
                    }
                }
            }
        }
    }`;