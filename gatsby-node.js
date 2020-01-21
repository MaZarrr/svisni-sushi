const path = require('path');

exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions;
    const setyTemplate = path.resolve('./src/templates/setyTeampletes.js')
    const pizzaTemplate = path.resolve('./src/templates/pizzaTeamplates.js')

    return graphql(`
    {
      allContentfulProduct {
        edges {
          node {
              id
            slug
            name
            price
            description
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
    `).then((result)=> {
      if(result.errors) {
        throw result.errors;
      }
      result.data.allContentfulProduct.edges.forEach(sety => {
          createPage({
              path: `/sety/${sety.node.slug}`,
              component: setyTemplate,
              context: sety.node
          })
      })

    })



    // const productspizza = result.data.allContentfulProductPizza.edges;
    // productspizza.forEach(({node: product}) => {
    //   createPage({
    //     path: `/pizza/${product.slug}`,
    //     component: pizzaTemplate,
    //     context: {
    //       slug: product.slug
    //     }
    //   })
    // })
}


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




