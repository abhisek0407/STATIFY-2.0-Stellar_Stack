from pydantic import BaseModel, Field,AnyUrl
from typing import List, Optional, Annotated,Literal
from datetime import date,time
class MatchResponse(BaseModel):
    match_id:Annotated[int, Field(description="Unique match identifier",examples=[101])]
    team1:Annotated[str,Field(description="Name of the first team", examples=["India"])]
    team2:Annotated[str,Field(description="Name of the Second team", examples=["England"])]
    series: Annotated[
    str,
    Field(
        description="Tournament or series name",
        examples=["India Tour of England 2026"]
    )
    ]
    match_type:Annotated[Literal['Test','ODI','T20','T10'],Field(description="Match Format")]
    venue:Annotated[str,Field(description="Venue of the match",examples=["Lord's, London"])]
    match_date: Annotated[date,Field(description="Date of the Match")]
    match_time:Annotated[str,Field(description="Scheduled start time of the match", examples=["7:30 PM IST"])]
    team1_logo:Annotated[AnyUrl,Field(description="Logo URL of team1")]
    team2_logo:Annotated[AnyUrl,Field(description="Logo URL of team2")]
    status:Annotated[Literal['Upcoming','Live','Completed'],Field(description="Current match status")]

class MatchListResponse(BaseModel):
    matches: List[MatchResponse]
    
class AnalyzeRequest(BaseModel):
     match_id: Annotated[
        int,
        Field(
            description="Unique identifier of the selected match",
            examples=[101]
        )
    ]

class ChatRequest(BaseModel):
    session_id:Annotated[str,Field(description="Unique Identifier for the current fantasy team conversation")]
    message:Annotated[str,Field(description="User's query or instruction sent to the AI assistant")]

from uuid import UUID

class ChatResponse(BaseModel):
    session_id:Annotated[str,Field(description="Unique Identifier for the current fantasy team conversation",examples=["8a7fd34b-1122-45c1"])]
    response:Annotated[str,Field(description="Response from AI assistant to the user message",examples=[ "Virat Kohli has been replaced with Shubman Gill."])]

# ==========================================================
# RAG Context Schemas
# ==========================================================

class StadiumBase(BaseModel):
    name: str
    city: str
    country: Optional[str] = "India"
    batting_friendly: int = Field(..., ge=1, le=10)
    spin_friendly: int = Field(..., ge=1, le=10)
    pace_friendly: int = Field(..., ge=1, le=10)
    avg_first_innings_score: Optional[int] = None
    avg_score_range_min: Optional[int] = None
    avg_score_range_max: Optional[int] = None
    dew_factor: str
    toss_advantage: str
    fantasy_picks: str

class StadiumStatisticsBase(BaseModel):
    matches_played: int
    average_first_innings_score: int
    highest_score: int
    lowest_score: int
    chasing_record_percent: float
    batting_first_win_percent: float
    bowling_first_win_percent: float

class WeatherConditionBase(BaseModel):
    condition_name: str
    effect_on_game: str
    batting_benefit: int = Field(..., ge=1, le=10)
    pace_benefit: int = Field(..., ge=1, le=10)
    spin_benefit: int = Field(..., ge=1, le=10)
    captain_choices: str
    players_to_avoid: str

class PlayerInjuryBase(BaseModel):
    injury_name: str
    common_effects: str
    suitable_decision: str
    fantasy_recommendation: str


class BattingStats(BaseModel):

    runs: Annotated[
        str,
        Field(
            description="Total runs scored",
            examples=["13911"]
        )
    ]

    average: Annotated[
        str,
        Field(
            description="Batting average",
            examples=["57.96"]
        )
    ]

    strike_rate: Annotated[
        str,
        Field(
            description="Batting strike rate",
            examples=["93.53"]
        )
    ]

    centuries: Annotated[
        Optional[str],
        Field(
            default=None,
            description="Total centuries",
            examples=["50"]
        )
    ]

    fifties: Annotated[
        Optional[str],
        Field(
            default=None,
            description="Total half-centuries",
            examples=["72"]
        )
    ]

