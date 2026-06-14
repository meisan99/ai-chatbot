from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from dependencies import get_client

router = APIRouter(
    prefix="/chat",
    tags=["chat"],
)


class Question(BaseModel):
    content: str


@router.post("/")
def chat(question: Question, client=Depends(get_client)):

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash", contents=question.content
        )
        return {"question": question.content, "answer": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
