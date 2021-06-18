import React, { useState } from "react";
import Nav from "../components/Nav";
import Banner from "../components/Banner";
import requests from "../requests";
import Row from "../components/Row";

import "../styles/HomeScreen.css";

function HomeScreen() {
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />

      <Row
        title="Trending Now"
        fetchUrl={requests.fetchTrending}
        isLargeRow={true}
      />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovis} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="S-F Movies" fetchUrl={requests.fetchSciFi} />
    </div>
  );
}

export default HomeScreen;
