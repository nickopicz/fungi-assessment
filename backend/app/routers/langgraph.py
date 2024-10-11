from fastapi import APIRouter
from app.routers import defillama, rss3

router = APIRouter()

# Include your nodes as part of LangGraph structure
router.include_router(defillama.router, prefix="/defillama")
router.include_router(rss3.router, prefix="/rss3")

@router.get("/query-graph")
async def query_graph():
    return {"message": "LangGraph is operational"}
