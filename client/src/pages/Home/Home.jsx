import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";
import Card from "../../components/Card";
import Form from "../../components/Form";
import { Box, Grid } from "@mui/material";
import Header from "../../components/Header";
import { getAllPost } from "../../action/postAction";

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
    <Box sx={{ padding: 2 }}>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {post.map(({ title,id,location,createdAt,image }) => (
              <Grid item xs={12} sm={6} md={4} key={id}>
                <Card title={title} location={location} createdAt={createdAt} image={image}/>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Form />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
