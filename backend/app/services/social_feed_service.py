import requests



def get_social_feed(wallet_address: str):
    try:
        url = f"https://gi.rss3.io/decentralized/0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
        # headers = {
        #     "Authorization": "Bearer YOUR_RSS3_API_KEY"
        # }
        response = requests.get(url)
        
        print("response: ", response.json())
        if response.status_code == 200:
            return response.json()['data'][0]
        else:
            return None
    except:
        return {"error": f"Failed to fetch social feed for {wallet_address}"}
