const { gql } = require('apollo-server-express');

const userTypeDef = gql`
  type User {
    id: ID!
    email: String!
  }

  type Query {
    me: User
  }

  type Query {
    users: [User]
  }

  type Mutation {
    register(email: String!, password: String!): String
    login(email: String!, password: String!): String
  }
`;

module.exports = userTypeDef;
