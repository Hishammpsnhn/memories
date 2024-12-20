import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  getTopPostsLocation,
} from "../controller/postController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();
router.get("/", verifyToken, getAllPosts);
router.get("/topLocations",  getTopPostsLocation);
router.post("/", verifyToken, createPost);
router.get("/:id", getPostById);

export default router;
