import axios from "axios";
import { BookGoogleDto } from "./dto/book.dto";

export const getBookDataBygId = (gId: string): Promise<BookGoogleDto> => {
  return axios
    .get(`https://www.googleapis.com/books/v1/volumes/${gId}`)
    .then((res) => {
      console.log("respone from google", res.data);
      const bookGoogleDto = res.data as BookGoogleDto;
      return Promise.resolve(bookGoogleDto);
    })
    .catch((err) => {
      console.log("error in getting response from google", err);
      return Promise.reject(err);
    });
};
