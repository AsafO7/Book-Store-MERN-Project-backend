import {Request, Response} from 'express'
const Book = require('./book.model')

const postABook = async (req: Request, res: Response) => {
  // console.log(req.body);
  try {
    const newBook = await Book({...req.body})
    await newBook.save()
    res.status(200).send({message: 'Book posted successfully', book: newBook})
  }
  catch(err) {
    console.log("Error creating book: ", err);
    res.status(500).send({message: 'Error creating a book'})
  }
}

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find().sort({ createdAt: -1})
    res.status(200).send({message: 'Books fetched successfully', books})
  }
  catch(err) {
    console.log("Error getting all the books: ", err);
    res.status(500).send({message: 'Error getting all the books'})
  }
}

const getBook = async (req: Request, res: Response) => {
  const { id, title } = req.params
  try {
    const book = await Book.findById(id)
    if(!book) res.status(404).send({message: 'Book not found'})
    res.status(200).send({message: 'Book fetched successfully', book})
  }
  catch(err) {
    console.log(`Error getting the book: ${title}`, err);
    res.status(500).send({message: 'Error getting the book'})
  }
}

const updateBook = async (req: Request, res: Response) => {
  const { id, title } = req.params
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true})
    if(!updatedBook) res.status(404).send({message: 'Book not found'})
    res.status(200).send({message: 'Book updated successfully', book: updatedBook})
  }
  catch(err) {
    console.log(`Error updating the book: ${title}`, err);
    res.status(500).send({message: 'Error updating the book'})
  }
}

const deleteBook = async (req: Request, res: Response) => {
  const { id, title } = req.params
  try {
    const deletedBook = await Book.findByIdAndDelete(id)
    if(!deletedBook) res.status(404).send({message: 'Book not found'})
    res.status(200).send({message: 'Book deleted successfully'})
  }
  catch(err) {
    console.log(`Error getting the book: ${title}`, err);
    res.status(500).send({message: 'Error getting the book'})
  }
}

module.exports = {
  postABook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
}