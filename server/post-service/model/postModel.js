const mongoose = require("mongoose");

// Define the schema for the post
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, 
      trim: true, 
    },
    location: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true, 
    },
    image: {
      type: String, 
      default: "", 
    },
  },
  {
    timestamps: true, 
  }
);

// Create the model based on the schema
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
