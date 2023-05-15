const { gql } = require('apollo-server-express');

const bookTypeDef = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    date: String!
    coverImage: String!
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    addBook(title: String!, author: String!, date: String!, coverImage: String!): Book
  }
`;

module.exports = bookTypeDef;
