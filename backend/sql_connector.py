"""
SQL Connector Module for RIT Basketball Statistics
Handles database connections and query execution
"""

import pymysql
from dotenv import load_dotenv
import pandas as pd
import os
from typing import Optional, List, Dict, Any, Tuple
from contextlib import contextmanager


class DatabaseManager:
    """Manages database connections and query execution for RIT Basketball statistics."""

    def __init__(self, database: Optional[str] = None):
        """
        Initialize the database manager.
        
        Args:
            database: Name of the database to connect to. 
                     If None, uses MENS database from environment.
        """
        load_dotenv()

        self.hostname = os.getenv('DB_HOST')
        self.username = os.getenv('DB_USERNAME')
        self.password = os.getenv('DB_PASSWORD')
        self.port = int(os.getenv('PORT', 25060))
        
        # Default to mens database if not specified
        self.database = database or os.getenv('MENS', 'RITMensBasketball')
        
        self.conn = None
        self.cursor = None

    def connect(self) -> bool:
        """
        Establish database connection.
        
        Returns:
            True if connection successful, False otherwise.
        """
        try:
            self.conn = pymysql.connect(
                host=self.hostname,
                port=self.port,
                user=self.username,
                passwd=self.password,
                db=self.database,
                cursorclass=pymysql.cursors.DictCursor
            )
            self.cursor = self.conn.cursor()
            return True
        except pymysql.Error as e:
            print(f"Error connecting to MySQL: {e}")
            return False

    def disconnect(self) -> None:
        """Close the database connection."""
        if self.conn:
            self.conn.close()
            self.conn = None
            self.cursor = None

    @contextmanager
    def connection(self):
        """Context manager for database connections."""
        try:
            self.connect()
            yield self
        finally:
            self.disconnect()

    def execute_query(self, query: str, params: Optional[Tuple] = None) -> List[Dict[str, Any]]:
        """
        Execute a SELECT query and return results.
        
        Args:
            query: SQL query string
            params: Optional tuple of parameters for parameterized queries
            
        Returns:
            List of dictionaries containing query results
        """
        if not self.cursor:
            raise ConnectionError("Database not connected. Call connect() first.")
        
        try:
            if params:
                self.cursor.execute(query, params)
            else:
                self.cursor.execute(query)
            return self.cursor.fetchall()
        except pymysql.Error as e:
            print(f"Query execution error: {e}")
            raise

    def execute_query_as_dataframe(self, query: str, params: Optional[Tuple] = None) -> pd.DataFrame:
        """
        Execute a SELECT query and return results as a pandas DataFrame.
        
        Args:
            query: SQL query string
            params: Optional tuple of parameters for parameterized queries
            
        Returns:
            DataFrame containing query results
        """
        results = self.execute_query(query, params)
        return pd.DataFrame(results)

    def call_procedure(self, procedure_name: str, params: Tuple) -> List[Dict[str, Any]]:
        """
        Call a stored procedure and return results.
        
        Args:
            procedure_name: Name of the stored procedure
            params: Tuple of parameters for the procedure
            
        Returns:
            List of dictionaries containing procedure results
        """
        if not self.cursor:
            raise ConnectionError("Database not connected. Call connect() first.")
        
        try:
            self.cursor.execute(f'CALL {procedure_name}(%s' + ', %s' * (len(params) - 1) + ')', params)
            return self.cursor.fetchall()
        except pymysql.Error as e:
            print(f"Procedure execution error: {e}")
            raise

    def get_tables(self) -> List[str]:
        """
        Get list of all tables in the current database.
        
        Returns:
            List of table names
        """
        results = self.execute_query("SHOW TABLES")
        return [list(row.values())[0] for row in results]


def get_mens_db() -> DatabaseManager:
    """Get a DatabaseManager instance for the men's basketball database."""
    load_dotenv()
    return DatabaseManager(os.getenv('MENS', 'RITMensBasketball'))


def get_womens_db() -> DatabaseManager:
    """Get a DatabaseManager instance for the women's basketball database."""
    load_dotenv()
    return DatabaseManager(os.getenv('WOMENS', 'RITWomensBasketball'))

