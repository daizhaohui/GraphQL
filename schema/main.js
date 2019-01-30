const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require("graphql");
const QuotesLibraryType = require("./QuotesLibraryType");
const roll = () => Math.floor(6 * Math.random()) + 1;
const quotesLibrary = {};
const queryType = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "world"
    },
    diceRoll: {
      type: new GraphQLList(GraphQLInt),
      args: {
        count: {
          type: GraphQLInt,
          defaultValue: 2
        }
      },
      resolve: (_, args) => {
        let rolls = [];
        for (let i = 0; i < args.count; i++) {
          rolls.push(roll());
        }
        return rolls;
      }
    },
    usersCount: {
      type: GraphQLInt,
      resolve: (_, args, { db }) => db.collection("users").count()
    },
    quotesLibrary: {
      type: QuotesLibraryType,
      description: "The Quotes Library",
      resolve: () => quotesLibrary
    }
  }
});

const mySchema = new GraphQLSchema({
  query: queryType
});

module.exports = mySchema;
