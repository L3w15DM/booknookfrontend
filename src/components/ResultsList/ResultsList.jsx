import React from "react";
import Book from "../Book/Book";

const ResultsList = ({ books }) => {
  return (
    <div>
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  );
};

export default ResultsList;
