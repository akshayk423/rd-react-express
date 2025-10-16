import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, userpassword } = req.body;
    const existing = await User.findOne({ username });
    if (existing)
      return res.status(400).json({ message: "Username already taken" });

    const hashedPassword = await bcrypt.hash(userpassword, 10);
    const newUser = new User({
      username,
      userpassword: hashedPassword,
      userID: Date.now(),
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, userpassword } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(userpassword, user.userpassword);
    if (!validPassword)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Like
router.post("/like", async (req, res) => {
  try {
    const { username, movie } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.likedMovies.some((m) => m.id === movie.id)) {
      return res.status(400).json({ message: "Movie already liked" });
    }

    user.likedMovies.push(movie);
    await user.save();

    res
      .status(200)
      .json({
        message: "Movie added to liked list",
        likedMovies: user.likedMovies,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Unlike
router.post("/unlike", async (req, res) => {
  try {
    const { username, movieId } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.likedMovies = user.likedMovies.filter((m) => m.id !== movieId);
    await user.save();

    res.status(200).json({ likedMovies: user.likedMovies });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get liked movies
router.get("/liked/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ likedMovies: user.likedMovies });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
