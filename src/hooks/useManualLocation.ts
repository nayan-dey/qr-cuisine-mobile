import { useState, useEffect } from "react";
import { set } from "react-hook-form";

export const useLocationSuggestions = (debouncedSearchTerm) => {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorState, setErrorState] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const API_KEY = "AIzaSyDbxdM_pA81YqlheJSleL2wG2-5-64j9NQ";
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${debouncedSearchTerm}&key=${API_KEY}`;

        const response = await fetch(url);
        setLoading(true);
        const data = await response.json();
        setLoading(false);

        console.log("res=========>", data);

        if (data.status === "OK" && data.predictions.length > 0) {
          setSuggestions(data.predictions);
          setErrorState("");
        } else if (data.status === "ZERO_RESULTS") {
          setSuggestions([]);
          setErrorState("No Results Found");
        } else {
          setSuggestions([]);
          setErrorState("An unexpected error occurred.");
        }
      } catch (error) {
        setLoading(false);
        setErrorState("Error fetching suggestions.");
        console.error("Error fetching suggestions:", error);
      }
    };

    if (debouncedSearchTerm.length > 2) {
      fetchSuggestions();
    } else {
      setSuggestions(null); // Clear suggestions for shorter terms
      setErrorState(null); // Clear any previous error state
    }
  }, [debouncedSearchTerm]);

  return { suggestions, setSuggestions, loading, errorState, setErrorState };
};
