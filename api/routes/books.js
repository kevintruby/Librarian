
const { Router } = require('express');
const path = require('path');
const _ = require('lodash');
const project_root = path.dirname(require.main.filename);
let MongoClientService = require(`${project_root}/MongoClientService`),
  GoogleBooksApiInterface = require(`${project_root}/GoogleBooksApiInterface`),
  BookModel = require(`${project_root}/schemas/bookSchema`),
  mongo_client_service = new MongoClientService(),
  google_books_api_interface = new GoogleBooksApiInterface();

const router = Router();

// Mock Books
const books = [
  { title: 'The Fellowship of the Ring' },
  { title: 'The Two Towers' },
  { title: 'Return of the King' }
];

/* GET routes listing. */
router.get('/books', function (req, res, next) {
  let books_coll = {};

  mongo_client_service.getBooksCollection().then(rsp => {
    books_coll = rsp;
    res.json(books_coll);
  }).catch(err => {
    console.error(err);
    res.sendStatus(404);
  });

  // res.json(books);
});

/* GET book by ID. */
router.get('/books/:id', function (req, res, next) {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < books.length) {
    res.json(books[id]);
  } else {
    res.sendStatus(404);
  }
});

/* GET book by ID. */
router.get('/book-by-isbn/:isbn', function (req, res, next) {
  let isbn = req.params.isbn;
  google_books_api_interface.getBookByISBN(isbn).then(book_rsp => {
    if(_.isEmpty(book_rsp))
      res.sendStatus(404);

    // @todo: reduce complexity here
    BookModel.findOne({ isbn }).then(book_doc => {
      if(!_.isEmpty(book_doc)) {
        BookModel.findOneAndUpdate({ isbn }, { $set: book_rsp }, { new: true }).then(book_doc => {
          res.json(book_doc);
        }).catch(err => {
          console.error(err);
          let book = new BookModel(book_rsp);
          res.json(book);
        });
      } else {
        let book = new BookModel(book_rsp);
        book.isbn = isbn;
        // @todo: make use of MongoClientService.updateBookObj() here
        book.save().then( doc => res.json(doc) ).catch( err => {
          console.error(err);
          res.json(book);
        } );
      }
    }).catch(err => {
      console.error(err);
      let book = new BookModel(book_rsp);
      res.json(book);
    });
  }).catch(err => {
    console.error(err);
    res.sendStatus(404);
  });
});

module.exports = router;
