-- Basketball Analytics Query: Team shot distribution frequency analysis
-- Shows shot distribution as percentages across the four court zones by team
-- Each team's four percentages sum to 100% of their total shooting plays

USE RITWomensBasketball;
-- USE RITMensBasketball;
WITH team_shot_frequency AS (
    SELECT 
        primary_team AS TEAM,
        
        -- Shot counts by zone
        SUM(CASE WHEN shot_level = 1 AND outcome IN ('2pmi', '2pMa') THEN 1 ELSE 0 END) AS LAYUP_COUNT,
        SUM(CASE WHEN shot_level = 2 THEN 1 ELSE 0 END) AS CLOSE_COUNT,
        SUM(CASE WHEN shot_level = 3 THEN 1 ELSE 0 END) AS MID_COUNT,
        SUM(CASE WHEN shot_level = 4 THEN 1 ELSE 0 END) AS THREE_COUNT,
        
        -- Total shots
        (SUM(CASE WHEN shot_level = 1 AND outcome IN ('2pmi', '2pMa') THEN 1 ELSE 0 END) +
         SUM(CASE WHEN shot_level = 2 THEN 1 ELSE 0 END) +
         SUM(CASE WHEN shot_level = 3 THEN 1 ELSE 0 END) +
         SUM(CASE WHEN shot_level = 4 THEN 1 ELSE 0 END)) AS TOTAL_SHOTS
        
    FROM 
        plays_table_denorm_extra p
    WHERE 
        p.conference = 'Liberty League' AND
        p.year = '2025-2026' AND
        shot_level IN (1, 2, 3, 4) AND
        -- Filter out shot_level = 1 rows that don't have proper 2P outcomes
        NOT (shot_level = 1 AND outcome NOT IN ('2pmi', '2pMa'))
    GROUP BY 
        primary_team
    HAVING 
        -- At least 50 total shot attempts (team level threshold)
        (SUM(CASE WHEN shot_level = 1 AND outcome IN ('2pmi', '2pMa') THEN 1 ELSE 0 END) +
         SUM(CASE WHEN shot_level = 2 THEN 1 ELSE 0 END) +
         SUM(CASE WHEN shot_level = 3 THEN 1 ELSE 0 END) +
         SUM(CASE WHEN shot_level = 4 THEN 1 ELSE 0 END)) >= 50
)
SELECT 
    TEAM,
    LAYUP_COUNT,
    CLOSE_COUNT,
    MID_COUNT,
    THREE_COUNT,
    TOTAL_SHOTS,
    ROUND((LAYUP_COUNT / TOTAL_SHOTS * 100), 1) AS LAYUP_PCT,
    ROUND((CLOSE_COUNT / TOTAL_SHOTS * 100), 1) AS CLOSE_PCT,
    ROUND((MID_COUNT / TOTAL_SHOTS * 100), 1) AS MID_PCT,
    ROUND((THREE_COUNT / TOTAL_SHOTS * 100), 1) AS THREE_PCT
FROM 
    team_shot_frequency
ORDER BY 
    TOTAL_SHOTS DESC;