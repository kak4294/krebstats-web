import React from 'react';
import { Link } from 'react-router-dom';

function PersonalProjects() {
  const colorScheme = {
    background: 'transparent',
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
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '3px',
      background: `linear-gradient(to right, ${colorScheme.accent}, #ffb78a)`,
      borderRadius: '2px',
    },
    projectsContainer: {
      display: 'flex',
      gap: '2rem',
      flexWrap: 'wrap',
    },
    projectCard: {
      flex: '1 1 300px',
      backgroundColor: colorScheme.cardBg,
      borderRadius: '18px',
      padding: '40px',
      boxShadow: '0 10px 25px rgba(255, 154, 90, 0.08)',
      border: `2px solid ${colorScheme.accent}`,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      height: '400px',
    },
    projectContent: {
      flex: '1 0 auto',
      display: 'flex',
      flexDirection: 'column',
      height: '100px',
      overflow: 'hidden',
    },
    projectFooter: {
      marginTop: 'auto',
      paddingTop: '20px',
      paddingBottom: '0px',
      textAlign: 'center',
      borderTop: '1px solid rgba(255, 154, 90, 0.1)',
    },
    projectTitle: {
      fontSize: '1.4rem',
      fontWeight: '700',
      marginBottom: '15px',
      color: colorScheme.primaryText,
      fontFamily: "Georgia, serif",
      textAlign: 'center',
    },
    paragraph: {
      fontSize: '1.05rem',
      lineHeight: '1.8',
      marginBottom: '18px',
      color: colorScheme.secondaryText,
      fontFamily: "Georgia, serif",
      fontWeight: '500',
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
    <div>
      <h2 style={styles.heading}>
        Personal Projects
        <span style={styles.sectionUnderline}></span>
      </h2>

      <div style={styles.projectsContainer}>
        {/* Play-Action Frequency Dashboard */}
        <div 
          style={styles.projectCard}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(255, 154, 90, 0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 154, 90, 0.08)';
          }}
        >
          <div style={styles.projectContent}>
            <h3 style={styles.projectTitle}>Play-Action Frequency Dashboard</h3>
            <p style={styles.paragraph}>
              Created dashboard using Tableau that shows every teams game by game frequency of play types that were run. This includes number of Pick-and-Rolls, Catch-and-Shoot 3's, Transition Stats, etc...
            </p>
          </div>
          <div style={styles.projectFooter}>
            <Link 
              to="/projects/play-action-dashboard" 
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
              Learn More →
            </Link>
          </div>
        </div>

        {/* Advanced Scouting Reports */}
        <div 
          style={styles.projectCard}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(255, 154, 90, 0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 154, 90, 0.08)';
          }}
        >
          <div style={styles.projectContent}>
            <h3 style={styles.projectTitle}>Advanced Scouting Reports</h3>
            <p style={styles.paragraph}>
              Uses both python and latex to create detailed reports on how opposing teams would guard RIT Basketball players based on their statistical strengths and weaknesses from the season prior.
            </p>
          </div>
          <div style={styles.projectFooter}>
            <Link 
              to="/projects/scouting-reports" 
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
              Learn More →
            </Link>
          </div>
        </div>

        {/* Statistical Analysis of Book Database */}
        <div 
          style={styles.projectCard}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(255, 154, 90, 0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 154, 90, 0.08)';
          }}
        >
          <div style={styles.projectContent}>
            <h3 style={styles.projectTitle}>Statistical Analysis of Book Database</h3>
            <p style={styles.paragraph}>
              Led data cleaning and analysis of a relational database using Python (Pandas) and SQL. Built Java connectors and conducted statistical analysis of user book preferences, using clear Excel visualizations.
            </p>
          </div>
          <div style={styles.projectFooter}>
            <Link 
              to="/projects/book-database-analysis" 
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
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalProjects; 