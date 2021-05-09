import { model, Schema, Model, Document } from "mongoose";

interface IBook extends Document {
  gId: string;
  title: string;
  description: string;
  authors: string[];
  copies: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const BookSchema: Schema = new Schema({
  gId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  authors: [{ type: String, required: true }],
  copies: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Book: Model<IBook> = model("Book", BookSchema);

export { Book, IBook };
