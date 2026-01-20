"""
RIT Basketball Statistics Queries Module
Custom query execution only - all queries loaded from .sql files
"""

from typing import Dict, List, Any, Optional
from sql_connector import DatabaseManager, get_mens_db, get_womens_db


class RITStatsQueries:
    """Query class for RIT Basketball statistics."""

    def __init__(self, gender: str = "mens"):
        """
        Initialize the stats queries.
        
        Args:
            gender: Either "mens" or "womens"
        """
        self.gender = gender.lower()
        self.db = get_mens_db() if self.gender == "mens" else get_womens_db()

    def execute_custom_query(self, query: str, params: Optional[tuple] = None) -> List[Dict[str, Any]]:
        """
        Execute a custom query.
        
        Args:
            query: SQL query string
            params: Optional parameters
            
        Returns:
            Query results as list of dicts
        """
        with self.db.connection():
            return self.db.execute_query(query, params)

    def get_available_tables(self) -> List[str]:
        """Get list of available tables in the database."""
        with self.db.connection():
            return self.db.get_tables()
