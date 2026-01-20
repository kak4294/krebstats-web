"""
RIT Basketball Statistics API
FastAPI backend for serving basketball statistics from custom SQL queries
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from typing import Optional
import os

from queries import RITStatsQueries
from query_executor import QueryExecutor

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="RIT Basketball Statistics API",
    description="API for serving RIT Men's and Women's Basketball statistics",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://krebstats.com",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================== HEALTH CHECK ====================

@app.get("/", tags=["Health"])
async def root():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "RIT Basketball Statistics API",
        "version": "1.0.0"
    }


# ==================== TEAM OFFENSIVE EFFICIENCY ====================

@app.get("/api/stats/{gender}/teams/offensive-efficiency", tags=["Team Statistics"])
async def get_team_offensive_efficiency(
    gender: str,
    include_percentiles: bool = Query(True, description="Include percentile ranking columns"),
    play_types: Optional[str] = Query(None, description="Comma-separated play types (e.g., 'Transition,PickAndRoll')"),
    team: Optional[str] = Query(None, description="Filter by team name"),
    order_by: str = Query("PLAY_COUNT", description="Column to sort by"),
    order_direction: str = Query("DESC", description="ASC or DESC"),
    limit: Optional[int] = Query(None, ge=1, le=500, description="Max rows")
):
    """
    Team offensive efficiency by play type with dynamic filtering.
    
    - **include_percentiles**: Toggle percentile columns on/off
    - **play_types**: Filter by specific play types (comma-separated)
    - **team**: Filter by team name
    - **order_by**: Sort column
    - **order_direction**: ASC or DESC
    """
    if gender not in ["mens", "womens"]:
        raise HTTPException(status_code=400, detail="Gender must be 'mens' or 'womens'")
    
    if order_direction.upper() not in ["ASC", "DESC"]:
        raise HTTPException(status_code=400, detail="order_direction must be 'ASC' or 'DESC'")
    
    try:
        executor = QueryExecutor(gender)
        play_types_list = [pt.strip() for pt in play_types.split(",")] if play_types else None
        
        data = executor.execute_team_offensive_efficiency(
            include_percentiles=include_percentiles,
            play_types=play_types_list,
            team_filter=team,
            order_by=order_by,
            order_direction=order_direction.upper(),
            limit=limit
        )
        
        return {
            "success": True,
            "gender": gender,
            "query": "team-offensive-efficiency",
            "filters": {
                "include_percentiles": include_percentiles,
                "play_types": play_types_list,
                "team": team,
                "order_by": order_by,
                "order_direction": order_direction.upper(),
                "limit": limit
            },
            "row_count": len(data),
            "data": data
        }
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==================== METADATA ====================

@app.get("/api/stats/{gender}/metadata/play-types", tags=["Metadata"])
async def get_available_play_types(gender: str):
    """Get available play types for filtering."""
    if gender not in ["mens", "womens"]:
        raise HTTPException(status_code=400, detail="Gender must be 'mens' or 'womens'")
    
    try:
        executor = QueryExecutor(gender)
        return {
            "success": True,
            "gender": gender,
            "play_types": executor.get_available_play_types()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/stats/{gender}/metadata/teams", tags=["Metadata"])
async def get_available_teams_list(gender: str):
    """Get available teams for filtering."""
    if gender not in ["mens", "womens"]:
        raise HTTPException(status_code=400, detail="Gender must be 'mens' or 'womens'")
    
    try:
        executor = QueryExecutor(gender)
        return {
            "success": True,
            "gender": gender,
            "teams": executor.get_available_teams()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/stats/{gender}/metadata/tables", tags=["Metadata"])
async def get_available_tables(gender: str):
    """Get available database tables."""
    if gender not in ["mens", "womens"]:
        raise HTTPException(status_code=400, detail="Gender must be 'mens' or 'womens'")
    
    try:
        queries = RITStatsQueries(gender)
        return {
            "success": True,
            "gender": gender,
            "tables": queries.get_available_tables()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==================== RUN SERVER ====================

if __name__ == "__main__":
    import uvicorn
    
    host = os.getenv("API_HOST", "0.0.0.0")
    port = int(os.getenv("API_PORT", 8000))
    debug = os.getenv("DEBUG", "True").lower() == "true"
    
    uvicorn.run("main:app", host=host, port=port, reload=debug)
