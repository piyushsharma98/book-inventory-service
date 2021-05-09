import express, { Request, Response } from "express";
import router from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import { setResponseHeaders } from "./middleware/setResponseHeaders";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(setResponseHeaders);
app.use("/api/v1", router);

export default app;
