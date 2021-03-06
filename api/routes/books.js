
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
router.get('/books/isbn/:isbn', function (req, res, next) {
  const isbn = req.params.isbn;
  BookModel.findOne({ isbn })
    .then(book_doc => {
      res.json(book_doc);
    }).catch(err => res.status(422).json(err));
});

/* GET book by ID. */
router.get('/new-book-by-isbn/:isbn', function (req, res, next) {
  const isbn = req.params.isbn;
  google_books_api_interface.getBookByISBN(isbn).then(book_rsp => {
    if(_.isEmpty(book_rsp))
      res.sendStatus(404);

    BookModel.findOneAndUpdate({ isbn }, { $set: book_rsp }, { new: true, upsert: true }).then(book_doc => {
      res.json(book_doc);
    }).catch(err => {
      console.error(err);
      res.status(422).json(err);
    });
  }).catch(err => {
    console.error(err);
    res.sendStatus(404);
  });
});

module.exports = router;
