"""
Data Fetcher & Cache Script
Pulls data from the database and saves as JSON files for the frontend.
Run this script whenever you want to update the website's data.

Usage:
    python fetch_and_cache.py
"""

import json
import os
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv

from sql_connector import get_mens_db, get_womens_db
from query_executor import QueryExecutor

# Load environment
load_dotenv()

# Output directory (frontend public folder)
# Get the krebstats-web root directory (parent of backend)
BACKEND_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BACKEND_DIR.parent
OUTPUT_DIR = PROJECT_ROOT / "public" / "data" / "stats"


def ensure_output_dir():
    """Create output directory if it doesn't exist."""
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    (OUTPUT_DIR / "mens").mkdir(exist_ok=True)
    (OUTPUT_DIR / "womens").mkdir(exist_ok=True)
    print(f"📁 Output directory: {OUTPUT_DIR}")


def save_json(data: dict, filename: str, subfolder: str = ""):
    """Save data as JSON file."""
    if subfolder:
        path = OUTPUT_DIR / subfolder / filename
    else:
        path = OUTPUT_DIR / filename
    
    with open(path, 'w') as f:
        json.dump(data, f, indent=2, default=str)
    
    print(f"  ✅ Saved: {path.name}")


def fetch_team_offensive_efficiency(gender: str, debug: bool = False):
    """Fetch team offensive efficiency data."""
    print(f"\n📊 Fetching team offensive efficiency ({gender})...")
    
    try:
        executor = QueryExecutor(gender)
        
        if debug:
            # Debug: show what query would be generated
            raw_query = executor._load_query_file("team", "Team-OffensiveEfficiency.sql")
            cte, table = executor._extract_cte_and_final_select(raw_query)
            print(f"  DEBUG - CTE length: {len(cte)} chars")
            print(f"  DEBUG - Final table: {table}")
            print(f"  DEBUG - CTE ends with: ...{cte[-100:]}")
        
        # Fetch full data with percentiles
        data_with_percentiles = executor.execute_team_offensive_efficiency(
            include_percentiles=True,
            play_types=None,
            team_filter=None,
            order_by="PLAY_COUNT",
            order_direction="DESC",
            limit=None
        )
        
        # Fetch without percentiles
        data_without_percentiles = executor.execute_team_offensive_efficiency(
            include_percentiles=False,
            play_types=None,
            team_filter=None,
            order_by="PLAY_COUNT",
            order_direction="DESC",
            limit=None
        )
        
        # Save both versions
        save_json({
            "success": True,
            "gender": gender,
            "query": "team-offensive-efficiency",
            "include_percentiles": True,
            "fetched_at": datetime.now().isoformat(),
            "row_count": len(data_with_percentiles),
            "data": data_with_percentiles
        }, "team-offensive-efficiency.json", gender)
        
        save_json({
            "success": True,
            "gender": gender,
            "query": "team-offensive-efficiency",
            "include_percentiles": False,
            "fetched_at": datetime.now().isoformat(),
            "row_count": len(data_without_percentiles),
            "data": data_without_percentiles
        }, "team-offensive-efficiency-no-percentiles.json", gender)
        
        return True
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False


def fetch_player_shot_stats(gender: str):
    """Fetch player statistics."""
    print(f"\n🏀 Fetching player statistics ({gender})...")
    
    try:
        executor = QueryExecutor(gender)
        
        # Player Offensive Efficiency (by play type)
        player_eff_data = executor.execute_player_offensive_efficiency()
        save_json({
            "success": True,
            "gender": gender,
            "query": "player-offensive-efficiency",
            "description": "Player offensive efficiency by play type with shooting percentages, PPP, and percentile rankings",
            "fetched_at": datetime.now().isoformat(),
            "row_count": len(player_eff_data),
            "data": player_eff_data
        }, "player-offensive-efficiency.json", gender)
        
        # Shot Location Efficiency
        shot_eff_data = executor.execute_player_shot_location_efficiency()
        save_json({
            "success": True,
            "gender": gender,
            "query": "player-shot-location-efficiency",
            "description": "Player shooting efficiency from different court areas (Layup, Close, Mid-Range, 3P) with percentile rankings",
            "fetched_at": datetime.now().isoformat(),
            "row_count": len(shot_eff_data),
            "data": shot_eff_data
        }, "player-shot-location-efficiency.json", gender)
        
        # Shot Location Frequency
        shot_freq_data = executor.execute_player_shot_location_frequency()
        save_json({
            "success": True,
            "gender": gender,
            "query": "player-shot-location-frequency",
            "description": "Player shot distribution showing percentage of shots from each court zone",
            "fetched_at": datetime.now().isoformat(),
            "row_count": len(shot_freq_data),
            "data": shot_freq_data
        }, "player-shot-location-frequency.json", gender)
        
        # PlayType Shot Frequency
        playtype_freq_data = executor.execute_player_playtype_shot_frequency()
        save_json({
            "success": True,
            "gender": gender,
            "query": "player-playtype-shot-frequency",
            "description": "Shot distribution by play type, showing where players shoot from on different offensive actions",
            "fetched_at": datetime.now().isoformat(),
            "row_count": len(playtype_freq_data),
            "data": playtype_freq_data
        }, "player-playtype-shot-frequency.json", gender)
        
        return True
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False


