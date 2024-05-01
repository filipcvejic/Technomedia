import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./SearchResultsScreen.css";
import { toast } from "react-toastify";

function SearchResultsScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const term = searchParams.get("search");
        const searchTerm = term ? term.trim() : "";
        setSearchTerm(searchTerm);

        if (searchTerm !== "") {
          const response = await fetch(
            `http://localhost:3000/api/search/?q=${searchTerm}`
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message);
          }

          setSearchResults(data);
        } else {
          navigate("/");
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

    getSearchResults();
  }, [location.search]);

  return <div>SearchResultsScreen</div>;
}

export default SearchResultsScreen;
