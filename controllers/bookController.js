import asyncHandler from "express-async-handler";

import Book from "../models/bookModel.js";

// @desc Add a new book
// route POST /api/books
// @access PRIVATE
const createBook = asyncHandler(async (req, res) => {
  const { name, writer, publisher, publishingYear, genre } = req.body;

  const book = await Book.create({
    name,
    writer,
    publisher,
    publishingYear,
    genre,
  });

  if (book) {
    res.status(201).json({
      status: true,
      _id: book._id,
      name: book.name,
      writer: book.writer,
      publisher: book.publisher,
      publishingYear: book.publishingYear,
      genre: book.genre,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Book Data!");
  }
});

// @desc Update book
// route PUT /api/books/update
// @access PRIVATE
const updateBook = asyncHandler(async (req, res) => {
  const { _id, name, writer, publisher, publishingYear, genre } = req.body;
  const book = await Book.findById(_id);

  if (book) {
    book.name = name || book.name;
    book.writer = writer || book.writer;
    book.publisher = publisher || book.publisher;
    book.publishingYear = publishingYear || book.publishingYear;
    book.genre = genre || book.genre;

    const updatedBook = await book.save();
    res.status(200).json({
      status: true,
      _id: updatedBook._id,
      name: updatedBook.name,
      writer: updatedBook.writer,
      publisher: updatedBook.publisher,
      publishingYear: updatedBook.publishingYear,
      genre: updatedBook.genre,
    });
  } else {
    res.status(404);
    throw new Error("Book not found!");
  }
});

// @desc Delete book by ID
// route DELETE /api/books/delete
// @access PRIVATE
const deleteBook = asyncHandler(async (req, res) => {
  const { _id } = req.body;

  try {
    await Book.findByIdAndDelete(_id);
    res
      .status(200)
      .json({ status: true, message: "Book deleted successfully" });
  } catch (error) {
    res.status(404);
    throw new Error("Book not found!");
  }
});

// @desc Get list of books with pagination
// route GET /api/books
// @access PRIVATE
const getBooks = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 3;
    const genre = req.query.genre; 
    const skip = (page - 1) * pageSize;
  
    let query = {};
  
    if (genre) {
      query = { genre: genre };
    }
  
    const books = await Book.find(query).skip(skip).limit(pageSize).exec();
  
    const totalBooks = await Book.countDocuments(query);

  if (books) {
    res.status(200).json({
      books,
      page,
      pageSize,
      totalPages: Math.ceil(totalBooks / pageSize),
      totalBooks,
      status: true,
    });
  } else {
    res.status(404);
    throw new Error("Books not found!");
  }
});

export { createBook, updateBook, deleteBook, getBooks };
