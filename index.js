const { graphql } = require("graphql");
const readline = require("readline");
const schema = require("./schema/main");
const { MongoClient } = require("mongodb");
const MONGO_URL = "mongodb://localhost:27017";
const DB_NAME = "test";
const assert = require("assert");
const graphqlHttp = require("express-graphql");
const express = require("express");
const app = express();

const rli = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

MongoClient.connect(
  MONGO_URL,
  (err, client) => {
    assert.equal(null, err);
    console.log("Connnected to MongoDB Server.");
    const db = client.db(DB_NAME);

    app.use(express.static("public"));
    app.use(
      "/graphql",
      graphqlHttp({
        schema: schema,
        context: {
          db
        },
        graphiql: true
      })
    );

    app.listen(3000, () => console.log("Running Express.js on port 3000"));
  }
);

// rli.question('Client Request:', inputQuery => {
//   graphql(schema, inputQuery).then(result => {
//     console.log('Server Anwser:', result.data);
//   })
//   rli.close();
// });
