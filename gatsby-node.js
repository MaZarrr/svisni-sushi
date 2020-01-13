/**
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions;
    const setyTemplate = path.resolve('./src/templates/setyTeampletes.js')
    const pizzaTemplate = path.resolve('./src/templates/pizzaTeamplates.js')

    const result = await graphql(`
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
    `)
    const productssets = result.data.allContentfulProduct.edges;

    productssets.forEach(({node: product}) => {
        createPage({
            path: `/sety/${product.slug}`,
            component: setyTemplate,
            context: {
                slug: product.slug
            }
        })
    })
    const productspizza = result.data.allContentfulProductPizza.edges;
    productspizza.forEach(({node: product}) => {
      createPage({
        path: `/pizza/${product.slug}`,
        component: pizzaTemplate,
        context: {
          slug: product.slug
        }
      })
    })
}



exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const pokemons = [
    { name: "Pikachu", type: "electric" },
    { name: "Squirtle", type: "water" },
  ]

  pokemons.forEach(pokemon => {
    const node = {
      name: pokemon.name,
      type: pokemon.type,
      id: createNodeId(`Pokemon-${pokemon.name}`),
      internal: {
        type: "Pokemon",
        contentDigest: createContentDigest(pokemon),
      },
    }
    actions.createNode(node)
  })
}





// const resultPizza = await graphql(`
// {
//   allContentfulProductPizza {
//     edges {
//       node {
//         slug
//       }
//     }
//   }
// }
// `)

// const productspizza = resultPizza.data.allContentfulProductPizza.edges;
// productspizza.forEach(({node: product}) => {
//   createPage({
//     path: `/pizza/${product.slug}`,
//     component: pizzaTemplate,
//     context: {
//       slug: product.slug
//     }
//   })
// })







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
