const path = require('path');


exports.createPages = async ({graphql, actions}) => {
    const {createPage} = actions;
    const setyTemplate = path.resolve('./src/templates/setyTeampletes.js')
    const pizzaTemplate = path.resolve('./src/templates/pizzaTeamplates.js')
    // const slognyeTeamplates = path.resolve('./src/templates/slognyeTeamplates.js')
    // const klassikaTeamplates = path.resolve('./src/templates/klassikaTeamplates.js')
    // const hotTeamplates = path.resolve('./src/templates/hotTeamplates.js')
    const saleTeamplates = path.resolve('./src/templates/saleTemplates.js')

    await graphql(`
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
       allContentfulProductSale {
        edges {
        node {
        childContentfulProductSaleDetailedDescriptionTextNode {
          childMarkdownRemark {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  }
    }
    `).then((data) => {
            const productssets = data.data.allContentfulProduct.edges;
            productssets.forEach(({node: product}) => {
                createPage({
                    path: `/sety/${product.slug}`,
                    component: setyTemplate,
                    context: {
                        slug: product.slug
                    }
                })
            })

            const productspizza = data.data.allContentfulProductPizza.edges;
            productspizza.forEach(({node: product}) => {
                createPage({
                    path: `/pizza/${product.slug}`,
                    component: pizzaTemplate,
                    context: {
                        slug: product.slug
                    }
                })
            })

            // const productslognye = data.data.allContentfulProductSlognyeRolly.edges;
            // productslognye.forEach(({node: product}) => {
            //     createPage({
            //         path: `/branded-rolls/${product.slug}`,
            //         component: slognyeTeamplates,
            //         context: {
            //             slug: product.slug
            //         }
            //     })
            // })

            // const productshot = data.data.allContentfulProductHotRolly.edges;
            // productshot.forEach(({node: product}) => {
            //     createPage({
            //         path: `/hot-rolls/${product.slug}`,
            //         component: hotTeamplates,
            //         context: {
            //             slug: product.slug
            //         }
            //     })
            // })

            const productssale = data.data.allContentfulProductSale.edges;
            productssale.forEach(({node: {childContentfulProductSaleDetailedDescriptionTextNode: {childMarkdownRemark}}}) => {
                createPage({
                    path: `/sale/${childMarkdownRemark.frontmatter.slug}`,
                    component: saleTeamplates,
                    context: {
                        slug: childMarkdownRemark.frontmatter.slug
                    }
                })
            })

    }).catch((err) => console.log(err))
}

// exports.onPostBuild = async function({ cache, store, graphql }, { query }) {
//     const cacheKey = "some-key-name"
//     let obj = await cache.get(cacheKey)
//     if (!obj) {
//         obj = { created: Date.now() }
//         const data = await graphql(query)
//         obj.data = data
//     } else if (Date.now() > obj.lastChecked + 3600000) {
//         /* Reload after a day */
//         const data = await graphql(query)
//         obj.data = data
//     }
//     obj.lastChecked = Date.now()
//     await cache.set(cacheKey, obj)
//     /* Do something with data ... */
// }

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




