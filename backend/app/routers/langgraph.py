from app.services.defi_service import get_yield_rates
from app.services.price_service import get_historical_data, plot_data
from app.services.social_feed_service import get_social_feed
from app.services.openai_service import summarize_message_stream, get_openai_project_name, get_token_name, decide_request_type
from fastapi import APIRouter, HTTPException
import logging

router = APIRouter()

async def build_langgraph(message: str):
    try:
        # Determine the request type (e.g., yields, social feed, historical prices, unrelated)
        request_type = decide_request_type(message)
        print("Request type: ", request_type)

        # Handle different request types
        if "yields" in request_type:
            try:
                project_name = get_openai_project_name(message)  # NLP tool
                yield_rates = get_yield_rates(project_name)  # DeFiLlama API tool
                return summarize_message_stream(f"Yield rates for {project_name}", yield_rates)  # OpenAI API tool
            except Exception as e:
                logging.error(f"Error fetching yield rates: {e}")
                raise HTTPException(status_code=500, detail="Error fetching yield rates.")

        elif "social feed" in request_type:
            try:
                wallet_address = "example_wallet"
                social_feed = get_social_feed(wallet_address)  # RSS3 API tool
                return summarize_message_stream(f"Describe this action from the DeFi social feed for {social_feed}")  # OpenAI API tool
            except Exception as e:
                logging.error(f"Error fetching social feed: {e}")
                raise HTTPException(status_code=500, detail="Error fetching social feed.")

        elif "historical prices" in request_type:
            try:
                token_id = get_token_name(message)  # Extract the token from the message
                prices = get_historical_data(token_id)  # Fetch historical price data
                base64_img = plot_data(prices, token_id)  # Plot the price data and return base64 string
                return f"data:image/png;base64,{base64_img}"  # Return the image
            except Exception as e:
                logging.error(f"Error fetching historical prices: {e}")
                raise HTTPException(status_code=500, detail="Error fetching historical prices.")

        else:
            try:
                return summarize_message_stream(message)  # Fallback using OpenAI
            except Exception as e:
                logging.error(f"Error summarizing message: {e}")
                raise HTTPException(status_code=500, detail="Error processing your request.")

    except Exception as e:
        logging.error(f"Error determining request type: {e}")
        raise HTTPException(status_code=400, detail="Unable to determine request type.")
