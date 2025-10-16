const BASE_URL = "http://localhost:5000/api";

export const registerUser = async (username, password) => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, userpassword: password }),
  });
  return res.json();
};

export const loginUser = async (username, password) => {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, userpassword: password }),
  });
  return res.json();
};

export const likeMovie = async (userId, movie) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movie }),
  });
  return res.json();
};

export const unlikeMovie = async (userId, movieId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/unlike`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieId }),
  });
  return res.json();
};
