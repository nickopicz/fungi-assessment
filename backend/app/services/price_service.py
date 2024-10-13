import requests
import matplotlib.pyplot as plt
import io
import base64
import pandas as pd
import time

# Function to convert date to UNIX timestamp
def get_unix_timestamp(days_ago: int):
    return int(time.time()) - (days_ago * 24 * 60 * 60)

# Function to fetch historical prices from CoinGecko API using the correct endpoint
def get_historical_prices(token_id: str, days: int = 180):
    # Get the UNIX timestamps for 'from' and 'to' date range
    to_timestamp = int(time.time())  # Current timestamp
    from_timestamp = get_unix_timestamp(days)  # Timestamp from X days ago
    
    # URL for the range endpoint
    url = f"https://pro-api.coingecko.com/api/v3/coins/{token_id}/market_chart/range"
    params = {
        'a'
        'vs_currency': 'usd',
        'from': from_timestamp,
        'to': to_timestamp
    }
    
    response = requests.get(url, params=params)
    data = response.json()
    
    # Extract prices (timestamp, price)
    prices = data.get('prices', [])
    print("data: ", data)

    return prices

# Function to plot the historical high prices and return base64 image
def plot_price_data(prices):
    # Extract timestamps and high prices
    timestamps = [price[0] for price in prices]
    high_prices = [price[1] for price in prices]
    
    print("prices: ", prices)
    # Convert timestamps to readable dates
    dates = [pd.to_datetime(ts, unit='ms').date() for ts in timestamps]

    # Plot the data using Matplotlib
    plt.figure(figsize=(10, 5))
    plt.plot(dates, high_prices, label='High Prices (USD)')
    plt.xlabel('Date')
    plt.ylabel('Price (USD)')
    plt.title('Historical High Prices Over Last 6 Months')
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
