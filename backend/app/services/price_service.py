import requests
import os

api_key = os.getenv("CRYPTO_API_KEY")


def get_coin_price(symbol: str) -> dict:
    """
    Fetches the price of a given cryptocurrency in specified currencies from the CryptoCompare API.

    Args:
        symbol (str): The symbol of the cryptocurrency (e.g., 'BTC', 'ETH').
        currencies (str): A comma-separated string of target currencies (e.g., 'USD,EUR,JPY').

    Returns:
        dict: A dictionary containing the price of the cryptocurrency in the specified currencies, or an error message.
    """
    # Base URL for the CryptoCompare price API
    url = f"https://min-api.cryptocompare.com/data/price"
    
    # Define the request parameters
    params = {
        'fsym': symbol.upper(),  # The symbol of the cryptocurrency
        'tsyms': ["USD"]       # The target currencies
    }
    headers = {
        'authorization': f'Apikey {api_key}'
    }

    try:  
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()  # Raise an exception for HTTP errors
        print(response.json())
        # Return the price data as a dictionary
        return response.json()

    except requests.exceptions.RequestException as e:
        # Handle any request exceptions and return an error message
        return {"error": str(e)}

