import { IBook } from "../../../models/book.model";

export interface BookDto {
  gId: IBook["gId"];
  title: IBook["title"];
  description: IBook["description"];
  authors: IBook["authors"];
  copies: IBook["copies"];
  createdAt?: IBook["createdAt"];
  updatedAt?: IBook["updatedAt"];
}

export interface BookCreateDto {
  gId: IBook["gId"];
  copies: IBook["copies"];
}

export interface BookUpdateDto {
  copies: IBook["copies"];
}

export interface BookGoogleDto {
  id: string;
  volumeInfo: {
    title: string;
    description: string;
    authors: string[];
  };
}
