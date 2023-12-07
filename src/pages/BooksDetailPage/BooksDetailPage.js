import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import ReviewDetails from "../../components/ReviewDetails/ReviewDetails";

const googleApiKey = "https://www.googleapis.com/books/v1";

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  const fetchBookDetails = async () => {
    try {
      // Make the API call to fetch the book details using the book id
      const response = await axios.get(`${googleApiKey}/volumes/${id}`);

      // Update the state with the book details retrieved from the API
      setBook(response.data);
    } catch (error) {
      console.log("Error fetching book details:", error);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, []);

  if (book === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-details-container">
      {/* Display the book details */}
      <img
        src={book.volumeInfo.imageLinks.thumbnail}
        alt={book.volumeInfo.title}
      />
      <h1>{book.volumeInfo.title}</h1>
      <h3>Author(s): {book.volumeInfo.authors.join(", ")}</h3>
      <p>{book.volumeInfo.description}</p>

      <div>
        <ReviewDetails />
        <ReviewForm />
      </div>
    </div>
  );
};
export default BookDetailsPage;
