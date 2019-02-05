const uri = 'https://www.googleapis.com/books/v1/volumes';
const axios = require('axios');
const _ = require('lodash');

class GoogleBooksApiInterface {
  constructor() {}

  getBookByISBN(isbn) {
    return new Promise((resolve, reject) => {
      if(_.isEmpty(isbn))
        reject('ISBN is required!');
      axios.get(`${uri}?q=isbn:${isbn}`)
        .then(rsp => {
          if(_.isEmpty(rsp.data) || _.isEmpty(_.get(rsp.data, 'items', [])))
            reject('Book not found!');

          let volume = _.first(_.get(rsp.data, 'items', [])),
            book = volume.volumeInfo;

          resolve(book);
        }).catch(err => reject(err) );
    });
  }

  getBookDetail(volume_id) {
    return new Promise((resolve, reject) => {
      if(_.isEmpty(volume_id))
        reject('Volume ID is required!');
      axios.get(`${uri}/${volume_id}`)
        .then(rsp => {
          if(_.isEmpty(rsp.data) || _.isEmpty(_.get(rsp.data, 'volumeInfo', {})))
            reject('Book not found!');

          let book = _.get(rsp.data, 'volumeInfo', {});

          resolve(book);
        }).catch(err => reject(err) );
    });
  }
}

module.exports = new GoogleBooksApiInterface();
