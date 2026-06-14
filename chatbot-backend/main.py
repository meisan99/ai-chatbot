from fastapi import FastAPI
import uvicorn
from routers import chat
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router)


@app.get("/")
def read_root():
    return {"Hello": "World"}
