import React from 'react'
import { graphql } from 'gatsby';
import loadable from "@loadable/component";
import ClipLoader from "react-spinners/ClipLoader";

const KomboItem = loadable(() => import('../components/KomboItem'), {
    fallback: <div style={{ width: "100%", minHeight: '380px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}><ClipLoader size={150}/></div>});

const KomboTeamplate = ({data: { contentfulProductKombo }}) => {
  console.log("contentfulProductKombo__", contentfulProductKombo);
    const { id: ids,
      fieldIsEditCombo,
      fieldLargePizza,
      fieldNameKombo,
      fieldPriceKombo,
      fieldWeightKomboItem,
      image: img,
      description,
      fieldDescriptionKombo,
      fieldSlugkombo,
      // field_parent_kombo,
      fieldLargePizzaPriceKombo,
      fieldSostavDefault,
      fieldPizzakombo,
      fieldHotroll,
      fieldFirmenieroll,
      wok,
      // fieldNapitki,
      // fieldZakuski
    } = contentfulProductKombo

    const { id, name, price, descriptionKombo, weight, count, edit, isLargePizza, slug, image, sostavDefault, pricePizzaLarge } = {
        id: ids,
        name: fieldNameKombo,
        price: fieldPriceKombo, 
        descriptionKombo:  description,
        weight: fieldWeightKomboItem,
        pricePizzaLarge: fieldLargePizzaPriceKombo,
        count: 1,
        slug: fieldSlugkombo,
        image: img,
        edit: fieldIsEditCombo,
        isLargePizza: fieldLargePizza,
        sostavDefault: fieldSostavDefault
        // descriptionKombo: fieldDescriptionKombo,
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
                   fieldPriceProduct: el.fieldPriceLarge // нужно чисто для корректного отображения пицц больших, потом убрать // это повторение свойства выше
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
        wok,
        // napitki: fieldNapitki,
        pizza: updatePizzas(),
        sostavDefault: updateSostavDefault(),
        // zakyski: fieldZakuski,
    }
    return  <KomboItem
                id={id}
                name={name}
                price={price}
                description={descriptionKombo}
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
        description {
          childMarkdownRemark {
            html
          }
        }
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
        wok {
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


// это относилось к Комбо N1
// fieldNapitki {
//   id
//   fieldName
//   fieldCount
//   fieldDescriptionProduct
//   fieldPriceProduct
//   fieldSlug
//   fieldWeight
//   fieldSlugItem
//   image {
//     gatsbyImageData(
//       placeholder: BLURRED, 
//       formats: [WEBP, AUTO]
//       sizes:"(max-width: 360px) 360px, 100vw)"
//     )
//   }
// }

// было строка 141 fieldZakuski {
//   id
//   fieldName
//   fieldCount
//   fieldDescriptionProduct
//   fieldPriceProduct
//   fieldSlug
//   fieldWeight
//   fieldSlugItem
//   image {
//     gatsbyImageData(
//       placeholder: BLURRED, 
//       formats: [WEBP, AUTO]
//       sizes:"(max-width: 360px) 360px, 100vw)"
//     )
//   }
// }