from fastapi import FastAPI
from app.routers import langgraph

app = FastAPI()

app.include_router(langgraph.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the DeFi AI Backend!"}
