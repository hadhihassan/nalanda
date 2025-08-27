import Borrow from "../models/borrow.model.js";
import Book from "../models/book.model.js";
import { StatusCodes } from "http-status-codes";

export const activeMembers = async () => {
  const pipeline = [
    { $match: { isReturned: true } },
    { $group: { _id: "$user", borrowCount: { $sum: 1 } } },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
    { $sort: { borrowCount: -1 } },
  ];

  const activeUseresBorrows = await Borrow.aggregate(pipeline);

  return {
    status: StatusCodes.OK,
    body: {
      message: "Active users.",
      success: true,
      borrow: activeUseresBorrows,
    },
  };
};

export const booksAvailabilityStatus = async () => {
  const totalBooks = await Book.countDocuments();
  const borrowedBooks = await Borrow.countDocuments({ isReturned: false });
  const availableBooks = totalBooks - borrowedBooks;

  return {
    status: StatusCodes.OK,
    body: {
      message: "Books availability.",
      success: true,
      totalBooks,
      borrowedBooks,
      availableBooks,
    },
  };
};

export const getMostBorrowedBooks = async () => {
  const pipeline = [
    { $match: { isReturned: true } },
    { $group: { _id: "$book", borrowCount: { $sum: 1 } } },
    {
      $lookup: {
        from: "books",
        localField: "_id",
        foreignField: "_id",
        as: "book",
      },
    },
    { $unwind: "$book" },
    { $sort: { borrowCount: -1 } },
  ];

  const mostBorrowBooks = await Borrow.aggregate(pipeline);

  return {
    status: StatusCodes.OK,
    body: {
      message: "Most borrow books.",
      success: true,
      borrow: mostBorrowBooks,
    },
  };
};
