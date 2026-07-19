from langchain_core.tools import tool
import os
import requests
from dotenv import load_dotenv
from ddgs import DDGS
from typing import Dict, List, Any, Optional


load_dotenv()

CRIC_API_KEY = os.getenv("CRIC_API_KEY")
BASE_URL = "https://api.cricapi.com/v1"
HEADERS = {
    "User-Agent": "Mozilla/5.0"
}


def make_request(
    url: str,
    params: Optional[dict] = None,
    timeout: int = 15
) -> Dict[str, Any]:
    """
    Generic GET request helper.
    """

    try:
        response = requests.get(
            url,
            params=params,
            headers=HEADERS,
            timeout=timeout
        )
        response.raise_for_status()
        return response.json()

    except requests.exceptions.Timeout:
        return {
            "success": False,
            "error": "Request timed out."
        }
    
    except requests.exceptions.RequestException as e:
        return {
            "success": False,
            "error": str(e)
        }


def analyze_sentiment(text: str) -> str:
    """
    Very lightweight sentiment detector.
    """

    text = str(text).lower()

    bullish_words = [
        "win",
        "wins",
        "excellent",
        "great",
        "good",
        "record",
        "century",
        "victory",
        "fit",
        "available",
        "dominant",
        "strong"
    ]

    bearish_words = [
        "injury",
        "injured",
        "ruled out",
        "loss",
        "poor",
        "collapse",
        "defeat",
        "miss",
        "doubt",
        "surgery",
        "ban"
    ]

    for word in bullish_words:
        if word in text:
            return "Bullish"

    for word in bearish_words:
        if word in text:
            return "Bearish"

    return "Neutral"



def extract_stat(
    stats: List[dict],
    fn: str,
    matchtype: str,
    stat_name: str
):
    """
    Extract a statistic from CricAPI response.
    """

    for item in stats:

        if (
            item.get("fn", "").strip().lower() == fn.lower()
            and item.get("matchtype", "").strip().lower() == matchtype.lower()
            and item.get("stat", "").strip().lower() == stat_name.lower()
        ):

            return item.get("value")

    return None

# part-2
#player stats


def search_player(player_name: str) -> Optional[str]:
    """
    Search a player by name and return the CricAPI player ID.
    """

    if not CRIC_API_KEY:
        return None

    url = f"{BASE_URL}/players"

    params = {
        "apikey": CRIC_API_KEY,
        "offset": 0,
        "search": player_name
    }

    data = make_request(url, params)

    if not data or "data" not in data:
        return None

    players = data["data"]

    if not players:
        return None

    for player in players:
        if player.get("name", "").strip().lower() == player_name.strip().lower():
            return player["id"]

    return players[0]["id"]


@tool
def get_player_stats(player_name: str) -> Dict[str, Any]:
    """
    Fetch player statistics from CricAPI.
    """

    if not CRIC_API_KEY:
        return {
            "success": False,
            "message": "CRIC_API_KEY not found."
        }

    player_id = search_player(player_name)

    if player_id is None:
        return {
            "success": False,
            "message": "Player not found."
        }

    url = f"{BASE_URL}/players_info"

    params = {
        "apikey": CRIC_API_KEY,
        "id": player_id
    }

    data = make_request(url, params)

    if not data.get("success", True):
        return data

    if "data" not in data:
        return {
            "success": False,
            "message": "Unable to fetch player information."
        }

    player = data["data"]
    stats = player.get("stats", [])

    def batting_stats(fmt):
        return {
            "runs": extract_stat(stats, "batting", fmt, "runs"),
            "average": extract_stat(stats, "batting", fmt, "avg"),
            "strike_rate": extract_stat(stats, "batting", fmt, "sr"),
            "centuries": extract_stat(stats, "batting", fmt, "100s"),
            "fifties": extract_stat(stats, "batting", fmt, "50s"),
        }

    def bowling_stats(fmt):
        return {
            "wickets": extract_stat(stats, "bowling", fmt, "wkts"),
            "economy": extract_stat(stats, "bowling", fmt, "econ"),
            "average": extract_stat(stats, "bowling", fmt, "avg"),
            "strike_rate": extract_stat(stats, "bowling", fmt, "sr"),
            "best_innings": extract_stat(stats, "bowling", fmt, "bbi"),
        }

    role_map = {
        "wicketkeeper": "WK",
        "keeper": "WK",
        "batsman": "BAT",
        "batter": "BAT",
        "allrounder": "AR",
        "all-rounder": "AR",
        "bowler": "BOWL"
    }

    role = str(player.get("role", "")).lower()
    fantasy_role = role_map.get(role, "BAT")

    return {
        "success": True,

        "player_id": player.get("id"),
        "name": player.get("name"),

        # CricAPI doesn't expose current team consistently.
        "team": player.get("country"),

        "role": fantasy_role,

        "batting_style": player.get("battingStyle"),

        "bowling_style": player.get("bowlingStyle"),

        "image": player.get("playerImg"),

        # Placeholder for Member 1 / AI module
        "credits": None,
        "recent_form": None,
        "ai_analysis": None,

        "batting_stats": {
            "test": batting_stats("test"),
            "odi": batting_stats("odi"),
            "t20": batting_stats("t20"),
            "ipl": batting_stats("ipl"),
        },

        "bowling_stats": {
            "test": bowling_stats("test"),
            "odi": bowling_stats("odi"),
            "t20": bowling_stats("t20"),
            "ipl": bowling_stats("ipl"),
        }
    }


