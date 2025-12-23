import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Clock, Users, TrendingUp, Target, FileText, BarChart3 } from 'lucide-react';
import { mensSchedule } from '../data/mensSchedule';
import { womensSchedule } from '../data/womensSchedule';
import ReportsSection from './ReportsSection';

const GameScoutingPage = () => {
  const { team, gameId } = useParams();
  const navigate = useNavigate();

  const schedule = team === 'mens' ? mensSchedule : womensSchedule;
  const game = schedule.find(g => g.id === parseInt(gameId));

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

  if (!game) {
    return (
      <div style={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'JetBrains Mono', monospace",
      }}>
        <h2 style={{ color: colorScheme.primaryText, marginBottom: '20px' }}>Game not found</h2>
        <button
          onClick={() => navigate('/liberty-league-scouting-reports')}
          style={{
            padding: '12px 24px',
            backgroundColor: colorScheme.accent,
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: '600',
          }}
        >
          Back to Schedule
        </button>
      </div>
    );
  }

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
      backgroundColor: colorScheme.cardBg,
      borderRadius: '20px',
      padding: window.innerWidth < 768 ? '20px' : '40px',
      marginBottom: '30px',
      boxShadow: '0 10px 30px rgba(255, 154, 90, 0.1)',
      border: `3px solid ${colorScheme.accent}`,
      display: 'flex',
      alignItems: 'center',
      gap: window.innerWidth < 768 ? '15px' : '30px',
      flexWrap: 'wrap',
      flexDirection: window.innerWidth < 768 ? 'column' : 'row',
      textAlign: window.innerWidth < 768 ? 'center' : 'left',
    },
    logoContainer: {
      width: '120px',
      height: '120px',
      borderRadius: '20px',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    logoPlaceholder: {
      width: '80px',
      height: '80px',
      borderRadius: '12px',
      backgroundColor: colorScheme.accentLight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: colorScheme.accent,
      fontWeight: '700',
      fontSize: '2rem',
    },
    gameInfo: {
      flex: 1,
    },
    opponent: {
      fontSize: '2rem',
      fontWeight: '700',
      color: colorScheme.primaryText,
      marginBottom: '10px',
    },
    gameDetails: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      fontSize: '0.95rem',
      color: colorScheme.secondaryText,
    },
    detailItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    resultBadge: {
      padding: '15px 30px',
      borderRadius: '15px',
      fontWeight: '700',
      fontSize: '1.2rem',
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
    sectionTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: colorScheme.primaryText,
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '25px',
      marginBottom: '30px',
    },
    card: {
      backgroundColor: colorScheme.cardBg,
      borderRadius: '16px',
      padding: '30px',
      boxShadow: '0 4px 15px rgba(255, 154, 90, 0.08)',
      border: `2px solid ${colorScheme.accent}`,
    },
    cardTitle: {
      fontSize: '1.1rem',
      fontWeight: '700',
      color: colorScheme.primaryText,
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    cardContent: {
      color: colorScheme.secondaryText,
      lineHeight: '1.6',
    },
    placeholder: {
      padding: '40px',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      color: colorScheme.secondaryText,
      border: `2px dashed ${colorScheme.cardBorder}`,
    },
    blogContainer: {
      backgroundColor: colorScheme.cardBg,
      borderRadius: '20px',
      padding: window.innerWidth < 768 ? '20px' : '40px',
      marginBottom: '30px',
      boxShadow: '0 10px 30px rgba(255, 154, 90, 0.1)',
      border: `2px solid ${colorScheme.accent}`,
    },
    blogTitle: {
      fontSize: '2rem',
      fontWeight: '800',
      color: colorScheme.primaryText,
      marginBottom: '30px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      borderBottom: `2px solid ${colorScheme.accentLight}`,
      paddingBottom: '15px',
    },
    blogSection: {
      marginBottom: '40px',
    },
    blogSectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: colorScheme.primaryText,
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      paddingLeft: '10px',
      borderLeft: `4px solid ${colorScheme.accent}`,
    },
    blogContent: {
      paddingLeft: '20px',
    },
    blogParagraph: {
      fontSize: '1rem',
      lineHeight: '1.7',
      color: colorScheme.primaryText,
      marginBottom: '18px',
      textAlign: 'justify',
    },
    blogSubheading: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: colorScheme.accent,
      marginTop: '25px',
      marginBottom: '12px',
    },
  };

  const getOpponentInitials = (opponent) => {
    return opponent
      .replace(/^#\d+\s*/, '')
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Back Button */}
        <button
          style={styles.backButton}
          onClick={() => navigate('/liberty-league-scouting-reports')}
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
          Back to Schedule
        </button>

        {/* Game Header */}
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            <div style={styles.logoPlaceholder}>
              {getOpponentInitials(game.opponent)}
            </div>
          </div>
          
          <div style={styles.gameInfo}>
            <h1 style={styles.opponent}>
              RIT vs {game.opponent}
            </h1>
            <div style={styles.gameDetails}>
              <span style={styles.detailItem}>
                <Calendar size={18} />
                {game.date}
              </span>
              <span style={styles.detailItem}>
                <Clock size={18} />
                {game.time}
              </span>
              <span style={styles.detailItem}>
                <MapPin size={18} />
                {game.location}
              </span>
            </div>
            {game.tournament && (
              <div style={{ marginTop: '10px', color: colorScheme.accent }}>
                {game.tournament}
              </div>
            )}
          </div>

          {game.completed && game.result ? (
            <div style={{
              ...styles.resultBadge,
              ...(game.result.type === 'win' ? styles.winBadge : styles.lossBadge),
            }}>
              {game.result.type === 'win' ? 'WIN' : 'LOSS'} {game.result.score}
            </div>
          ) : (
            <div style={{...styles.resultBadge, ...styles.upcomingBadge}}>
              Upcoming Game
            </div>
          )}
        </div>

        {/* Scouting Report Content */}
        <div style={styles.blogContainer}>
          <h2 style={styles.blogTitle}>
            <FileText size={24} color={colorScheme.accent} />
            Scouting Report: {game.opponent}
          </h2>

          {/* Team Overview Section */}
          <div style={styles.blogSection}>
            <h3 style={styles.blogSectionTitle}>
              <Users size={20} color={colorScheme.accent} />
              Team Overview
            </h3>
            <div style={styles.blogContent}>
              <p style={styles.blogParagraph}>
                {game.opponent} enters this matchup with a balanced offensive approach, averaging 72.4 points per game 
                while shooting 44.2% from the field. Their roster features a mix of experienced upperclassmen and 
                talented underclassmen who have shown significant development throughout the season.
              </p>
              <p style={styles.blogParagraph}>
                The team's strength lies in their disciplined approach to both ends of the floor, with strong 
                fundamentals and excellent team chemistry. They excel in transition opportunities and have shown 
                the ability to control tempo when needed.
              </p>
            </div>
          </div>

          {/* Offensive & Defensive Analysis Section */}
          <div style={styles.blogSection}>
            <h3 style={styles.blogSectionTitle}>
              <BarChart3 size={20} color={colorScheme.accent} />
              Offensive & Defensive Analysis
            </h3>
            <div style={styles.blogContent}>
              <h4 style={styles.blogSubheading}>Offensive Tendencies</h4>
              <p style={styles.blogParagraph}>
                {game.opponent} runs a motion-based offense that emphasizes ball movement and player movement. 
                They prefer to work the ball inside-out, with 38% of their scoring coming from paint touches. 
                Their three-point shooting has been inconsistent, connecting on 31.2% of attempts.
              </p>
              
              <h4 style={styles.blogSubheading}>Defensive Schemes</h4>
              <p style={styles.blogParagraph}>
                Defensively, they employ a switching man-to-man defense with occasional zone looks in specific 
                situations. They force 14.2 turnovers per game and excel at contesting shots without fouling. 
                Their defensive rebounding percentage of 72.8% limits second-chance opportunities for opponents.
              </p>
            </div>
          </div>

          {/* Possible Strategies Section */}
          <div style={styles.blogSection}>
            <h3 style={styles.blogSectionTitle}>
              <Target size={20} color={colorScheme.accent} />
              Possible Strategies
            </h3>
            <div style={styles.blogContent}>
              <p style={styles.blogParagraph}>
                To counter their defensive switching, we should look to exploit mismatches in the post and 
                utilize our speed advantage in transition. Setting multiple screens and creating movement 
                without the ball will be crucial to generating open looks.
              </p>
              <p style={styles.blogParagraph}>
                On the defensive end, we need to limit their paint touches by providing help defense early 
                and forcing them into contested outside shots. Controlling the defensive glass will be 
                essential to prevent their second-chance scoring opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Reports Section */}
        <ReportsSection 
          teamName={game.opponent} 
          gender={team} 
        />
      </div>
    </div>
  );
};

export default GameScoutingPage;

