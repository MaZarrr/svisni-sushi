
const path = require('path');
// const fs = require('fs');

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
  const setyTemplate = path.resolve('./src/templates/setyTeampletes.js');
  const komboTeamplates = path.resolve('./src/templates/komboTeamplates.js');
//  sales platform - возможное апи для отображение статики и так динамики
//   const result = await graphql(`
//     {
//       svisnisushi {
//         getPages {
//           ok
//           pages {
//             categories
//             id
//             slug
//             title
//           }
//         }
//       }
//     }
// `)


const result = await graphql(`
{
  allContentfulPages(sort: {fields: fieldTitle}) {
    edges {
      node {
        fieldSlug
      }
    }
  }
  allContentfulProducts {
    edges {
      node {
        fieldSlugItem
        fieldSlug
        fieldIsEditKombo
      }
    }
  }
}
`)



// const result = await graphql(`
// {
//   allNodeStranicy {
//     edges {
//       node {
//         field_slug
//       }
//     }
//   }
//   allNodeBlyudaMenyu {
//     edges {
//       node {
//         field_name
//         field_slug
//         field_slug_item
//         field_is_edit_kombo
//       }
//     }
//   }
// }
// `)

  // Handle errors
  if (result.errors) {
    // reporter.panicOnBuild(`Ошибка при выполнении запроса GraphQL`)
    reporter.panic(`Ошибка при выполнении запроса GraphQL ${result.errors}`)
    return
  }

  result.data.allContentfulPages.edges.forEach(({ node }) => {
    // result.data.svisnisushi.getPages.pages.forEach(({ slug }) => { // мой сервер node
    createPage({
      path: `/${node.fieldSlug}`,
      component: productTeamplate,
      context: {
        slug: node.fieldSlug
      },
      // defer: true; // defer аргумент отложенной статической генерации в пользу  createPagesдействия . Если установлено значение  true, он сообщает Gatsby исключить страницу из этапа сборки и вместо этого сгенерировать ее во время первого HTTP-запроса:
    })
  });
  
  
  
  

  result.data.allContentfulProducts.edges.forEach(({ node }) => {
      if(node.fieldSlug === 'sety') {
        createPage({
          path: `/${node.fieldSlug}/${node.fieldSlugItem}`,
          component: setyTemplate,
          context: {
            slug: node.fieldSlugItem
          }
        })
      } else if(node.fieldSlug === 'kombo' && node.fieldIsEditKombo) {
        createPage({
          path: `/${node.fieldSlug}/${node.fieldSlugItem}`,
          component: komboTeamplates,
          context: {
            slug: node.fieldSlugItem
          }
        })
      }
  })

  // result.data.allNodeBlyudaMenyu.edges.forEach(({ node }) => {
  //   // result.data.svisnisushi.getPages.pages.forEach(({ slug }) => {
  //     if(node.field_slug === 'kombo') {
  //       createPage({
  //         path: `/kombo/${node.field_slug_item}`,
  //         component: komboTeamplates,
  //         context: {
  //           slug: node.field_slug_item
  //         }
  //       })
  //     }
  // })
}





































// const path = require('path');
// const fs = require('fs');

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
      // createPage({
      //   path: `/sety/${product.slug}`,
      //   component: setyTemplate,
      //   context: {
      //     slug: product.slug
      //   }
      // })
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


// // exports.onCreateWebpackConfig = ({ actions, cache }) => {
// //   actions.setWebpackConfig({
// //     resolve: {
// //       alias: {
// //         path: require.resolve("path-browserify"),
// //       },
// //       fallback: {
// //         fs: false,
// //       }
// //     }
// //   })
// // }