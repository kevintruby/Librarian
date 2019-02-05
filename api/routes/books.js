
const { Router } = require('express');
const path = require('path');
const project_root = path.dirname(require.main.filename);
let MongoClientService = require(`${project_root}/MongoClientService`);

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

  MongoClientService.getBooksCollection().then(rsp => {
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

module.exports = router;
