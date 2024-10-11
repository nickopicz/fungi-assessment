import requests
from fastapi import APIRouter

router = APIRouter()

@router.get("/rss3-social-feed/{wallet_address}")
async def get_social_feed(wallet_address: str):
    url = f"https://api.rss3.io/v1/wallets/{wallet_address}/social-feeds"
    headers = {
        "Authorization": "Bearer YOUR_RSS3_API_KEY"
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    return {"error": "Failed to fetch social feed"}