@tool
def get_match_fantasy_performance(
    match_id: str,
    ruleset: int = 0
) -> Dict[str, Any]:
    """
    Fetch fantasy performance of every player in a match.

    Batting and bowling fantasy points are merged into a
    single total score for each player.
    """

    if not CRIC_API_KEY:
        return {
            "success": False,
            "message": "CRIC_API_KEY not found."
        }

    url = f"{BASE_URL}/match_points"

    params = {
        "apikey": CRIC_API_KEY,
        "id": match_id,
        "ruleset": ruleset
    }

    data = make_request(url, params)

    if not data.get("success", True):
        return data

    if "data" not in data:
        return {
            "success": False,
            "message": "Unable to fetch fantasy match points."
        }

    player_points = {}

    innings = data["data"].get("innings", [])

    for inning in innings:
        inning_name = inning.get("inning", "")

        for batter in inning.get("batting", []):

            pid = batter.get("id")
            if pid not in player_points:

                player_points[pid] = {
                    "player_id": pid,
                    "player_name": batter.get("name"),
                    "innings": set(),
                    "batting_points": 0,
                    "bowling_points": 0,
                    "total_points": 0
                }

            points = batter.get("points", 0) or 0

            player_points[pid]["innings"].add(inning_name)

            player_points[pid]["batting_points"] += points

            player_points[pid]["total_points"] += points

        for bowler in inning.get("bowling", []):

            pid = bowler.get("id")

            if pid not in player_points:

                player_points[pid] = {
                    "player_id": pid,
                    "player_name": bowler.get("name"),
                    "innings": set(),
                    "batting_points": 0,
                    "bowling_points": 0,
                    "total_points": 0
                }

            points = bowler.get("points", 0) or 0

            player_points[pid]["innings"].add(inning_name)

            player_points[pid]["bowling_points"] += points

            player_points[pid]["total_points"] += points

    performances = []

    for player in player_points.values():

        performances.append({
            "player_id": player["player_id"],
            "player_name": player["player_name"],
            "innings": sorted(list(player["innings"])),
            "batting_points": player["batting_points"],
            "bowling_points": player["bowling_points"],
            "total_points": player["total_points"]
        })

    performances.sort(
        key=lambda x: x["total_points"],
        reverse=True
    )

    return {
        "success": True,
        "match_id": match_id,
        "ruleset": ruleset,
        "total_players": len(performances),
        "performances": performances
    }


VENUE_COORDINATES = {
    # India
    "Eden Gardens": (22.5646, 88.3433),
    "Wankhede Stadium": (18.9389, 72.8258),
    "M. Chinnaswamy Stadium": (12.9788, 77.5996),
    "Narendra Modi Stadium": (23.0917, 72.5976),
    "MA Chidambaram Stadium": (13.0628, 80.2792),
    "Rajiv Gandhi International Stadium": (17.4065, 78.5505),
    "Arun Jaitley Stadium": (28.6379, 77.2433),
    "Punjab Cricket Association IS Bindra Stadium": (30.6905, 76.7374),
    "Sawai Mansingh Stadium": (26.8940, 75.8038),
    "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium": (26.8128, 80.8997),

    # Australia
    "Perth Stadium": (-31.9505, 115.8605),
    "Melbourne Cricket Ground": (-37.8199, 144.9834),
    "MCG": (-37.8199, 144.9834),
    "Sydney Cricket Ground": (-33.8916, 151.2247),
    "Adelaide Oval": (-34.9154, 138.5961),
    "The Gabba": (-27.4858, 153.0381),

    # England
    "Lord's": (51.5290, -0.1722),
    "The Oval": (51.4839, -0.1140),
    "Old Trafford": (53.4631, -2.2913),
    "Headingley": (53.8177, -1.5824),
    "Edgbaston": (52.4558, -1.9026),

    # New Zealand
    "Eden Park": (-36.8748, 174.7444),

    # South Africa
    "Newlands": (-33.9700, 18.4689),

    # UAE
    "Dubai International Cricket Stadium": (25.0311, 55.2188),
}