def fetch_team_shot_stats(gender: str):
    """Fetch team shot location statistics."""
    print(f"\n📊 Fetching team shot statistics ({gender})...")
    
    try:
        executor = QueryExecutor(gender)
        
        # Team Shot Location Frequency
        team_shot_freq = executor.execute_team_shot_location_frequency()
        save_json({
            "success": True,
            "gender": gender,
            "query": "team-shot-location-frequency",
            "description": "Team shot distribution showing percentage of shots from each court zone",
            "fetched_at": datetime.now().isoformat(),
            "row_count": len(team_shot_freq),
            "data": team_shot_freq
        }, "team-shot-location-frequency.json", gender)
        
        # Team PlayType Shot Frequency
        team_playtype_freq = executor.execute_team_playtype_shot_frequency()
        save_json({
            "success": True,
            "gender": gender,
            "query": "team-playtype-shot-frequency",
            "description": "Team shot distribution by play type, showing where teams shoot from on different offensive actions",
            "fetched_at": datetime.now().isoformat(),
            "row_count": len(team_playtype_freq),
            "data": team_playtype_freq
        }, "team-playtype-shot-frequency.json", gender)
        
        return True
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False


def fetch_metadata(gender: str):
    """Fetch metadata (play types, teams)."""
    print(f"\n📋 Fetching metadata ({gender})...")
    
    try:
        executor = QueryExecutor(gender)
        
        # Play types
        play_types = executor.get_available_play_types()
        save_json({
            "success": True,
            "gender": gender,
            "fetched_at": datetime.now().isoformat(),
            "play_types": play_types
        }, "play-types.json", gender)
        
        # Teams
        teams = executor.get_available_teams()
        save_json({
            "success": True,
            "gender": gender,
            "fetched_at": datetime.now().isoformat(),
            "teams": teams
        }, "teams.json", gender)
        
        return True
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False


def main():
    print("=" * 50)
    print("🏀 RIT Basketball Data Fetcher")
    print("=" * 50)
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    ensure_output_dir()
    
    success_count = 0
    total_count = 0
    
    for gender in ["mens", "womens"]:
        print(f"\n{'='*30}")
        print(f"Processing: {gender.upper()}")
        print("="*30)
        
        # Fetch team offensive efficiency
        total_count += 1
        if fetch_team_offensive_efficiency(gender, debug=False):
            success_count += 1
        
        # Fetch team shot statistics
        total_count += 1
        if fetch_team_shot_stats(gender):
            success_count += 1
        
        # Fetch player statistics
        total_count += 1
        if fetch_player_shot_stats(gender):
            success_count += 1
        
        # Fetch metadata
        total_count += 1
        if fetch_metadata(gender):
            success_count += 1
    
    # Save a manifest file with last update time
    save_json({
        "last_updated": datetime.now().isoformat(),
        "datasets": [
            "mens/team-offensive-efficiency.json",
            "mens/team-offensive-efficiency-no-percentiles.json",
            "mens/team-shot-location-frequency.json",
            "mens/team-playtype-shot-frequency.json",
            "mens/player-offensive-efficiency.json",
            "mens/player-shot-location-efficiency.json",
            "mens/player-shot-location-frequency.json",
            "mens/player-playtype-shot-frequency.json",
            "mens/play-types.json",
            "mens/teams.json",
            "womens/team-offensive-efficiency.json",
            "womens/team-offensive-efficiency-no-percentiles.json",
            "womens/team-shot-location-frequency.json",
            "womens/team-playtype-shot-frequency.json",
            "womens/player-offensive-efficiency.json",
            "womens/player-shot-location-efficiency.json",
            "womens/player-shot-location-frequency.json",
            "womens/player-playtype-shot-frequency.json",
            "womens/play-types.json",
            "womens/teams.json"
        ]
    }, "manifest.json")
    
    print("\n" + "=" * 50)
    print(f"✨ Complete! {success_count}/{total_count} tasks succeeded")
    print(f"📁 Data saved to: {OUTPUT_DIR}")
    print("=" * 50)


if __name__ == "__main__":
    main()

