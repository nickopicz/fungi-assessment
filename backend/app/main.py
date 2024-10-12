from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
from app.routers import langgraph
from app.routers.langgraph import build_langgraph
from app.services.defi_service import get_yield_rates
from app.services.openai_service import get_openai_project_name, summarize_message
import os
from dotenv import load_dotenv

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

app.include_router(langgraph.router)

class MessageRequest(BaseModel):
    content: str

@app.get("/")
async def root():
    return {"message": "Welcome to the DeFi AI Backend!"}

@app.post("/chat")
async def chat_response(request: MessageRequest):
    message = request.content.lower()
    # Create the LangGraph and process the message
    response = build_langgraph(message)
    return {"response": response}