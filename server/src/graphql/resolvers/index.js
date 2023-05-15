const bookResolvers = require('./bookResolvers');
const userResolvers = require('./userResolvers');

const resolvers = [bookResolvers, userResolvers];

module.exports = resolvers;
