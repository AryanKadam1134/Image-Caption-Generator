# Image Caption Generator

## 📌 Overview
The Image Caption Generator is a web application that allows users to upload an image and receive an AI-generated caption describing the content of the image. The project utilizes a Flask-based backend for image processing and a React.js frontend for an interactive user interface.<br/>

## 🚀 Features
✅ Upload images easily using the web interface<br/>
✅ View the uploaded image and generated caption side by side<br/>
✅ AI-powered caption generation using a deep learning model<br/>
✅ Responsive and user-friendly UI with improved design<br/>
✅ Error handling for a smooth user experience<br/>

## 🛠️ Technologies Used
Frontend (React.js & Tailwind CSS)<br/>
React.js for building a dynamic UI<br/>
Tailwind CSS for styling and layout<br/>
Axios for API communication with the backend<br/>
Backend (Flask & Deep Learning)<br/>
Flask as the backend framework<br/>
Pre-trained deep learning model for caption generation (e.g., InceptionV3 + LSTM)<br/>
Python libraries: TensorFlow, NumPy, OpenCV, Flask-CORS for handling requests<br/>

## 📂 Project Structure
Image-Caption-Generator/<br/>
│── backend/                # Flask backend<br/>
│   ├── app.py              # Main Flask API file<br/>
│   ├── model.py            # Pre-trained model loading & prediction<br/>
│   ├── static/             # Stores uploaded images<br/>
│   ├── requirements.txt    # Python dependencies<br/>
│<br/>
│── image-caption-generator/ # Frontend React app<br/>
│   ├── src/<br/>
│   │   ├── App.js          # Main React component<br/>
│   │   ├── App.css         # Styles<br/>
│   │   ├── components/     # UI components<br/>
│   ├── package.json        # Frontend dependencies<br/>
│   ├── public/             # Static assets<br/>
│<br/>
└── README.md               # Project documentation<br/>

## 💡 How It Works
User uploads an image via the frontend.<br/>
Image is sent to the Flask backend for processing.<br/>
Deep learning model generates a caption for the image.<br/>
Caption is sent back to the frontend and displayed beside the uploaded image.<br/>

## 📌 Setup & Installation
1️⃣ Clone the Repository

git clone [https://github.com/yourusername/Image-Caption-Generator.git]<br/>
cd Image-Caption-Generator<br/>

2️⃣ Backend Setup

cd backend<br/>
python -m venv venv<br/>
source venv/bin/activate  # (On Windows: venv\Scripts\activate)<br/>
pip install -r requirements.txt<br/>
python app.py<br/>
Backend will run on http://localhost:5000<br/>

3️⃣ Frontend Setup

cd image-caption-generator<br/>
npm install<br/>
npm start<br/>
Frontend will run on http://localhost:3000<br/>

## 🌍 Deployment
Backend can be deployed on Render, Heroku, or AWS<br/>
Frontend can be hosted on Vercel or Netlify<br/>

## 🔗 API Endpoints
POST /upload → Accepts an image and returns a generated caption<br/>
