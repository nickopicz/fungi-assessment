import openai
from fastapi import APIRouter
import os
from dotenv import load_dotenv

# Load the environment variables
load_dotenv()

openai.api_key = os.getenv("OPENAI_API_KEY")

router = APIRouter()

@router.post("/query-openai")
async def query_openai(prompt: str):
    response = openai.Completion.create(
        engine="text-davinci-003",  # or use GPT-4 if available
        prompt=prompt,
        max_tokens=150
    )
    return {"response": response['choices'][0]['text']}
