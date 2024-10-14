from app.services.defi_service import get_yield_rates
from app.services.price_service import get_historical_data, plot_data
from app.services.social_feed_service import get_social_feed
from app.services.openai_service import summarize_message_stream, get_openai_project_name, get_token_name
from fastapi import APIRouter

router = APIRouter()

async def build_langgraph(message: str):
    # Node 1: Decide which API to use based on the message
    if "yield rates" in message:
        project_name = get_openai_project_name(message)  # Node 2: NLP tool
        yield_rates = get_yield_rates(project_name)  # Node 3: DeFiLlama API tool
        return summarize_message_stream(f"Yield rates for {project_name}", yield_rates)  # Node 4: OpenAI API tool
    
    elif "social feed" in message:
        wallet_address = "example_wallet"
        social_feed = get_social_feed(wallet_address)  # Node 3: RSS3 API tool
        return summarize_message_stream(f"Describe this action from the DeFi social feed for {social_feed}")  # Node 4: OpenAI API tool
    
    elif "historical" in message:
        token_id = get_token_name(message)  # Extract the token from the message
        prices = get_historical_data(token_id)  # Fetch historical price data
        base64_img = plot_data(prices, token_id)  # Plot the price data and return base64 string
        return f"data:image/png;base64,{base64_img}"  # Node 5: Graph tool
    
    else:
        return summarize_message_stream(message)  # Fallback node using OpenAI

