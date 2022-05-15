<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby's default starter
</h1>

Kick off your project with this default boilerplate. This starter ships with the main Gatsby configuration files you might need to get up and running blazing fast with the blazing fast app generator for React.

_Have another more specific idea? You may want to check out our vibrant collection of [official and community-created starters](https://www.gatsbyjs.org/docs/gatsby-starters/)._

## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI to create a new site, specifying the default starter.

    ```shell
    # create a new Gatsby site using the default starter
    gatsby new my-default-starter https://github.com/gatsbyjs/gatsby-starter-default
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-default-starter/
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql)._

    Open the `my-default-starter` directory in your code editor of choice and edit `src/pages/index.jsx`. Save your changes and the browser will update in real time!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package-lock.json
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.

## 🎓 Learning Gatsby

Looking for more guidance? Full documentation for Gatsby lives [on the website](https://www.gatsbyjs.org/). Here are some places to start:

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.org/tutorial/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.org/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.

## 💫 Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-default)

<!-- AUTO-GENERATED-CONTENT:END -->

subtitle1 - хедер
subtitle2 - описание
body1 - заголовко текста
body2 - описание текста

Хедер
- Комп
  - личный кабинет(Мои заказы-промокоды-адреса-настройки-выход)
    - Телефон
    - Выбранная локация магазина
    - дни недели с отметкой текущей
    - график работы
    - корзина(пустая или нет)

Регистрация
- Телефон
  - ввод телефона
  - отправка смс с кодом
  - отправка кода
  - ответ сервера(тру-фалс)
  - редирект на страницу

Личный кабинет
- Имя
- Телефон
- электронная почта
- пароль
- дата рождения(не изменяется)
- заказы(сортировка по дате)
  - дата/время
  - номер заказ
  - все детали заказа
- фото(аватар)
- баллы ?
- возможные акции ?

Форма заказа
- отправка на почту(работа)
- отправка смс с заказом(работа и клиент)
- отправка смс заказ принят(клиент) ?




    Генерация типов apollo client:codegen mytypes.d.ts --target=typescript
    https://github.com/apollographql/apollo-tooling
    https://www.apollographql.com/docs/devtools/apollo-config/
     "apollo:codegen": "rm -rf src/__generated__ && apollo client:codegen src/__generated__ --target=typescript --outputFlat",
     или 
     npm i rimraf тогда -
      "apollo:codegen": "rimraf src/__generated__ && apollo client:codegen src/__generated__ --target=typescript --outputFlat",

-----------------
  package.js
  flags: {
    DEV_SSR: true
  },
   "@fortawesome/fontawesome-svg-core": "^1.2.36",
    "@fortawesome/free-solid-svg-icons": "^5.15.4",
    "@fortawesome/react-fontawesome": "^0.1.15",
    delete
    - "@material-ui/core": "^4.12.3",
    - "@material-ui/icons": "^4.11.2",
    - "@material-ui/lab": "^4.0.0-alpha.60",
    "gatsby-image-background-slider": "0.0.4",
    - "path-browserify": "^1.0.1",


    "gatsby-plugin-facebook-pixel": "^1.0.8",
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: "1086855725085525",
      },
    },


    https://material-ui.com/ru/customization/color/

    https://www.apollographql.com/blog/apollo-client/architecture/redux-to-apollo-data-access-patterns/#apollo-cache-dependency-graph Redux to Apollo: шаблоны доступа к данным


    https://www.apollographql.com/docs/react/api/react/hooks/
    https://docs.nestjs.com/techniques/cookies


    `gatsby-plugin-material-ui`,
    "gatsby-plugin-material-ui": "^4.0.2",





    "@types/node": "^16.9.2",
    "eslint": "^7.32.0",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-prettier": "^4.0.0",

    "react-transition-group": "^4.4.2",

    "redaxios": "^0.4.1",

    "typescript": "^4.4.3",

        // {
    //   resolve: `gatsby-source-contentful`,
    //   options: {
    //     spaceId: process.env.CONTENTFUL_SPACE_ID,
    //     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    //     pageLimit: 50,
    //     assetDownloadWorkers: 25
    //   },
    // },