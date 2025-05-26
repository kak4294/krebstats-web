import React from 'react';

function PersonalProjects() {
  const colorScheme = {
    background: '#f8f8f8',
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
      fontFamily: "'Quicksand', sans-serif",
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
      height: '350px',
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
      fontFamily: "'Quicksand', sans-serif",
      textAlign: 'center',
    },
    paragraph: {
      fontSize: '1.05rem',
      lineHeight: '1.8',
      marginBottom: '18px',
      color: colorScheme.secondaryText,
      fontFamily: "'Nunito', sans-serif",
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
      <h2 style={styles.heading} id="projects-section">
        Personal Projects
        <span style={styles.sectionUnderline}></span>
      </h2>

      <div style={styles.projectsContainer}>
        {/* Synergy Scraper Project */}
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
            <h3 style={styles.projectTitle}>Synergy Data Scraper</h3>
            <p style={styles.paragraph}>
              A python program which scrapes any number of play-by-play files produced by synergy. It transports all data into a denormalized database containing stats of over 300 Division III Liberty League basketball games.
            </p>
          </div>
          <div style={styles.projectFooter}>
            <a 
              href="/projects/synergy-scraper" 
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
            </a>
          </div>
        </div>

        {/* Body Composition Statistics */}
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
            <h3 style={styles.projectTitle}>Body Composition Analytics</h3>
            <p style={styles.paragraph}>
              Program which uses Python, SQL, & Javascript that allows users to manually input body metrics & workout details on a user interface. Then takes that data in real time and updates visualizations showing the progress you've made to improve your health!
            </p>
          </div>
          <div style={styles.projectFooter}>
            <a 
              href="/projects/body-composition" 
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
            </a>
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
            <a 
              href="/projects/scouting-reports" 
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
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalProjects; 