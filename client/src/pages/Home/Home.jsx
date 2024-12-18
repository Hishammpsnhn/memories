import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";
import Card from "../../components/Card";
import Form from "../../components/Form";
import { Box, Grid } from "@mui/material";
import Header from "../../components/Header";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Box sx={{ padding: 2 }}>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {[...Array(7)].map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card />
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
