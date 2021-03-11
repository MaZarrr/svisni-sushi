const path = require('path');
const { graphql } = require('gatsby');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const setyTemplate = path.resolve('./src/templates/setyTeampletes.js');
  const pizzaTemplate = path.resolve('./src/templates/pizzaTeamplates.js');
  const saleTeamplates = path.resolve('./src/templates/saleTemplates.js');
  const komboTeamplates = path.resolve('./src/templates/komboTeamplates.js');

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
      allContentfulProductKombo {
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
    `).then((data) => {
    const productssets = data.data.allContentfulProduct.edges;
    productssets.forEach(({ node: product }) => {
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
    });

    const productssale = data.data.allContentfulProductSale.edges;
    productssale.forEach(({node}) => {
      createPage({
        path: `/sale${node.slug}`,
        component: saleTeamplates,
        context: {
          slug: node.slug
        }
      })
    });

    const productKombo = data.data.allContentfulProductKombo.edges;
    productKombo.forEach(({node}) => {
      createPage({
        path: `/kombo/${node.slug}`,
        component: komboTeamplates,
        context: {slug: node.slug}
      })
    })

  }).catch((err) => console.log(err))
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: "empty",
    },
  })
}

// exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
//   const config = getConfig()
//   if (stage.startsWith('develop') && config.resolve) {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       'react-dom': '@hot-loader/react-dom'
//     }
//   }
// }