class BowlingStats(BaseModel):

    wickets: Annotated[
        str,
        Field(
            description="Total wickets taken",
            examples=["5"]
        )
    ]

    economy: Annotated[
        str,
        Field(
            description="Bowling economy rate",
            examples=["6.16"]
        )
    ]

    average: Annotated[
        str,
        Field(
            description="Bowling average",
            examples=["136.0"]
        )
    ]

    strike_rate: Annotated[
        str,
        Field(
            description="Bowling strike rate",
            examples=["132.4"]
        )
    ]

    best_innings: Annotated[
        str,
        Field(
            description="Best bowling figures in an innings",
            examples=["1/13"]
        )
    ]

class CareerBattingStats(BaseModel):

    test: Annotated[
        BattingStats,
        Field(description="Career batting statistics in Test matches")
    ]

    odi: Annotated[
        BattingStats,
        Field(description="Career batting statistics in ODI matches")
    ]

    t20: Annotated[
        BattingStats,
        Field(description="Career batting statistics in T20 International matches")
    ]

    ipl: Annotated[
        BattingStats,
        Field(description="Career batting statistics in IPL")
    ]
class CareerBowlingStats(BaseModel):

    test: Annotated[
        BowlingStats,
        Field(description="Career bowling statistics in Test matches")
    ]

    odi: Annotated[
        BowlingStats,
        Field(description="Career bowling statistics in ODI matches")
    ]

    t20: Annotated[
        BowlingStats,
        Field(description="Career bowling statistics in T20 International matches")
    ]

    ipl: Annotated[
        BowlingStats,
        Field(description="Career bowling statistics in IPL")
    ]

class RecentForm(BaseModel):

    last_matches_fantasy_points: Annotated[
        List[int],
        Field(
            description="Fantasy points scored in the last 5-10 matches",
            examples=[[82, 96, 74, 101, 88]]
        )
    ]

    average_fantasy_points: Annotated[
        float,
        Field(
            description="Average fantasy points over recent matches",
            examples=[88.2]
        )
    ]
    recent_runs:List[int]
    recent_wickets:List[int]
class AIAnalysis(BaseModel):

    predicted_fantasy_score: Annotated[
        float,
        Field(
            description="Predicted fantasy score by the AI",
            examples=[94.5]
        )
    ]

    ai_confidence: Annotated[
        float,
        Field(
            description="Confidence score of the AI recommendation",
            examples=[95.2]
        )
    ]

    selection_reason: Annotated[
        List[str],
        Field(
            description="Reasons why the AI selected this player",
            examples=[[
                "Excellent recent form",
                "Outstanding record against England",
                "Batting-friendly pitch",
                "Confirmed in Playing XI"
            ]]
        )
    ]
class PlayerResponse(BaseModel):

    player_id: Annotated[
        int,
        Field(
            description="Unique player identifier",
            examples=[1]
        )
    ]

    name: Annotated[
        str,
        Field(
            description="Full name of the player",
            examples=["Virat Kohli"]
        )
    ]

    team: Annotated[
        str,
        Field(
            description="team represented by the player",
            examples=["India"]
        )
    ]

    role: Annotated[
        Literal["WK", "BAT", "AR", "BOWL"],
        Field(
            description="Primary playing role"
        )
    ]

    batting_style: Annotated[
        str,
        Field(
            description="Batting style",
            examples=["Right Handed Bat"]
        )
    ]

    bowling_style: Annotated[
        str,
        Field(
            description="Bowling style",
            examples=["Right-arm medium"]
        )
    ]

    image: Annotated[
        AnyUrl,
        Field(
            description="Player profile image URL"
        )
    ]

    credits: Annotated[
        float,
        Field(
            description="Fantasy credits assigned to the player",
            examples=[9.5]
        )
    ]

    recent_form: Annotated[
        RecentForm,
        Field(
            description="Recent fantasy performance"
        )
    ]

    ai_analysis: Annotated[
        AIAnalysis,
        Field(
            description="AI-generated analysis and recommendation"
        )
    ]

    batting_stats: Annotated[
        CareerBattingStats,
        Field(
            description="Complete career batting statistics"
        )
    ]

    bowling_stats: Annotated[
        CareerBowlingStats,
        Field(
            description="Complete career bowling statistics"
        )
    ]

