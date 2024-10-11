import requests
from fastapi import APIRouter

router = APIRouter()

@router.get("/defillama-yield-rates")
async def get_yield_rates():
    url = "https://api.llama.fi/yields"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return {"error": "Failed to fetch yield rates"}
