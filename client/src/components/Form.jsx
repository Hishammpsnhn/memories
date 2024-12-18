import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    imageBase64: "",
    imageName: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    location: false,
    image: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setErrors({ ...errors, image: true });
      return;
    }

    // Convert image to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        imageBase64: reader.result,
        imageName: file.name,
      });
      setErrors({ ...errors, image: false });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    const newErrors = {
      name: formData.name.trim() === "",
      location: formData.location.trim() === "",
      image: formData.imageBase64 === "",
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      console.log("Form submitted:", formData);
      // Add form submission logic here
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
      >
        Upload Image
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

      {/* Display Uploaded Image Info */}
      {formData.imageName && (
        <Box sx={{ mt: 2 }}>
          <img
            src={formData.imageBase64}
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
      >
        Submit
      </Button>
    </Box>
  );
};

export default Form;
