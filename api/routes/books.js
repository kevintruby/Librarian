
const { Router } = require('express');

const router = Router();

// Mock Books
const books = [
  { name: 'The Fellowship of the Ring' },
  { name: 'The Two Towers' },
  { name: 'Return of the King' }
];

/* GET routes listing. */
router.get('/books', function (req, res, next) {
  res.json(books);
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
