let mongoose = require('mongoose');
// let validator = require('validator');

let bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
  },
  authors: {
    type: [String],
    required: false,
  },
  publisher: {
    type: String,
    required: false,
  },
  publishedDate: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  pageCount: {
    type: Number,
    required: false,
  },
  categories: {
    type: [String],
    required: false,
  },
  thumbnail: {
    type: String,
    required: false,
  },
  createdAt: Date,
  updatedAt: Date,
}, {
  timestamps: true
});

bookSchema.virtual('fullTitle').get(function() {
  let fullTitle = this.title;
  if(this.subtitle !== undefined && this.subtitle !== null && this.subtitle !== '')
    fullTitle = `${fullTitle}: ${this.subtitle}`;
  return fullTitle;
});



bookSchema.statics.getAllBooks = function() {
  return new Promise((resolve, reject) => {
    this.find((err, docs) => {
      if(err) {
        console.error(err);
        return reject(err);
      }
      resolve(docs);
    }).catch(err => reject(err));
  });
};

bookSchema.statics.getRecentlyAdded = function() {
  return new Promise((resolve, reject) => {
    this.find()
      .sort('-createdAt')
      .limit(10)
      .exec((err, docs) => {
        if(err) {
          console.error(err);
          return reject(err);
        }
        resolve(docs);
      });
  });
};



// make sure upserts get timestamped
bookSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createdAt = Date.now();
  }
  return next();
});

module.exports = mongoose.model('Book', bookSchema);
