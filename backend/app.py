from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
from agent import process_chat,process_analyze
from tools import (
    get_matches,
    get_player_stats,
    get_weather,
    get_pitch_report
)
from schemas import ChatRequest,ChatResponse, MatchListResponse,PlayerResponse,AnalyzeRequest,AnalyzeResponse
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

@app.post(
    "/api/v1/analyze",
    response_model=AnalyzeResponse,
    tags=["Analyze"]
)
def analyze(req: AnalyzeRequest):

    try:

        data = process_analyze(req.match_id)

        return data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@app.post(
    "/api/v1/chat",
    response_model=ChatResponse,
    tags=["Chat"]
)
def chat(req: ChatRequest):

    try:

        answer = process_chat(
            req.session_id,
            req.message
        )

        return {
            "session_id": req.session_id,
            "response": answer
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@app.get(
    "/api/v1/player/{player_id}",
    response_model=PlayerResponse,
    tags=["Player"]
)
def player(
    player_id: str,
    match_id: str
):

    try:

        data = get_player_stats.invoke(
            {
                "player_id": player_id,
                "match_id": match_id
            }
        )

        if not data.get("success", False):
            raise HTTPException(
                status_code=404,
                detail=data.get("message", "Player not found")
            )

        return data

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )