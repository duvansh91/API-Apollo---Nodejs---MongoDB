const db = require("../config/db");
const { ObjectId } = require("mongodb");

function findAuthors() {
  return db.get().collection("authors").find({}).toArray();
}

function findAuthor(author) {
  return db
    .get()
    .collection("authors")
    .findOne({ _id: ObjectId(author) });
}

async function findAuthorsByid(author) {
  const authors = author;
  authors.map((id, index) => {
    if (id.length !== 24) throw new Error("The id must be 24 characters");
    authors[index] = ObjectId(id);
  });
  return await findAuthorByBook(authors);
}

function findAuthorByBook(author) {
  return db
    .get()
    .collection("authors")
    .find({ _id: { $in: author } })
    .toArray();
}

async function findAuthorByName(firstName, lastName) {
  const authorId = await db
    .get()
    .collection("authors")
    .aggregate([
      { $match: { $or: [{ firstName: firstName }, { lastName: lastName }] } },
    ])
    .toArray();
  if (authorId.length > 0) return authorId[0]._id;
}

async function createAuthor(args) {
  const authorCreated = await db.get().collection("authors").insertOne(args);
  return authorCreated.ops[0];
}

module.exports = {
  findAuthors,
  findAuthor,
  findAuthorsByid,
  findAuthorByBook,
  findAuthorByName,
  createAuthor,
};
