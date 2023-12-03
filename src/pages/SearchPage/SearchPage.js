import React, { useState } from "react";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import ResultsList from "../../components/ResultsList/ResultsList";

const googleApiKey = "https://www.googleapis.com/books/v1";

const SearchPage = (user) => {
  const [books, setBooks] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`${googleApiKey}/volumes?q=${query}`);
      setBooks(response.data.items || []);
    } catch (error) {
      console.log("Error fetching books:", error);
    }
  };
  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <ResultsList books={books} />
    </div>
  );
};

export default SearchPage;
