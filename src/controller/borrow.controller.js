import { asyncErrorHandler } from "../utils/async.utils.js";
import * as borrowService from "../services/borrow.service.js";

export const borrowABook = asyncErrorHandler(async (req, res) => {
  const result = await borrowService.borrowABook(req.userId, req.body);
  return res.status(result.status).json(result.body);
});

export const borrowHistory = asyncErrorHandler(async (req, res) => {
  const result = await borrowService.borrowHistory(req.userId);
  return res.status(result.status).json(result.body);
});

export const returnBook = asyncErrorHandler(async (req, res) => {
  const result = await borrowService.returnBook(req.params.id);
  return res.status(result.status).json(result.body);
});