def get_coordinates(venue: str) -> Optional[tuple[float, float]]:
    """
    Return coordinates for a cricket venue.

    Performs a case-insensitive partial match so that:
    'Eden Gardens, Kolkata'
    'Wankhede Stadium, Mumbai'
    etc. are also matched.
    """

    venue = venue.lower().strip()

    for stadium, coordinates in VENUE_COORDINATES.items():
        if stadium.lower() in venue:
            return coordinates

    return None



# WEATHER

@tool
def get_weather(venue: str) -> Dict[str, Any]:
    """
    Fetch current weather conditions for a cricket venue.
    """

    coords = get_coordinates(venue)

    if coords is None:
        return {
            "success": False,
            "message": f"Unknown venue: '{venue}'."
        }

    lat, lon = coords

    url = "https://api.open-meteo.com/v1/forecast"

    params = {
        "latitude": lat,
        "longitude": lon,
        "current": [
            "temperature_2m",
            "relative_humidity_2m",
            "precipitation",
            "wind_speed_10m",
            "weather_code"
        ]
    }

    data = make_request(url, params)

    if not data:
        return {
            "success": False,
            "message": "Unable to fetch weather information."
        }

    current = data.get("current", {})

    weather_codes = {
        0: "Clear Sky",
        1: "Mainly Clear",
        2: "Partly Cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing Rime Fog",
        51: "Light Drizzle",
        53: "Moderate Drizzle",
        55: "Dense Drizzle",
        61: "Light Rain",
        63: "Moderate Rain",
        65: "Heavy Rain",
        71: "Light Snow",
        73: "Moderate Snow",
        75: "Heavy Snow",
        80: "Rain Showers",
        81: "Moderate Rain Showers",
        82: "Violent Rain Showers",
        95: "Thunderstorm",
        96: "Thunderstorm with Hail",
        99: "Severe Thunderstorm with Hail"
    }

    return {
        "success": True,
        "venue": venue,
        "coordinates": {
            "latitude": lat,
            "longitude": lon
        },
        "weather": {
            "temperature": current.get("temperature_2m"),
            "humidity": current.get("relative_humidity_2m"),
            "rain": current.get("precipitation"),
            "wind_speed": current.get("wind_speed_10m"),
            "condition": weather_codes.get(
                current.get("weather_code"),
                "Unknown"
            )
        }
    }


#NEWS

