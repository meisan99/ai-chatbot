import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

GEN_API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=GEN_API_KEY)


def get_client():
    return client
