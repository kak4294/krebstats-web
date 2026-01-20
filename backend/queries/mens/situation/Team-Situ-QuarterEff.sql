-- Basketball Analytics Query: Team efficiency statistics by simulated quarters (Men's)
-- Splits H1/H2 at 10-minute mark to create Q1, Q2, Q3, Q4 plus OT
-- Includes shooting stats, turnovers, fouls, and adjusted rates per 100 plays
USE RITMensBasketball;
WITH period_stats AS (
    SELECT 
        primary_team AS TEAM,
        CASE 
            WHEN period = 'H1' AND HOUR(start_time) >= 10 THEN 'Q1'
            WHEN period = 'H1' AND HOUR(start_time) < 10 THEN 'Q2'
            WHEN period = 'H2' AND HOUR(start_time) >= 10 THEN 'Q3'
            WHEN period = 'H2' AND HOUR(start_time) < 10 THEN 'Q4'
            WHEN period IN ('OT1', 'OT2', 'OT3', 'OT4', 'OT5', 'OT6', 'OT7', 'OT8', 'OT9') THEN 'OT'
        END AS PERIOD,
        
        -- SHOOTING STATISTICS
        SUM(CASE 
            WHEN outcome = '2pMa' THEN 1
            WHEN outcome = 'And1' AND shot_level IN (1, 2, 3) THEN 1
            ELSE 0 
        END) AS `2PM`,
        SUM(CASE 
            WHEN outcome IN ('2pmi', '2pMa') THEN 1
            WHEN outcome = 'And1' AND shot_level IN (1, 2, 3) THEN 1
            ELSE 0 
        END) AS `2PA`,
        ROUND((SUM(CASE 
                    WHEN outcome = '2pMa' THEN 1
                    WHEN outcome = 'And1' AND shot_level IN (1, 2, 3) THEN 1
                    ELSE 0 
                END) / 
               NULLIF(SUM(CASE 
                          WHEN outcome IN ('2pmi', '2pMa') THEN 1
                          WHEN outcome = 'And1' AND shot_level IN (1, 2, 3) THEN 1
                          ELSE 0 
                      END), 0) * 100), 1) AS `2P%`,
        
        SUM(CASE 
            WHEN outcome = '3pMa' THEN 1
            WHEN outcome = 'And1' AND shot_level = 4 THEN 1
            ELSE 0 
        END) AS `3PM`,
        SUM(CASE 
            WHEN outcome IN ('3pmi', '3pMa') THEN 1
            WHEN outcome = 'And1' AND shot_level = 4 THEN 1
            ELSE 0 
        END) AS `3PA`,
        ROUND((SUM(CASE 
                    WHEN outcome = '3pMa' THEN 1
                    WHEN outcome = 'And1' AND shot_level = 4 THEN 1
                    ELSE 0 
                END) / 
               NULLIF(SUM(CASE 
                          WHEN outcome IN ('3pmi', '3pMa') THEN 1
                          WHEN outcome = 'And1' AND shot_level = 4 THEN 1
                          ELSE 0 
                      END), 0) * 100), 1) AS `3P%`,
        
        -- TURNOVER AND FOUL STATISTICS
        SUM(CASE WHEN outcome = 'Turnover' THEN 1 ELSE 0 END) AS TURNOVERS,
        SUM(CASE WHEN outcome = 'Foul' THEN 1 ELSE 0 END) AS FLS_DRAWN,
        COUNT(*) AS TOTAL_PLAYS,
        
        -- ADJUSTED RATES PER 100 PLAYS
        ROUND((SUM(CASE WHEN outcome = 'Turnover' THEN 1 ELSE 0 END) / COUNT(*) * 100), 1) AS "ADJ_TO%",
        ROUND((SUM(CASE WHEN outcome = 'Foul' THEN 1 ELSE 0 END) / COUNT(*) * 100), 1) AS "ADJ_FD%"
        
    FROM 
        plays_table_denorm_extra p
    WHERE 
        conference = 'Liberty League' AND
        year = '2025-2026' AND
        period IN ('H1', 'H2', 'OT1', 'OT2', 'OT3', 'OT4', 'OT5', 'OT6', 'OT7', 'OT8', 'OT9')
    GROUP BY 
        primary_team,
        CASE 
            WHEN period = 'H1' AND HOUR(start_time) >= 10 THEN 'Q1'
            WHEN period = 'H1' AND HOUR(start_time) < 10 THEN 'Q2'
            WHEN period = 'H2' AND HOUR(start_time) >= 10 THEN 'Q3'
            WHEN period = 'H2' AND HOUR(start_time) < 10 THEN 'Q4'
            WHEN period IN ('OT1', 'OT2', 'OT3', 'OT4', 'OT5', 'OT6', 'OT7', 'OT8', 'OT9') THEN 'OT'
        END
),
ranked_stats AS (
    SELECT *,
        RANK() OVER (PARTITION BY PERIOD ORDER BY TURNOVERS) AS TO_RANK,
        RANK() OVER (PARTITION BY PERIOD ORDER BY FLS_DRAWN) AS FOUL_RANK,
        RANK() OVER (PARTITION BY PERIOD ORDER BY "ADJ_TO%") AS ADJ_TO_RANK,
        RANK() OVER (PARTITION BY PERIOD ORDER BY "ADJ_FD%") AS ADJ_FD_RANK
    FROM period_stats
    WHERE PERIOD IS NOT NULL
)
SELECT 
    TEAM,
    PERIOD,
    TOTAL_PLAYS,
    `2PM`,
    `2PA`, 
    `2P%`,
    `3PM`,
    `3PA`,
    `3P%`,
    TURNOVERS,
    "ADJ_TO%",
    ADJ_TO_RANK,
	FLS_DRAWN,
    "ADJ_FD%",
    ADJ_FD_RANK
FROM ranked_stats
-- HAVING
-- 	PERIOD = 'Q4'
ORDER BY TEAM, 
         CASE PERIOD 
             WHEN 'Q1' THEN 1 
             WHEN 'Q2' THEN 2 
             WHEN 'Q3' THEN 3 
             WHEN 'Q4' THEN 4 
             WHEN 'OT' THEN 5 
         END;
        

-- Basketball Analytics Query: Team efficiency statistics by period (Women's)
-- Includes shooting stats, turnovers, fouls, and adjusted rates per 100 plays
USE RITWomensBasketball;
WITH period_stats AS (
    SELECT 
        primary_team AS TEAM,
        CASE 
            WHEN period = 'Q1' THEN 'Q1'
            WHEN period = 'Q2' THEN 'Q2'
            WHEN period = 'Q3' THEN 'Q3'
            WHEN period = 'Q4' THEN 'Q4'
            WHEN period IN ('OT1', 'OT2', 'OT3', 'OT4', 'OT5', 'OT6', 'OT7', 'OT8', 'OT9') THEN 'OT'
        END AS PERIOD,
        
        -- SHOOTING STATISTICS
        SUM(CASE 
            WHEN outcome = '2pMa' THEN 1
            WHEN outcome = 'And1' AND shot_level IN (1, 2, 3) THEN 1
            ELSE 0 
        END) AS "2PM",
        SUM(CASE 
            WHEN outcome IN ('2pmi', '2pMa') THEN 1
            WHEN outcome = 'And1' AND shot_level IN (1, 2, 3) THEN 1
            ELSE 0 
        END) AS "2PA",
        ROUND((SUM(CASE 
                    WHEN outcome = '2pMa' THEN 1
                    WHEN outcome = 'And1' AND shot_level IN (1, 2, 3) THEN 1
                    ELSE 0 
                END) / 
               NULLIF(SUM(CASE 
                          WHEN outcome IN ('2pmi', '2pMa') THEN 1
                          WHEN outcome = 'And1' AND shot_level IN (1, 2, 3) THEN 1
                          ELSE 0 
                      END), 0) * 100), 1) AS "2P%",
        
        SUM(CASE 
            WHEN outcome = '3pMa' THEN 1
            WHEN outcome = 'And1' AND shot_level = 4 THEN 1
            ELSE 0 
        END) AS "3PM",
        SUM(CASE 
            WHEN outcome IN ('3pmi', '3pMa') THEN 1
            WHEN outcome = 'And1' AND shot_level = 4 THEN 1
            ELSE 0 
        END) AS "3PA",
        ROUND((SUM(CASE 
                    WHEN outcome = '3pMa' THEN 1
                    WHEN outcome = 'And1' AND shot_level = 4 THEN 1
                    ELSE 0 
                END) / 
               NULLIF(SUM(CASE 
                          WHEN outcome IN ('3pmi', '3pMa') THEN 1
                          WHEN outcome = 'And1' AND shot_level = 4 THEN 1
                          ELSE 0 
                      END), 0) * 100), 1) AS "3P%",
        
        -- TURNOVER AND FOUL STATISTICS
        SUM(CASE WHEN outcome = 'Turnover' THEN 1 ELSE 0 END) AS TURNOVERS,
        SUM(CASE WHEN outcome = 'Foul' THEN 1 ELSE 0 END) AS FLS_DRAWN,
        COUNT(*) AS TOTAL_PLAYS,
        
        -- ADJUSTED RATES PER 100 PLAYS
        ROUND((SUM(CASE WHEN outcome = 'Turnover' THEN 1 ELSE 0 END) / COUNT(*) * 100), 1) AS "ADJ_TO%",
        ROUND((SUM(CASE WHEN outcome = 'Foul' THEN 1 ELSE 0 END) / COUNT(*) * 100), 1) AS "ADJ_FD%"
        
    FROM 
        plays_table_denorm_extra p
    WHERE 
        conference = 'Liberty League' AND
        year = '2025-2026' AND
        period IN ('Q1', 'Q2', 'Q3', 'Q4', 'OT1', 'OT2', 'OT3', 'OT4', 'OT5', 'OT6', 'OT7', 'OT8', 'OT9')
    GROUP BY 
        primary_team,
        CASE 
            WHEN period = 'Q1' THEN 'Q1'
            WHEN period = 'Q2' THEN 'Q2'
            WHEN period = 'Q3' THEN 'Q3'
            WHEN period = 'Q4' THEN 'Q4'
            WHEN period IN ('OT1', 'OT2', 'OT3', 'OT4', 'OT5', 'OT6', 'OT7', 'OT8', 'OT9') THEN 'OT'
        END
),
ranked_stats AS (
    SELECT *,
        RANK() OVER (PARTITION BY PERIOD ORDER BY TURNOVERS) AS TO_RANK,
        RANK() OVER (PARTITION BY PERIOD ORDER BY FLS_DRAWN) AS FOUL_RANK,
        RANK() OVER (PARTITION BY PERIOD ORDER BY "ADJ_TO%") AS ADJ_TO_RANK,
        RANK() OVER (PARTITION BY PERIOD ORDER BY "ADJ_FD%") AS ADJ_FD_RANK
    FROM period_stats
    WHERE PERIOD IS NOT NULL
)
SELECT 
    TEAM,
    PERIOD,
    TOTAL_PLAYS,
    "2PM",
    "2PA", 
    "2P%",
    "3PM",
    "3PA",
    "3P%",
    TURNOVERS,
    "ADJ_TO%",
    ADJ_TO_RANK,
    FLS_DRAWN,
    "ADJ_FD%",
    ADJ_FD_RANK
FROM ranked_stats
-- HAVING
-- 	PERIOD = 'Q4'
ORDER BY TEAM, 
         CASE PERIOD 
             WHEN 'Q1' THEN 1 
             WHEN 'Q2' THEN 2 
             WHEN 'Q3' THEN 3 
             WHEN 'Q4' THEN 4 
             WHEN 'OT' THEN 5 
         END;