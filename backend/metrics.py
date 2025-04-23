from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction
from nltk.translate.meteor_score import meteor_score
from pycocoevalcap.cider.cider import Cider
import nltk

# Download required NLTK data
try:
    nltk.download('wordnet')
    nltk.download('punkt')
except Exception as e:
    print(f"Error downloading NLTK data: {e}")

def calculate_metrics(generated_caption, reference_captions):
    """
    Calculate BLEU, METEOR and CIDEr scores
    Args:
        generated_caption (str): Generated caption
        reference_captions (list): List of reference captions
    Returns:
        dict: Dictionary containing the scores
    """
    # Tokenize captions
    generated_tokens = nltk.word_tokenize(generated_caption.lower())
    reference_tokens = [nltk.word_tokenize(ref.lower()) for ref in reference_captions]

    # Calculate BLEU scores
    smoothing = SmoothingFunction().method1
    bleu1 = sentence_bleu(reference_tokens, generated_tokens, weights=(1, 0, 0, 0), smoothing_function=smoothing)
    bleu4 = sentence_bleu(reference_tokens, generated_tokens, weights=(0.25, 0.25, 0.25, 0.25), smoothing_function=smoothing)

    # Calculate METEOR score
    meteor = meteor_score(reference_tokens, generated_tokens)

    # Calculate CIDEr score
    cider_scorer = Cider()
    # Format captions for CIDEr
    hyp = {0: [generated_caption]}
    ref = {0: reference_captions}
    cider_score, _ = cider_scorer.compute_score(ref, hyp)

    return {
        'bleu1': round(bleu1 * 100, 2),
        'bleu4': round(bleu4 * 100, 2),
        'meteor': round(meteor * 100, 2),
        'cider': round(cider_score * 100, 2)
    }