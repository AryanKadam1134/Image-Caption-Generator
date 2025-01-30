import os
from flask import Flask, request, jsonify
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all domains (you can specify allowed origins if needed)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load BLIP model and processor for image captioning
try:
    print("Loading BLIP model and processor...")
    processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
    model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    exit(1)  # Stop execution if model fails to load

@app.route("/upload", methods=["POST"])
def upload_image():
    try:
        # Check if the request contains a file
        if "image" not in request.files:
            return jsonify({"error": "No image provided"}), 400

        image_file = request.files["image"]
        image = Image.open(image_file.stream).convert("RGB")  # Convert to RGB for consistency

        # Process the image and generate caption
        inputs = processor(images=image, return_tensors="pt")
        out = model.generate(**inputs)
        caption = processor.decode(out[0], skip_special_tokens=True)

        return jsonify({"caption": caption})

    except Exception as e:
        print(f"Error processing image: {e}")
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Image Caption Generator Backend is Running!"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Get PORT from environment variable
    app.run(debug=False, host="0.0.0.0", port=port)  # Disable debug for production
