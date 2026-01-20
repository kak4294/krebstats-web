# RIT Basketball Statistics Backend

FastAPI backend serving RIT Basketball statistics from custom SQL queries.

## Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create `.env` file (copy from `env_template.txt`):
```env
DB_HOST=your-database-host.com
DB_USERNAME=your_username
DB_PASSWORD=your_password_here
PORT=25060
MENS=RITMensBasketball
WOMENS=RITWomensBasketball
API_PORT=8000
```

## Run

```bash
python main.py
```

Docs at: http://localhost:8000/docs

## API Endpoints

### Team Offensive Efficiency
`GET /api/stats/{gender}/teams/offensive-efficiency`

| Param | Default | Description |
|-------|---------|-------------|
| `include_percentiles` | `true` | Show percentile columns |
| `play_types` | - | Comma-separated (e.g., `Transition,PickAndRoll`) |
| `team` | - | Filter by team |
| `order_by` | `PLAY_COUNT` | Sort column |
| `order_direction` | `DESC` | `ASC` or `DESC` |
| `limit` | - | Max rows |

### Metadata
- `GET /api/stats/{gender}/metadata/play-types` - Available play types
- `GET /api/stats/{gender}/metadata/teams` - Available teams
- `GET /api/stats/{gender}/metadata/tables` - Database tables

## Project Structure

```
backend/
├── main.py             # FastAPI app
├── sql_connector.py    # Database connection
├── queries.py          # Custom query execution
├── query_executor.py   # Dynamic SQL file executor
├── queries/            # SQL files
│   ├── mens/
│   │   ├── team/
│   │   ├── player/
│   │   └── situation/
│   └── womens/
└── .env
```
