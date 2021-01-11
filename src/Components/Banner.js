import React, { useState, useEffect } from "react";
import requests from "./../requests";
import axios from "../axios";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTrending);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);
  console.log(movie);

  return (
    <header className="banner">
      <p></p>
    </header>
  );
}

export default Banner;
