import { Request, Response, NextFunction } from "express";

export const setResponseHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.setHeader("Access-Control-Expose-Headers", "Set-Cookie");
  next();
};
