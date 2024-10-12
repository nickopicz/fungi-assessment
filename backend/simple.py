import openai
import os

# Replace with your actual OpenAI API key
openai.api_key = "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"


# Define a simple prompt to test the API
prompt = "Tell me a fun fact about space."

try:
    # Make the API call to OpenAI using the chat completion endpoint
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
        max_tokens=50  # Limit the response length to 50 tokens
    )

    # Print the response
    print("OpenAI Response: ", response.choices[0].message['content'].strip())

except openai.error.OpenAIError as e:
    # Handle errors such as rate limits or invalid API keys
    print(f"Error: {str(e)}")
