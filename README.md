# DeFi AI Chatbot

DeFi AI Chatbot is an interactive AI-powered assistant designed to help users interact with decentralized finance (DeFi) data. The chatbot provides real-time information on yield rates, social feeds, and historical price data from various DeFi sources. It leverages the power of OpenAI's GPT model, DeFiLlama APIs, RSS3 APIs, and custom services to deliver accurate responses and analysis based on user inputs.

## High-Level Overview

This system consists of a frontend and backend:

### Frontend
- Built with **Next.js** and **React**.
- Provides an interactive UI for users to chat with the AI assistant.
- Implements message streaming, ensuring responses are progressively updated.
- Displays responses such as yield rates, social feeds, and historical price data.
  
### Backend
- Built using **FastAPI**.
- Handles API requests, processes user messages, and streams responses.
- Leverages OpenAI's GPT models for natural language processing and decision-making.
- Integrates with DeFiLlama to fetch yield rates, RSS3 for social feed data, and other services for historical price information.

## Features

1. **Yield Rate Lookup**: The chatbot can return real-time yield rates for different DeFi tokens.
2. **Social Feed Monitoring**: Get the latest updates from the DeFi social feed for a specific wallet.
3. **Historical Price Data**: Fetch and visualize historical price data for various tokens.
4. **Streaming Responses**: The chatbot streams responses in real-time, improving the user experience by progressively updating the interface as data becomes available.

## Project Structure

- **Frontend**: React and Next.js-based UI for chatting with the AI assistant.
- **Backend**: FastAPI backend that handles requests and integrates with third-party APIs for DeFi data.

## Requirements

- Node.js (v16+)
- Python (v3.8+)
- OpenAI API Key
- DeFiLlama API
- RSS3 API

## How to Set Up Locally

### Prerequisites

Ensure you have the following installed:

1. **Node.js** (v16 or higher)
2. **Python** (v3.8 or higher)
3. **OpenAI API Key**: You will need an API key from OpenAI to use GPT models.
4. **DeFiLlama API Access** (public endpoint)
5. **RSS3 API Access** (public endpoint)

### Backend Setup

1. Clone the repository:
```bash
git clone [https://github.com/nickopicz/fungi-assessment.git]
cd fungi-assessment/backend
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate
```

3. Install the required dependencies:
```bash
pip install -r requirements.txt
```

4. Create a **.env** file in the **backend** directory to store your OpenAI API key and your Crypto Compare key, with names "OPENAI_API_KEY" and "CRYPTO_API_KEY" respectively.

5. Run the FastAPI server:
```bash
uvicorn app.main:app --reload
```


### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ../frontend
```

2. Install the required dependencies:
```bash
npm install
```

3. Run the Next.js development server:
```bash
npm run dev
```
The frontend will now be running at ***http://localhost:3000***

























