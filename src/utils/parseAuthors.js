function parseAuthors(authorsString) {
    return authorsString?.split(",").map(author => author.trim());
}
export default parseAuthors  