API for books.

---

# Run Project

npm install

npm start

Project run at
http://localhost:3002/graphql

---

# Querying data

On the playground you can querying the data (Books, Authors and Publishers) with something like this:

For example

```graphql
query {
  authors {
    _id
    firstName
    lastName
    books {
      title
    }
  }
}
```

Query The Books (It has filters), limit and skip are mandatory.

```graphql
query {
  books(limit: 3, skip: 1, publicationYear: 2000) {
    title
    ISBN
  }
}
```

---

# Create Books

For create Books you need the publisher id as a string, the author id or id of authors (the id must be in an array)

```graphql
mutation {
  createBook(
    title: "Bla Bla Bla"
    ISBN: "123-sd21"
    publicationYear: 2019
    publisher: "b32be30e7c7b82407b03dfff2"
    authors: ["5dbe30e7c7b82407b03dfff2"]
  ) {
    _id
  }
}
```
