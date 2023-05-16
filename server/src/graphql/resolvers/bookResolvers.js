const Book = require('../../models/Book');
const { v4: uuidv4 } = require('uuid');

const books = [];

const userBooks = [];

const aggregateUserBooks = (userBooks) => {
  const aggregations = [];
  const statusCountMap = new Map();

  userBooks.forEach((userBook) => {
    const { userId, status } = userBook;

    if (statusCountMap.has(status)) {
      statusCountMap.set(status, statusCountMap.get(status) + 1);
    } else {
      statusCountMap.set(status, 1);
    }

    // Update the list of users for the current status
    const aggregationIndex = aggregations.findIndex((agg) => agg.status === status);
    if (aggregationIndex !== -1) {
      aggregations[aggregationIndex].users.push(userId);
    } else {
      aggregations.push({ status, count: 1, users: [userId] });
    }

    // Update the counts in the aggregations
    aggregations.forEach((agg) => {
      const count = statusCountMap.get(agg.status);
      agg.count = count;
    });

    return aggregations;
  });
};

const bookResolvers = {
  Query: {
    books: (parent, args, context) => {
      return books;
    },
    book: (parent, { id }, context) => {
      const book = books.find((book) => book.id === id);
      // const userBookData = userBooks.find((userBook) => userBook.bookId === id);
      // const aggregation = aggregateUserBooks(userBookData);
      // console.log('------aggregation-----', aggregation);

      return book;
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
