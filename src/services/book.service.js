import Books from "../models/book.model.js";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

export const createBook = async (bookData) => {
  const { ISBN } = bookData;

  const isBookExisting = await Books.findOne({ ISBN });
  if (isBookExisting) {
    return {
      status: StatusCodes.CONFLICT,
      body: { success: false, message: "Books already exists." },
    };
  }

  const newBook = new Books(bookData);
  await newBook.save();

  return {
    status: StatusCodes.CREATED,
    body: {
      message: "Book created successfully.",
      success: true,
      book: newBook,
    },
  };
};

export const deleteBook = async (id) => {
  const _id = new mongoose.Types.ObjectId(id);
  const result = await Books.deleteOne({ _id });

  if (result.deletedCount === 0) {
    return {
      status: StatusCodes.NOT_FOUND,
      body: { success: false, message: "Books not found.", result },
    };
  }

  return {
    status: StatusCodes.OK,
    body: { success: true, message: "Book deleted successfully." },
  };
};

export const editBook = async (id, updateData) => {
  const _id = new mongoose.Types.ObjectId(id);
  const updatedBook = await Books.findByIdAndUpdate(_id, updateData, { new: true });

  if (!updatedBook) {
    return {
      status: StatusCodes.NOT_FOUND,
      body: { success: false, message: "Books not found." },
    };
  }

  return {
    status: StatusCodes.OK,
    body: {
      success: true,
      message: "Book updated successfully.",
      book: updatedBook,
    },
  };
};

export const listAllBooks = async (query) => {
  const { page = 1, limit = 10, genre, author } = query;

  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);

  if (pageNumber < 1 || pageSize < 1) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: { error: "Page and limit must be positive integers." },
    };
  }

  const filter = {};
  if (genre) filter.genre = genre;
  if (author) filter.author = author;

  const skip = (pageNumber - 1) * pageSize;

  const totalBooks = await Books.countDocuments(filter);
  const totalPages = Math.ceil(totalBooks / pageSize);

  const books = await Books.find(filter).skip(skip).limit(pageSize).exec();

  return {
    status: StatusCodes.OK,
    body: {
      totalBooks,
      totalPages,
      page: pageNumber,
      limit: pageSize,
      books,
    },
  };
};
