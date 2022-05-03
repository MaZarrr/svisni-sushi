import React from 'react'
import { connect } from 'react-redux';
import {addedCart} from "../reducers/shopping-cart";
import * as R from 'ramda'
import { graphql } from 'gatsby'
// import ProductItem from '../components/SetyItem'

const ProductsTeamplate = (props) => {

    console.log("props___123", props);

 return  (
     <>
        <div>
            sssssssssssssssssssssssss
        </div>
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
        query ($slug: String!) {
                svisnisushi { 
                getPage(input: {slug: $slug}) {
                ok
                page {
                    id
                    slug
                    title
                    categories
                }
        }
    }
}
`