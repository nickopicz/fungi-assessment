from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.routers.langgraph import build_langgraph
import os
from dotenv import load_dotenv
from fastapi.responses import StreamingResponse

# Load environment variables for OpenAI
load_dotenv()

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
    
    # Use StreamingResponse to stream the OpenAI response
    response_generator = await build_langgraph(message)
    
    return StreamingResponse(response_generator, media_type="text/plain")
