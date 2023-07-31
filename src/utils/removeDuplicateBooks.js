// function removeDuplicateBooks(books) {
//     const bookSet = new Set();
//     const uniqueBooks = [];

//     books.forEach(book => {
//         if (!bookSet.has(book.id)) {
//             bookSet.add(book.id);
//             uniqueBooks.push(book);
//         }
//     });

//     return uniqueBooks;
// }

// export default removeDuplicateBooks
import parseAuthors from "./parseAuthors";
function removeDuplicateBooksByAuthor(books) {
    const authorBooksMap = {};
    const uniqueBooks = [];

    books.forEach(book => {
        const authors = parseAuthors(book.author);
        if (authors) {
            authors.forEach(author => {
                if (!authorBooksMap[author]) {
                    authorBooksMap[author] = new Set();
                }
                if (!authorBooksMap[author].has(book.id)) {
                    authorBooksMap[author].add(book.id);
                    uniqueBooks.push(book);
                }
            });
        }
    });

    return uniqueBooks;
}
export default removeDuplicateBooksByAuthor