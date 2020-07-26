import React from 'react'
import { graphql } from 'gatsby';
import KomboItem from "../components/KomboItem";

const KomboTeamplate = ({data: {contentfulProductKombo}}) => {

    const pizzas = () => {
    if(contentfulProductKombo.largePizza === null) return;

      if(!!contentfulProductKombo.largePizza) {
          return contentfulProductKombo.productsCombo.map(el => {
              return {...el, price: el.priceIn33cm}
          })
      }
      return contentfulProductKombo.productsCombo
    };
    const sostavDefault = () => {
        if (!!contentfulProductKombo.largePizza) {
            const pizzas = contentfulProductKombo.sostavDefault.filter(el => el.__typename === "ContentfulProductPizza");
            const newPizzas = pizzas.map(el => {
                return {...el, price: el.priceIn33cm}
            });

            const notPizza = contentfulProductKombo.sostavDefault.filter(el => el.__typename !== "ContentfulProductPizza");
            return newPizzas.concat(notPizza)

        }
        return contentfulProductKombo.sostavDefault
    };

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
                largePizza={contentfulProductKombo.largePizza}
                slug={contentfulProductKombo.slug}
                products={{sostavDefault: sostavDefault(),
                    ContentfulProductHotRolly: contentfulProductKombo.productsKomboRolls,
                    ContentfulProductSlognyeRolly: contentfulProductKombo.productsKomboRolls,
                    ContentfulProductWok: contentfulProductKombo.productsKomboWok,
                    ContentfulProductNapitki: contentfulProductKombo.productsKomboNapitki,
                    ContentfulProductPizza: pizzas(),
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
                    largePizza
                    slug
                    weight
                    image {
                        fluid(maxWidth: 500) {
                            ...GatsbyContentfulFluid
                        }
                    }
                    sostavDefault {
                        ... on ContentfulProductZakuski {
                            id
                            name
                            price
                            image {
                                fluid(maxWidth: 150) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                        }
                        ... on ContentfulProductSouse {
                            id
                            name
                            price
                            image {
                                fluid(maxWidth: 150) {
                                    ...GatsbyContentfulFluid
                                }
                            } 
                        }
                        ... on ContentfulProductKlassika {
                            id
                            name
                            price
                            description
                            image {
                                fluid(maxWidth: 150) {
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
                                fluid(maxWidth: 150) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                        }
                        ... on ContentfulProductNapitki {
                            id
                            name
                            price
                            description
                            image {
                                fluid(maxWidth: 150) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                        }
                        ... on ContentfulProductPizza {
                            id
                            name
                            price
                            priceIn33cm
                            description
                            image {
                                fluid(maxWidth: 150) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                        }
                        ... on ContentfulProductSlognyeRolly {
                            id
                            name
                            price
                            description
                            image {
                                fluid(maxWidth: 150) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                        }
                        ... on ContentfulProductWok {
                            id
                            name
                            price
                            description
                            image {
                                fluid(maxWidth: 150) {
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
                            fluid(maxWidth: 150) {
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
                                fluid(maxWidth: 150) {
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
                                fluid(maxWidth: 150) {
                                    ...GatsbyContentfulFluid
                                }
                            }
                        }
                    }
                    productsKomboNapitki {
                        id
                        image {
                            fluid(maxWidth: 150) {
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
                        priceIn33cm
                        image {
                            fluid(maxWidth: 150) {
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
                    fluid(maxWidth: 150) {
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
                    fluid(maxWidth: 150) {
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
                    fluid(maxWidth: 150) {
                        ...GatsbyContentfulFluid
                    }
                }
            }
        }
    }`;