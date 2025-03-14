import React, { useRef, useState } from 'react';

const Camera = ({ onCapture }) => {
  const videoRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsStreaming(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
      onCapture(file);
      stopCamera();
    }, 'image/jpeg');
  };

  return (
    <div className="camera-container">
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline
        style={{ display: isStreaming ? 'block' : 'none' }}
      />
      <div className="camera-controls">
        {!isStreaming ? (
          <button onClick={startCamera} className="camera-button">
            Open Camera
          </button>
        ) : (
          <>
            <button onClick={capturePhoto} className="camera-button">
              Take Photo
            </button>
            <button onClick={stopCamera} className="camera-button">
              Close Camera
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Camera;