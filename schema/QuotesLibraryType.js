const { GraphQLObjectType, GraphQLList } = require("graphql");
const QuoteType = require("./QuoteType");

const QuotesLibraryType = new GraphQLObjectType({
  name: "QuotesLibrary",
  fields: {
    allQuotes: {
      type: new GraphQLList(QuoteType),
      description: "A list of the quotes in the database",
      resolve: (_, args, { db }) =>
        db
          .collection("quotes")
          .find()
          .toArray()
    }
  }
});

module.exports = QuotesLibraryType;
