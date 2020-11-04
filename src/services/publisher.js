const db = require("../config/db");
const { ObjectId } = require("mongodb");

function findPublishers() {
  return db.get().collection("publishers").find({}).toArray();
}

async function findPublisherByName(name) {
  const publisher = await db
    .get()
    .collection("publishers")
    .findOne({ name: name });
  if (publisher) {
    return publisher;
  } else {
    throw new Error("This publisher not exist");
  }
}

function findPublisher(_id) {
  return db
    .get()
    .collection("publishers")
    .findOne({ _id: ObjectId(_id) });
}

async function createPublisher(args) {
  const existPublisher = await findPublisherByName(args.name);
  if (existPublisher !== null) throw new Error("This publisher already exist");
  const publisherCreated = await db
    .get()
    .collection("publishers")
    .insertOne(args);
  return publisherCreated.ops[0];
}

module.exports = {
  findPublishers,
  findPublisherByName,
  findPublisher,
  findPublisher,
  createPublisher,
};
