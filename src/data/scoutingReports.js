/**
 * Custom Scouting Reports Data
 * 
 * Add custom scouting reports for specific opponents here.
 * If no custom report exists, the default template will be shown.
 * 
 * Structure:
 * - Key: normalized opponent name (lowercase, spaces removed)
 * - hasReport: boolean indicating if report is available
 * - content: custom report content with sections
 */

export const scoutingReports = {
  womens: {
    'st.lawrence': {
      hasReport: true,
      content: {
        conferenceRecord: [
          { result: 'L', opponent: 'William Smith Herons', score: '60-56' },
          { result: 'W', opponent: 'Skidmore Thoroughbreds', score: '61-59' },
          { result: 'L', opponent: 'Vassar', score: '70-58' },
          { result: 'W', opponent: 'Bard College', score: '61-45' },
          { result: 'W', opponent: 'Clarkson', score: '68-55' },
          { result: 'W', opponent: 'RPI', score: '68-63' },
          { result: 'L', opponent: 'Union', score: '57-80' },
        ],
        keyPlayer: {
          name: 'Jackie Malley',
          notes: [
            'Left-handed. Everything looks to go left.',
            'Drive Direction: 44 total drives; 38 going left (11-26 from 2), 6 going right (2-5)',
            'Draws fouls 23% of the time when driving left',
            'Will shoot off handoffs and spot-ups if given space',
          ],
          spotUpBreakdown: {
            totalPlays: 96,
            details: [
              '64 Catch-and-Shoot (No Dribble)',
              '29 Drives Left',
              '3 Drives Right',
            ]
          }
        },
        teamIdentity: {
          title: 'Ball Security',
          points: [
            'St. Lawrence leads the Liberty League in TO% (13.9%). They pride themselves on taking care of the ball.',
            'We cannot lose the turnover battle.',
            'Against Union, St. Lawrence was minus four in turnover margin (13-9). Key contributors: Izzy Caron (3), Hannah Van Dyke (3), Annie Perry (3)',
          ]
        },
        offensiveAnalysis: [
          {
            title: 'Handoffs (99th Percentile in Play Frequency)',
            points: [
              'Jackie Malley: 4th highest PPP on handoffs in the Liberty League. 86% of handoffs result in three-point attempts.',
              'Hannah Van Dyke: 6th highest PPP on handoffs. 66.7% result in three-point attempts, 23.8% result in long mid-range jumpers.',
            ]
          },
          {
            title: 'Isolations (98th Percentile in Play Frequency)',
            points: [
              '7.5 isolations per game in last 4 losses',
              '3.3 isolations per game in last 6 wins',
              'Annie Perry: Responsible for 43 of the team\'s 80 isolation plays',
              'Favors the fake handoff going right before attacking the rim. Be prepared to send early help from the weak side.',
              'Help can come from Mason Baker-Schlendering (0 three-point attempts this year) or Stevie Bannon.',
              'Drives going left often end in a step-back three or long two. These are shots we can live with.',
              'All other players shoot above 35% from three (Annie Perry: 43.9% on the year)',
            ]
          },
          {
            title: 'Spot-Ups (96th Percentile in Play Frequency)',
            points: [
              'Jackie Malley: 3rd highest PPP on spot-ups in the Liberty League. 75% result in three-point attempts.',
            ]
          },
          {
            title: 'Offensive Rebounds (4th Percentile in Play Frequency)',
            points: [
              'Lack of size. Combined with their low turnover rate, we cannot afford to give them extra possessions.',
            ]
          },
        ],
        defensiveVulnerabilities: [
          {
            title: 'Post-Ups (6th Percentile in PPP Allowed)',
            points: [
              'Mason Baker-Schlendering: 20th percentile in PPP allowed',
            ],
            personnel: [
              'Faye: 2nd highest PPP on post-ups in the Liberty League',
              'Syd Pearson: 5th highest PPP on post-ups',
              'Ben: 7th highest PPP on post-ups',
            ],
            strategy: 'Utilize cross screens and actions to establish Faye deep in the post.',
          },
          {
            title: 'Transition Defense (75th Percentile in PPP Allowed)',
            points: [
              'RIT ranks in the 0th percentile for transition play frequency.',
            ],
            strategy: 'Control the tempo. St. Lawrence is a guard-heavy team that excels in uptempo games. Playing at our pace maximizes our offensive strengths.',
          },
        ],
        gamePlanSummary: {
          offensiveKeys: [
            'Attack post-ups. Faye, Syd Pearson, and Ben all have favorable matchups.',
            'Control tempo. Do not run with them.',
          ],
          defensiveKeys: [
            'Force Malley right. Limit her left-hand drives.',
            'Provide early help on Annie Perry isolations from the weak side.',
            'Crash the defensive glass. No second chances.',
            'Win the turnover battle.',
          ]
        }
      }
    },
    'clarkson': {
      hasReport: true,
      content: {
        teamOverview: {
          title: 'Team Overview',
          paragraphs: [
            'Clarkson enters this matchup in a cold streak offensively, averaging 54.7 points per game, the third worst in the Liberty League. They do shoot 38.1% from the field, which is the third best in the conference, however they are last in the conference in field goals attempted. Their roster features a young squad mainly composed of juniors and freshman, with only one senior in the starting lineup.',
            'The team\'s strength lies in their ability to cut to open space at a very high level. They can slow the game down and patiently wait for high quality attempts to open. A 49.1% field goal percentage results from these looks.',
          ]
        },
        offensiveAnalysis: [
          {
            title: 'Offensive Tendencies',
            points: [
              'Clarkson runs a motion-based offense that emphasizes ball movement and player movement.',
              'They prefer to score in the paint as much as possible through basket cuts, as about 46% of their total points come from scoring at the rim, which they convert 49.7% of the time.',
              'A major weakness in their game is poor ball security, especially in transition and the pick-and-roll.',
              'The team has a 24.5% overall turnover percentage, which rises to 34% in transition and 36% for the pick-and-roll ball-handlers.',
              'A large percentage of looks for players lies in spot-up threes, however they only convert 27% of the time.',
            ]
          },
        ],
        defensiveAnalysis: {
          title: 'Defensive Schemes',
          points: [
            'Defensively, they employ man-to-man defense with occasional zone looks in specific situations.',
            'They excel in guarding spot-up threes and transition opportunities.',
            'However, defending cuts and the pick-and-roll ball-handler has been a struggle for them all season.',
            'In these scenarios, they are often ball-watching and not communicating switches effectively, leading to confusion.',
            'They are also third to last in the Liberty League in offensive rebounds.',
          ]
        },
        possibleStrategies: {
          offensiveKeys: [
            'Take advantage of poor defensive communication by prioritizing ball movement and player movement to obtain open looks.',
            'Utilize cuts, pick-and-rolls, off screens, etc. to create opportunities.',
            'Slow the game down to limit their effectiveness in transition defense.',
          ],
          defensiveKeys: [
            'Limit their paint touches by providing help defense early.',
            'Close passing lanes and force them into contested outside shots.',
            'Pick up early in transition to force pressure and cause turnovers.',
            'In the pick-and-roll, switch quickly and/or go under screens; forcing the ball-handler to make a decision causes turnovers.',
            'Maintain dominance on defensive rebounds and don\'t get lazy while boxing out.',
          ]
        },
        keyPlayers: [
          {
            name: 'Bella Doyle',
            notes: [
              'Excellent in cutting to the basket (11-15 FGA) and off of screens (5-10 FGA)',
              'Doesn\'t shoot spot-up threes too often, however she can make them (6-14)',
              'Can drive both ways. Frequency is about the same.',
              'Doesn\'t shoot mid-ranges. Everything is either around the rim or a three',
            ],
            cutsBreakdown: {
              totalPlays: 40,
              details: [
                '19 Basket',
                '11 Screen',
                '10 Flash',
              ]
            },
            spotUpBreakdown: {
              totalPlays: 35,
              details: [
                '19 Catch-and-Shoot (No Dribble)',
                '7 Drives Left',
                '9 Drives Right',
              ]
            }
          },
          {
            name: 'Fallon Griffin',
            notes: [
              'High volume 3-point shooter. About 60% of her shot attempts are from behind the arc at a 34% conversion rate.',
              'Cuts to the basket at a high level (15-27 FGA)',
              'Struggles from three while in transition (3-13 3PA). She will mostly be found on the left wing (1-7 3PA)',
              'Has difficulty driving to the rim (4-12 FGA).',
            ],
            spotUpBreakdown: {
              totalPlays: 82,
              details: [
                '70 Catch-and-Shoot (No Dribble)',
                '5 Drives Left',
                '7 Drives Right',
              ]
            }
          }
        ]
      }
    },
    // Add more women's opponent reports here
  },
  mens: {
    'st.lawrence': {
      hasReport: true,
      content: {
        teamOverview: {
          title: 'Team Overview',
          paragraphs: [
            'St. Lawrence is undefeated (5-0) at home, looking to extend their winning streak at what is game 3 of a six-game home-stand. As of late, St. Lawrence\'s offense has been powered by the trio of Dan Anderson (#3), Tommy McMahon (#10), and Adam Dudzinski (#33).',
          ]
        },
        offensiveAnalysis: [
          {
            title: 'Offensive Tendencies',
            points: [
              'St. Lawrence is a team that lives and dies off their ability to get to the paint.',
              'They rank #1 in both FTA/FGA and FT% in the Liberty League.',
              'Conversely, they have the lowest 3P% in their respective league.',
              'The Saints are a dominant PnR team — their guards, in particular Anderson and McMahon, are great at using their speed to get in the paint.',
              'Watching the film, these guards have been able to score in the paint successfully due to defensive errs from the roll man defender; either from being too focused on the roller or getting blown past by the ball-handler.',
              'The Saints are also a team that excels in the post thanks to Dudzinski.',
            ]
          },
        ],
        defensiveAnalysis: {
          title: 'Defensive Schemes',
          points: [
            'St. Lawrence has one of the better defenses in the Liberty League, being #5 in opponent FG%, #3 in OPPG, and #4 in OPPP.',
            'A "defense on a string." St. Lawrence\'s connected defense consistently helps on drives, with weakside defenders rotating on time and in sequence, taking away passing lanes while crowding the ball handler\'s vision.',
          ]
        },
        keyPlayers: [
          {
            name: '#3: Dan Anderson',
            notes: [
              'One of St. Lawrence\'s high PnR-usage players, scoring 0.975 PPP on these types of plays.',
              'Anderson much rather prefers to drive right.',
              'Anderson scores 52.4% FG on right drives, compared to 31.3% FG on left drives.',
              'In the PnR, Anderson scores 57.1% on right PnR\'s, compared to 33.3% on left PnR\'s.',
              'Despite a high-volume shooter (over 6 att. per game), Anderson is a 26.3% 3-point shooter.',
            ],
            driveBreakdown: {
              right: { fg: '52.4%', pnr: '57.1%' },
              left: { fg: '31.3%', pnr: '33.3%' }
            }
          },
          {
            name: '#10: Tommy McMahon',
            notes: [
              'Just like Anderson, McMahon is another one of St. Lawrence\'s high PnR users.',
              'Most of the guard\'s PnR frequency comes from the high PnR.',
              '55.6 FG% on shots as the PnR ball-handler.',
              'Similar to Anderson, McMahon is a 17.2% 3-point shooter.',
            ]
          },
          {
            name: '#33: Adam Dudzinski',
            notes: [
              'A 6\'8 forward, Dudzinski is often able to successfully score in the post, whether in isolation or spot-up.',
              'Through a combination of strength, good footwork, a long wingspan, and willingness to draw contact, he has a score percentage of 60% on such shots.',
              'Dudzinski is also a very capable 3-point shooter, shooting 35.9% on 5.2 3PA per game.',
              'Dudzinski rarely drives left. He drove left only once, out of his 14 isolations.',
              'In spot-ups, he drove left on just 10 out of 52 possessions, in which he scored 28.6% FG.',
            ],
            spotUpBreakdown: {
              totalPlays: 52,
              details: [
                'Drives Left: 10 possessions (28.6% FG)',
                'Isolations Left: 1 out of 14 total',
              ]
            },
            shotChart: '/imgs/stl-dudzinski-shotchart.png'
          }
        ],
        analyticalGameplan: {
          title: 'Analytically Proposed Gameplan',
          offensiveKeys: {
            title: 'Offensive Keys',
            points: [
              'Because this defense tends to overhelp, keep the ball moving. Good, open shots are more likely on the second or third pass.',
              'St. Lawrence\'s aggressive closeouts create opportunities to drive to the basket and further scramble the defense.',
            ]
          },
          defensiveKeys: {
            title: 'Defensive Keys',
            points: [
              'Disciplined defense — St. Lawrence is a team that has thrived off getting to the free-throw line. Players like Dudzinski will take advantage.',
              'Going under screens, daring St. Lawrence\'s ball-handlers to shoot the ball rather than letting them cause damage inside the paint.',
              'Help defense on drives, as well as soft hedging against the Saints\' PnR: have the big briefly contain the ball handler until his defender recovers, then have the big retreat to guard the roll man.',
              'Have Dudzinski receive the ball well outside the paint. Deny any entry passes into the low post!',
              'Most importantly, force these 3 players left — Anderson, McMahon, and Dudzinski. Statistics and film show that they\'ve been contained in isolation, drives, and in the PnR when they\'ve been dribbling left.',
            ]
          }
        },
        gamePlanSummary: {
          offensiveKeys: [
            'Attack the paint and draw fouls — force St. Lawrence to defend without fouling.',
            'Control tempo and limit transition opportunities for their guards.',
          ],
          defensiveKeys: [
            'Force Anderson and McMahon left — they are significantly less effective going left.',
            'Roll man defender must stay disciplined — don\'t overcommit to the roller or get blown past by the ball-handler.',
            'Limit Dudzinski\'s post touches — front the post or send early help.',
            'Contest all Dudzinski three-point attempts (35.9% shooter on 5.2 attempts per game).',
            'Be aware of their connected help defense — move the ball quickly and attack before rotations arrive.',
          ]
        }
      }
    },
    // Add more men's opponent reports here
  }
};

