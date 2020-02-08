const path = require('path');

exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions;
    const setyTemplate = path.resolve('./src/templates/setyTeampletes.js')
    const pizzaTemplate = path.resolve('./src/templates/pizzaTeamplates.js')
    const slognyeTeamplates = path.resolve('./src/templates/slognyeTeamplates.js')
    const klassikaTeamplates = path.resolve('./src/templates/klassikaTeamplates.js')

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
       allContentfulProductKlassika {
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

  const productslognye = result.data.allContentfulProductKlassika.edges;
  productslognye.forEach(({
    node: product
  }) => {
    createPage({
      path: `/klassicheskieRolly/${product.slug}`,
      component: klassikaTeamplates,
      context: {
        slug: product.slug
      }
    })
  })

}




    // .then((result)=> {
    //   if(result.errors) {
    //     throw result.errors;
    //   }
    //   result.data.allContentfulProduct.edges.forEach(sety => {
    //       createPage({
    //           path: `/sety/${sety.node.slug}`,
    //           component: setyTemplate,
    //           context: sety.node
    //       })
    //   })

    // })

  //   productssets.forEach(({node: product}) => {
  //     createPage({
  //         path: `/sety/${product.slug}`,
  //         component: setyTemplate,
  //         context: {
  //             slug: product.slug
  //         }
  //     })
  // })


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




