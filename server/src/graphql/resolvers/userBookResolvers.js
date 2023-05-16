const { v4: uuidv4 } = require('uuid');

const userBooks = [];

const userBookResolvers = {
  Mutation: {
    updateUserBook: async (parent, args) => {
      const index = userBooks.findIndex((userBook) => userBook.userId === userId && userBook.bookId === bookId);
      if (index !== -1) {
        userBooks[index] == { ...userBooks[index], ...args };
      } else {
        args.id = uuidv4();
        userBooks.push(args);
      }
      return true;
    },
  },
};

module.exports = userBookResolvers;
