import { Request, Response, Router } from "express";
import { UserRegisterDtoSchema, UserLoginDtoSchema } from "../../common/schema";
import Validator, { Property } from "../../middleware/validator";
import { UserDto, UserLoginDto } from "./dto/user.dto";
import { User, IUser } from "../../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Authentication } from "../../middleware/authentication";
import { TOKEN_EXPIRY } from "../../config";

const router = Router();

// Register a user
router.post(
  "/register",
  Validator(UserRegisterDtoSchema, Property.BODY),
  async (req: Request, res: Response) => {
    const userDetails: UserDto = req.body;
    User.findOne({ email: userDetails.email })
      .then((usr: IUser | null) => {
        if (usr) res.status(409).send({ message: "Email Id already exists" });
        else {
          const user = new User(userDetails);
          user
            .save()
            .then(() =>
              res.status(201).send({ message: "User successfully created" })
            )
            .catch((err) => res.status(500).send(err));
        }
      })
      .catch((err) => res.status(500).send(err));
  }
);

// Register a user
router.post(
  "/login",
  Validator(UserLoginDtoSchema, Property.BODY),
  async (req: Request, res: Response) => {
    const userDetails: UserLoginDto = req.body;

    User.findOne({ email: userDetails.email })
      .then((user: IUser | null) => {
        if (!user) {
          res.status(400).send({ message: "Wrong email address" });
          return;
        } else {
          const isMatched = user.comparePassword(userDetails.password);
          if (!isMatched) {
            res.status(400).send({ message: "Entered password is wrong" });
            return;
          } else {
            const token = user.generateToken();
            res
              .cookie("auth_token", token, {
                expires: new Date(Date.now() + TOKEN_EXPIRY * 1000),
              })
              .status(200)
              .send({
                auth: true,
                id: user._id,
                auth_token: token,
                expires_in: TOKEN_EXPIRY,
              });
            // res.status(200).send({
            //   id: user._id,
            //   auth_token: token,
            // });
          }
        }
      })
      .catch((err) => res.status(500).send(err.message));
  }
);

router.get("", async (req: Request, res: Response) => {
  User.find({}).then((users: IUser[]) => {
    res.status(200).send(users);
  });
});

router.get("/profile", Authentication, async (req: Request, res: Response) => {
  console.log("localjsss", res.locals);
  const user = res.locals.user || {};
  res.status(200).json({
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });
});

export default router;
