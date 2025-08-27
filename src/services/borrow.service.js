import Borrow from "../models/borrow.model.js";
import Book from "../models/book.model.js";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

export const borrowABook = async (userId, { bookId, returnDate }) => {
  const book = await Book.findById(bookId);
  if (!book) {
    return {
      status: StatusCodes.NOT_FOUND,
      body: { success: false, message: "Book not found" },
    };
  }

  if (book.copies <= 0) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: { success: false, message: "Book not available" },
    };
  }

  book.copies -= 1;
  await book.save();

  const newBorrow = new Borrow({
    user: userId,
    book: bookId,
    returnDate,
  });
  await newBorrow.save();

  return {
    status: StatusCodes.CREATED,
    body: {
      message: "Borrow created successfully.",
      success: true,
      borrow: newBorrow,
    },
  };
};

export const borrowHistory = async (userId) => {
  const histories = await Borrow.find({ user: userId })
    .populate("book", "title author genre -_id")
    .select("-_id")
    .sort({ borrowDate: -1 });

  if (!histories || histories.length === 0) {
    return {
      status: StatusCodes.NOT_FOUND,
      body: { success: false, message: "No borrow history found." },
    };
  }

  return {
    status: StatusCodes.OK,
    body: {
      message: "Borrow history retrieved successfully.",
      success: true,
      borrows: histories,
    },
  };
};

export const returnBook = async (borrowId) => {
  if (!mongoose.isValidObjectId(borrowId)) {
    return {
      status: StatusCodes.BAD_REQUEST,
      body: { success: false, message: "Invalid borrow ID format" },
    };
  }

  const borrow = await Borrow.findById(borrowId);
  if (!borrow) {
    return {
      status: StatusCodes.NOT_FOUND,
      body: { success: false, message: "Borrow record not found" },
    };
  }

  const book = await Book.findById(borrow.book);
  if (book) {
    book.copies += 1;
    await book.save();
  }

  borrow.isReturned = true;
  await borrow.save();

  return {
    status: StatusCodes.OK,
    body: {
      message: "Book returned successfully.",
      success: true,
      borrow,
    },
  };
};
