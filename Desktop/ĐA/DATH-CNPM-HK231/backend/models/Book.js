import { db } from "../config/dbConfig.js";

export class Book {
  constructor(
    ISBN,
    title,
    coverlink,
    desc,
    authorName,
    publisher,
    publishDate,
    coverType,
    noPages,
    language
  ) {
    this.ISBN = ISBN;
    this.title = title;
    this.coverlink = coverlink;
    this.desc = desc;
    this.authorName = authorName;
    this.publisher = publisher;
    this.publishDate = publishDate;
    this.coverType = coverType;
    this.noPages = noPages;
    this.language = language;
  }
  save = async () => {
    let sql = `CALL InsertBook('${this.ISBN}','${this.title}','${this.coverlink}','${this.desc}','${this.authorName}',
    '${this.publisher}',${this.publishDate},'${this.coverType}',${this.noPages},'${this.language}')`;
    const [newBook, _] = await db.execute(sql);
    return newBook;
  };
}
