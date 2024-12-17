import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import { login, signUp } from "../../action/userAction";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/AuthProvider";
const AuthPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  console.log(user);

  const [activeTab, setActiveTab] = useState(0);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    const user = await login(loginData);
    if (user) {
      setUser(user);
      navigate("/");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const user = await signUp(signupData);
    if (user) {
      setUser(user);
      navigate("/");
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 8 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>

        {activeTab === 0 && (
          <Box mt={3}>
            <Typography variant="h5" align="center" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleLoginSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        )}

        {activeTab === 1 && (
          <Box mt={3}>
            <Typography variant="h5" align="center" gutterBottom>
              Signup
            </Typography>
            <form onSubmit={handleSignupSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    type="text"
                    fullWidth
                    value={signupData.name}
                    onChange={(e) =>
                      setSignupData({ ...signupData, name: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Signup
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AuthPage;
