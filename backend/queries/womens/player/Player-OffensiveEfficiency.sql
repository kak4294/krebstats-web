-- Basketball Analytics Query: Player performance by play type with percentile rankings
-- Analyzes shooting efficiency (2P%, 3P%, PPP) for players with 15+ plays of each type
-- Calculates percentile ranks within play types (2P% rank requires 15+ 2PA, 3P% rank requires 10+ 3PA)

USE RITWomensBasketball;
-- USE RITMensBasketball;
WITH play_stats AS (
    SELECT 
        CASE 
            WHEN secondary_play IS NULL THEN primary_play 
            ELSE secondary_play 
        END AS PLAY_TYPE,
        CASE 
            WHEN secondary_player IS NULL THEN primary_player 
            ELSE secondary_player 
        END AS PLAYER,
        primary_team AS TEAM,
        -- Points Per Play Statistics
        ( (SUM(CASE WHEN outcome = '2pma' THEN 1 ELSE 0 END) * 2) + 
          (SUM(CASE WHEN outcome = '3pMa' THEN 1 ELSE 0 END) * 3) ) / 
        (COUNT(*)) AS PPP,
        -- 2FG Statistics
        SUM(CASE WHEN outcome = '2pmi' THEN 1 ELSE 0 END) + 
        SUM(CASE WHEN outcome = '2pMa' THEN 1 ELSE 0 END) AS "2PA",
        SUM(CASE WHEN outcome = '2pMa' THEN 1 ELSE 0 END) AS "2PM",
        ROUND(	(SUM(CASE WHEN outcome = '2pMa' THEN 1 ELSE 0 END) / 
                 (SUM(CASE WHEN outcome = '2pmi' THEN 1 ELSE 0 END) + 
                  SUM(CASE WHEN outcome = '2pMa' THEN 1 ELSE 0 END)) * 100), 2 ) AS "2P%",
        -- 3FG Statistics
        SUM(CASE WHEN outcome = '3pmi' THEN 1 ELSE 0 END) + 
        SUM(CASE WHEN outcome = '3pMa' THEN 1 ELSE 0 END) AS "3PA",
        SUM(CASE WHEN outcome = '3pMa' THEN 1 ELSE 0 END) AS "3PM",
        ROUND(	(SUM(CASE WHEN outcome = '3pMa' THEN 1 ELSE 0 END) / 
                 (SUM(CASE WHEN outcome = '3pmi' THEN 1 ELSE 0 END) + 
                  SUM(CASE WHEN outcome = '3pMa' THEN 1 ELSE 0 END)) * 100), 2 ) AS "3P%",
        -- Play Count
        COUNT(*) as PLAY_COUNT
    FROM 
        plays_table_denorm_extra p
    WHERE 
        conference = 'Liberty League' AND
        year = '2025-2026'
    GROUP BY 
        CASE 
            WHEN secondary_play IS NULL THEN primary_play 
            ELSE secondary_play 
        END,
        CASE 
            WHEN secondary_player IS NULL THEN primary_player 
            ELSE secondary_player 
        END,
        primary_team
    HAVING 
        COUNT(*) >= 15
),
play_data AS (
    SELECT *,
        ROUND(PERCENT_RANK() OVER (PARTITION BY PLAY_TYPE ORDER BY PPP) * 100, 1) AS PPP_PERCENTILE,
        CASE 
            WHEN "2PA" >= 15 THEN 
                ROUND(PERCENT_RANK() OVER (PARTITION BY PLAY_TYPE ORDER BY "2P%") * 100, 1)
            ELSE NULL 
        END AS "2P%_PERCENTILE",
        CASE 
            WHEN "3PA" >= 10 THEN 
                ROUND(PERCENT_RANK() OVER (PARTITION BY PLAY_TYPE ORDER BY "3P%") * 100, 1)
            ELSE NULL 
        END AS "3P%_PERCENTILE"
    FROM play_stats
)
SELECT * FROM play_data
ORDER BY PLAY_COUNT DESC;