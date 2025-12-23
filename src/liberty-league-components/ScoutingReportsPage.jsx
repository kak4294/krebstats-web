import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Calendar, MapPin, Trophy, Users, Clock, Home, Plane, FileText } from 'lucide-react';
import { mensSchedule, mensSummary } from '../data/mensSchedule';
import { womensSchedule, womensSummary } from '../data/womensSchedule';
import { hasReports } from '../data/reportMappings';

const ScoutingReportsPage = () => {
  const [selectedTeam, setSelectedTeam] = useState('mens');
  const navigate = useNavigate();

  const schedule = selectedTeam === 'mens' ? mensSchedule : womensSchedule;
  const summary = selectedTeam === 'mens' ? mensSummary : womensSummary;

  const colorScheme = {
    background: '#f8f8f8',
    cardBg: '#ffffff',
    cardBorder: '#fff1e6',
    primaryText: '#333333',
    secondaryText: '#5a5a5a',
    accentLight: '#fff1e6',
    accent: '#ff9a5a',
    win: '#27ae60',
    loss: '#e74c3c',
  };

  const getHomeAwayIcon = (homeAway) => {
    switch (homeAway) {
      case 'home': return <Home size={14} />;
      case 'away': return <Plane size={14} />;
      default: return <MapPin size={14} />;
    }
  };

  const getHomeAwayLabel = (homeAway) => {
    switch (homeAway) {
      case 'home': return 'Home';
      case 'away': return 'Away';
      default: return 'Neutral';
    }
  };

  const styles = {
    container: {
      minHeight: 'calc(100vh - 80px)',
      padding: window.innerWidth < 768 ? '20px 10px' : '40px 20px',
      fontFamily: "'JetBrains Mono', monospace",
    },
    contentWrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: '40px',
    },
    title: {
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      fontWeight: '700',
      color: colorScheme.primaryText,
      marginBottom: '10px',
    },
    subtitle: {
      fontSize: '1rem',
      color: colorScheme.secondaryText,
      marginBottom: '30px',
    },
    toggleContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: window.innerWidth < 768 ? '5px' : '10px',
      marginBottom: '30px',
      flexWrap: 'wrap',
    },
    toggleButton: {
      padding: window.innerWidth < 768 ? '10px 20px' : '12px 30px',
      fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem',
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
    summaryCard: {
      backgroundColor: colorScheme.cardBg,
      borderRadius: '16px',
      padding: '25px',
      marginBottom: '30px',
      boxShadow: '0 4px 15px rgba(255, 154, 90, 0.08)',
      border: `1px solid ${colorScheme.cardBorder}`,
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      gap: '20px',
    },
    summaryItem: {
      textAlign: 'center',
    },
    summaryValue: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: colorScheme.primaryText,
    },
    summaryLabel: {
      fontSize: '0.8rem',
      color: colorScheme.secondaryText,
      marginTop: '5px',
    },
    sectionTitle: {
      fontSize: '2rem',
      fontWeight: '800',
      color: colorScheme.primaryText,
      marginBottom: '30px',
      marginTop: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '20px',
      backgroundColor: colorScheme.accentLight,
      borderRadius: '16px',
      border: `2px solid ${colorScheme.accent}`,
    },
    scheduleList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    gameCard: {
      backgroundColor: colorScheme.cardBg,
      borderRadius: '16px',
      padding: window.innerWidth < 768 ? '15px' : '20px',
      boxShadow: '0 4px 15px rgba(255, 154, 90, 0.08)',
      border: `3px solid ${colorScheme.accent}`,
      display: window.innerWidth < 768 ? 'flex' : 'grid',
      flexDirection: window.innerWidth < 768 ? 'column' : 'row',
      gridTemplateColumns: window.innerWidth < 768 ? 'none' : '80px 1fr auto auto',
      alignItems: window.innerWidth < 768 ? 'stretch' : 'center',
      gap: window.innerWidth < 768 ? '15px' : '20px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    logoContainer: {
      width: '70px',
      height: '70px',
      borderRadius: '12px',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    logo: {
      maxWidth: '60px',
      maxHeight: '60px',
      objectFit: 'contain',
    },
    logoPlaceholder: {
      width: '50px',
      height: '50px',
      borderRadius: '8px',
      backgroundColor: colorScheme.accentLight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: colorScheme.accent,
      fontWeight: '700',
      fontSize: '1.2rem',
    },
    gameInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    opponent: {
      fontSize: '1.1rem',
      fontWeight: '700',
      color: colorScheme.primaryText,
      textAlign: 'left',
    },
    gameDetails: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      fontSize: '0.85rem',
      color: colorScheme.secondaryText,
      justifyContent: 'flex-start',
    },
    detailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    resultContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '5px',
      minWidth: '100px',
    },
    resultBadge: {
      padding: '8px 16px',
      borderRadius: '20px',
      fontWeight: '700',
      fontSize: '0.9rem',
    },
    winBadge: {
      backgroundColor: 'rgba(39, 174, 96, 0.1)',
      color: colorScheme.win,
    },
    lossBadge: {
      backgroundColor: 'rgba(231, 76, 60, 0.1)',
      color: colorScheme.loss,
    },
    upcomingBadge: {
      backgroundColor: colorScheme.accentLight,
      color: colorScheme.accent,
    },
    scoutButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: window.innerWidth < 768 ? '10px 16px' : '12px 20px',
      backgroundColor: colorScheme.accentLight,
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: window.innerWidth < 768 ? '0.8rem' : '0.85rem',
      fontWeight: '600',
      color: colorScheme.accent,
      transition: 'all 0.3s ease',
      width: window.innerWidth < 768 ? '100%' : 'auto',
    },
    conferenceBadge: {
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '0.7rem',
      fontWeight: '600',
      backgroundColor: '#f0f0f0',
      color: '#666',
    },
    leagueBadge: {
      backgroundColor: 'rgba(255, 154, 90, 0.15)',
      color: colorScheme.accent,
    },
    reportsBadge: {
      backgroundColor: 'rgba(39, 174, 96, 0.1)',
      color: '#27ae60',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
  };

  const completedGames = schedule.filter(game => game.completed);
  const upcomingGames = schedule.filter(game => !game.completed);

  const getOpponentInitials = (opponent) => {
    return opponent
      .replace(/^#\d+\s*/, '') // Remove ranking
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleScoutClick = (game) => {
    navigate(`/liberty-league-scouting-reports/${selectedTeam}/${game.id}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Scouting Reports</h1>
          <p style={styles.subtitle}>
            Select a team and game to view detailed scouting reports and analysis
          </p>
          
          {/* Team Toggle */}
          <div style={styles.toggleContainer}>
            <button
              style={{
                ...styles.toggleButton,
                ...(selectedTeam === 'mens' ? styles.toggleActive : styles.toggleInactive),
              }}
              onClick={() => setSelectedTeam('mens')}
              onMouseOver={(e) => {
                if (selectedTeam !== 'mens') {
                  e.currentTarget.style.backgroundColor = colorScheme.accentLight;
                }
              }}
              onMouseOut={(e) => {
                if (selectedTeam !== 'mens') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              Men's Basketball
            </button>
            <button
              style={{
                ...styles.toggleButton,
                ...(selectedTeam === 'womens' ? styles.toggleActive : styles.toggleInactive),
              }}
              onClick={() => setSelectedTeam('womens')}
              onMouseOver={(e) => {
                if (selectedTeam !== 'womens') {
                  e.currentTarget.style.backgroundColor = colorScheme.accentLight;
                }
              }}
              onMouseOut={(e) => {
                if (selectedTeam !== 'womens') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              Women's Basketball
            </button>
          </div>
        </div>

        {/* Summary Card */}
        <div style={styles.summaryCard}>
          <div style={styles.summaryItem}>
            <div style={styles.summaryValue}>
              {summary.overallRecord.wins}-{summary.overallRecord.losses}
            </div>
            <div style={styles.summaryLabel}>Overall Record</div>
          </div>
          <div style={styles.summaryItem}>
            <div style={styles.summaryValue}>
              {summary.leagueRecord.wins}-{summary.leagueRecord.losses}
            </div>
            <div style={styles.summaryLabel}>Liberty League</div>
          </div>
          <div style={styles.summaryItem}>
            <div style={styles.summaryValue}>{summary.completedGames}</div>
            <div style={styles.summaryLabel}>Games Played</div>
          </div>
          <div style={styles.summaryItem}>
            <div style={styles.summaryValue}>{summary.remainingGames}</div>
            <div style={styles.summaryLabel}>Games Remaining</div>
          </div>
        </div>

        {/* Upcoming Games */}
        {upcomingGames.length > 0 && (
          <>
            <h2 style={styles.sectionTitle}>
              <Calendar size={20} color={colorScheme.accent} />
              Upcoming Games ({upcomingGames.length})
            </h2>
            <div style={styles.scheduleList}>
              {upcomingGames.map((game) => (
                <div
                  key={game.id}
                  style={styles.gameCard}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.borderColor = '#e8894a';
                    e.currentTarget.style.borderWidth = '4px';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = colorScheme.accent;
                    e.currentTarget.style.borderWidth = '3px';
                  }}
                  onClick={() => handleScoutClick(game)}
                >
                  <div style={styles.logoContainer}>
                    <div style={styles.logoPlaceholder}>
                      {getOpponentInitials(game.opponent)}
                    </div>
                  </div>
                  
                  <div style={styles.gameInfo}>
                    <div style={{
                      ...styles.opponent,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      justifyContent: 'flex-start',
                    }}>
                      {game.opponent}
                      <span style={{
                        ...styles.conferenceBadge,
                        ...(game.conference === 'Liberty League' ? styles.leagueBadge : {}),
                      }}>
                        {game.conference}
                      </span>
                      {hasReports(game.opponent, selectedTeam) && (
                        <span style={{
                          ...styles.conferenceBadge,
                          ...styles.reportsBadge,
                        }}>
                          <FileText size={12} />
                          Reports Available
                        </span>
                      )}
                    </div>
                    <div style={styles.gameDetails}>
                      <span style={styles.detailItem}>
                        <Calendar size={14} />
                        {game.date}
                      </span>
                      <span style={styles.detailItem}>
                        <Clock size={14} />
                        {game.time}
                      </span>
                      <span style={styles.detailItem}>
                        {getHomeAwayIcon(game.homeAway)}
                        {getHomeAwayLabel(game.homeAway)}
                      </span>
                      <span style={styles.detailItem}>
                        <MapPin size={14} />
                        {game.location.split('/')[0]}
                      </span>
                    </div>
                    {game.tournament && (
                      <div style={{ 
                        fontSize: '0.8rem', 
                        color: colorScheme.accent, 
                        fontWeight: '600',
                        textAlign: 'left'
                      }}>
                        {game.tournament}
                      </div>
                    )}
                  </div>

                  <div style={styles.resultContainer}>
                    <div style={{...styles.resultBadge, ...styles.upcomingBadge}}>
                      Upcoming
                    </div>
                  </div>

                  <button
                    style={styles.scoutButton}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = colorScheme.accent;
                      e.currentTarget.style.color = 'white';
                      e.stopPropagation();
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = colorScheme.accentLight;
                      e.currentTarget.style.color = colorScheme.accent;
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleScoutClick(game);
                    }}
                  >
                    Scout Report
                    <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Completed Games */}
        {completedGames.length > 0 && (
          <>
            <h2 style={{...styles.sectionTitle, marginTop: '40px'}}>
              <Trophy size={20} color={colorScheme.accent} />
              Completed Games ({completedGames.length})
            </h2>
            <div style={styles.scheduleList}>
              {completedGames.map((game) => (
                <div
                  key={game.id}
                  style={styles.gameCard}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateX(5px)';
                    e.currentTarget.style.borderColor = '#e8894a';
                    e.currentTarget.style.borderWidth = '4px';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = colorScheme.accent;
                    e.currentTarget.style.borderWidth = '3px';
                  }}
                  onClick={() => handleScoutClick(game)}
                >
                  <div style={styles.logoContainer}>
                    <div style={styles.logoPlaceholder}>
                      {getOpponentInitials(game.opponent)}
                    </div>
                  </div>
                  
                  <div style={styles.gameInfo}>
                    <div style={{
                      ...styles.opponent,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      justifyContent: 'flex-start',
                    }}>
                      {game.opponent}
                      <span style={{
                        ...styles.conferenceBadge,
                        ...(game.conference === 'Liberty League' ? styles.leagueBadge : {}),
                      }}>
                        {game.conference}
                      </span>
                      {hasReports(game.opponent, selectedTeam) && (
                        <span style={{
                          ...styles.conferenceBadge,
                          ...styles.reportsBadge,
                        }}>
                          <FileText size={12} />
                          Reports Available
                        </span>
                      )}
                    </div>
                    <div style={styles.gameDetails}>
                      <span style={styles.detailItem}>
                        <Calendar size={14} />
                        {game.date}
                      </span>
                      <span style={styles.detailItem}>
                        {getHomeAwayIcon(game.homeAway)}
                        {getHomeAwayLabel(game.homeAway)}
                      </span>
                      <span style={styles.detailItem}>
                        <MapPin size={14} />
                        {game.location.split('/')[0]}
                      </span>
                    </div>
                    {game.notes && (
                      <div style={{ 
                        fontSize: '0.8rem', 
                        color: colorScheme.secondaryText, 
                        fontStyle: 'italic',
                        textAlign: 'left'
                      }}>
                        {game.notes}
                      </div>
                    )}
                  </div>

                  <div style={styles.resultContainer}>
                    <div style={{
                      ...styles.resultBadge,
                      ...(game.result?.type === 'win' ? styles.winBadge : styles.lossBadge),
                    }}>
                      {game.result?.type === 'win' ? 'W' : 'L'} {game.result?.score}
                    </div>
                  </div>

                  <button
                    style={styles.scoutButton}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = colorScheme.accent;
                      e.currentTarget.style.color = 'white';
                      e.stopPropagation();
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = colorScheme.accentLight;
                      e.currentTarget.style.color = colorScheme.accent;
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleScoutClick(game);
                    }}
                  >
                    View Report
                    <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScoutingReportsPage;

