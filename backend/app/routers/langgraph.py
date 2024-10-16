from app.services.defi_service import get_yield_rates
from app.services.value_service import get_historical_data, plot_data
from app.services.social_feed_service import get_social_feed
from app.services.openai_service import summarize_message_stream, get_openai_project_name, get_token_name, decide_request_type, get_limit
from app.services.price_service import get_coin_price  # Import the new coin price service
from fastapi import APIRouter, HTTPException
import logging

router = APIRouter()

async def build_langgraph(message: str):
    try:
        # Determine the request type (e.g., yields, social feed, historical prices, unrelated, coin prices)
        request_type = decide_request_type(message)
        print("Request type: ", request_type)

        # Handle different request types
        if "yields" in request_type:
            try:
                project_name = get_openai_project_name(message)  # NLP tool for getting DeFi project name
                yield_rates = get_yield_rates(project_name)  # DeFiLlama API tool for retrieving yield rates
                return summarize_message_stream(f"Yield rates for {project_name}", yield_rates)  # OpenAI summarizer
            except Exception as e:
                logging.error(f"Error fetching yield rates: {e}")
                raise HTTPException(status_code=500, detail="Error fetching yield rates.")

        elif "social feed" in request_type:
            try:
                wallet_address = "example_wallet"
                social_feed = get_social_feed(wallet_address)  # RSS3 API for retrieving social activity on the blockchain
                return summarize_message_stream(f"Describe this action from the DeFi social feed for {social_feed}")  # OpenAI summarizer
            except Exception as e:
                logging.error(f"Error fetching social feed: {e}")
                raise HTTPException(status_code=500, detail="Error fetching social feed.")

        elif "historical prices" in request_type:
            try:
                token_id = get_token_name(message) 
                limit = int(get_limit(message))
                print("limit after conversion: ", limit)
                if not isinstance(limit, int):
                    limit = 90
                # Extract the token from the message
                values = get_historical_data(token_id, limit)  # Fetch historical price data
                base64_img = plot_data(values, token_id)  # Plot the price data and return base64 string
                return f"data:image/png;base64,{base64_img}"  # Return the image in base64
            except Exception as e:
                logging.error(f"Error fetching historical prices: {e}")
                raise HTTPException(status_code=500, detail="Error fetching historical prices.")

        elif "coin price" in request_type:  # New request type for cryptocurrency prices
            try:
                token_name = get_token_name(message)  # Extract the token name from the message (e.g., BTC, ETH)
                price_data = get_coin_price(token_name)  # Fetch the price of the given coin
                return summarize_message_stream(f"Give some insights on the price of {token_name} which is: {price_data}")  # Return the price info
            except Exception as e:
                logging.error(f"Error fetching coin prices: {e}")
                raise HTTPException(status_code=500, detail="Error fetching coin prices.")

        else:
            try:
                return summarize_message_stream(message)  # Fallback using OpenAI prompter
            except Exception as e:
                logging.error(f"Error summarizing message: {e}")
                raise HTTPException(status_code=500, detail="Error processing your request.")

    except Exception as e:
        logging.error(f"Error determining request type: {e}")
        raise HTTPException(status_code=400, detail="Unable to determine request type.")
