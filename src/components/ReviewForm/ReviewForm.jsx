import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useParams } from "react-router-dom";

const ReviewForm = ({ onNewReview }) => {
  const [user, token] = useAuth();
  const { id } = useParams();
  const [text, setText] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      id: id,
      text: text,
      rating: rating,
    };
    console.log(newReview);
    const response = await axios.post(
      "http://localhost:3000/api/Reviews",
      newReview,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(response.status);
    if (response.status === 201) {
      onNewReview();
    }
  };

  return (
    <div className="leave-review">
      {user ? ( //Shor Circuit Conditional to check if the user is logged in.
        <form onSubmit={handleSubmit}>
          <label>
            Leave A Review:
            <textarea
              className="review-textarea"
              rows="10"
              cols="40"
              type="text"
              onChange={setText}
              value={text}
            />
          </label>
          <br />
          <label>
            Rating (1-5):
            <select value={rating} onChange={setRating}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <button type="submit" className="btn btn-outline-dark">
            Submit
          </button>
        </form>
      ) : (
        <p>Log in to leave review</p>
      )}
    </div>
  );
};

export default ReviewForm;
