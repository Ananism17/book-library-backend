import express from "express";
import {
  createBook,
  updateBook,
  deleteBook,
  getBooks,
} from "../controllers/bookController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getBooks).post(protect, createBook);
router.route("/update").put(protect, updateBook);
router.route("/delete").delete(protect, deleteBook);

export default router;
