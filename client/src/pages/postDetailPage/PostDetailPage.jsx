import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Alert,
} from "@mui/material";
import { getPost } from "../../action/postAction";
import Header from "../../components/Header";

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getPost(id);
        console.log(response);
        setPost(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2 }}>
        <Card>
          <CardMedia
            component="img"
            height="300"
            image={post.image}
            alt={`Post ${post.id}`}
          />
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              <strong></strong> {post.location}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default PostDetailPage;
