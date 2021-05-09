import { Router } from "express";
import BooksRouter from "./books";
import UserRouter from "./user";

const router = Router();

router.use("/books", BooksRouter);
router.use("/user", UserRouter);

export default router;
