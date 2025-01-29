import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setCaption("");
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      setLoading(true);
      const response = await axios.post("https://image-caption-generator-3.onrender.com", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCaption(response.data.caption);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to generate caption. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Image Caption Generator</h1>
        <div className="upload-section">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input custom-file-input"
          />
          <button onClick={handleUpload} className="upload-button custom-upload-button">
            {loading ? "Generating..." : "Generate Caption"}
          </button>
        </div>
        <div className="result-section">
          <div className="image-preview">
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="preview-image fixed-dimensions"
              />
            )}
          </div>
          <div className="caption-display">
            {caption && (
              <p className="generated-caption colorful-caption">{caption}</p>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
