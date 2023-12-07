import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ReviewDetails = (props) => {
  const [review, setReview] = useState(null);
  const { id } = useParams();

  const getReviewDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/BookDetail/${id}`
      );
      setReview(response.data);
    } catch (error) {
      console.log("Error fetching details:", error);
      setReview(null);
    }
  };

  useEffect(() => {
    getReviewDetails();
  });

  return review ? (
    <div>
      <h4>{review.id} Reviews</h4>

      <div>
        <span>UserName:</span>
        <span>{review.userId}</span>
      </div>
      <div>
        <span>Review:</span>
        <span>{review.text}</span>
      </div>
      <div>
        <span>Rating:</span>
        <span>{review.rating}</span>
      </div>
    </div>
  ) : (
    <p>No reviews. Please Leave one!</p>
  );
};

export default ReviewDetails;
