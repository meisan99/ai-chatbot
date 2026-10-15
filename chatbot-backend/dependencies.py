import os
from typing import Annotated

from dotenv import load_dotenv
from fastapi import Depends
from google import genai

load_dotenv()

_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def _get_client() -> genai.Client:
    return _client


AiClientDep = Annotated[genai.Client, Depends(_get_client)]
