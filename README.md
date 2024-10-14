# DeFi Assessment Project

This project is a DeFi (Decentralized Finance) assessment tool that combines frontend and backend services to provide information on DeFi yield rates, historical token prices, and social feeds. It leverages APIs, data visualization, and AI summarization to give users a complete analysis of the DeFi ecosystem.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)

## Project Overview

The project is divided into two main components:
- **Backend**: Handles API requests and provides processed data such as yield rates, token prices, and summaries using NLP.
- **Frontend**: A React-based UI that allows users to interact with the backend and visualize the data, including token price graphs and DeFi statistics.

## Features
- Retrieve **DeFi Yield Rates** from the DeFiLlama API.
- Fetch and visualize **historical token prices**.
- Analyze DeFi **social feeds**.
- Generate summaries for all actions using **OpenAI**'s language model.
- Plot historical data graphs and return them as base64 images.

## Tech Stack
### Backend:
- **FastAPI**: The backend framework to create APIs and handle requests.
- **Python**: Core language for backend services.
- **Matplotlib**: For generating token price graphs.
- **Pandas**: For handling and processing time-series data.
- **DeFiLlama API**: Fetching DeFi yield rates and historical data.
- **RSS3 API**: Fetching social feed data.
- **OpenAI API**: Summarizing responses and understanding user messages via NLP.

### Frontend:
- **React**: User interface for interacting with the backend.
- **Next.js**: React framework for server-side rendering.
- **Tailwind CSS**: For styling the frontend components.
- **Lottie**: To integrate animations into the UI.
- **Redux**: Managing global state and loading status.
