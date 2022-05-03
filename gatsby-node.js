const path = require('path');
const fs = require('fs');

// exports.onCreatePage = async ({ page, actions }) => {
//   const { createPage } = actions

//   if (page.path.match(/^\/special-menu/)) {
//     console.log(page);
//     page.matchPath = "/special-menu/vegetarian/"
//         createPage({
//           ...page,
//           context: {
//             ...page.context,
//             slug: "vegetarian"
//           }
//       })
//     }
// }

exports.createPages = async ({ graphql, actions, page }) => {
  const { createPage } = actions;
  const productTeamplate = path.resolve('./src/templates/productsTeamplate.js')

  const result = await graphql(`
    {
      svisnisushi {
        getPages {
          ok
          pages {
            categories
            id
            slug
            title
          }
        }
      }
    }
`)

  // // Handle errors
  // if (result.errors) {
  //   reporter.panicOnBuild(`Ошибка при выполнении запроса GraphQL`)
  //   return
  // }

  result.data.svisnisushi.getPages.pages.forEach((contexData) => {
    // result.data.svisnisushi.getPages.pages.forEach(({ slug }) => {
    createPage({
      path: `/${contexData.slug}`,
      component: productTeamplate,
      context: {
        ...contexData,
        // slug: contexData.slug
      }
    })
  });


}


  //         path: `/sety/${product.slug}`,
//         component: setyTemplate,
//         context: {
//           slug: product.slug
//         }
// exports.createPages = async ({ graphql, actions, page }) => {
//   const { createPage } = actions;
//   const setyTemplate = path.resolve('./src/templates/setyTeampletes.js');
//   const saleTeamplates = path.resolve('./src/templates/saleTemplates.js');
//   const komboTeamplates = path.resolve('./src/templates/komboTeamplates.js');

//     await graphql(`
//     {
//       allContentfulProduct {
//         edges {
//          node {
//            slug
//             }
//           }
//         }
//       allContentfulProductKombo {
//         edges {
//           node {
//             slug
//           }
//         }
//       } 
//       allContentfulProductSale {
//         edges {
//             node {
//             slug
//         }
//         }
//     }  
//     }
//     `).then((data) => {
//     const productssets = data.data.allContentfulProduct.edges;
//     productssets.forEach(({ node: product }) => {
//       createPage({
//         path: `/sety/${product.slug}`,
//         component: setyTemplate,
//         context: {
//           slug: product.slug
//         }
//       })
//     })

//     const productssale = data.data.allContentfulProductSale.edges;
//     productssale.forEach(({node}) => {
//       createPage({
//         path: `/sale${node.slug}`,
//         component: saleTeamplates,
//         context: {
//           slug: node.slug
//         }
//       })
//     });

//     const productKombo = data.data.allContentfulProductKombo.edges;
//     productKombo.forEach(({node}) => {
//       createPage({
//         path: `/kombo/${node.slug}`,
//         component: komboTeamplates,
//         context: {slug: node.slug}
//       })
//     })

//   }).catch((err) => console.log(err))
// };


// exports.onCreateWebpackConfig = ({ actions, cache }) => {
//   actions.setWebpackConfig({
//     resolve: {
//       alias: {
//         path: require.resolve("path-browserify"),
//       },
//       fallback: {
//         fs: false,
//       }
//     }
//   })
// }