const mongoose = require('mongoose');

const readlistSchema = new mongoose.Schema({
  books: [
    {
      title: { type: String, required: true },
      author: { type: String, required: true },
      publicationDate: { type: String, required: true },
    },
  ],
});

const Readlist = mongoose.model('Readlist', readlistSchema);

module.exports = Readlist;
