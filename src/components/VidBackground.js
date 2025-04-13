import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";

const VideoBackground = ({ movieId }) => {
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/950387/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data?.json();

    const filteredTrailer = json.results.filter(
      (video) => video.type === "Trailer" && video.name === "Official Trailer"
    );
    const trailer = filteredTrailer.length ? filteredTrailer : json?.results[0];

    console.log(trailer);
  };
  useEffect(() => {
    getMovieVideo();
  }, []);

  return <div></div>;
};

export default VideoBackground;
