import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";

export enum Property {
  BODY = "body",
  QUERY = "query",
  PARAMS = "params",
  HEADERS = "headers",
  COOKIES = "cookies",
}

const sch = Joi.object().keys({
  title: Joi.string().required(),
});

const Validator = (schema: Joi.Schema, property: Property) => {
  return (req: Request, res: Response, next: NextFunction) => {
    schema
      .validateAsync(req[property])
      .then(() => {
        next();
      })
      .catch((err) => {
        const { details } = err;
        let errors = [];
        if (details)
          errors = details.map((m: { message: string }) => m.message);
        res.status(400).send({
          success: false,
          code: 400,
          errors: errors,
        });
      });
  };
};
export default Validator;
