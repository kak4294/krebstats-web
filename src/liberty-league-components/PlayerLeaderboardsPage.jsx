import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, TrendingUp, Award } from 'lucide-react';

const PlayerLeaderboardsPage = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState('mens');
  const [selectedCategory, setSelectedCategory] = useState('points');

  const colorScheme = {
    background: '#f8f8f8',
    cardBg: '#ffffff',
    cardBorder: '#fff1e6',
    primaryText: '#333333',
    secondaryText: '#5a5a5a',
    accentLight: '#fff1e6',
    accent: '#ff9a5a',
  };

  const categories = [
    { id: 'points', label: 'Points Per Game', abbrev: 'PPG' },
    { id: 'rebounds', label: 'Rebounds Per Game', abbrev: 'RPG' },
    { id: 'assists', label: 'Assists Per Game', abbrev: 'APG' },
    { id: 'steals', label: 'Steals Per Game', abbrev: 'SPG' },
    { id: 'blocks', label: 'Blocks Per Game', abbrev: 'BPG' },
    { id: 'fg_pct', label: 'Field Goal %', abbrev: 'FG%' },
    { id: 'three_pct', label: '3-Point %', abbrev: '3P%' },
    { id: 'ft_pct', label: 'Free Throw %', abbrev: 'FT%' },
  ];

  // Sample data - would be populated from backend
  const sampleData = {
    points: [
      { rank: 1, name: 'Sample Player 1', team: 'RPI', games: 8, stat: '22.4' },
      { rank: 2, name: 'Sample Player 2', team: 'Ithaca', games: 8, stat: '20.1' },
      { rank: 3, name: 'Sample Player 3', team: 'St. Lawrence', games: 7, stat: '19.8' },
      { rank: 4, name: 'Sample Player 4', team: 'Union', games: 8, stat: '18.5' },
      { rank: 5, name: 'Sample Player 5', team: 'RIT', games: 8, stat: '17.9' },
      { rank: 6, name: 'Sample Player 6', team: 'Hobart', games: 7, stat: '17.2' },
      { rank: 7, name: 'Sample Player 7', team: 'Clarkson', games: 8, stat: '16.8' },
      { rank: 8, name: 'Sample Player 8', team: 'Vassar', games: 8, stat: '16.3' },
      { rank: 9, name: 'Sample Player 9', team: 'Skidmore', games: 7, stat: '15.9' },
      { rank: 10, name: 'Sample Player 10', team: 'Bard', games: 8, stat: '15.4' },
    ],
  };

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
    categoryScroll: {
      display: 'flex',
      gap: '10px',
      overflowX: 'auto',
      padding: '10px 0',
      marginBottom: '30px',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    categoryButton: {
      padding: '10px 20px',
      fontSize: '0.85rem',
      fontWeight: '600',
      fontFamily: "'JetBrains Mono', monospace",
      border: `2px solid ${colorScheme.cardBorder}`,
      borderRadius: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
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

  const currentCategoryLabel = categories.find(c => c.id === selectedCategory)?.label || 'Points Per Game';

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
            <Target size={28} color={colorScheme.accent} />
            Player Leaderboards
          </h1>
          <p style={styles.subtitle}>
            Individual player statistics across the Liberty League
          </p>
        </div>

        {/* Filters */}
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

        {/* Category Buttons */}
        <div style={styles.categoryScroll}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              style={{
                ...styles.categoryButton,
                backgroundColor: selectedCategory === cat.id ? colorScheme.accent : 'white',
                color: selectedCategory === cat.id ? 'white' : colorScheme.primaryText,
                borderColor: selectedCategory === cat.id ? colorScheme.accent : colorScheme.cardBorder,
              }}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div style={styles.tableCard}>
          <div style={styles.tableHeader}>
            <h2 style={styles.tableTitle}>
              {selectedGender === 'mens' ? "Men's" : "Women's"} {currentCategoryLabel} Leaders
            </h2>
          </div>
          
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Rank</th>
                <th style={styles.th}>Player</th>
                <th style={styles.th}>Team</th>
                <th style={styles.th}>Games</th>
                <th style={styles.th}>{categories.find(c => c.id === selectedCategory)?.abbrev}</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.points.map((player, index) => (
                <tr 
                  key={index} 
                  style={styles.tr}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <td style={{...styles.td, ...styles.rankCell}}>#{player.rank}</td>
                  <td style={styles.td}>{player.name}</td>
                  <td style={styles.td}>{player.team}</td>
                  <td style={styles.td}>{player.games}</td>
                  <td style={{...styles.td, ...styles.statCell}}>{player.stat}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={styles.placeholder}>
            <p style={{ fontWeight: '600', marginBottom: '10px' }}>
              Full leaderboard data coming soon
            </p>
            <p style={{ fontSize: '0.85rem' }}>
              This page will display complete player statistics from the Liberty League database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerLeaderboardsPage;

