## Image Caption Generator

For Front-end -
cd image-caption-generator
export NODE_OPTIONS=--openssl-legacy-provider
npm start

For Back-end -
source venv/bin/activate
pip install Flask
pip install Pillow transformers torch
python backend/app.py