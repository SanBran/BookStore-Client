const removeSharedBooks = (booksByAuthor) => {
    const allBooks = new Set();
    const uniqueBooks = [];

    for (const author in booksByAuthor) {
        const authorBooks = booksByAuthor[author];
        authorBooks.forEach((book) => {
            if (!allBooks.has(book.id)) {
                uniqueBooks.push(book);
                allBooks.add(book.id);
            }
        });
    }

    return uniqueBooks;
};

export default removeSharedBooks;