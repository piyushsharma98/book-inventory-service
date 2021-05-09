import { IUser } from "../../../models/user.model";

export interface UserDto {
  email: IUser["email"];
  password: IUser["password"];
  confirmPassword: string;
  firstName: IUser["firstName"];
  lastName: IUser["lastName"];
}

export interface UserLoginDto {
  email: IUser["email"];
  password: IUser["password"];
}
