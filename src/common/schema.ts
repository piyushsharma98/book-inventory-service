import Joi from "joi";

export const BookCreateDtoSchema = Joi.object({
  gId: Joi.string().required(),
  copies: Joi.number().integer().required(),
});

export const BookUpdateDtoSchema = Joi.object({
  copies: Joi.number().integer(),
});

export const BookUpdateParamsSchema = Joi.object({
  gId: Joi.string().required(),
});

export const UserRegisterDtoSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  confirmPassword: Joi.ref("password"),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

export const UserLoginDtoSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});
