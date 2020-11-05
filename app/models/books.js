  var mongoose = require('mongoose');
  var { Schema } = mongoose;
  var bcrypt = require('bcrypt-nodejs');

  var BooksSchema = new Schema({
      title: { type: String, required: true },
      desc: { type: String, required: true },
      librarian_id: { type: Schema.Types.ObjectId, ref: 'User' },
      book_id: { type: Schema.Types.ObjectId, ref: 'Books' }
  }, {
      timestamps: true
  });

  module.exports = mongoose.model('Books', BooksSchema);