import Post from "../model/postModel.js";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import mongoose from "mongoose";

const packageDefinition = protoLoader.loadSync("./proto/analytical.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const todoPackage = grpcObject.todoPackage;
console.log(process.env.ANALYTICAL_SERVICE_URL);
const client = new todoPackage.Todo(
  "analytical-service:40000",
  grpc.credentials.createInsecure()
);
// Function to increment the visit count in AnalyticalService
const getViewCount = (location) => {
  return new Promise((resolve, reject) => {
    client.createTodo({ location: location }, (err, res) => {
      if (err) {
        console.error("Error:", err);
        reject(err); // Reject the promise if there's an error
      } else {
        console.log("Received from server:", JSON.stringify(res));
        console.log("Count:", res.count);
        resolve(res.count); // Resolve the promise with the count
      }
    });
  });
};

export const createPost = async (req, res) => {
  try {
    const { name, imageUrl, location } = req.body;
    console.log(req.body);
    console.log(req.user);
    const newPost = new Post({
      title: name,
      location,
      author: req.user.id,
      image: imageUrl,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

export const getAllPosts = async (req, res) => {
  const token = req.cookies;
  console.log("Token:", token);

  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;

  // Validate if the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid post ID format" });
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    let count = await getViewCount(post.location);
    if (count) {
      post.views += 1;
      await post.save();
      console.log(post);
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
};
