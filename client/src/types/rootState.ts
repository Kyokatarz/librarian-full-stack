import { Book } from "./bookTypes";
import { UI } from "./uiTypes";
import { User } from "./userTypes";

export type RootState = {
  user: User,
  books: Book[],
  ui: UI
}