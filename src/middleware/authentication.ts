import { Request, Response, NextFunction } from "express";
import { User, IUser } from "../models/user.model";

export const Authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (req.cookies) token = req.cookies.auth_token || req.headers.authorization;
  User.validateToken(token)
    .then((user: IUser | null) => {
      if (user) {
        res.locals.user = user;
        res.locals.authenticated = true;
        next();
      } else
        res.status(401).send({
          message: "Request is unauthorized",
        });
    })
    .catch((err) => {
      res.status(401).send({
        message: "Request is unauthorized",
      });
    });
};
