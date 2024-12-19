import Post from "../model/postModel.js";

export const createPost = async (req, res) => {
  try {
    const { name,  imageUrl, location } = req.body;
    console.log(req.body)
    console.log(req.user)
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
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
};
