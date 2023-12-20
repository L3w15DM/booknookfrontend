import React from "react";
import { Link } from "react-router-dom";

const Book = ({ book }) => {
  return (
    <div>
      <Link to={`/bookdetail/${book.id}`}>
        <h2>{book.volumeInfo.title}</h2>
        <img
          src={book.volumeInfo.imageLinks?.thumbnail}
          alt={book.volumeInfo.title}
        />
      </Link>
      <p>{book.volumeInfo.description}</p>
    </div>
  );
};

export default Book;
