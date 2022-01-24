module.exports = {
    client: {
        includes: ["./src/**/*.js", "./src/**/*.jsx"],
        tagName: "gql",
        service: {
            name: 'eats-svisni',
            url: 'http://localhost:3000/graphql',
            // localSchemaFile: './path/to/schema.graphql'
      }
    }
  };