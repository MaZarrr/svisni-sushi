import React from 'react'
import { connect } from 'react-redux';
import {addedCart} from "../reducers/shopping-cart";
import * as R from 'ramda'
import { graphql } from 'gatsby'
import ProductList from '../containers/product/products';
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
  nodeStranicy(field_slug: {eq: $slug}) {
    field_slug
    id
    field_title
    field_seo_title
    field_seo_descrittion
    relationships {
      field_avatar {
        localFile {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [WEBP, AUTO])
          }
        }
      }
    }
  }
  allNodeBlyudaMenyu(filter: {field_slug: {eq: $slug}}) {
    edges {
      node {
        field_name
        field_price_lanch_time
        field_price_not_sale
        field_price_product
        field_private
        field_slug
        field_slug_item
        field_variant
        id
        field_weight
        relationships {
          field_image_product {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
            field_description_product
            field_count
        }
        }
    }
}
`