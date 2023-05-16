const { gql } = require('apollo-server-express');

const userBookTypeDef = gql`
  type Mutation {
    updateUserBook(userId: String!, bookId: String!, status: String!, rating: String): Boolean
  }
`;

module.exports = userBookTypeDef;
