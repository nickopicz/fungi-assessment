import requests

def get_social_feed(wallet_address: str):
    try:
        url = f"https://api.rss3.io/v1/wallets/{wallet_address}/social-feeds"
        headers = {
            "Authorization": "Bearer YOUR_RSS3_API_KEY"
        }
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return response.json()
        
    except:
        return {"error": f"Failed to fetch social feed for {wallet_address}"}
