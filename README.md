# KrebStats Web

> Personal basketball analytics website with Liberty League statistics integration.

**Live Site:** [https://krebstats.com/](https://krebstats.com/)

---

## 📊 Quick Reference: Update Data & Deploy

### Update Statistics Data

The statistics data (player/team efficiency, shot distributions, etc.) is stored as static JSON files. To refresh with the latest data from the database:

```bash
# 1. Navigate to the backend folder
cd /Users/kylekrebs/Documents/BasketballAnalytics/Projects/krebstats-web/backend

# 2. Run the data fetcher script
python fetch_and_cache.py
```

This will:
- Connect to the RIT Basketball database
- Fetch all player and team statistics for both Men's and Women's
- Save the data as JSON files in `public/data/stats/`

**Output files created:**
```
public/data/stats/
├── mens/
│   ├── team-offensive-efficiency.json
│   ├── team-shot-location-frequency.json
│   ├── team-playtype-shot-frequency.json
│   ├── player-offensive-efficiency.json
│   ├── player-shot-location-efficiency.json
│   ├── player-shot-location-frequency.json
│   ├── player-playtype-shot-frequency.json
│   ├── play-types.json
│   └── teams.json
├── womens/
│   └── (same files as mens/)
└── manifest.json
```

### Deploy to Website

After updating data (or making any changes):

```bash
# 1. Navigate to project root
cd /Users/kylekrebs/Documents/BasketballAnalytics/Projects/krebstats-web

# 2. Build for production
npm run build

# 3. Deploy to GitHub Pages
npm run deploy
```

**Your site will be live at [https://krebstats.com/](https://krebstats.com/) in 2-3 minutes.**

---

## 🚀 Complete Workflow: Update Data & Push to Website

Run these commands in order:

```bash
# Step 1: Update the statistics data from database
cd /Users/kylekrebs/Documents/BasketballAnalytics/Projects/krebstats-web/backend
python fetch_and_cache.py

# Step 2: Build and deploy
cd /Users/kylekrebs/Documents/BasketballAnalytics/Projects/krebstats-web
npm run build
npm run deploy
```

**One-liner (copy & paste):**
```bash
cd /Users/kylekrebs/Documents/BasketballAnalytics/Projects/krebstats-web/backend && python fetch_and_cache.py && cd .. && npm run build && npm run deploy
```

---

## 🛠️ Development

### Requirements

| Tool       | Minimum Version         | Check Command |
|------------|-------------------------|---------------|
| Node.js    | 16 LTS (tested on 20.x) | `node -v`     |
| npm        | 8 or newer              | `npm -v`      |
| Python     | 3.8+                    | `python --version` |

### Initial Setup

```bash
# Clone and install frontend dependencies
cd /Users/kylekrebs/Documents/BasketballAnalytics/Projects/krebstats-web
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt

# Set up environment variables (copy template and fill in credentials)
cp env_template.txt .env
```

### Local Development

```bash
# Start the dev server with hot-reload
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Preview Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
krebstats-web/
├── backend/                    # Python backend for data fetching
│   ├── fetch_and_cache.py      # Main script to update statistics data
│   ├── query_executor.py       # SQL query execution with dynamic filtering
│   ├── sql_connector.py        # Database connection manager
│   ├── queries/                # SQL query files
│   │   ├── mens/               # Men's basketball queries
│   │   │   ├── player/         # Player statistics queries
│   │   │   ├── team/           # Team statistics queries
│   │   │   └── situation/      # Situational queries
│   │   └── womens/             # Women's basketball queries
│   ├── requirements.txt        # Python dependencies
│   └── .env                    # Database credentials (not in git)
├── public/                     # Static assets
│   └── data/stats/             # Cached JSON statistics data
├── src/                        # React source code
│   ├── components/             # Shared components
│   ├── pages/                  # Page components
│   ├── liberty-league-components/  # Liberty League stats pages
│   └── rit-basketball-components/  # RIT Basketball Club components
├── dist/                       # Production build output
└── package.json
```

---

## 🔧 Troubleshooting

### Data Update Issues

**Error: Database connection failed**
- Check that the `.env` file exists in `backend/` with correct credentials
- Verify network connectivity to the database server

**Error: Python module not found**
```bash
cd backend
pip install -r requirements.txt
```

### Build/Deploy Issues

**Error: Build fails**
```bash
npm install
npm run build
```

**Error: Deploy fails**
```bash
git add .
git commit -m "Update statistics data"
git push origin main
npm run deploy
```

**Website doesn't update after deploy**
- Wait 5-10 minutes for GitHub Pages to propagate
- Try hard-refreshing your browser (Ctrl+Shift+R / Cmd+Shift+R)

---

## 📋 Available npm Scripts

| Script    | Purpose                                   |
|-----------|-------------------------------------------|
| `dev`     | Start hot-reload dev server               |
| `build`   | Create production bundle in `dist/`       |
| `preview` | Serve the production build locally        |
| `deploy`  | Deploy to GitHub Pages (krebstats.com)    |

---

## 🏀 Statistics Pages

| Page | URL Path | Description |
|------|----------|-------------|
| Team Statistics | `/liberty-league-stats/teams` | Team efficiency, shot distribution by play type |
| Player Statistics | `/liberty-league-stats/players` | Player efficiency, shot charts, play type breakdowns |

### Available Filters

**Team Statistics:**
- Filter by Team
- Filter by Play Type

**Player Statistics:**
- Filter by Player
- Filter by Team
- Filter by Play Type

---

## 📞 Quick Commands Reference

```bash
# Update data only
cd backend && python fetch_and_cache.py

# Deploy only (no data update)
npm run build && npm run deploy

# Full update + deploy
cd backend && python fetch_and_cache.py && cd .. && npm run build && npm run deploy

# Local development
npm run dev
```
