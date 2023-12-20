import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link, useParams } from "react-router-dom";

const ReviewForm = () => {
  const [user, token] = useAuth();
  const { bookId } = useParams();
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      bookId: bookId,
      text: text,
      rating: rating,
    };
    console.log(newReview);
    const response = await axios.post(
      "http://localhost:5001/api/reviews",
      newReview,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(response.status);
    if (response.status === 201) {
    }
  };

  return (
    <div>
      {user ? ( //Shor Circuit Conditional to check if the user is logged in.
        <form onSubmit={handleSubmit}>
          <label>
            Leave A Review:
            <textarea
              rows="10"
              cols="30"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </label>
          <br />
          <label>
            Rating (1-5):
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
            ></input>
          </label>
          <button type="submit" className="btn btn-outline-dark">
            Submit
          </button>
        </form>
      ) : (
        <Link to="/login">
          <p>
            <button>Log in to leave review</button>
          </p>
        </Link>
      )}
    </div>
  );
};

export default ReviewForm;
