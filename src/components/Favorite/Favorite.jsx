import React from "react";
import Book from "../Book/Book";
import { useParams } from "react-router-dom";

const Favorites = ({ favorites }) => {
  const { book } = useParams();
  return (
    <div>
      {favorites.length === 0 ? (
        <p>You have no favorites yet!</p>
      ) : (
        favorites.map((book) => <Book key={book.id} book={book} />)
      )}
    </div>
  );
};

export default Favorites;
