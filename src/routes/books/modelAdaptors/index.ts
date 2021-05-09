import { BookDto, BookGoogleDto, BookCreateDto } from "../dto/book.dto";
import { IBook } from "../../../models/book.model";

// export const getBookModelByDto = (book: IBook, bookDto : BookDto) : IBook=> {
//     if(bookDto.title) book.title = bookDto.title;
//     if()
// }

export const extractBookInfo = (
  bookGoogleDto: BookGoogleDto,
  bookCreateDto: BookCreateDto
): BookDto => {
  const bookDto: BookDto = {
    gId: bookGoogleDto.id,
    title: bookGoogleDto.volumeInfo.title,
    description: bookGoogleDto.volumeInfo.description,
    authors: bookGoogleDto.volumeInfo.authors,
    copies: bookCreateDto.copies,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return bookDto;
};
