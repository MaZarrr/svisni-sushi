// import { graphql } from 'gatsby';
// import { connect } from 'react-redux';
// import Sety from './../pages/sety';
// import Pizza from './../pages/pizza';



// const MenuTeamplates = ({data: {allContentfulProduct}, productLoaded, product}) => {

//         console.log(product); // storeRedux
        
//         useEffect(() => {
//            const data = allContentfulProduct
//            productLoaded(data); // action push to reduxStore
//            console.log(data)   
//        })

//     return (
//         <>
//             <Sety product={product.edges}
        
//             ></Sety>
//             <Pizza
        
//             ></Pizza>
//         </>
//     )
// }

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

// export default connect(mapStateToProps, mapDispatchToProps)(MenuTeamplates)

// export const query = graphql `
//     {
//         allContentfulProduct {
//           edges {
//             node {
//                 id
//               slug
//               name
//               price
//               description
//               image {
//                   fluid(maxWidth: 400) {
//                     ...GatsbyContentfulFluid_tracedSVG
//                   }
//               }
//               }
//             }
//           }
//         }
//     `
