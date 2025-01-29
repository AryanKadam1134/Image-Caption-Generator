import os
from flask import Flask, request, jsonify
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all domains (you can specify a list of allowed domains if needed)
CORS(app)

# Load BLIP model and processor for image captioning
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

@app.route("/upload", methods=["POST"])
def upload_image():
    if "image" not in request.files:
        return jsonify({"error": "No image provided"}), 400

    image_file = request.files["image"]
    image = Image.open(image_file.stream)

    # Process the image and generate caption
    inputs = processor(images=image, return_tensors="pt")
    out = model.generate(**inputs)
    caption = processor.decode(out[0], skip_special_tokens=True)

    return jsonify({"caption": caption})

if __name__ == "__main__":
port = os.environ.get("PORT", "5000")  # Default to 5000 if PORT is not set
app.run(debug=True, host="0.0.0.0", port=int(port))


