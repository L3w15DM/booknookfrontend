import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import ReviewDetails from "../../components/ReviewDetails/ReviewDetails";
import useAuth from "../../hooks/useAuth";

const googleApiKey = "https://www.googleapis.com/books/v1";

const BookDetailsPage = () => {
  const { bookId, thumbnailUrl, title } = useParams();
  const [book, setBook] = useState(null);
  const [user, token] = useAuth();
  const [isBookFavorited, setBookFavorite] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`${googleApiKey}/volumes/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchBookDetails();
  }, [bookId]);

  if (book === null) {
    return <div>Loading...</div>;
  }

  const handleFavoriteClick = async () => {
    try {
      if (!token) {
        console.log("Login to favorite a book");
        return;
      }
      const response = await axios.post(
        "http://localhost:5001/api/Favorites",
        {
          bookId: book.id,
          title: title,
          thumbnail: thumbnailUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setBookFavorite(true);
      }
    } catch (error) {
      console.error("Error favoriting book: ", error);
    }
  };

  return (
    <div className="book-details-container">
      <div>
        {/* Display the book details */}
        <span>
          <img
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
          />
        </span>
        <span>
          <button onClick={handleFavoriteClick}>
            {isBookFavorited ? "Favorited!" : "Favorite"}
          </button>
        </span>
        <h1>{book.volumeInfo.title}</h1>
        <h3>Author(s): {book.volumeInfo.authors.join(", ")}</h3>
        <p>{book.volumeInfo.description}</p>
      </div>

      <br />
      <br />
      <br />

      <div>
        <ReviewDetails />
        <ReviewForm />
      </div>
    </div>
  );
};
export default BookDetailsPage;
