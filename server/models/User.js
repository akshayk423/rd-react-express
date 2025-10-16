import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  userpassword: { type: String, required: true },
  userID: { type: Number, required: true, unique: true },
  likedMovies: { type: [Object], default: [] }, // store full movie objects or IDs
});

export default mongoose.model("User", userSchema);
