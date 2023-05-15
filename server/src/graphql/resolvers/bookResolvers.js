const Book = require('../../models/Book');
const { v4: uuidv4 } = require('uuid');

const books = [];

const bookResolvers = {
  Query: {
    books: (parent, args, context) => {
      return books;
    },
  },
  Mutation: {
    addBook: async (parent, { title, author, date, coverImage }) => {
      const existingBook = books.find((book) => book.title === title);

      if (existingBook) {
        throw new Error('Book title already exists');
      }

      const newBook = new Book(uuidv4(), title, author, date, coverImage);
      books.push(newBook);

      return newBook;
    },
  },
};

module.exports = bookResolvers;
