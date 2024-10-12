import requests
from app.helpers.utils import find_project_data

def get_yield_rates(project_name):
    yield_rates_url = "https://yields.llama.fi/pools"
    response = requests.get(yield_rates_url)

    if response.status_code == 200:
        yield_rates_obj = response.json()
        yield_rates = yield_rates_obj.get('data', [])
        project_info = find_project_data(yield_rates, project_name)
        return project_info

    return None
