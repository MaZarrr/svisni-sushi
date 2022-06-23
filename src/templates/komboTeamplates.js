import React from 'react'
import { graphql } from 'gatsby';
import loadable from "@loadable/component";
import ClipLoader from "react-spinners/ClipLoader";

const KomboItem = loadable(() => import('../components/KomboItem'), {
    fallback: <div style={{ width: "100%", minHeight: '380px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}><ClipLoader size={150}/></div>});

const KomboTeamplate = ({data: { contentfulProductKombo }}) => {
    const { id: ids,
      fieldIsEditCombo,
      fieldLargePizza,
      fieldNameKombo,
      fieldPriceKombo,
      fieldWeightKomboItem,
      image: img,
      fieldDescriptionKombo,
      fieldSlugkombo,
      // field_parent_kombo,
      fieldLargePizzaPriceKombo,
      fieldSostavDefault,
      fieldPizzakombo,
      fieldHotroll,
      fieldFirmenieroll,
      fieldNapitki,
      fieldZakuski
    } = contentfulProductKombo

    const { id, name, price, description, weight, count, edit, isLargePizza, slug, image, sostavDefault, pricePizzaLarge } = {
        id: ids,
        name: fieldNameKombo,
        price: fieldPriceKombo,   
        description: fieldDescriptionKombo,
        weight: fieldWeightKomboItem,
        pricePizzaLarge: fieldLargePizzaPriceKombo,
        count: 1,
        slug: fieldSlugkombo,
        image: img,
        edit: fieldIsEditCombo,
        isLargePizza: fieldLargePizza,
        sostavDefault: fieldSostavDefault
    }
  const updatePizzas = () => {
      // if(!isLargePizza) return;
      if(!!isLargePizza) {
          return fieldPizzakombo.map(el => {
              return {...el, price: el.fieldPriceLarge, fieldPriceProduct: el.fieldPriceLarge}
          })
      }
      return fieldPizzakombo
    };
    const updateSostavDefault = () => {
        if (!!isLargePizza) {
            const pizzas = sostavDefault.filter(el => el.fieldSlug === "pizza");
            const newPizzas = pizzas.map(el => {
                return {...el,
                   price: el.fieldPriceLarge, 
                   fieldPriceProduct: el.fieldPriceLarge // нужно чисто для корректного отображения пицц больших, потом убрать
                  }
            });
            const notPizza = sostavDefault.filter(el => el.fieldSlug !== "pizza");
            return newPizzas.concat(notPizza)

        }
        return sostavDefault;
    };
    const products = {
        'branded-rolls': fieldFirmenieroll,
        'hot-rolls': fieldHotroll,
        napitki: fieldNapitki,
        pizza: updatePizzas(),
        sostavDefault: updateSostavDefault(),
        zakyski: fieldZakuski,
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
                image={img}
                products={products}
                >
        </KomboItem>
    };

export default KomboTeamplate


export const query = graphql `
query QueryKomboItem($slug: String!) {
      contentfulProductKombo(fieldSlugkombo: {eq: $slug}) {
        id
        fieldWeightKomboItem
        fieldSlugkombo
        fieldPriceKombo
        fieldNameKombo
        fieldLargePizzaPriceKombo
        fieldLargePizza
        fieldIsEditCombo
        fieldDescriptionKombo
        image {
        	gatsbyImageData(
            placeholder: BLURRED, 
            formats: [WEBP, AUTO]
          	sizes:"(max-width: 360px) 360px, 100vw)"
          )
    }
        fieldSostavDefault {
          id
          fieldName
          fieldDescriptionProduct
          fieldIsEditKombo
          fieldPriceLarge
          fieldPriceProduct
          fieldSlug
          fieldWeight
          fieldSlugItem
          image {
            gatsbyImageData(
              placeholder: BLURRED, 
              formats: [WEBP, AUTO]
              sizes:"(max-width: 360px) 360px, 100vw)"
            )
          }
        }
        fieldZakuski {
          id
          fieldName
          fieldCount
          fieldDescriptionProduct
          fieldPriceProduct
          fieldSlug
          fieldWeight
          fieldSlugItem
          image {
            gatsbyImageData(
              placeholder: BLURRED, 
              formats: [WEBP, AUTO]
              sizes:"(max-width: 360px) 360px, 100vw)"
            )
          }
        }
        fieldFirmenieroll {
          id
          fieldName
          fieldCount
          fieldDescriptionProduct
          fieldPriceProduct
          fieldSlug
          fieldWeight
          fieldSlugItem
          image {
            gatsbyImageData(
              placeholder: BLURRED, 
              formats: [WEBP, AUTO]
              sizes:"(max-width: 360px) 360px, 100vw)"
            )
          }
        }
        fieldHotroll {
          id
          fieldName
          fieldCount
          fieldDescriptionProduct
          fieldPriceProduct
          fieldSlug
          fieldWeight
          fieldSlugItem
          image {
            gatsbyImageData(
              placeholder: BLURRED, 
              formats: [WEBP, AUTO]
              sizes:"(max-width: 360px) 360px, 100vw)"
            )
          }
        }
        fieldNapitki {
          id
          fieldName
          fieldCount
          fieldDescriptionProduct
          fieldPriceProduct
          fieldSlug
          fieldWeight
          fieldSlugItem
          image {
            gatsbyImageData(
              placeholder: BLURRED, 
              formats: [WEBP, AUTO]
              sizes:"(max-width: 360px) 360px, 100vw)"
            )
          }
        }
        fieldPizzakombo {
          id
          fieldName
          fieldCount
          fieldDescriptionProduct
          fieldPriceProduct
          fieldPriceLarge
          fieldSlug
          fieldWeight
          fieldSlugItem
          image {
            gatsbyImageData(
              placeholder: BLURRED, 
              formats: [WEBP, AUTO]
              sizes:"(max-width: 360px) 360px, 100vw)"
            )
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