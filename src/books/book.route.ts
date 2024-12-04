import express from 'express'
const router = express.Router()
const { postABook, getAllBooks, getBook, updateBook, deleteBook } = require('./book.controller')
const verifyAdminToken = require('../middleware/verifyAdminToken')

// post a book
router.post('/create-book', verifyAdminToken, postABook)

// get all books
router.get('/', getAllBooks)

router.get('/:id', getBook)

router.put('/edit/:id', verifyAdminToken, updateBook)

router.delete('/:id', verifyAdminToken, deleteBook)

module.exports = router