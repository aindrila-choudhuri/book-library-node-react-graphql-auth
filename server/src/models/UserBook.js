class UserBook {
  constructor(id, userId, bookId, status, rating) {
    this.id = id;
    this.userId = userId;
    this.bookId = bookId;
    this.status = status;
    this.rating = rating;
  }
}

module.exports = UserBook;
