import React from 'react';
import { Link } from 'react-router-dom';

function BAClubSection() {
  const colorScheme = {
    background: '#ffffff',
    cardBg: '#ffffff',
    primaryText: '#333333',
    secondaryText: '#5a5a5a',
    accent: '#ff9a5a'
  };

  const styles = {
    heading: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '10px',
      color: colorScheme.primaryText,
      fontFamily: "Georgia, serif",
      position: 'relative',
      display: 'inline-block',
      paddingBottom: '25px',
      width: '100%',
      textAlign: 'center',
    },
    sectionUnderline: {
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '3px',
      background: `linear-gradient(to right, ${colorScheme.accent}, #ffb78a)`,
      borderRadius: '2px',
    },
    clubSection: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      borderRadius: '15px',
      overflow: 'hidden',
      padding: '0',
    },
    clubBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url('/BAClub-Logo.png')`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.1,
      zIndex: 0,
    },
    clubContent: {
      position: 'relative',
      zIndex: 1,
      padding: '40px',
    },
    paragraph: {
      fontSize: '1.2rem',
      lineHeight: '1.8',
      marginBottom: '24px',
      color: colorScheme.secondaryText,
      fontFamily: "Georgia, serif",
      fontWeight: '500',
    },
    highlightText: {
      color: colorScheme.accent,
      fontWeight: 'bold',
      fontSize: '1.25rem',
    },
    link: {
      color: colorScheme.accent,
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'all 0.2s ease',
      borderBottom: `2px solid ${colorScheme.accent}`,
      paddingBottom: '2px',
    },
  };

  return (
    <div style={styles.clubSection}>
      <div style={styles.clubBackground}></div>
      <div style={styles.clubContent}>
        <h2 style={styles.heading}>
          Basketball Analytics Club at RIT
          <span style={styles.sectionUnderline}></span>
        </h2>
        <p style={styles.paragraph}>
          When I founded the <span style={styles.highlightText}>Basketball Analytics Club at RIT</span>,
          my goal was straightforward: bring together students who love basketball and give them a platform to explore
          the game through data. Tackling hands‑on projects together not only builds technical skills but also captures
          that rush of discovering something new on the court.
        </p>
        
        <p style={styles.paragraph}>
          Although we're still young, I'm committed to using every tool we can find to help this club prosper. Whether it's
          through website development, content creation, or diving into basketball research. I don't want members to 
          simply fit themselves into a preset role; I want each person to shape the club with their own ideas and strengths, building
          something we all can be proud of.
        </p>

        <p style={styles.paragraph}>
          <Link 
            to="/baclub" 
            style={styles.link}
            onMouseOver={(e) => {
              e.currentTarget.style.color = '#ffb78a';
              e.currentTarget.style.borderBottomColor = '#ffb78a';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = colorScheme.accent;
              e.currentTarget.style.borderBottomColor = colorScheme.accent;
            }}
          >
            Click here to learn more about the club!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default BAClubSection; 