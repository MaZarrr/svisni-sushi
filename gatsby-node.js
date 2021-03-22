const path = require('path');
const fs = require('fs');
const os = require(`os`);

let didRunAlready = false;

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/special-menu/)) {
    console.log(page);
    page.matchPath = "/special-menu/vegetarian/"
        createPage({
          ...page,
          context: {
            ...page.context,
            slug: "vegetarian"
          }
      })
    }
}

exports.onPreInit = () => {
  if (didRunAlready) {
    throw new Error(
      `You can only have a single instance of gatsby-plugin-material-ui in your gatsby-config.js`,
    );
  }

  didRunAlready = true;
};

exports.onPreBootstrap = ({ store, cache }, pluginOptions) => {
  const program = store.getState().program;

  let module;
  if (pluginOptions.pathToStylesProvider) {
    module = `module.exports = require("${
      path.isAbsolute(pluginOptions.pathToStylesProvider)
        ? pluginOptions.pathToStylesProvider
        : path.join(program.directory, pluginOptions.pathToStylesProvider)
    }")`;
    if (os.platform() === `win32`) {
      module = module.split(`\\`).join(`\\\\`);
    }
  } else {
    module = `module.exports = null`;
  }

  const dir = cache.directory;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(path.join(dir, `styles-provider-props.js`), module);
};

exports.onCreateWebpackConfig = ({ actions, cache }) => {
  const cacheFile = path.join(cache.directory, `styles-provider-props.js`);
  actions.setWebpackConfig({
    resolve: {
      alias: {
        path: require.resolve("path-browserify"),
        "material-ui-plugin-cache-endpoint": cacheFile,
      },
      fallback: {
        fs: false,
      }
    }
  })
}

exports.createPages = async ({ graphql, actions, page }) => {
  const { createPage } = actions;
  const setyTemplate = path.resolve('./src/templates/setyTeampletes.js');
  // const pizzaTemplate = path.resolve('./src/templates/pizzaTeamplates.js');
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

// exports.onCreatePage = async ({ page, actions, graphql }) => {
//   const { createPage, deletePage } = actions
//
//   // if (page.path.match(/^\/vegetarians/)) {
//     // const vegetarians = path.resolve('./src/templates/indexPage.js');
//     page.matchPath = '/vegetarians/'
// //     await graphql(`
// //       {
// //         contentfulProduct(name: "Постный") {
// //           id
// //           name
// //           price
// //           slug
// //           description
// //     }
// //   }
// // `).then(data => {
//     if (page.path.match(/^\/vegetarians/)) {
//       page.matchPath = '/vegetarians/'
//       createPage(page)
//     }
//     // })
//   // }
// }
