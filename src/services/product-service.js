import { graphql } from "gatsby";

export default class ProductService {
    
   getProduct = () => {
     return graphql`
        {
          allContentfulProduct {
            edges {
              node {
                slug
              }
            }
          }
          allContentfulProductPizza {
            edges {
              node {
                slug
              }
            }
          }
        }
        `
    }
}

// export const queryS = graphql`
// {
//           allContentfulProduct {
//             edges {
//               node {
//                 slug
//               }
//             }
//           }
//         }`

// exports.createPages = async ({graphql, actions}) => {
//     const {createPage} = actions;
//     const setyTemplate = path.resolve('./src/templates/setyTeampletes.js')

//     const result = await graphql(`
//     {
//       allContentfulProduct {
//         edges {
//           node {
//             slug
//           }
//         }
//       }
//       allContentfulProductPizza {
//         edges {
//           node {
//             slug
//           }
//         }
//       }
//     }
//     `)
//     const productssets = result.data.allContentfulProduct.edges;

//     productssets.forEach(({node: product}) => {
//         createPage({
//             path: `/sety/${product.slug}`,
//             component: setyTemplate,
//             context: {
//                 slug: product.slug
//             }
//         })
//     })
//     const productspizza = result.data.allContentfulProductPizza.edges;
//     productspizza.forEach(({node: product}) => {
//       createPage({
//         path: `/pizza/${product.slug}`,
//         component: setyTemplate,
//         context: {
//           slug: product.slug
//         }
//       })
//     })
// }
