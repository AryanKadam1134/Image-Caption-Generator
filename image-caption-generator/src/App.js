import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Camera from "./components/Camera";

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCamera, setShowCamera] = useState(false);

  const API_URL = "http://localhost:5000/upload";

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
    setCaption("");
    setError("");
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      setError("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(`${API_URL}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setCaption(response.data.caption);
      } else {
        setError("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setError(
        error.response?.data?.error || "Failed to generate caption. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCameraCapture = (file) => {
    setSelectedImage(file);
    setShowCamera(false);
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
          <button
            onClick={() => setShowCamera(true)}
            className="camera-toggle-button"
            title="Use Camera"
          >
            <i className="fas fa-camera"></i>
          </button>
          <button
            onClick={handleUpload}
            className="upload-button custom-upload-button"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Caption"}
          </button>
        </div>

        {showCamera && (
          <div className="camera-modal">
            <Camera onCapture={handleCameraCapture} />
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        <div className="result-section">
          {selectedImage && !showCamera && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected"
                className="preview-image fixed-dimensions"
              />
            </div>
          )}

          {caption && (
            <div className="caption-display">
              <p className="generated-caption colorful-caption">{caption}</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;