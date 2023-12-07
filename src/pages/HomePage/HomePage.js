import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

const HomePage = () => {
  // The "user" value from this Hook contains user information (id, userName, email) from the decoded token
  // The "token" value is the JWT token sent from the backend that you will send back in the header of any request requiring authentication
  const [user, token] = useAuth();

  useEffect(() => {}, [token]);

  return (
    <div className="container">
      <h1>Welcome, {user.userName}!</h1>
    </div>
  );
};

export default HomePage;
