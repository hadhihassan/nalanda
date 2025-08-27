import { asyncErrorHandler } from "../utils/async.utils.js";
import * as reportService from "../services/report.service.js";

export const activeMembers = asyncErrorHandler(async (req, res) => {
  const result = await reportService.activeMembers();
  return res.status(result.status).json(result.body);
});

export const booksAvailabilityStatus = asyncErrorHandler(async (req, res) => {
  const result = await reportService.booksAvailabilityStatus();
  return res.status(result.status).json(result.body);
});

export const getMostBorrowedBooks = asyncErrorHandler(async (req, res) => {
  const result = await reportService.getMostBorrowedBooks();
  return res.status(result.status).json(result.body);
});
