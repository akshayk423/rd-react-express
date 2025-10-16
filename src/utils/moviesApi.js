import { checkResponse } from "./api";

export const getKeyword = (tag, apiKey) => {
  return fetch(
    `https://api.themoviedb.org/3/search/keyword?api_key=${apiKey}&query=${encodeURIComponent(
      tag
    )}`
  ).then(checkResponse);
};

export const getMovie = (keywordId, apiKey, page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&with_keywords=${keywordId}&language=en-US&page=${page}`
  ).then(checkResponse);
};

export const getMovieDetails = (movieId, apiKey) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
  ).then(checkResponse);
};
