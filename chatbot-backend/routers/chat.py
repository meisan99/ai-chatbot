from fastapi import APIRouter, Depends, HTTPException
from google import genai
from google.genai import errors as genai_errors
from pydantic import BaseModel
from dependencies import get_client

router = APIRouter(
    prefix="/chat",
    tags=["chat"],
)


class Message(BaseModel):
    role: str  # "user" or "model"
    content: str


class ChatRequest(BaseModel):
    message: str
    history: list[Message] = []


@router.post("/")
def chat(request: ChatRequest, client: genai.Client = Depends(get_client)):

    try:
        contents = [
            {"role": m.role, "parts": [{"text": m.content}]} for m in request.history
        ]
        contents.append({"role": "user", "parts": [{"text": request.message}]})

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=contents,
            config={"system_instruction": """
                You are a helpful assistant.
                Keep responses concise and clear.
                If you are unsure about something, say so honestly.
                Format code in markdown code blocks.
            """},
        )
        return {"answer": response.text}
    
    except genai_errors.ClientError as e:
        print(f"Gemini client error: {e}")
        raise HTTPException(status_code=e.code, detail=e.message)
    except genai_errors.ServerError as e:
        print(f"Gemini server error: {e}")
        raise HTTPException(
            status_code=502, detail="AI service unavailable, please try again."
        )
    except Exception as e:
        print(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal server error.")
