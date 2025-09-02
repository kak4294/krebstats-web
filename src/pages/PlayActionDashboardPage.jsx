import React from 'react';
import { Link } from 'react-router-dom';

function PlayActionDashboardPage() {
  const colorScheme = {
    background: '#f8f8f8',
    cardBg: '#ffffff',
    primaryText: '#333333',
    secondaryText: '#5a5a5a',
    accent: '#ff9a5a'
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: colorScheme.background,
      padding: '60px 20px',
      fontFamily: "'Nunito', sans-serif",
    },
    content: {
      maxWidth: '1000px',
      margin: '0 auto',
      backgroundColor: colorScheme.cardBg,
      borderRadius: '20px',
      padding: '60px',
      boxShadow: '0 20px 40px rgba(255, 154, 90, 0.1)',
    },
    heading: {
      fontSize: '3rem',
      fontWeight: '700',
      marginBottom: '30px',
      color: colorScheme.primaryText,
      fontFamily: "'Quicksand', sans-serif",
      textAlign: 'center',
    },
    subheading: {
      fontSize: '1.3rem',
      color: colorScheme.primaryText,
      marginBottom: '40px',
      textAlign: 'justify',
      lineHeight: '1.8',
      maxWidth: '800px',
      margin: '0 auto 40px auto',
      padding: '30px',
      backgroundColor: '#fff8f0',
      border: `3px solid ${colorScheme.accent}`,
      borderRadius: '15px',
      boxShadow: `0 8px 25px rgba(255, 154, 90, 0.3), 0 0 20px rgba(255, 154, 90, 0.2)`,
      position: 'relative',
    },
    section: {
      marginBottom: '40px',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: colorScheme.primaryText,
      marginBottom: '20px',
      fontFamily: "'Quicksand', sans-serif",
    },
    paragraph: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      color: colorScheme.secondaryText,
      marginBottom: '20px',
    },
    backButton: {
      display: 'inline-block',
      padding: '12px 30px',
      backgroundColor: colorScheme.accent,
      color: 'white',
      textDecoration: 'none',
      borderRadius: '25px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      marginTop: '40px',
    },
    comingSoon: {
      textAlign: 'center',
      padding: '40px',
      backgroundColor: '#f0f8ff',
      borderRadius: '15px',
      marginTop: '30px',
      border: `2px dashed ${colorScheme.accent}`,
    },
    videoSection: {
      marginBottom: '50px',
      padding: '30px',
      backgroundColor: '#fafafa',
      borderRadius: '15px',
      boxShadow: `0 8px 20px rgba(255, 154, 90, 0.2), 0 0 15px rgba(255, 154, 90, 0.1)`,
      border: `2px solid ${colorScheme.accent}40`,
    },
    videoContainer: {
      display: 'flex',
      gap: '20px',
      marginTop: '20px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    videoCard: {
      flex: '1 1 300px',
      maxWidth: '400px',
      backgroundColor: colorScheme.cardBg,
      borderRadius: '12px',
      padding: '15px',
      boxShadow: `0 6px 15px rgba(255, 154, 90, 0.3), 0 0 10px rgba(255, 154, 90, 0.2)`,
      border: `2px solid ${colorScheme.accent}`,
      transition: 'all 0.3s ease',
    },
    video: {
      width: '100%',
      borderRadius: '8px',
      border: '1px solid #ddd',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Play-Action Frequency Dashboard</h1>
        
        <p style={styles.subheading}>
          This interactive Tableau dashboard analyzes team play-type frequencies across games, providing comprehensive insights into basketball strategy patterns. The dashboard tracks various play types including Pick-and-Rolls, Catch-and-Shoot opportunities, Transition plays, and more, allowing coaches and analysts to identify trends and make data-driven strategic decisions.
        </p>

        <div style={styles.videoSection}>
          <h2 style={styles.sectionTitle}>Pick-and-Roll Analysis</h2>
          <p style={styles.paragraph}>
            Track the frequency and effectiveness of pick-and-roll plays across different games and opponents. This visualization helps identify which teams rely heavily on screen actions and how successful they are in different situations.
          </p>
          <div style={styles.videoContainer}>
            <div style={styles.videoCard}>
              <video 
                style={styles.video}
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/pick-and-roll-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <div style={styles.videoSection}>
          <h2 style={styles.sectionTitle}>Catch-and-Shoot 3-Point Tracking</h2>
          <p style={styles.paragraph}>
            Analyze three-point shooting patterns and catch-and-shoot opportunities. This section reveals which teams create the most open looks from beyond the arc and their conversion rates in different game situations.
          </p>
          <div style={styles.videoContainer}>
            <div style={styles.videoCard}>
              <video 
                style={styles.video}
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/three-point-analysis.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <div style={styles.videoSection}>
          <h2 style={styles.sectionTitle}>Transition Statistics</h2>
          <p style={styles.paragraph}>
            Monitor fast-break opportunities and transition play effectiveness. This dashboard section helps identify teams that excel in up-tempo situations and their success rates in different transition scenarios.
          </p>
          <div style={styles.videoContainer}>
            <div style={styles.videoCard}>
              <video 
                style={styles.video}
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/transition-stats.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <Link 
          to="/" 
          style={styles.backButton}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#ffb78a';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = colorScheme.accent;
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          ← Back to Portfolio
        </Link>
      </div>
    </div>
  );
}

export default PlayActionDashboardPage;
