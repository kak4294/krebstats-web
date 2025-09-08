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
      padding: '40px 20px',
      fontFamily: "'Nunito', sans-serif",
    },
    content: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px',
      backgroundColor: colorScheme.cardBg,
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
    },
    breadcrumb: {
      fontSize: '0.9rem',
      color: colorScheme.secondaryText,
      marginBottom: '10px',
      textAlign: 'left',
    },
    category: {
      fontSize: '0.95rem',
      color: colorScheme.secondaryText,
      marginBottom: '10px',
      fontWeight: '500',
      textAlign: 'left',
    },
    orangeLabel: {
      fontSize: '0.85rem',
      color: colorScheme.accent,
      marginBottom: '8px',
      fontWeight: '600',
      textAlign: 'left',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '15px',
      color: colorScheme.primaryText,
      lineHeight: '1.2',
      textAlign: 'left',
    },
    subtitle: {
      fontSize: '1.05rem',
      color: colorScheme.secondaryText,
      marginBottom: '40px',
      lineHeight: '1.4',
      textAlign: 'left',
    },
    section: {
      marginBottom: '30px',
    },
    sectionTitle: {
      fontSize: '1.4rem',
      fontWeight: '600',
      color: colorScheme.primaryText,
      marginBottom: '15px',
      textAlign: 'left',
    },
    paragraph: {
      fontSize: '1rem',
      lineHeight: '1.7',
      color: colorScheme.primaryText,
      marginBottom: '15px',
      textAlign: 'left',
    },
    highlightedParagraph: {
      fontSize: '1rem',
      lineHeight: '1.7',
      color: colorScheme.primaryText,
      marginBottom: '15px',
      textAlign: 'left',
      backgroundColor: 'rgba(255, 154, 90, 0.1)',
      border: `2px solid rgba(255, 154, 90, 0.3)`,
      borderRadius: '8px',
      padding: '20px',
      marginLeft: '20px',
      borderLeft: `4px solid ${colorScheme.accent}`,
    },
    techStackContainer: {
      backgroundColor: 'rgba(255, 154, 90, 0.05)',
      border: `1px solid rgba(255, 154, 90, 0.2)`,
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '15px',
    },
    techItem: {
      display: 'inline-block',
      backgroundColor: colorScheme.accent,
      textAlign: 'left',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: '500',
      marginRight: '10px',
      marginBottom: '8px',
      marginLeft: '0px',
    },
    techItemsContainer: {
      margin: '0',
      padding: '0',
      textAlign: 'left',
    },
    backButton: {
      display: 'inline-block',
      padding: '10px 20px',
      backgroundColor: colorScheme.accent,
      color: 'white',
      textDecoration: 'none',
      borderRadius: '6px',
      fontWeight: '500',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease',
      marginTop: '40px',
    },
    videoSection: {
      marginBottom: '30px',
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
        <p style={styles.orangeLabel}>RIT Basketball</p>
        <h1 style={styles.heading}>Play-Action Frequency Dashboard</h1>
        <p style={styles.subtitle}>Interactive Tableau dashboard analyzing team play-type frequencies across games</p>

      <div style={styles.highlightedParagraph}>
            <p style={{margin: '0 0 15px 0'}}>
              This dashboard helps RIT men's and women's coaches analyze play-action frequencies for other Liberty 
              League teams using their most recent games. By visualizing how often opponents run each type of play, 
              it highlights potential recency bias.
            </p>
            
            <p style={{margin: '0'}}>
              This shows what a team has been doing lately versus its 
              longer-term tendencies. As lineups change over the season, the dashboard incorporates those recent 
              rotations. This gives coaches a clearer view of how opponents' play-type distributions shift with 
              personnel.
            </p>
          </div>

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

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Tech Stack</h2>
          <div style={styles.techItemsContainer}>
            <span style={styles.techItem}>Tableau</span>
            <span style={styles.techItem}>SQL</span>
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
