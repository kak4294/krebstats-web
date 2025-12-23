import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, TrendingUp, Shield } from 'lucide-react';

const TeamLeaderboardsPage = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('mens');
  const [selectedCategory, setSelectedCategory] = useState('offense');

  const colorScheme = {
    background: '#f8f8f8',
    cardBg: '#ffffff',
    cardBorder: '#fff1e6',
    primaryText: '#333333',
    secondaryText: '#5a5a5a',
    accentLight: '#fff1e6',
    accent: '#ff9a5a',
  };

  const offensiveCategories = [
    { id: 'ppg', label: 'Points Per Game', abbrev: 'PPG' },
    { id: 'fg_pct', label: 'Field Goal %', abbrev: 'FG%' },
    { id: 'three_pct', label: '3-Point %', abbrev: '3P%' },
    { id: 'ft_pct', label: 'Free Throw %', abbrev: 'FT%' },
    { id: 'assists', label: 'Assists Per Game', abbrev: 'APG' },
    { id: 'turnovers', label: 'Turnovers Per Game', abbrev: 'TPG' },
  ];

  const defensiveCategories = [
    { id: 'opp_ppg', label: 'Opponent PPG', abbrev: 'OPP PPG' },
    { id: 'rebounds', label: 'Rebounds Per Game', abbrev: 'RPG' },
    { id: 'steals', label: 'Steals Per Game', abbrev: 'SPG' },
    { id: 'blocks', label: 'Blocks Per Game', abbrev: 'BPG' },
  ];

  // Sample data
  const sampleTeamData = [
    { rank: 1, team: 'RPI', record: '6-2', stat: '82.4' },
    { rank: 2, team: 'Ithaca', record: '5-3', stat: '79.8' },
    { rank: 3, team: 'St. Lawrence', record: '5-3', stat: '77.3' },
    { rank: 4, team: 'Hobart', record: '4-4', stat: '75.6' },
    { rank: 5, team: 'Union', record: '4-4', stat: '74.2' },
    { rank: 6, team: 'Clarkson', record: '4-4', stat: '72.8' },
    { rank: 7, team: 'RIT', record: '2-6', stat: '71.5' },
    { rank: 8, team: 'Vassar', record: '3-5', stat: '70.1' },
    { rank: 9, team: 'Skidmore', record: '3-5', stat: '68.9' },
    { rank: 10, team: 'Bard', record: '2-6', stat: '65.4' },
  ];

  const styles = {
    container: {
      minHeight: 'calc(100vh - 80px)',
      padding: '40px 20px',
      fontFamily: "'JetBrains Mono', monospace",
    },
    contentWrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 20px',
      backgroundColor: 'transparent',
      border: `2px solid ${colorScheme.accent}`,
      borderRadius: '12px',
      color: colorScheme.accent,
      cursor: 'pointer',
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: '600',
      fontSize: '0.9rem',
      marginBottom: '30px',
      transition: 'all 0.3s ease',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    title: {
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      fontWeight: '700',
      color: colorScheme.primaryText,
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
    },
    subtitle: {
      fontSize: '0.95rem',
      color: colorScheme.secondaryText,
    },
    filtersContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      marginBottom: '30px',
      justifyContent: 'center',
    },
    toggleGroup: {
      display: 'flex',
      gap: '5px',
      backgroundColor: '#f5f5f5',
      padding: '5px',
      borderRadius: '15px',
    },
    toggleButton: {
      padding: '10px 20px',
      fontSize: '0.9rem',
      fontWeight: '600',
      fontFamily: "'JetBrains Mono', monospace",
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    categoryToggle: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      marginBottom: '30px',
    },
    categoryTab: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 25px',
      fontSize: '0.95rem',
      fontWeight: '600',
      fontFamily: "'JetBrains Mono', monospace",
      border: `2px solid ${colorScheme.cardBorder}`,
      borderRadius: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    tableCard: {
      backgroundColor: colorScheme.cardBg,
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(255, 154, 90, 0.1)',
      border: `1px solid ${colorScheme.cardBorder}`,
    },
    tableHeader: {
      backgroundColor: colorScheme.accentLight,
      padding: '20px 25px',
      borderBottom: `1px solid ${colorScheme.cardBorder}`,
    },
    tableTitle: {
      fontSize: '1.2rem',
      fontWeight: '700',
      color: colorScheme.primaryText,
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
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
      backgroundColor: '#fafafa',
    },
    tr: {
      borderBottom: `1px solid ${colorScheme.cardBorder}`,
      transition: 'background-color 0.2s ease',
    },
    td: {
      padding: '18px 20px',
      fontSize: '0.95rem',
      color: colorScheme.primaryText,
    },
    rankCell: {
      fontWeight: '700',
      color: colorScheme.accent,
      width: '60px',
    },
    statCell: {
      fontWeight: '700',
      color: colorScheme.primaryText,
    },
    placeholder: {
      padding: '60px',
      textAlign: 'center',
      color: colorScheme.secondaryText,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Back Button */}
        <button
          style={styles.backButton}
          onClick={() => navigate('/liberty-league-stats')}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = colorScheme.accent;
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colorScheme.accent;
          }}
        >
          <ArrowLeft size={18} />
          Back to Statistics
        </button>

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            <Trophy size={28} color={colorScheme.accent} />
            Team Leaderboards
          </h1>
          <p style={styles.subtitle}>
            Team statistics and rankings across the Liberty League
          </p>
        </div>

        {/* Gender Filter */}
        <div style={styles.filtersContainer}>
          <div style={styles.toggleGroup}>
            {['mens', 'womens'].map((gender) => (
              <button
                key={gender}
                style={{
                  ...styles.toggleButton,
                  backgroundColor: selectedGender === gender ? colorScheme.accent : 'transparent',
                  color: selectedGender === gender ? 'white' : colorScheme.primaryText,
                }}
                onClick={() => setSelectedGender(gender)}
              >
                {gender === 'mens' ? "Men's" : "Women's"}
              </button>
            ))}
          </div>
        </div>

        {/* Offense/Defense Toggle */}
        <div style={styles.categoryToggle}>
          <button
            style={{
              ...styles.categoryTab,
              backgroundColor: selectedCategory === 'offense' ? colorScheme.accent : 'white',
              color: selectedCategory === 'offense' ? 'white' : colorScheme.primaryText,
              borderColor: selectedCategory === 'offense' ? colorScheme.accent : colorScheme.cardBorder,
            }}
            onClick={() => setSelectedCategory('offense')}
          >
            <TrendingUp size={18} />
            Offensive Stats
          </button>
          <button
            style={{
              ...styles.categoryTab,
              backgroundColor: selectedCategory === 'defense' ? colorScheme.accent : 'white',
              color: selectedCategory === 'defense' ? 'white' : colorScheme.primaryText,
              borderColor: selectedCategory === 'defense' ? colorScheme.accent : colorScheme.cardBorder,
            }}
            onClick={() => setSelectedCategory('defense')}
          >
            <Shield size={18} />
            Defensive Stats
          </button>
        </div>

        {/* Leaderboard Table */}
        <div style={styles.tableCard}>
          <div style={styles.tableHeader}>
            <h2 style={styles.tableTitle}>
              {selectedGender === 'mens' ? "Men's" : "Women's"} {selectedCategory === 'offense' ? 'Offensive' : 'Defensive'} Rankings
            </h2>
          </div>
          
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Rank</th>
                <th style={styles.th}>Team</th>
                <th style={styles.th}>Record</th>
                <th style={styles.th}>{selectedCategory === 'offense' ? 'PPG' : 'OPP PPG'}</th>
              </tr>
            </thead>
            <tbody>
              {sampleTeamData.map((team, index) => (
                <tr 
                  key={index} 
                  style={styles.tr}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{...styles.td, ...styles.rankCell}}>#{team.rank}</td>
                  <td style={styles.td}>{team.team}</td>
                  <td style={styles.td}>{team.record}</td>
                  <td style={{...styles.td, ...styles.statCell}}>{team.stat}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.placeholder}>
            <p style={{ fontWeight: '600', marginBottom: '10px' }}>
              Full team statistics coming soon
            </p>
            <p style={{ fontSize: '0.85rem' }}>
              This page will display complete team statistics from the Liberty League database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLeaderboardsPage;

