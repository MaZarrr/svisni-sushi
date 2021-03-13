import React from 'react'
import { graphql } from 'gatsby';
import loadable from "@loadable/component";
import Spinner from "../components/spinner/spinner-new"

const KomboItem = loadable(() => import('../components/KomboItem'), {
    fallback: <Spinner/>});

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
                image={contentfulProductKombo.image}
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
                    // ContentfulProductSouse: contentfulProductKombo.contentfulProductSouses,
                    ContentfulProductZakuski: contentfulProductKombo.productsKomboZakuski
                }}>
        </KomboItem>
    )};

export default KomboTeamplate

export const query = graphql `
          query ($slug: String!) {
          contentfulProductKombo(slug: {eq: $slug}) {
                    __typename
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
                      gatsbyImageData
                    }
                    sostavDefault {
                        ... on ContentfulProductZakuski {
                            __typename
                            id
                            name
                            price
                            image {
                           gatsbyImageData
                          }
                        }
                        ... on ContentfulProductKlassika {
                            __typename
                            id
                            name
                            price
                            description
                            image {
                           gatsbyImageData
                          }
                        }
                        ... on ContentfulProductHotRolly {
                            __typename  
                            id
                            name
                            price
                            description
                            image {
                           gatsbyImageData
                          }
                        }
                        ... on ContentfulProductNapitki {
                            __typename  
                            id
                            name
                            price
                            description
                            image {
                           gatsbyImageData
                          }
                        }
                        ... on ContentfulProductPizza {
                            __typename
                            id
                            name
                            price
                            priceIn33cm
                            description
                            image {
                            gatsbyImageData
                          }
                        }
                        ... on ContentfulProductSlognyeRolly {
                            __typename
                            id
                            name
                            price
                            description
                            image {
                           gatsbyImageData
                          }
                        }
                        ... on ContentfulProductWok {
                            __typename
                            id
                            name
                            price
                            description
                            image {
                           gatsbyImageData
                          }
                        }
                    }
                    productsKomboWok {
                        __typename
                        id
                        name
                        description
                        price
                        image {
                           gatsbyImageData
                          }
                    }
                    productsKomboRolls {
                        ... on ContentfulProductSlognyeRolly {
                           __typename
                            id
                            name
                            price
                            description
                            image {
                          gatsbyImageData
                          }
                        }
                        ... on ContentfulProductHotRolly {
                            __typename  
                            id
                            name
                            price
                            description
                            image {
                            gatsbyImageData
                          }
                        }
                    }
                    productsKomboNapitki {
                        id
                        __typename
                        image {
                           gatsbyImageData
                          }
                        name
                        price
                    }
                    productsCombo {
                      __typename
                        id
                        name
                        price
                        priceIn33cm
                        image {
                           gatsbyImageData
                          }
                        count
                        description
                    }
                    contentfulProductKlassika {
                      __typename
                      id
                      name
                      price
                      image {
                           gatsbyImageData
                          }
                      count
                      description
            }
            productsKomboZakuski {
                __typename
                id
                name
                price
                count
                image {
                  gatsbyImageData
                }
            }
        }
    }`;