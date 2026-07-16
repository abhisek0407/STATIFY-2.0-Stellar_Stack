from fastapi import FastAPI, HTTPException
import json
app=FastAPI()
@app.get("/api/v1/matches")
def get_matches():
    return {
        "message": "Endpoint under development."
    }

@app.post("/api/v1/analyze")
def analyze():
    return {       
    "status": "success",
    "message": "Analyze endpoint is under development."
    }

@app.post("/api/v1/chat")
def chat():
    return{
        "message": "Endpoint under development."
    }

@app.get("/api/v1/player/{player_id}")
def get_Player(player_id:int):
    return{
        "message": "Endpoint under development."
    }
