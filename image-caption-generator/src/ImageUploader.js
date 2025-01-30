import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setCaption("");
    setError("");
  };

  const handleImageUpload = async () => {
    if (!image) {
      setError("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "https://image-caption-generator-udlp.onrender.com", // Change this URL
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setCaption(response.data.caption);
    } catch (error) {
      console.error("Error uploading image", error);
      setError("Failed to generate caption. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Image Caption Generator</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleImageUpload} disabled={loading}>
        {loading ? "Generating..." : "Upload Image"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {caption && <p>Generated Caption: {caption}</p>}
    </div>
  );
};

export default ImageUploader;