@tool
def get_news(query: str, max_results: int = 5) -> Dict[str, Any]:
    """
    Fetch latest cricket news.
    """

    try:
        news = []

        with DDGS() as ddgs:
            results = ddgs.text(
                f"{query} cricket latest news",
                max_results=max_results
            )
            for article in results:
                title = article.get("title", "")
                summary = article.get("body", "")
                url = article.get("href", "")

                news.append({

                    "title": title,
                    "summary": summary,
                    "source": "DuckDuckGo",
                    "url": url,
                    "sentiment": analyze_sentiment(
                        title + " " + summary
                    )
                })

        return {
            "success": True,
            "query": query,
            "articles": news
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
    

# INJURY UPDATES
@tool
def get_injury_updates(player_or_team: str, max_results: int = 5) -> Dict[str, Any]:
    """
    Fetch latest injury updates for a player or team.
    """

    try:
        articles = []

        with DDGS() as ddgs:
            results = ddgs.text(
                f"{player_or_team} cricket injury latest news",
                max_results=max_results
            )
            for article in results:
                articles.append({
                    "title": article.get("title", ""),
                    "summary": article.get("body", ""),
                    "source": "DuckDuckGo",
                    "url": article.get("href", ""),
                    "sentiment": analyze_sentiment(
                        article.get("title", "") +
                        article.get("body", "")
                    )
                })

        return {
            "success": True,
            "query": player_or_team,
            "injuries": articles
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }



# PLAYER AVAILABILITY

@tool
def get_player_availability(player_or_team: str, max_results: int = 5) -> Dict[str, Any]:
    """
    Check whether a player is available for selection.
    """

    try:
        articles = []

        with DDGS() as ddgs:
            results = ddgs.text(
                f"{player_or_team} playing XI squad availability cricket",
                max_results=max_results
            )

            for article in results:
                articles.append({
                    "title": article.get("title", ""),
                    "summary": article.get("body", ""),
                    "source": "DuckDuckGo",
                    "url": article.get("href", ""),
                    "sentiment": analyze_sentiment(
                        article.get("title", "") +
                        article.get("body", "")
                    )
                })

        return {
            "success": True,
            "query": player_or_team,
            "availability": articles
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
    

# PITCH REPORT

@tool
def get_pitch_report(venue: str, max_results: int = 5) -> Dict[str, Any]:
    """
    Fetch latest pitch report.
    """
    try:
        reports = []

        with DDGS() as ddgs:
            results = ddgs.text(
                f"{venue} cricket pitch report",
                max_results=max_results
            )

            for article in results:
                reports.append({
                    "title": article.get("title", ""),
                    "summary": article.get("body", ""),
                    "source": "DuckDuckGo",
                    "url": article.get("href", ""),
                    "sentiment": analyze_sentiment(
                        article.get("title", "") +
                        article.get("body", "")
                    )
                })
        return {
            "success": True,
            "venue": venue,
            "reports": reports
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


# CURRENT MATCHES

@tool
def get_matches() -> Dict[str, Any]:
    """
    Fetch live and upcoming cricket matches.
    """

    if not CRIC_API_KEY:
        return {
            "success": False,
            "message": "CRIC_API_KEY not found."
        }

    DEFAULT_LOGO = "https://h.cricapi.com/img/icon512.png"

    def format_match(match: Dict[str, Any], status: str) -> Dict[str, Any]:

        teams = match.get("teams", [])
        team_info = match.get("teamInfo", [])
        name = match.get("name", "")

        # ---------------- TEAM NAMES ---------------- #

        team1 = teams[0] if len(teams) > 0 else None
        team2 = teams[1] if len(teams) > 1 else None

        if team1 and team1.lower() == "tbc":
            team1 = "TBD"

        if team2 and team2.lower() == "tbc":
            team2 = "TBD"

        # ---------------- TEAM LOGOS ---------------- #

        logo_map = {
            info.get("name"): info.get("img")
            for info in team_info
        }

        team1_logo = logo_map.get(team1, DEFAULT_LOGO)
        team2_logo = logo_map.get(team2, DEFAULT_LOGO)

        # ---------------- SERIES ---------------- #

        series = match.get("series")

        if not series and name:
            parts = [p.strip() for p in name.split(",")]
            if len(parts) >= 3:
                series = parts[-1]
            elif len(parts) == 2:
                series = parts[-1]
            else:
                series = None

        # ---------------- MATCH TYPE ---------------- #

        match_type = match.get("matchType")

        if match_type:
            match_type = match_type.upper()
        else:
            lower_name = name.lower()

            if "test" in lower_name:
                match_type = "TEST"
            elif "odi" in lower_name:
                match_type = "ODI"
            elif "t20" in lower_name:
                match_type = "T20"
            elif "t10" in lower_name:
                match_type = "T10"
            else:
                match_type = "UNKNOWN"

        return {
            "match_id": match.get("id"),
            "team1": team1,
            "team2": team2,
            "series": series,
            "match_type": match_type,
            "venue": match.get("venue"),
            "match_date": match.get("date"),
            "match_time": match.get("dateTimeGMT"),
            "team1_logo": team1_logo,
            "team2_logo": team2_logo,
            "status": status
        }

    live_matches = []
    upcoming_matches = []
    seen = set()

    # ---------------- LIVE MATCHES ---------------- #

    live_data = make_request(
        f"{BASE_URL}/currentMatches",
        {
            "apikey": CRIC_API_KEY,
            "offset": 0
        }
    )

    if live_data.get("success", True) and "data" in live_data:

        for match in live_data["data"]:

            if match.get("matchStarted") and not match.get("matchEnded"):

                live_matches.append(
                    format_match(match, "Live")
                )

                seen.add(match.get("id"))

    # ---------------- UPCOMING MATCHES ---------------- #

    upcoming_data = make_request(
        f"{BASE_URL}/matches",
        {
            "apikey": CRIC_API_KEY,
            "offset": 0
        }
    )

    if upcoming_data.get("success", True) and "data" in upcoming_data:

        for match in upcoming_data["data"]:

            if match.get("id") in seen:
                continue

            if (
                not match.get("matchStarted", False)
                and not match.get("matchEnded", False)
            ):

                upcoming_matches.append(
                    format_match(match, "Upcoming")
                )

                seen.add(match.get("id"))

    upcoming_matches.sort(
        key=lambda x: x.get("match_time") or ""
    )

    return {
        "success": True,
        "live_matches": live_matches,
        "upcoming_matches": upcoming_matches[:10],
        "recent_matches": []
    }

AVAILABLE_TOOLS = [
    get_player_stats,

    get_match_fantasy_performance,

    get_weather,

    get_news,

    get_injury_updates,

    get_player_availability,

    get_pitch_report,

    get_matches
]