from app.services.defi_service import get_yield_rates
from app.services.social_feed_service import get_social_feed
from app.services.openai_service import summarize_message, get_openai_project_name
from fastapi import APIRouter

router = APIRouter()

def build_langgraph(message: str):
    # Node 1: Decide which API to use based on the message
    if "yield rates" in message:
        project_name = get_openai_project_name(message)  # Node 2: NLP tool
        yield_rates = get_yield_rates(project_name)  # Node 3: DeFiLlama API tool
        result = summarize_message(f"Yield rates for {project_name}", yield_rates)  # Node 4: OpenAI API tool
    elif "social feed" in message:
        wallet_address = extract_wallet_from_message(message)  # Node 2: NLP tool
        social_feed = get_social_feed(wallet_address)  # Node 3: RSS3 API tool
        result = summarize_message(f"Social feed for {wallet_address}", social_feed)  # Node 4: OpenAI API tool
    else:
        result = summarize_message(message)  # Fallback node using OpenAI
    
    return result
