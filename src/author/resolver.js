const authors = [
    {
        id: 123,
        firstName: 'pedro',
        lastName: 'mesa',
        country: 'colombia',
        books: [
            {title:'la baldor'},
            {title:'el principito'}
        ]
    }
]

module.exports = {
    Query: {
        authors: () => authors
    },
}