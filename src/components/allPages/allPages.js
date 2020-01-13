// import React, {useEffect} from 'react'
// import { graphql, Query } from 'gatsby';
// import { connect } from 'react-redux';
// import Pizza from '../../pages/pizza';
// import Sety, {querySets} from '../../pages/sety';
// // import { Query } from 'react-apollo';


// const AllPages = ({data: {allContentfulProduct}, productLoaded, product}) => {
        
//         console.log(product); // storeRedux
        
//         useEffect(() => {
//            const data = querySets.allContentfulProduct
//            productLoaded(data); // action push to reduxStore
//            console.log(data)   
//        })
     
//     return (
//         <>
//             <Query query={querySets} >
           
//             <Sety product={product.edges}
        
//             ></Sety>
//             <Pizza
        
//             ></Pizza>
//             </Query>
//         </>
//     )
//        }


// const mapStateToProps = ({product}) => {
//     return {product};
// }
// const mapDispatchToProps = (dispath) => {
//     return {
//     productLoaded: (newProduct) => {
//         dispath({
//             type: 'PRODUCT_LOADED',
//             payload: newProduct
//         })
//     }
//     };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AllPages)

// // export const query = graphql `
// //     {
// //         allContentfulProduct {
// //           edges {
// //             node {
// //                 id
// //               slug
// //               name
// //               price
// //               description
// //               image {
// //                   fluid(maxWidth: 400) {
// //                     ...GatsbyContentfulFluid_tracedSVG
// //                   }
// //               }
// //               }
// //             }
// //           }
// //         }
// //     `