class WeatherResponse(BaseModel):

    temperature: Annotated[
        float,
        Field(
            description="Current temperature in Celsius",
            examples=[28.5]
        )
    ]

    humidity: Annotated[
        int,
        Field(
            description="Current humidity percentage",
            examples=[72]
        )
    ]

    condition: Annotated[
        str,
        Field(
            description="Current weather condition",
            examples=["Cloudy"]
        )
    ]

    wind_speed: Annotated[
        float,
        Field(
            description="Wind speed in km/h",
            examples=[18.2]
        )
    ]
class PitchResponse(BaseModel):

    type: Annotated[
        str,
        Field(
            description="Pitch type",
            examples=["Batting Friendly"]
        )
    ]

    description: Annotated[
        str,
        Field(
            description="Pitch report generated from RAG",
            examples=[
                "The surface is expected to assist batters early while seamers may get movement under cloudy conditions."
            ]
        )
    ]
class FantasyPlayerResponse(BaseModel):

    player_id: Annotated[
        int,
        Field(
            description="Unique player identifier",
            examples=[1]
        )
    ]

    name: Annotated[
        str,
        Field(
            description="Player name",
            examples=["Virat Kohli"]
        )
    ]

    team: Annotated[
        str,
        Field(
            description="Team name",
            examples=["India"]
        )
    ]

    role: Annotated[
        Literal["WK", "BAT", "AR", "BOWL"],
        Field(
            description="Player role"
        )
    ]
    image:Annotated[AnyUrl,Field(description="Image URL of the player")]
    captain: Annotated[
        bool,
        Field(
            description="Captain of the fantasy team",
            examples=[True]
        )
    ]

    vice_captain: Annotated[
        bool,
        Field(
            description="Vice captain of the fantasy team",
            examples=[False]
        )
    ]
    captaincy_rating: Annotated[
        Optional[float],
        Field(default=None, description="Rating from 1-10 on ceiling/captaincy potential")
    ]
    risk_profile: Annotated[
        Optional[str],
        Field(default=None, description="Risk profile, e.g. 'Consistent' or 'Explosive'")
    ]
    scarcity_bump_applied: Annotated[
        Optional[bool],
        Field(default=False, description="Whether VORP scarcity bump was applied")
    ]
    tags: Annotated[
        Optional[List[str]],
        Field(default=[], description="Tactical synergy tags like '[Death Bowler]'")
    ]
    cumulative_score: Annotated[
        Optional[float],
        Field(default=None, description="The final fantasy score from the Secret Recipe algorithm")
    ]
class AnalyzeResponse(BaseModel):

    session_id: Annotated[
        str,
        Field(
            description="Unique conversation session identifier",
            examples=[
                "8a7fd34b-1122-45c1-9a2e-98a4d5f6b7c8"
            ]
        )
    ]

    match: Annotated[
        MatchResponse,
        Field(
            description="Selected match information"
        )
    ]

    weather: Annotated[
        WeatherResponse,
        Field(
            description="Current weather details"
        )
    ]

    pitch: Annotated[
        PitchResponse,
        Field(
            description="Pitch report"
        )
    ]

    fantasy_team: Annotated[
        List[FantasyPlayerResponse],
        Field(
            description="Generated Fantasy Playing XI"
        )
    ]

    predicted_fantasy_score: Annotated[
        float,
        Field(
            description="Predicted fantasy score for the generated team",
            examples=[948.6]
        )
    ]

    ai_confidence: Annotated[
        float,
        Field(
            description="AI confidence score",
            examples=[95.4]
        )
    ]
    summary: Annotated[
    str,
    Field(
        description="Overall AI explanation of the generated fantasy team."
    )
]