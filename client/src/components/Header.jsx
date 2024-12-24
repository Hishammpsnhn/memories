import { Paper, Typography, Box, Button } from "@mui/material";
import React from "react";
import MemoryIcon from "@mui/icons-material/Memory"; // Importing an icon for a better design

const Header = () => {
  const  handleLogout=() => {
    localStorage.removeItem("userInfo");
    window.location.reload(); // To refresh the page after logout
  }
  return (
    <Paper
      elevation={5}
      sx={{
        padding: "20px",
        marginBottom: "20px",
        backgroundColor: "primary.main",
        color: "white",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left Section: Icon and Title */}
      <Box display="flex" alignItems="center" gap={2}>
        <MemoryIcon sx={{ fontSize: 40 }} /> {/* Large Icon */}
        <Typography variant="h4" component="h1" fontWeight="bold">
          Memories
        </Typography>
      </Box>

      {/* Right Section: Subtitle */}
      <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
        Capture and cherish your moments
      </Typography>
      <Button variant="contained" color="error" onClick={handleLogout}>LOGOUT</Button>
    </Paper>
  );
};

export default Header;
