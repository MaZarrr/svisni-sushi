/**
import { graphql } from 'gatsby';
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

// const SetyTeamplate = path.resolve('./src/templates/setyTeampletes.js')

// const path = require('path');

exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions;
    const setyTemplate = path.resolve('./src/templates/setyTeampletes.js')

    const result = await graphql(`
   {
        allContentfulProduct {
          edges {
            node {
              slug
              }
            }
          }
        }
    `)
    const products = result.data.allContentfulProduct.edges;
    console.log(products);
    products.forEach(({node: product}) => {
        createPage({
            path: `/sety/${product.slug}`,
            component: setyTemplate,
            context: {
                slug: product.slug
            }
        })
    })
}
















/**
import { graphql } from 'gatsby';
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// const path = require('path');

// exports.createPages = ({graphql, actions}) => {
//     const {createPage} = actions;
//     const setyTemplate = path.resolve('./src/templates/setyTeampletes.js')

//     return graphql(`
//     {
//         allContentfulProduct {
//           edges {
//             node {
//               slug
//               }
//             }
//           }
//         }
//     `).then((result)=> {
//     if(result.errors) {
//         throw result.errors;
//     }

//     result.data.allContentfulProduct.edges.forEach(({node: product}) => {
//         createPage({
//             path: `/sety/${product.slug}`,
//             component: setyTemplate,
//             context: {
//                 slug: product.slug
//             }
//             })
//         })
//     })
// }
