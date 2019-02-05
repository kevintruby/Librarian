// const MongoClient = require('mongodb').MongoClient;
let mongoose = require('mongoose');
require('dotenv').config();
const env = process.env || {};
const uri = `${env.MONGO_CONNECTION_ROOT}://${env.MONGO_AUTH}@${env.MONGO_CLUSTER}`;

const _ = require('lodash');

let BookModel = require('./schemas/bookSchema');

class MongoClientService {
  constructor(database = env.MONGO_DATABASE) {
    this.__connect(database);
  }

  __connect(database) {
    mongoose.connect(`${uri}/${database}`)
      .then(() => {
        console.log('connection successful');
      })
      .catch(err => console.error(err));
  }

  getBooksCollection() {
    let self = this;
    return new Promise((resolve, reject) => {
      BookModel.getAllBooks()
        .then(docs => resolve(docs) )
        .catch(err => reject(err) );
    });
  }

  getBookObj(criteria) {
    let book = null;

    return new Promise((resolve, reject) => {
      BookModel.find(criteria)
        .then(doc => {
          if(!_.isEmpty(doc))
            book = _.first(doc);
          resolve(book);
        }).catch(err => reject(err) );
    });
  }

  updateBook(book) {
    if(_.isEmpty(book))
      return false;

    book.save().then( doc => console.log(doc) ).catch( err => console.error(err) );
  }
}

module.exports = new MongoClientService();
