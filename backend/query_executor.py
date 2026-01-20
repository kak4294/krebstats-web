"""
Dynamic Query Executor for RIT Basketball Statistics
Loads SQL files and modifies final SELECT statements based on parameters
"""

import os
import re
from typing import List, Dict, Any, Optional, Tuple
from pathlib import Path
from sql_connector import DatabaseManager, get_mens_db, get_womens_db


class QueryExecutor:
    """Executes SQL queries from files with dynamic modifications."""

    def __init__(self, gender: str = "mens"):
        """
        Initialize the query executor.
        
        Args:
            gender: Either "mens" or "womens"
        """
        self.gender = gender.lower()
        self.db = get_mens_db() if self.gender == "mens" else get_womens_db()
        
        # Base path for queries
        self.queries_path = Path(__file__).parent / "queries" / self.gender

    def _load_query_file(self, category: str, filename: str) -> str:
        """
        Load a SQL query file.
        
        Args:
            category: 'team', 'player', or 'situation'
            filename: Name of the SQL file
            
        Returns:
            Contents of the SQL file
        """
        file_path = self.queries_path / category / filename
        if not file_path.exists():
            raise FileNotFoundError(f"Query file not found: {file_path}")
        
        with open(file_path, 'r') as f:
            return f.read()

    def _extract_cte_and_final_select(self, query: str) -> Tuple[str, str]:
        """
        Extract the CTE portion and final SELECT from a query.
        
        Returns:
            Tuple of (cte_portion, final_table_name)
        """
        # Remove comments
        query = re.sub(r'--.*?$', '', query, flags=re.MULTILINE)
        # Remove USE statements
        query = re.sub(r'USE\s+\w+;?\s*', '', query, flags=re.IGNORECASE)
        query = query.strip()
        
        # Find the final SELECT statement after the CTE
        # Look for )\nSELECT or )\r\nSELECT pattern (end of CTE, start of final select)
        # The CTE ends with ) and then the final SELECT begins
        
        # Split on the last occurrence of ) followed by SELECT
        pattern = r'\)\s*(SELECT\s+.*?FROM\s+(\w+).*)$'
        match = re.search(pattern, query, re.DOTALL | re.IGNORECASE)
        
        if match:
            # Find where the match starts to split the query
            final_select_start = match.start(1)
            cte_portion = query[:match.start()].strip() + ')'
            final_table_name = match.group(2)
            return cte_portion, final_table_name
        
        return query, None

    def _build_dynamic_select(
        self,
        table_name: str,
        columns: Optional[List[str]] = None,
        include_percentiles: bool = True,
        play_types: Optional[List[str]] = None,
        team_filter: Optional[str] = None,
        player_filter: Optional[str] = None,
        order_by: str = "PLAY_COUNT",
        order_direction: str = "DESC",
        limit: Optional[int] = None
    ) -> str:
        """
        Build a dynamic SELECT statement.
        
        Args:
            table_name: Name of the CTE result table
            columns: Specific columns to select (None = all)
            include_percentiles: Whether to include percentile columns
            play_types: List of play types to filter by
            team_filter: Filter by specific team
            player_filter: Filter by specific player
            order_by: Column to order by
            order_direction: ASC or DESC
            limit: Max rows to return
            
        Returns:
            Dynamic SELECT statement
        """
        # Build SELECT columns
        if columns:
            # If specific columns requested, use them
            select_cols = ", ".join(columns)
        elif not include_percentiles:
            # Exclude percentile columns
            select_cols = "PLAY_TYPE, TEAM, PPP, `2PA`, `2PM`, `2P%`, `3PA`, `3PM`, `3P%`, PLAY_COUNT"
        else:
            select_cols = "*"
        
        # Build WHERE clause
        where_conditions = []
        
        if play_types:
            play_types_str = ", ".join([f"'{pt}'" for pt in play_types])
            where_conditions.append(f"PLAY_TYPE IN ({play_types_str})")
        
        if team_filter:
            where_conditions.append(f"TEAM = '{team_filter}'")
        
        if player_filter:
            where_conditions.append(f"PLAYER LIKE '%{player_filter}%'")
        
        where_clause = ""
        if where_conditions:
            where_clause = "WHERE " + " AND ".join(where_conditions)
        
        # Build ORDER BY
        order_clause = f"ORDER BY {order_by} {order_direction}"
        
        # Build LIMIT
        limit_clause = f"LIMIT {limit}" if limit else ""
        
        # Combine into final SELECT
        select_stmt = f"""
SELECT {select_cols}
FROM {table_name}
{where_clause}
{order_clause}
{limit_clause}
""".strip()
        
        return select_stmt

    def execute_team_offensive_efficiency(
        self,
        include_percentiles: bool = True,
        play_types: Optional[List[str]] = None,
        team_filter: Optional[str] = None,
        order_by: str = "PLAY_COUNT",
        order_direction: str = "DESC",
        limit: Optional[int] = None
    ) -> List[Dict[str, Any]]:
        """
        Execute Team Offensive Efficiency query with dynamic parameters.
        
        Args:
            include_percentiles: Whether to include percentile ranking columns
            play_types: Filter by specific play types (e.g., ['Transition', 'PickAndRoll'])
            team_filter: Filter by specific team name
            order_by: Column to sort by
            order_direction: 'ASC' or 'DESC'
            limit: Maximum number of rows to return
            
        Returns:
            List of dictionaries with query results
        """
        # Load the base query
        raw_query = self._load_query_file("team", "Team-OffensiveEfficiency.sql")
        
        # Extract CTE portion
        cte_portion, final_table = self._extract_cte_and_final_select(raw_query)
        
        # Build dynamic SELECT
        dynamic_select = self._build_dynamic_select(
            table_name="team_play_data",
            include_percentiles=include_percentiles,
            play_types=play_types,
            team_filter=team_filter,
            order_by=order_by,
            order_direction=order_direction,
            limit=limit
        )
        
        # Combine CTE with dynamic SELECT
        full_query = f"{cte_portion}\n{dynamic_select}"
        
        # Execute query
        with self.db.connection():
            return self.db.execute_query(full_query)

    def execute_player_offensive_efficiency(
        self,
        include_percentiles: bool = True,
        play_types: Optional[List[str]] = None,
        team_filter: Optional[str] = None,
        player_filter: Optional[str] = None,
        order_by: str = "PLAY_COUNT",
        order_direction: str = "DESC",
        limit: Optional[int] = None
    ) -> List[Dict[str, Any]]:
        """
        Execute Player Offensive Efficiency query with dynamic parameters.
        
        Args:
            include_percentiles: Whether to include percentile ranking columns
            play_types: Filter by specific play types
            team_filter: Filter by specific team name
            player_filter: Filter by player name (partial match)
            order_by: Column to sort by
            order_direction: 'ASC' or 'DESC'
            limit: Maximum number of rows to return
            
        Returns:
            List of dictionaries with query results
        """
        # Load the base query
        raw_query = self._load_query_file("player", "Player-OffensiveEfficiency.sql")
        
        # Extract CTE portion
        cte_portion, _ = self._extract_cte_and_final_select(raw_query)
        
        # Build columns based on percentile toggle
        if not include_percentiles:
            select_cols = "PLAY_TYPE, PLAYER, TEAM, PPP, `2PA`, `2PM`, `2P%`, `3PA`, `3PM`, `3P%`, PLAY_COUNT"
        else:
            select_cols = "*"
        
        # Build dynamic SELECT
        dynamic_select = self._build_dynamic_select(
            table_name="play_data",
            columns=[select_cols] if not include_percentiles else None,
            include_percentiles=include_percentiles,
            play_types=play_types,
            team_filter=team_filter,
            player_filter=player_filter,
            order_by=order_by,
            order_direction=order_direction,
            limit=limit
        )
        
        # Combine CTE with dynamic SELECT
        full_query = f"{cte_portion}\n{dynamic_select}"
        
        # Execute query
        with self.db.connection():
            return self.db.execute_query(full_query)

    def execute_team_shot_location_frequency(self) -> List[Dict[str, Any]]:
        """Execute Team Shot Location Frequency Distribution query."""
        raw_query = self._load_query_file("team", "Team-ShotLocation-FreqDist.sql")
        cte_portion, _ = self._extract_cte_and_final_select(raw_query)
        full_query = f"{cte_portion}\nSELECT * FROM team_shot_frequency ORDER BY TOTAL_SHOTS DESC"
        
        with self.db.connection():
            return self.db.execute_query(full_query)

    def execute_team_playtype_shot_frequency(self) -> List[Dict[str, Any]]:
        """Execute Team PlayType Shot Location Frequency Distribution query."""
        raw_query = self._load_query_file("team", "Team-PlayType-ShotLocation-FreqDist.sql")
        cte_portion, _ = self._extract_cte_and_final_select(raw_query)
        full_query = f"{cte_portion}\nSELECT * FROM team_playtype_shot_frequency ORDER BY TEAM, TOTAL_SHOTS DESC"
        
        with self.db.connection():
            return self.db.execute_query(full_query)

    def get_available_play_types(self) -> List[str]:
        """
        Get list of available play types from the database.
        
        Returns:
            List of unique play type names
        """
        query = """
            SELECT DISTINCT 
                CASE 
                    WHEN secondary_play IS NULL THEN primary_play 
                    ELSE secondary_play 
                END AS play_type
            FROM plays_table_denorm_extra
            WHERE conference = 'Liberty League'
            ORDER BY play_type
        """
        with self.db.connection():
            results = self.db.execute_query(query)
            return [r['play_type'] for r in results if r['play_type']]

    def execute_player_offensive_efficiency(self) -> List[Dict[str, Any]]:
        """Execute Player Offensive Efficiency by Play Type query."""
        raw_query = self._load_query_file("player", "Player-OffensiveEfficiency.sql")
        cte_portion, _ = self._extract_cte_and_final_select(raw_query)
        full_query = f"{cte_portion}\nSELECT * FROM play_data ORDER BY PLAY_COUNT DESC"
        
        with self.db.connection():
            return self.db.execute_query(full_query)

    def execute_player_shot_location_efficiency(self) -> List[Dict[str, Any]]:
        """Execute Player Shot Location Efficiency query."""
        raw_query = self._load_query_file("player", "Player-ShotLocation-EffDist.sql")
        cte_portion, _ = self._extract_cte_and_final_select(raw_query)
        full_query = f"{cte_portion}\nSELECT * FROM shot_percentiles ORDER BY (LAYUP_PLAYS + CLOSE_PLAYS + MID_PLAYS + THREE_PLAYS) DESC"
        
        with self.db.connection():
            return self.db.execute_query(full_query)

    def execute_player_shot_location_frequency(self) -> List[Dict[str, Any]]:
        """Execute Player Shot Location Frequency Distribution query."""
        raw_query = self._load_query_file("player", "Player-ShotLocation-FreqDist.sql")
        cte_portion, _ = self._extract_cte_and_final_select(raw_query)
        full_query = f"{cte_portion}\nSELECT * FROM shot_frequency ORDER BY TOTAL_SHOTS DESC"
        
        with self.db.connection():
            return self.db.execute_query(full_query)

    def execute_player_playtype_shot_frequency(self) -> List[Dict[str, Any]]:
        """Execute Player PlayType Shot Location Frequency Distribution query."""
        raw_query = self._load_query_file("player", "Player-PlayType-ShotLocation-FreqDist.sql")
        cte_portion, _ = self._extract_cte_and_final_select(raw_query)
        full_query = f"{cte_portion}\nSELECT * FROM player_playtype_shot_frequency ORDER BY PLAYER, TOTAL_SHOTS DESC"
        
        with self.db.connection():
            return self.db.execute_query(full_query)

    def get_available_teams(self) -> List[str]:
        """
        Get list of available teams from the database.
        
        Returns:
            List of unique team names
        """
        query = """
            SELECT DISTINCT primary_team AS team
            FROM plays_table_denorm_extra
            WHERE conference = 'Liberty League'
            ORDER BY team
        """
        with self.db.connection():
            results = self.db.execute_query(query)
            return [r['team'] for r in results if r['team']]

