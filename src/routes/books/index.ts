import { Request, Response, Router } from "express";
import { IBook, Book } from "../../models/book.model";
import {
  BookCreateDtoSchema,
  BookUpdateDtoSchema,
  BookUpdateParamsSchema,
} from "../../common/schema";
import Validator, { Property } from "../../middleware/validator";
import { BookDto, BookCreateDto, BookUpdateDto } from "./dto/book.dto";
import { getBookDataBygId } from "./googleAPIProxyService";
import { extractBookInfo } from "./modelAdaptors";
import { Authentication } from "../../middleware/authentication";

const router = Router();

router.use(Authentication);
// Add new book
router.post(
  "",
  Validator(BookCreateDtoSchema, Property.BODY),
  async (req: Request, res: Response) => {
    const bookCreateDto = req.body as BookCreateDto;
    Book.findOne({ gId: bookCreateDto.gId })
      .then((bk: IBook | null) => {
        if (bk) {
          res.status(409).send(`Book with this id already exists`);
          return;
        } else {
          getBookDataBygId(bookCreateDto.gId)
            .then((bookGoogleDto) => {
              let book: IBook = new Book(
                extractBookInfo(bookGoogleDto, bookCreateDto)
              );
              book
                .save()
                .then((result: IBook) => res.status(201).send(result))
                .catch((err) => {
                  res.status(500).send(err);
                });
            })
            .catch((err) => {
              res.status(500).send(err.message);
            });
        }
      })
      .catch((err) => res.status(500).send(err));
  }
);

// Get all Books
router.get("", async (req: Request, res: Response) => {
  Book.find({})
    .then((books: IBook[]) => res.status(200).json(books))
    .catch((err) => res.status(500).send(err));
});

// Update the book
router.put(
  "/:gId",
  Validator(BookUpdateParamsSchema, Property.PARAMS),
  Validator(BookUpdateDtoSchema, Property.BODY),
  async (req: Request, res: Response) => {
    const gId: string = req.params.gId;
    const bookUpdateDto = req.body as BookUpdateDto;
    Book.findOne({ gId }).then((bk: IBook | null) => {
      if (!bk) {
        res.status(400).send("Provided gId doesn't exist");
        return;
      } else {
        bk.copies = bookUpdateDto.copies;
        bk.updatedAt = new Date();
        bk.save()
          .then((book: IBook) => {
            res.status(200).send(book);
          })
          .catch((err) => {
            console.log("Error in updating the book", err);
            res.status(500).send("Error in updating the book");
          });
      }
    });
  }
);

//delete the book
router.delete(
  "/:gId",
  Validator(BookUpdateParamsSchema, Property.PARAMS),
  async (req: Request, res: Response) => {
    const gId: string = req.params.gId;
    Book.findOneAndDelete({ gId })
      .then((bk) => {
        if (bk) {
          console.log("successfully deleted ", bk);
          res.status(200).send("Successfully deleted");
        } else {
          res.status(404).send("No book was found for this gId");
        }
      })
      .catch((err) => res.status(500).send("Error in deleting the book"));
  }
);

export default router;
