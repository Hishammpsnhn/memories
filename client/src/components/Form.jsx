import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { createPost } from "../action/postAction";
let initialState = {
  name: "",
  location: "",
  imageUrl: "",
  imageName: "",
}
const Form = ({setPost}) => {
  const [formData, setFormData] = useState(initialState);

  const [errors, setErrors] = useState({
    name: false,
    location: false,
    image: false,
  });

  const [uploading, setUploading] = useState(false);
  const [loading,setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setErrors({ ...errors, image: true });
      return;
    }

    setUploading(true);

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "olx_clone_ts");
    // formData.append("cloud_name", "your_cloud_name"); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dhs8o9scz/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: false, // Explicitly set to false
        }
      );

      setFormData((prev) => ({
        ...prev,
        imageUrl: response.data.secure_url,
        imageName: file.name,
      }));
      setErrors({ ...errors, image: false });
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      setErrors({ ...errors, image: true });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Validate inputs
    const newErrors = {
      name: formData.name.trim() === "",
      location: formData.location.trim() === "",
      image: formData.imageUrl === "",
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      setLoading(true);
      console.log("Form submitted:", formData);
      const newPost = await createPost(formData);
      console.log("New post:", newPost);
      setPost((prev)=> [...prev, newPost]);
      setFormData(initialState);
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Image Upload Form
      </Typography>

      {/* Name Input */}
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        helperText={errors.name && "Name is required"}
        fullWidth
        margin="normal"
      />

      {/* Location Input */}
      <TextField
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        error={errors.location}
        helperText={errors.location && "Location is required"}
        fullWidth
        margin="normal"
      />

      {/* Image Upload */}
      <Button
        variant="contained"
        component="label"
        fullWidth
        sx={{ mt: 2, mb: 2 }}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Image"}
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />
      </Button>
      {errors.image && (
        <Typography color="error" sx={{ mb: 2 }}>
          Please upload an image.
        </Typography>
      )}

      {/* Display Uploaded Image */}
      {formData.imageUrl && (
        <Box sx={{ mt: 2 }}>
          <img
            src={formData.imageUrl}
            alt="Uploaded"
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              marginTop: "10px",
            }}
          />
        </Box>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        Submit
      </Button>
    </Box>
  );
};

export default Form;
