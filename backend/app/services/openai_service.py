import openai
import os

# Load API key for OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

def get_openai_project_name(message: str) -> str:
    prompt = f"In one word, return just the name of the DeFi project mentioned in this message: {message}"
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful DeFi assistant."},
            {"role": "user", "content": prompt},
        ],
    )
    return response.choices[0].message['content'].strip()


def get_token_name(message: str) -> str:
    prompt = f"In only one word as the response, return the abbreviation of the crypto currency: {message}"
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful DeFi assistant."},
            {"role": "user", "content": prompt},
        ],
    )
    return response.choices[0].message['content'].strip()

async def summarize_message_stream(message: str, project_info: dict = None):
    if project_info:
        prompt = f"Answer this question '{message}', and describe the requested data: {project_info}"
    else:
        prompt = f"{message}"

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful DeFi assistant."},
            {"role": "user", "content": prompt},
        ],
        stream=True  # Enable streaming
    )

    # Stream the tokens as they are generated
    for chunk in response:
        content = chunk['choices'][0].get('delta', {}).get('content', '')
        if content:
            yield content


def decide_request_type(message: str):
    print("attempting to get request type:")
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful DeFi assistant, answer the question with one of the following that best describes the request: [yields, social feed, historical prices, unrelated]"},
                {"role": "user", "content": f"Pick one of the descriptors: [yields, social feed, historical prices, unrelated] for this prompt: {message}"},  # Using f-string here
            ],
        )
        print("message type: ", response.choices[0].message['content'].strip())
        return response.choices[0].message['content'].strip()
    except Exception as e:
        print("Error:", str(e))
        return None
    

