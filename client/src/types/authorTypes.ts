import { Book } from "./bookTypes";

export type Author = {
  _id: string,
  name?: string,
  writtenBooks?: Book[]
}