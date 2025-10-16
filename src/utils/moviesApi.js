import { checkResponse } from "./api";

export const getKeyword = (tag, apiKey) => {
  return fetch(
    `https://api.themoviedb.org/3/search/keyword?api_key=${apiKey}&query=${encodeURIComponent(
      tag
    )}`
  ).then(checkResponse);
};

export const getMovie = (keywordId, apiKey) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&with_keywords=${keywordId}&language=en-US`
  ).then(checkResponse);
};
