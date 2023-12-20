import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Favorites from "../../components/Favorite/Favorite";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const { user, token } = useAuth;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5216/api/Favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [user, token]);

  return (
    <div>
      <h2>My Favorite Books</h2>
      <Favorites favorites={favorites} />
    </div>
  );
};

export default FavoritesPage;