/**
 * Get a scouting report for a specific opponent
 * @param {string} opponent - The opponent name
 * @param {string} gender - 'mens' or 'womens'
 * @returns {object|null} - The scouting report or null if not found
 */
export const getScoutingReport = (opponent, gender) => {
  const normalizedName = opponent.toLowerCase().replace(/\s+/g, '');
  const genderReports = scoutingReports[gender] || {};
  
  // Try exact match first
  if (genderReports[normalizedName]) {
    return genderReports[normalizedName];
  }
  
  // Try with periods in name (e.g., "st.lawrence")
  const withPeriods = normalizedName.replace(/st(\w)/g, 'st.$1');
  if (genderReports[withPeriods]) {
    return genderReports[withPeriods];
  }
  
  // Try matching partial name
  for (const key in genderReports) {
    if (normalizedName.includes(key.replace(/\./g, '')) || key.replace(/\./g, '').includes(normalizedName)) {
      return genderReports[key];
    }
  }
  
  return null;
};

/**
 * Check if a custom scouting report exists for an opponent
 * @param {string} opponent - The opponent name
 * @param {string} gender - 'mens' or 'womens'
 * @returns {boolean} - True if a custom report exists
 */
export const hasScoutingReport = (opponent, gender) => {
  const report = getScoutingReport(opponent, gender);
  return report?.hasReport === true;
};

export default scoutingReports;

