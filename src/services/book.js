const db = require("../config/db");
const { ObjectId } = require("mongodb");
const { findAuthorByName, findAuthorsByid } = require("./author");
const { findPublisherByName, findPublisher } = require("./publisher");

async function findBooks(args) {
  const {
    title,
    authorFirstName,
    authorLastName,
    publicationYear,
    publisherName,
    skip,
    limit,
    orderTitle,
    orderYear,
  } = args;
  const sizeArgs = Object.keys(args).length;
  if (sizeArgs > 3) throw new Error("You can filter only by one criteria");
  if (!skip || !limit) throw new Error("Skip and limit are mandatory");
  if (orderTitle > 1 || orderTitle < -1 || orderYear > 1 || orderYear < -1)
    throw new Error("orderTitle and orderYear can only be 1 or -1");

  if (authorFirstName || authorLastName) {
    var author = await findAuthorByName(
      args.authorFirstName,
      args.authorLastName
    );
  } else {
    var author = "";
  }

  if (publisherName) {
    var publisher = await findPublisherByName(publisherName);
  } else {
    var publisher = "";
  }

  ///Filter by title, author's first and last name, editorial's name, publication year.
  if (
    title ||
    authorFirstName ||
    authorLastName ||
    publicationYear ||
    publisherName
  ) {
    const sizeList = db
      .get()
      .collection("books")
      .find({
        $or: [
          { title: title },
          { authors: author },
          { publisher: publisher._id },
          { publicationYear: publicationYear },
        ],
      })
      .count();

    return db
      .get()
      .collection("books")
      .find({
        $or: [
          { title: title },
          { authors: author },
          { publisher: publisher._id },
          { publicationYear: publicationYear },
        ],
      })
      .skip(sizeList > 1 ? skip : 0)
      .limit(limit)
      .toArray();
  }

  //Order by publication year (pass 1 to specify ascending order., pass -1 to specify descending order )
  if (orderYear) {
    return db
      .get()
      .collection("books")
      .aggregate([
        {
          $sort: { publicationYear: orderYear },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ])
      .toArray();
  }

  //Order by title (pass 1 to specify ascending order., pass -1 to specify descending order )
  if (orderTitle) {
    return db
      .get()
      .collection("books")
      .aggregate([
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ])
      .sort({ title: orderTitle })
      .toArray();
  }

  //Pagination without filters
  if (skip && limit) {
    return db
      .get()
      .collection("books")
      .aggregate([
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ])
      .toArray();
  }
}

function findBook(book) {
  return db
    .get()
    .collection("books")
    .findOne({ _id: ObjectId(book) });
}

function findBooksByAuthor(author) {
  return db
    .get()
    .collection("books")
    .find({ authors: ObjectId(author) })
    .toArray();
}

function findBookByISBN(ISBN) {
  return db.get().collection("books").findOne({ ISBN: ISBN });
}

function findBooksByPublisher(publisher) {
  return db
    .get()
    .collection("books")
    .find({ publisher: ObjectId(publisher) })
    .toArray();
}

async function createBook(args) {
  const existBook = await findBookByISBN(args.ISBN);
  if (existBook !== null) throw new Error("Another Book has this ISBN");
  if (args.publisher.length !== 24)
    throw new Error("The id must be 24 characters");

  //search authors
  const existAuthor = await findAuthorsByid(args.authors);
  const existPublisher = await findPublisher(ObjectId(args.publisher));
  args["publisher"] = ObjectId(args.publisher);

  if (existAuthor.length === args.authors.length && existPublisher !== null) {
    args.authors.map((id, index) => {
      args.authors[index] = ObjectId(id);
    });
    const bookCreated = await db.get().collection("books").insertOne(args);
    return bookCreated.ops[0];
  } else {
    throw new Error("Some of the authors or publisher do not exist");
  }
}

async function updateBook(book) {
  const _id = book._id;
  if (_id.length !== 24) throw new Error("The id must be 24 characters");
  const existBook = await findBook(_id);
  if (existBook === null) throw new Error("The book was not found");
  book = await completeFields(book);
  delete book._id;

  const existAuthor = await findAuthorsByid(book.authors);
  const existPublisher = await findPublisher(ObjectId(book.publisher));
  book["publisher"] = ObjectId(book.publisher);

  if (existAuthor.length === book.authors.length && existPublisher !== null) {
    book.authors.map((id, index) => {
      book.authors[index] = ObjectId(id);
    });

    const updated = await db
      .get()
      .collection("books")
      .findOneAndUpdate(
        { _id: ObjectId(_id) },
        { $set: book, $currentDate: { lastModified: true } }
      );
    return await findBook(_id);
  } else {
    throw new Error("Some of the authors or publisher do not exist");
  }
}

async function completeFields(book) {
  const existBook = await findBook(book._id);
  if (!book.title) book["title"] = existBook.title;
  if (!book.ISBN) book["ISBN"] = existBook.ISBN;
  if (!book.publicationYear)
    book["publicationYear"] = existBook.publicationYear;
  if (!book.publisher) book["publisher"] = existBook.publisher;
  if (!book.authors) book["authors"] = existBook.authors;
  if (!book.synopsis) book["synopsis"] = existBook.synopsis;
  return book;
}

module.exports = {
  findBooks,
  findBook,
  findBooksByAuthor,
  findBookByISBN,
  findBooksByPublisher,
  createBook,
  updateBook,
};
