import asyncio
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.routers.langgraph import build_langgraph
from fastapi.responses import StreamingResponse

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins temporarily for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MessageRequest(BaseModel):
    content: str

@app.get("/")
async def root():
    return {"message": "Welcome to the DeFi AI Backend!"}

@app.post("/chat")
async def chat_response(request: MessageRequest):
    message = request.content.lower()

    try:
        # Use asyncio.wait_for to set a timeout
        timeout_seconds = 15  # Set timeout duration (in seconds)
        response_generator = await asyncio.wait_for(build_langgraph(message), timeout=timeout_seconds)

        # Use StreamingResponse to stream the OpenAI response
        return StreamingResponse(response_generator, media_type="text/plain")

    except asyncio.TimeoutError:
        # If the timeout is exceeded, raise an error
        raise HTTPException(status_code=504, detail="Request timed out. Please try again later.")
    except Exception as e:
        # Catch any other unexpected errors
        raise HTTPException(status_code=500, detail=str(e))
