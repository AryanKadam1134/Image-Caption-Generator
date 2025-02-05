# Image Caption Generator

## 📌 Overview
The Image Caption Generator is a web application that allows users to upload an image and receive an AI-generated caption describing the content of the image. The project utilizes a Flask-based backend for image processing and a React.js frontend for an interactive user interface.

## 🚀 Features
✅ Upload images easily using the web interface
✅ View the uploaded image and generated caption side by side
✅ AI-powered caption generation using a deep learning model
✅ Responsive and user-friendly UI with improved design
✅ Error handling for a smooth user experience

## 🛠️ Technologies Used
Frontend (React.js & Tailwind CSS)
React.js for building a dynamic UI
Tailwind CSS for styling and layout
Axios for API communication with the backend
Backend (Flask & Deep Learning)
Flask as the backend framework
Pre-trained deep learning model for caption generation (e.g., InceptionV3 + LSTM)
Python libraries: TensorFlow, NumPy, OpenCV, Flask-CORS for handling requests

## 📂 Project Structure

Image-Caption-Generator/
│── backend/                # Flask backend
│   ├── app.py              # Main Flask API file
│   ├── model.py            # Pre-trained model loading & prediction
│   ├── static/             # Stores uploaded images
│   ├── requirements.txt    # Python dependencies
│
│── image-caption-generator/ # Frontend React app
│   ├── src/
│   │   ├── App.js          # Main React component
│   │   ├── App.css         # Styles
│   │   ├── components/     # UI components
│   ├── package.json        # Frontend dependencies
│   ├── public/             # Static assets
│
└── README.md               # Project documentation

## 💡 How It Works
User uploads an image via the frontend.
Image is sent to the Flask backend for processing.
Deep learning model generates a caption for the image.
Caption is sent back to the frontend and displayed beside the uploaded image.

## 📌 Setup & Installation
1️⃣ Clone the Repository

git clone https://github.com/yourusername/Image-Caption-Generator.git
cd Image-Caption-Generator

2️⃣ Backend Setup

cd backend
python -m venv venv
source venv/bin/activate  # (On Windows: venv\Scripts\activate)
pip install -r requirements.txt
python app.py
Backend will run on http://localhost:5000

3️⃣ Frontend Setup

cd image-caption-generator
npm install
npm start
Frontend will run on http://localhost:3000

## 🌍 Deployment
Backend can be deployed on Render, Heroku, or AWS
Frontend can be hosted on Vercel or Netlify

## 🔗 API Endpoints
POST /upload → Accepts an image and returns a generated caption
