import { Book } from "./bookTypes";
import { User } from "./userTypes";

export type RootState = {
  user: User,
  books: Book[]
}