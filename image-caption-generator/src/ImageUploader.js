import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("https://image-caption-generator-m0uo.onrender.com", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCaption(response.data.caption);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return (
    <div>
      <h1>Image Caption Generator</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleImageUpload}>Upload Image</button>
      {caption && <p>Generated Caption: {caption}</p>}
    </div>
  );
};

export default ImageUploader;
