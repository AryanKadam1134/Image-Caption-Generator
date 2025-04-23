import os
from flask import Flask, request, jsonify
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration
from flask_cors import CORS
from deep_translator import GoogleTranslator
from metrics import calculate_metrics

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Supported languages dict
SUPPORTED_LANGUAGES = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'hi': 'Hindi',
    'zh-CN': 'Chinese',
    'ja': 'Japanese',
    'ko': 'Korean',
    'ar': 'Arabic'
}

# Reference captions for evaluation
REFERENCE_CAPTIONS = {
    'test_image_1.jpg': [
        "a person riding a surfboard on a wave",
        "surfer riding ocean wave during daytime",
        "someone surfing on blue water wave",
    ],
    # Add more reference captions for different images
}

# Load BLIP model and processor for image captioning
try:
    print("Loading BLIP model and processor...")
    processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
    model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    exit(1)

@app.route("/upload", methods=["OPTIONS", "POST"])
def upload_image():
    if request.method == "OPTIONS":
        response = jsonify({"message": "CORS preflight successful"})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        return response, 200

    try:
        if "image" not in request.files:
            return jsonify({"error": "No image provided"}), 400

        # Get target language from request
        target_language = request.form.get('language', 'en')
        
        image_file = request.files["image"]
        image = Image.open(image_file.stream).convert("RGB")

        # Generate caption in English with padding
        inputs = processor(
            images=image, 
            return_tensors="pt",
            padding=True  # Add padding parameter
        )
        out = model.generate(**inputs)
        caption_en = processor.decode(out[0], skip_special_tokens=True)

        # Calculate evaluation metrics if reference captions exist
        metrics = None
        image_filename = image_file.filename
        if image_filename in REFERENCE_CAPTIONS:
            metrics = calculate_metrics(
                caption_en,
                REFERENCE_CAPTIONS[image_filename]
            )

        # Translate caption if target language is not English
        if target_language != 'en':
            try:
                translator = GoogleTranslator(source='en', target=target_language)
                caption = translator.translate(caption_en)
            except Exception as e:
                print(f"Translation error: {e}")
                caption = caption_en  # Fallback to English if translation fails
        else:
            caption = caption_en

        response_data = {
            "caption": caption,
            "original_caption": caption_en,
        }

        if metrics:
            response_data["metrics"] = metrics

        response = jsonify(response_data)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

    except Exception as e:
        print(f"Error processing image: {e}")
        return jsonify({"error": "Internal Server Error", "details": str(e)}), 500

@app.route("/languages", methods=["GET"])
def get_languages():
    return jsonify(SUPPORTED_LANGUAGES)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Image Caption Generator Backend is Running!"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port)