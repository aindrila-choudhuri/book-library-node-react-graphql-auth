const User = require('./../models/User');
const { createAccessToken } = require('./../auth/create_token');
const { v4: uuidv4 } = require('uuid');
const { hash, compare } = require('bcryptjs');

const users = [];

const resolvers = {
  Query: {
    users: (parent, args, context) => {
      return users;
    },
  },
  Mutation: {
    register: async (parent, { email, password }) => {
      const existingUser = users.find((user) => user.email === email);

      if (existingUser) {
        throw new Error('Email is already taken');
      }

      const hashedPassword = await hash(password, 8);
      const newUser = new User(uuidv4(), email, hashedPassword);
      users.push(newUser);

      const token = createAccessToken(newUser);
      return token;
    },
    login: async (parent, { email, password }) => {
      const user = users.find((user) => user.email === email);

      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        throw new Error('Unable to login');
      }

      const token = createAccessToken(user);
      return token;
    },
  },
};

module.exports = resolvers;
