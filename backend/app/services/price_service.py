import requests
import matplotlib.pyplot as plt
import io
import base64
import pandas as pd
import time
import os

# Ensure the API key is retrieved from environment or hardcoded here for testing
api_key = os.getenv("CRYPTO_API_KEY") or "d59cde7463d08ea6ff638733477b9afd02c9b481f6518f1f6f4597b868774bb7"

# Function to convert date to UNIX timestamp
def get_unix_timestamp(days_ago: int):
    return int(time.time()) - (days_ago * 24 * 60 * 60)

# Function to fetch historical prices from CryptoCompare API
def get_historical_data(fsym: str, limit: int = 90, toTs: int = None):
    # URL for CryptoCompare blockchain historical data endpoint
    url = f"https://min-api.cryptocompare.com/data/blockchain/histo/day"
    
    # Parameters for the request
    params = {
        'fsym': fsym,
        'limit': limit,
        'toTs': toTs
    }

    # Headers with API key
    headers = {
        'authorization': f'Apikey {api_key}'
    }

    response = requests.get(url, params=params, headers=headers)
    
    # Check for a successful response
    if response.status_code == 200:
        data = response.json()['Data']['Data']
        print("data: ", data)
        return data
    else:
        print(f"Error: {response.status_code}, Message: {response.json().get('Message')}")
        return []

# Function to plot the historical data (e.g., average transaction value) and return base64 image
def plot_data(data, fsym):
    if not data:
        print("No data to plot.")
        return

    field='average_transaction_value'
    # Extract timestamps and chosen field data
    timestamps = [point['time'] for point in data]
    field_values = [point[field] for point in data]
    
    # Convert timestamps to readable dates
    dates = [pd.to_datetime(ts, unit='s').date() for ts in timestamps]

    # Plot the data using Matplotlib
    plt.figure(figsize=(10, 5))
    plt.plot(dates, field_values, label=f'{field.replace("_", " ").title()}')
    plt.xlabel('Date')
    plt.ylabel(f'{field.replace("_", " ").title()} of {fsym}')
    plt.title(f'Historical {field.replace("_", " ").title()}')
    plt.xticks(rotation=45)
    plt.tight_layout()

    # Save the plot to a BytesIO object
    img = io.BytesIO()
    plt.savefig(img, format='png')
    plt.close()

    # Encode the image to base64
    img.seek(0)
    base64_img = base64.b64encode(img.getvalue()).decode('utf-8')
    return base64_img
