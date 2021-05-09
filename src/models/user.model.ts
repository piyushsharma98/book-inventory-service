import { model, Schema, Model, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_EXPIRY } from "../config";

const SECRET = "mysecretkey";

interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  comparePassword(this: IUser, password: string): boolean;
  generateToken(): string;
}

interface IUserModel extends Model<IUser> {
  validateToken(token: string): Promise<IUser>;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8, maxlength: 20 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

UserSchema.pre("save", function (this: IUser, next: any) {
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => next(err));
});

UserSchema.methods.comparePassword = function (
  this: any,
  password: string
): boolean {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateToken = function (this: Document<IUser>): string {
  return jwt.sign({ _id: this._id }, SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });
};

UserSchema.statics.validateToken = async function (
  this: Model<IUser>,
  token: string
): Promise<IUser> {
  const decode: any = jwt.verify(token, SECRET);
  try {
    const user = await this.findOne({ _id: decode._id });
    if (!user) {
      return Promise.reject(null);
    } else return Promise.resolve(user);
  } catch (err) {
    return await Promise.reject(null);
  }
};

const User = model<IUser, IUserModel>("user", UserSchema);
export { User, IUser };
