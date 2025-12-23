import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, Trophy, TrendingUp, ChevronRight, Target, Award } from 'lucide-react';

const LeagueStatsPage = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('mens');

  const colorScheme = {
    background: '#f8f8f8',
    cardBg: '#ffffff',
    cardBorder: '#fff1e6',
    primaryText: '#333333',
    secondaryText: '#5a5a5a',
    accentLight: '#fff1e6',
    accent: '#ff9a5a',
  };

  // Sample player leaderboard data
  const playerLeaders = {
    mens: [
      { rank: 1, name: 'Player A', team: 'RPI', stat: '45.2%', category: '3P%' },
      { rank: 2, name: 'Player B', team: 'Ithaca', stat: '44.8%', category: '3P%' },
      { rank: 3, name: 'Player C', team: 'St. Lawrence', stat: '43.1%', category: '3P%' },
      { rank: 4, name: 'Player D', team: 'Union', stat: '42.5%', category: '3P%' },
      { rank: 5, name: 'Player E', team: 'RIT', stat: '41.9%', category: '3P%' },
    ],
    womens: [
      { rank: 1, name: 'Player F', team: 'William Smith', stat: '46.3%', category: '3P%' },
      { rank: 2, name: 'Player G', team: 'RIT', stat: '44.2%', category: '3P%' },
      { rank: 3, name: 'Player H', team: 'Vassar', stat: '43.7%', category: '3P%' },
      { rank: 4, name: 'Player I', team: 'Skidmore', stat: '42.8%', category: '3P%' },
      { rank: 5, name: 'Player J', team: 'Clarkson', stat: '41.5%', category: '3P%' },
    ],
  };

  // Sample team leaderboard data
  const teamLeaders = {
    mens: [
      { rank: 1, team: 'RPI', stat: '82.4', category: 'PPG' },
      { rank: 2, team: 'Ithaca', stat: '79.8', category: 'PPG' },
      { rank: 3, team: 'St. Lawrence', stat: '77.3', category: 'PPG' },
      { rank: 4, team: 'Hobart', stat: '75.6', category: 'PPG' },
      { rank: 5, team: 'Union', stat: '74.2', category: 'PPG' },
    ],
    womens: [
      { rank: 1, team: 'William Smith', stat: '76.8', category: 'PPG' },
      { rank: 2, team: 'Ithaca', stat: '74.2', category: 'PPG' },
      { rank: 3, team: 'RIT', stat: '72.5', category: 'PPG' },
      { rank: 4, team: 'Vassar', stat: '71.3', category: 'PPG' },
      { rank: 5, team: 'Skidmore', stat: '69.8', category: 'PPG' },
    ],
  };

  const styles = {
    container: {
      minHeight: 'calc(100vh - 80px)',
      padding: '40px 20px',
      fontFamily: "'JetBrains Mono', monospace",
    },
    contentWrapper: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: '50px',
    },
    title: {
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      fontWeight: '700',
      color: colorScheme.primaryText,
      marginBottom: '15px',
    },
    subtitle: {
      fontSize: '1rem',
      color: colorScheme.secondaryText,
      maxWidth: '600px',
      margin: '0 auto 30px',
      lineHeight: '1.6',
    },
    toggleContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      marginBottom: '40px',
    },
    toggleButton: {
      padding: '12px 30px',
      fontSize: '1rem',
      fontWeight: '600',
      fontFamily: "'JetBrains Mono', monospace",
      border: `2px solid ${colorScheme.accent}`,
      borderRadius: '25px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    toggleActive: {
      backgroundColor: colorScheme.accent,
      color: 'white',
    },
    toggleInactive: {
      backgroundColor: 'transparent',
      color: colorScheme.accent,
    },
    sectionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
      gap: '40px',
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
    },
    sectionCard: {
      backgroundColor: colorScheme.cardBg,
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(255, 154, 90, 0.1)',
      border: `1px solid ${colorScheme.cardBorder}`,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    sectionHeader: {
      backgroundColor: colorScheme.accentLight,
      padding: '25px 30px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      borderBottom: `1px solid ${colorScheme.cardBorder}`,
    },
    sectionIcon: {
      width: '50px',
      height: '50px',
      borderRadius: '12px',
      backgroundColor: colorScheme.accent,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
    },
    sectionTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: colorScheme.primaryText,
    },
    sectionDescription: {
      fontSize: '0.85rem',
      color: colorScheme.secondaryText,
      marginTop: '5px',
    },
    tableContainer: {
      padding: '0',
      flex: 1,
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      backgroundColor: '#fafafa',
    },
    th: {
      padding: '15px 20px',
      textAlign: 'left',
      fontSize: '0.75rem',
      fontWeight: '700',
      color: colorScheme.secondaryText,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      borderBottom: `1px solid ${colorScheme.cardBorder}`,
    },
    tr: {
      borderBottom: `1px solid ${colorScheme.cardBorder}`,
      transition: 'background-color 0.2s ease',
    },
    td: {
      padding: '15px 20px',
      fontSize: '0.9rem',
      color: colorScheme.primaryText,
    },
    rankCell: {
      fontWeight: '700',
      color: colorScheme.accent,
      width: '50px',
    },
    statCell: {
      fontWeight: '700',
      color: colorScheme.primaryText,
    },
    sectionFooter: {
      padding: '20px 30px',
      borderTop: `1px solid ${colorScheme.cardBorder}`,
    },
    exploreButton: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      padding: '15px',
      backgroundColor: colorScheme.accentLight,
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '1rem',
      fontWeight: '600',
      color: colorScheme.accent,
      transition: 'all 0.3s ease',
    },
    descriptionContainer: {
      padding: '25px 30px',
      backgroundColor: '#fafafa',
      borderTop: `1px solid ${colorScheme.cardBorder}`,
    },
    descriptionText: {
      fontSize: '0.9rem',
      color: colorScheme.secondaryText,
      lineHeight: '1.6',
    },
  };

  const currentPlayerLeaders = playerLeaders[selectedGender];
  const currentTeamLeaders = teamLeaders[selectedGender];

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Liberty League Statistics</h1>
          <p style={styles.subtitle}>
            Explore comprehensive statistics from across the Liberty League. 
            View player and team leaderboards, compare performances, and track trends 
            throughout the season.
          </p>

          {/* Gender Toggle */}
          <div style={styles.toggleContainer}>
            <button
              style={{
                ...styles.toggleButton,
                ...(selectedGender === 'mens' ? styles.toggleActive : styles.toggleInactive),
              }}
              onClick={() => setSelectedGender('mens')}
              onMouseOver={(e) => {
                if (selectedGender !== 'mens') {
                  e.currentTarget.style.backgroundColor = colorScheme.accentLight;
                }
              }}
              onMouseOut={(e) => {
                if (selectedGender !== 'mens') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              Men's
            </button>
            <button
              style={{
                ...styles.toggleButton,
                ...(selectedGender === 'womens' ? styles.toggleActive : styles.toggleInactive),
              }}
              onClick={() => setSelectedGender('womens')}
              onMouseOver={(e) => {
                if (selectedGender !== 'womens') {
                  e.currentTarget.style.backgroundColor = colorScheme.accentLight;
                }
              }}
              onMouseOut={(e) => {
                if (selectedGender !== 'womens') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              Women's
            </button>
          </div>
        </div>

        {/* Stats Sections */}
        <div style={styles.sectionsGrid}>
          {/* Player Leaderboard Section */}
          <div style={styles.section}>
            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIcon}>
                  <Target size={24} />
                </div>
                <div>
                  <h2 style={styles.sectionTitle}>Player Leaderboards</h2>
                  <p style={styles.sectionDescription}>Top performers across the league</p>
                </div>
              </div>

              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead style={styles.tableHeader}>
                    <tr>
                      <th style={styles.th}>Rank</th>
                      <th style={styles.th}>Player</th>
                      <th style={styles.th}>Team</th>
                      <th style={styles.th}>3P%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPlayerLeaders.map((player, index) => (
                      <tr 
                        key={index} 
                        style={styles.tr}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{...styles.td, ...styles.rankCell}}>#{player.rank}</td>
                        <td style={styles.td}>{player.name}</td>
                        <td style={styles.td}>{player.team}</td>
                        <td style={{...styles.td, ...styles.statCell}}>{player.stat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={styles.descriptionContainer}>
                <p style={styles.descriptionText}>
                  <strong>About Player Leaderboards:</strong> Track individual player 
                  performance across various statistical categories including points, 
                  rebounds, assists, steals, blocks, and shooting percentages.
                </p>
              </div>

              <div style={styles.sectionFooter}>
                <button
                  style={styles.exploreButton}
                  onClick={() => navigate('/liberty-league-stats/players')}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = colorScheme.accent;
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = colorScheme.accentLight;
                    e.currentTarget.style.color = colorScheme.accent;
                  }}
                >
                  Explore Player Stats
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Team Leaderboard Section */}
          <div style={styles.section}>
            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIcon}>
                  <Trophy size={24} />
                </div>
                <div>
                  <h2 style={styles.sectionTitle}>Team Leaderboards</h2>
                  <p style={styles.sectionDescription}>Conference team rankings</p>
                </div>
              </div>

              <div style={styles.tableContainer}>
                <table style={styles.table}>
                  <thead style={styles.tableHeader}>
                    <tr>
                      <th style={styles.th}>Rank</th>
                      <th style={styles.th}>Team</th>
                      <th style={styles.th}>PPG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTeamLeaders.map((team, index) => (
                      <tr 
                        key={index} 
                        style={styles.tr}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{...styles.td, ...styles.rankCell}}>#{team.rank}</td>
                        <td style={styles.td}>{team.team}</td>
                        <td style={{...styles.td, ...styles.statCell}}>{team.stat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={styles.descriptionContainer}>
                <p style={styles.descriptionText}>
                  <strong>About Team Leaderboards:</strong> Compare team performance 
                  across the Liberty League. View offensive and defensive statistics, 
                  conference standings, and historical trends.
                </p>
              </div>

              <div style={styles.sectionFooter}>
                <button
                  style={styles.exploreButton}
                  onClick={() => navigate('/liberty-league-stats/teams')}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = colorScheme.accent;
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = colorScheme.accentLight;
                    e.currentTarget.style.color = colorScheme.accent;
                  }}
                >
                  Explore Team Stats
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueStatsPage;

