import React from 'react'
import { graphql } from 'gatsby';
import loadable from "@loadable/component";
import Spinner from "../components/spinner/spinner-new"

const KomboItem = loadable(() => import('../components/KomboItem'), {
    fallback: <Spinner/>});

const KomboTeamplate = ({data: { nodeKomboSVyborom }}) => {
    
    const { id: ids,
      field_is_edit_combo,
      field_large_pizza,
      field_name_kombo,
      field_slugkombo,
      field_price_kombo,
      field_weight_kombo_item,
      relationships:{field_image_kombo:{localFile: {childImageSharp}}},
      field_description_kombo,
      field_parent_kombo,
      field_large_pizza_price_kombo,
      relationships: {
        field_sostav_default,
        field_pizzakombo,
        field_firmenieroll,
        field_napitki,
        field_zakuski,
        field_hotroll
      }
    } = nodeKomboSVyborom
    
    // console.log(id, "nodeKomboSVyborom");

    const { id, name, price, description, weight, count, edit, isLargePizza, slug, image, sostavDefault, pricePizzaLarge } = {
        id: ids,
        name: field_name_kombo,
        price: field_price_kombo,   
        description: field_description_kombo,
        weight: field_weight_kombo_item,
        pricePizzaLarge: field_large_pizza_price_kombo,
        count: 1,
        slug: field_parent_kombo,
        // slug: field_slugkombo,
        image: childImageSharp,
        edit: field_is_edit_combo,
        isLargePizza: field_large_pizza,
        sostavDefault: field_sostav_default
    }

  const updatePizzas = () => {
    // if(!isLargePizza) return;
      if(!!isLargePizza) {
          return field_pizzakombo.map(el => {
              return {...el, price: pricePizzaLarge}
          })
      }
      return field_pizzakombo
    };
    const updateSostavDefault = () => {
        if (!!isLargePizza) {
            const pizzas = sostavDefault.filter(el => el.field_slug === "pizza");
            const newPizzas = pizzas.map(el => {
                return {...el, price: pricePizzaLarge}
            });

            const notPizza = sostavDefault.filter(el => el.field_slug !== "pizza");
            return newPizzas.concat(notPizza)

        }
        return sostavDefault;
    };
    const products = {
        'branded-rolls': field_firmenieroll,
        'hot-rolls': field_hotroll,
        napitki: field_napitki,
        pizza: updatePizzas(),
        sostavDefault: updateSostavDefault(),
        zakyski: field_zakuski,
    }
    return  <KomboItem
                id={id}
                name={name}
                price={price}
                description={description}
                weight={weight}
                count={count}
                edit={edit}
                largePizza={isLargePizza}
                slug={slug}
                image={image}
                products={products}
                >
        </KomboItem>
    };

export default KomboTeamplate


export const query = graphql `
query QueryKomboItem($slug: String!) {
    nodeKomboSVyborom(field_slugkombo: {eq: $slug}) {
      id
      field_is_edit_combo
      field_large_pizza
      field_name_kombo
      field_slugkombo
      field_price_kombo
      field_weight_kombo_item
      field_description_kombo
      field_large_pizza_price_kombo
      relationships {
        field_image_kombo {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
            }
          }
        }
        field_hotroll {
          id
          field_name
          field_weight
          field_slug_item
          field_slug
          field_description_product
          field_price_product
          field_weight_large
          field_weight_small
          relationships {
            field_image_product {
              localFile {
                childImageSharp {
                    gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
                }
              }
            }
          }
        }
        field_firmenieroll {
          id
          field_name
          field_weight
          field_slug_item
          field_slug
          field_description_product
          field_price_product
          field_weight_large
          field_weight_small
          relationships {
            field_image_product {
              localFile {
                childImageSharp {
                    gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
                }
              }
            }
          }
        }
        field_napitki {
          field_name
          id
          field_weight
          field_slug_item
          field_slug
          field_description_product
          field_price_product
          field_weight_large
          field_weight_small
          relationships {
            field_image_product {
              localFile {
                childImageSharp {
                    gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
                }
              }
            }
          }
        }
        field_pizzakombo {
          field_name
          id
          field_weight
          field_slug_item
          field_slug
          field_description_product
          field_price_product
          field_weight_large
          field_weight_small
          relationships {
            field_image_product {
              localFile {
                childImageSharp {
                    gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
                }
              }
            }
          }
        }
        field_zakuski {
          field_name
          id
          field_weight
          field_slug_item
          field_slug
          field_description_product
          field_price_product
          field_weight_large
          field_weight_small
          relationships {
            field_image_product {
              localFile {
                childImageSharp {
                    gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
                }
              }
            }
          }
        }
        field_sostav_default {
          field_name
          id
          field_weight
          field_slug_item
          field_slug
          field_description_product
          field_price_product
          field_weight_large
          field_weight_small
          relationships {
            field_image_product {
              localFile {
                childImageSharp {
                    gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
                }
              }
            }
          }
        }
      }
    }
  }

`

// export const query = graphql `
// query ($slug: String!) {
//   contentfulProductKombo(slug: {eq: $slug}) {
//             __typename
//             id
//             name
//             count
//             description
//             price
//             edit
//             largePizza
//             slug
//             weight
//             image {
//               gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//             }
//             sostavDefault {
//                 ... on ContentfulProductZakuski {
//                     __typename
//                     id
//                     name
//                     price
//                     image {
//                       gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                 }
//                 ... on ContentfulProductKlassika {
//                     __typename
//                     id
//                     name
//                     price
//                     description
//                     image {
//                       gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                 }
//                 ... on ContentfulProductHotRolly {
//                     __typename  
//                     id
//                     name
//                     price
//                     description
//                     image {
//                       gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                 }
//                 ... on ContentfulProductNapitki {
//                     __typename  
//                     id
//                     name
//                     price
//                     description
//                     image {
//                       gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                 }
//                 ... on ContentfulProductPizza {
//                     __typename
//                     id
//                     name
//                     price
//                     pricePizzaLarge
//                     description
//                     image {
//                       gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                 }
//                 ... on ContentfulProductSlognyeRolly {
//                     __typename
//                     id
//                     name
//                     price
//                     description
//                     image {
//                       gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                 }
//                 ... on ContentfulProductWok {
//                     __typename
//                     id
//                     name
//                     price
//                     description
//                     image {
//                       gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                 }
//             }
//             productsKomboWok {
//                 __typename
//                 id
//                 name
//                 description
//                 price
//                 image {
//                    gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                 }
//             }
//             productsKomboRolls {
//                 ... on ContentfulProductSlognyeRolly {
//                    __typename
//                     id
//                     name
//                     price
//                     description
//                     image {
//                       gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                 }
//             }
//             productsKomboNapitki {
//                 id
//                 __typename
//                 image {
//                   gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                 name
//                 price
//             }
//             productsCombo {
//               __typename
//                 id
//                 name
//                 price
//                 pricePizzaLarge
//                 image {
//                    gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//                 count
//                 description
//             }
//             productsKomboHotRolls{
//             __typename
//                  id
//                     name
//                     price
//                     description
//                     image {
//                       gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//             }
// contentfulProductKlassika {
//               __typename
//               id
//               name
//               price
//               image {
//                    gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//                   }
//               count
//               description
//     }
//             productsKomboZakuski {
//         __typename
//         id
//         name
//         price
//         count
//         image {
//           gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//         }
//     }
// }
// }`;