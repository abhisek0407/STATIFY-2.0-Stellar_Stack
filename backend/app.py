from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
import json
from agent import process_chat
from tools import (
    get_matches,
    get_player_stats,
    get_weather,
    get_pitch_report
)
from schemas import ChatRequest, MatchListResponse
app=FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get(
    "/api/v1/matches",
    response_model=MatchListResponse,
    tags=["Matches"]
)
def matches():

    try:
        
        data = get_matches.invoke({})

        if not data.get("success", False):

            raise HTTPException(
                status_code=500,
                detail=data.get("message", "Unable to fetch matches.")
            )

        return data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@app.post("/api/v1/analyze")
def analyze():
    return {       
    "status": "success",
    "message": "Analyze endpoint is under development."
    }

@app.post("/api/v1/chat")
def chat(req: ChatRequest):

    answer = process_chat(
        req.session_id,
        req.message
    )

    return {
        "session_id": req.session_id,
        "response": answer
    }

@app.get("/api/v1/player/{player_name}")
def player(player_name:str):

    return get_player_stats.invoke(
        {"player_name":player_name}
    )