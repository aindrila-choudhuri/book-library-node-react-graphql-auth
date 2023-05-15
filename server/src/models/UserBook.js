class UserBook {
  constructor(id, userId, bookId, collection, rating) {
    this.id = id;
    this.userId = userId;
    this.collection = collection;
    this.rating = rating;
  }
}

module.exports = UserBook;
