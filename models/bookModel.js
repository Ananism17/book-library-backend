import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    writer: {
      type: String,
      default: null,
    },
    publisher: {
      type: String,
      default: null,
    },
    publishingYear: {
      type: Number,
      default: null,
    },
    genre: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
