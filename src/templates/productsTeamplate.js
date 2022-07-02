import React from 'react'
import { connect } from 'react-redux';
import {addedCart} from "../reducers/shopping-cart";
import { graphql } from 'gatsby'
import ProductList from '../containers/product/products';
// import * as R from 'ramda'
// import ProductItem from '../components/SetyItem'


const ProductsTeamplate = (props) => {
    const { data } = props

 return  (
     <>
        <ProductList pageData={data} />
    </>
    )
};

const mapStateToProps = (state) => ({
     isSale: state.filters.isSale
});

const mapDispatchToProps = (dispatch) => ({
    addedToCart: (id, price, product) => dispatch(addedCart(id, price, product))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTeamplate)


export const query = graphql ` 
query MyQuery($slug: String!) {
  contentfulPages(fieldSlug: {eq: $slug}) {
    id
    fieldSeoTitle
    fieldSlug
    fieldTitle
    fieldCaterories
    fieldSeoDescrittion
    image {
      gatsbyImageData(
        placeholder: BLURRED, 
        formats: [WEBP, AUTO]
        sizes:"(max-width: 250px) 250px, 100vw)"
      )
     }
  }
  allContentfulProducts(filter: {fieldSlug:{eq: $slug}}) {
    edges {
      node {
        fieldName
        fieldSlugItem
        fieldVariant
        fieldWeight
        fariantCategories
        fieldWeightLarge
        fieldWeightSmall
        id
        fieldSlug
        fieldPriceProduct
        fieldPrivate
        fieldPriceLarge
        fieldIsWok
        fieldIsPizza
        fieldIsEditKombo
        fieldDescriptionProduct
        fieldCount
        fieldPriceLanchTime
        fieldPriceNotSale
        contentful_id
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
}
`










// export const query = graphql ` 
//  query MyQuery($slug: String!) {
//   nodeStranicy(field_slug: {eq: $slug}) {
//     field_slug
//     id
//     field_title
//     field_seo_title
//     field_seo_descrittion
//     field_caterories
//     relationships { 
//       field_avatar {
//         localFile {
//           childImageSharp {
//             gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
//           }
//         }
//       }
//     }
//   }
//   allNodeBlyudaMenyu(filter: {field_slug: {eq: $slug}}) {
//     edges {
//       node {
//         field_name
//         field_weight
//         field_weight_large
//         field_weight_small
//         field_price_product
//         field_price_large
//         field_price_lanch_time
//         field_price_not_sale
//         field_description_product
//         field_count
//         field_slug
//         field_slug_item
//         field_is_pizza
//         field_is_wok
//         field_is_edit_kombo
//         field_variant

//         field_private
//         drupal_id
//         id
//         relationships {
//           field_image_product {
//             localFile {
//               childImageSharp {
//                 gatsbyImageData
//               }
//             }
//           }
//         }
//         }
//         }
//     }
// }
// `