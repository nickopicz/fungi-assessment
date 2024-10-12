from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
from app.routers import langgraph
import openai
import requests
import os
from dotenv import load_dotenv

# Load environment variables for OpenAI
load_dotenv()

openai.api_key = "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"


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
async def chat_response(request: MessageRequest) -> Dict[str, str]:
    message = request.content.lower()
    print("message: ", message)
    # Handle "yield rates" query
    if "yield rates" in message:
        # Fetch data from DeFiLlama (Node 1)
        yield_rates_url = "https://api.llama.fi/yields"
        yield_rates_response = requests.get(yield_rates_url)
        print("recieved yield rates")

        if yield_rates_response.status_code == 200:
            yield_rates = yield_rates_response.json()
            print("yields response: ", yield_rates)
            # Use OpenAI to process/explain yield rates
            openai_prompt = f"The current DeFi yield rates are: {yield_rates}. Please explain these rates."
            openai_response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",  # Updated model
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": openai_prompt},
                ],
            )

            return {"response": openai_response.choices[0].message['content'].strip()}
        else:
            print("failed response.")
            return {"response": "Failed to fetch yield rates."}

    # Handle "social feed" query for RSS3 API
    elif "social feed" in message:
        wallet_address = "example_wallet_address"  # Use a test wallet address
        rss3_url = f"https://api.rss3.io/v1/wallets/{wallet_address}/social-feeds"
        headers = {"Authorization": "Bearer YOUR_RSS3_API_KEY"}
        rss3_response = requests.get(rss3_url, headers=headers)

        if rss3_response.status_code == 200:
            social_feed = rss3_response.json()

            # Use OpenAI to summarize the social feed
            openai_prompt = f"Summarize this social feed: {social_feed}"
            openai_response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",  # Updated model
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": openai_prompt},
                ],
            )

            return {"response": openai_response.choices[0].message['content'].strip()}
        else:
            return {"response": f"Failed to fetch social feed for {wallet_address}."}

    # Default response if message doesn't match yield rates or social feed
    else:
        openai_prompt = f"Summarize this message: {message}"
        
        print("sending to open AI: ", openai_prompt)
        openai_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Updated model
            messages=[
                {"role": "system", "content": "You are a helpful DeFi assistant."},
                {"role": "user", "content": openai_prompt},
            ],
        )
        print("open ai response: ", openai_response.choices[0].message['content'].strip())
        return {"response": openai_response.choices[0].message['content'].strip()}
