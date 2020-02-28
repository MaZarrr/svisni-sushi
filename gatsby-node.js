const path = require('path');

exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions;
    const setyTemplate = path.resolve('./src/templates/setyTeampletes.js')
    const pizzaTemplate = path.resolve('./src/templates/pizzaTeamplates.js')
    const slognyeTeamplates = path.resolve('./src/templates/slognyeTeamplates.js')
    // const klassikaTeamplates = path.resolve('./src/templates/klassikaTeamplates.js')
    const hotTeamplates = path.resolve('./src/templates/hotTeamplates.js')
    const saleTeamplates = path.resolve('./src/templates/saleTemplates.js')

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
      allContentfulProductSlognyeRolly {
        edges {
          node {
            slug
          }
        }
      }
        allContentfulProductHotRolly {
         edges {
           node {
             slug
           }
         }
       }
        allContentfulProductSale {
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
    
 const productslognye = result.data.allContentfulProductSlognyeRolly.edges;
 productslognye.forEach(({
   node: product
 }) => {
   createPage({
     path: `/slozhnyeRolly/${product.slug}`,
     component: slognyeTeamplates,
     context: {
       slug: product.slug
     }
   })
 })

  const productshot = result.data.allContentfulProductHotRolly.edges;
  productshot.forEach(({
    node: product
  }) => {
    createPage({
      path: `/zapechenyeRolly/${product.slug}`,
      component: hotTeamplates,
      context: {
        slug: product.slug
      }
    })
  })

  const productssale = result.data.allContentfulProductSale.edges;
    productssale.forEach(({
      node: product
    }) => {
      createPage({
        path: `/sale/${product.slug}`,
        component: saleTeamplates,
        context: {
          slug: product.slug
        }
      })
    })

}


// exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
//   const pokemons = [
//     { name: "Pikachu", type: "electric" },
//     { name: "Squirtle", type: "water" },
//   ]

//   pokemons.forEach(pokemon => {
//     const node = {
//       name: pokemon.name,
//       type: pokemon.type,
//       id: createNodeId(`Pokemon-${pokemon.name}`),
//       internal: {
//         type: "Pokemon",
//         contentDigest: createContentDigest(pokemon),
//       },
//     }
//     actions.createNode(node)
//   })
// }




