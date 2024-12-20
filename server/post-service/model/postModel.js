import mongoose from 'mongoose';

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
    views:{
      type: Number,
      default: 0,
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

export default Post;
