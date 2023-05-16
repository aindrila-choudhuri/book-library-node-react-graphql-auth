const bookResolvers = require('./bookResolvers');
const userResolvers = require('./userResolvers');
const userBookResolvers = require('./userBookResolvers');

const resolvers = [bookResolvers, userResolvers, userBookResolvers];

module.exports = resolvers;
