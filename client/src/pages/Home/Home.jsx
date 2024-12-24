import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";
import Card from "../../components/Card";
import Form from "../../components/Form";
import { Box, Grid } from "@mui/material";
import Header from "../../components/Header";
import { getAllPost } from "../../action/postAction";
import LocationChips from "../../components/LocationChips";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState([]);

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);
  useEffect(() => {
    const getPost = async () => {
      const data = await getAllPost();
      setPost(data);
    };
    getPost();
  }, []);

  return (
    <Box>
      <LocationChips />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {post.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card
                  title={post.title}
                  location={post.location}
                  createdAt={post.createdAt}
                  image={post.image}
                  id={post._id}
                  views={post.views}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Form setPost={setPost} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
