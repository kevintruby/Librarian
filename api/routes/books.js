
const { Router } = require('express');
const path = require('path');
const project_root = path.dirname(require.main.filename);
let MongoClientService = require(`${project_root}/MongoClientService`);

const router = Router();

// Mock Books
const books = [
  { name: 'The Fellowship of the Ring' },
  { name: 'The Two Towers' },
  { name: 'Return of the King' }
];

/* GET routes listing. */
router.get('/books', function (req, res, next) {
  let mongo_client_service = new MongoClientService(),
      books_coll = {};

  // console.log(mongo_client_service);
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

module.exports = router;
