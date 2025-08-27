import { asyncErrorHandler } from "../utils/async.utils.js";
import * as bookService from "../services/book.service.js";

export const createBook = asyncErrorHandler(async (req, res) => {
  const result = await bookService.createBook(req.body);
  return res.status(result.status).json(result.body);
});

export const deleteBook = asyncErrorHandler(async (req, res) => {
  const result = await bookService.deleteBook(req.params.id);
  return res.status(result.status).json(result.body);
});

export const editBook = asyncErrorHandler(async (req, res) => {
  const result = await bookService.editBook(req.params.id, req.body);
  return res.status(result.status).json(result.body);
});

export const listAllBooks = asyncErrorHandler(async (req, res) => {
  const result = await bookService.listAllBooks(req.query);
  return res.status(result.status).json(result.body);
});
