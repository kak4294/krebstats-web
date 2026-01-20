-- Basketball Analytics Query: Team shot distribution by court area with percentile rankings
-- Analyzes shooting performance from different areas: Layup/Dunk, Close, Mid-Range, 3P
-- Groups by team with shot counts, percentages, PPP, and percentile ranks for each zone

USE RITWomensBasketball;
-- USE RITMensBasketball;
WITH team_shot_stats AS (
    SELECT 
        primary_team AS TEAM,
        
        -- LAYUP/DUNK STATS (shot_level = 1)
        SUM(CASE WHEN shot_level = 1 AND outcome IN ('2pmi', '2pMa') THEN 1 ELSE 0 END) AS LAYUP_PLAYS,
        SUM(CASE WHEN shot_level = 1 AND outcome = '2pMa' THEN 1 ELSE 0 END) AS LAYUP_MAKES,
        SUM(CASE WHEN shot_level = 1 AND outcome = '2pmi' THEN 1 ELSE 0 END) AS LAYUP_MISS,
        ROUND(
            (SUM(CASE WHEN shot_level = 1 AND outcome = '2pMa' THEN 1 ELSE 0 END) / 
             NULLIF(SUM(CASE WHEN shot_level = 1 AND outcome IN ('2pmi', '2pMa') THEN 1 ELSE 0 END), 0) * 100), 1
        ) AS LAYUP_PCT,
        ROUND(
            (SUM(CASE WHEN shot_level = 1 AND outcome = '2pMa' THEN 2 ELSE 0 END) / 
             NULLIF(SUM(CASE WHEN shot_level = 1 AND outcome IN ('2pmi', '2pMa') THEN 1 ELSE 0 END), 0)), 2
        ) AS LAYUP_PPP,
        
        -- CLOSE SHOT STATS (shot_level = 2)
        SUM(CASE WHEN shot_level = 2 THEN 1 ELSE 0 END) AS CLOSE_PLAYS,
        SUM(CASE WHEN shot_level = 2 AND outcome = '2pMa' THEN 1 ELSE 0 END) AS CLOSE_MAKES,
        SUM(CASE WHEN shot_level = 2 AND outcome = '2pmi' THEN 1 ELSE 0 END) AS CLOSE_MISS,
        ROUND(
            (SUM(CASE WHEN shot_level = 2 AND outcome = '2pMa' THEN 1 ELSE 0 END) / 
             NULLIF(SUM(CASE WHEN shot_level = 2 THEN 1 ELSE 0 END), 0) * 100), 1
        ) AS CLOSE_PCT,
        ROUND(
            (SUM(CASE WHEN shot_level = 2 AND outcome = '2pMa' THEN 2 ELSE 0 END) / 
             NULLIF(SUM(CASE WHEN shot_level = 2 THEN 1 ELSE 0 END), 0)), 2
        ) AS CLOSE_PPP,
        
        -- MID RANGE STATS (shot_level = 3)
        SUM(CASE WHEN shot_level = 3 THEN 1 ELSE 0 END) AS MID_PLAYS,
        SUM(CASE WHEN shot_level = 3 AND outcome = '2pMa' THEN 1 ELSE 0 END) AS MID_MAKES,
        SUM(CASE WHEN shot_level = 3 AND outcome = '2pmi' THEN 1 ELSE 0 END) AS MID_MISS,
        ROUND(
            (SUM(CASE WHEN shot_level = 3 AND outcome = '2pMa' THEN 1 ELSE 0 END) / 
             NULLIF(SUM(CASE WHEN shot_level = 3 THEN 1 ELSE 0 END), 0) * 100), 1
        ) AS MID_PCT,
        ROUND(
            (SUM(CASE WHEN shot_level = 3 AND outcome = '2pMa' THEN 2 ELSE 0 END) / 
             NULLIF(SUM(CASE WHEN shot_level = 3 THEN 1 ELSE 0 END), 0)), 2
        ) AS MID_PPP,
        
        -- 3-POINT STATS (shot_level = 4)
        SUM(CASE WHEN shot_level = 4 THEN 1 ELSE 0 END) AS THREE_PLAYS,
        SUM(CASE WHEN shot_level = 4 AND outcome = '3pMa' THEN 1 ELSE 0 END) AS THREE_MAKES,
        SUM(CASE WHEN shot_level = 4 AND outcome = '3pmi' THEN 1 ELSE 0 END) AS THREE_MISS,
        ROUND(
            (SUM(CASE WHEN shot_level = 4 AND outcome = '3pMa' THEN 1 ELSE 0 END) / 
             NULLIF(SUM(CASE WHEN shot_level = 4 THEN 1 ELSE 0 END), 0) * 100), 1
        ) AS THREE_PCT,
        ROUND(
            (SUM(CASE WHEN shot_level = 4 AND outcome = '3pMa' THEN 3 ELSE 0 END) / 
             NULLIF(SUM(CASE WHEN shot_level = 4 THEN 1 ELSE 0 END), 0)), 2
        ) AS THREE_PPP
        
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
        -- At least 50 total shot attempts across all zones (team threshold)
        (SUM(CASE WHEN shot_level = 1 AND outcome IN ('2pmi', '2pMa') THEN 1 ELSE 0 END) +
         SUM(CASE WHEN shot_level = 2 THEN 1 ELSE 0 END) +
         SUM(CASE WHEN shot_level = 3 THEN 1 ELSE 0 END) +
         SUM(CASE WHEN shot_level = 4 THEN 1 ELSE 0 END)) >= 50
),
team_shot_percentiles AS (
    SELECT *,
        -- LAYUP PERCENTILES (only if >= 25 attempts for teams)
        CASE 
            WHEN LAYUP_PLAYS >= 25 THEN 
                ROUND(PERCENT_RANK() OVER (ORDER BY LAYUP_PCT) * 100, 1)
            ELSE NULL 
        END AS LAYUP_PCT_PCTL,
        CASE 
            WHEN LAYUP_PLAYS >= 25 THEN 
                ROUND(PERCENT_RANK() OVER (ORDER BY LAYUP_PPP) * 100, 1)
            ELSE NULL 
        END AS LAYUP_PPP_PCTL,
        
        -- CLOSE SHOT PERCENTILES (only if >= 20 attempts for teams)
        CASE 
            WHEN CLOSE_PLAYS >= 20 THEN 
                ROUND(PERCENT_RANK() OVER (ORDER BY CLOSE_PCT) * 100, 1)
            ELSE NULL 
        END AS CLOSE_PCT_PCTL,
        CASE 
            WHEN CLOSE_PLAYS >= 20 THEN 
                ROUND(PERCENT_RANK() OVER (ORDER BY CLOSE_PPP) * 100, 1)
            ELSE NULL 
        END AS CLOSE_PPP_PCTL,
        
        -- MID RANGE PERCENTILES (only if >= 25 attempts for teams)
        CASE 
            WHEN MID_PLAYS >= 25 THEN 
                ROUND(PERCENT_RANK() OVER (ORDER BY MID_PCT) * 100, 1)
            ELSE NULL 
        END AS MID_PCT_PCTL,
        CASE 
            WHEN MID_PLAYS >= 25 THEN 
                ROUND(PERCENT_RANK() OVER (ORDER BY MID_PPP) * 100, 1)
            ELSE NULL 
        END AS MID_PPP_PCTL,
        
        -- THREE POINT PERCENTILES (only if >= 25 attempts for teams)
        CASE 
            WHEN THREE_PLAYS >= 25 THEN 
                ROUND(PERCENT_RANK() OVER (ORDER BY THREE_PCT) * 100, 1)
            ELSE NULL 
        END AS THREE_PCT_PCTL,
        CASE 
            WHEN THREE_PLAYS >= 25 THEN 
                ROUND(PERCENT_RANK() OVER (ORDER BY THREE_PPP) * 100, 1)
            ELSE NULL 
        END AS THREE_PPP_PCTL
        
    FROM team_shot_stats
)
SELECT 
    TEAM,
    LAYUP_PLAYS,
    LAYUP_MAKES,
    LAYUP_MISS,
    LAYUP_PCT,
    LAYUP_PCT_PCTL,
    LAYUP_PPP,
    LAYUP_PPP_PCTL,
    CLOSE_PLAYS,
    CLOSE_MAKES,
    CLOSE_MISS,
    CLOSE_PCT,
    CLOSE_PCT_PCTL,
    CLOSE_PPP,
    CLOSE_PPP_PCTL,
    MID_PLAYS,
    MID_MAKES,
    MID_MISS,
    MID_PCT,
    MID_PCT_PCTL,
    MID_PPP,
    MID_PPP_PCTL,
    THREE_PLAYS,
    THREE_MAKES,
    THREE_MISS,
    THREE_PCT,
    THREE_PCT_PCTL,
    THREE_PPP,
    THREE_PPP_PCTL
FROM 
    team_shot_percentiles
ORDER BY 
    (LAYUP_PLAYS + CLOSE_PLAYS + MID_PLAYS + THREE_PLAYS) DESC;