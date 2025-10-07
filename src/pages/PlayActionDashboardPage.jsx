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
      flex: '1 1 450px',
      maxWidth: '700px',
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
              it highlights potential recency bias, while accounting for pace. 
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
            The pick-and-roll has been one of the most widely adopted play actions on all levels of basketball.
            I've found that higher frequencies to which a team ended a play with a pick-and-roll shows one of two things...
            This teams plays heavy half court basketball, or guards are heavy shooters in this particular offense. Efficiency statistics
            are needed to back one hypothesis vs the other, however these two possibilities are not mutally exclusive. 
          </p>
          <div style={styles.videoContainer}>
            <div style={styles.videoCard}>
              <video 
                style={styles.video}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                controls={false}
                onLoadedData={(e) => {
                  e.target.play().catch(console.error);
                }}
              >
                <source src="/mp4s/PNRs.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <div style={styles.videoSection}>
          <h2 style={styles.sectionTitle}>Post-Up Shot Frequency Tracking</h2>
          <p style={styles.paragraph}>
            Many lower level DI, II, & III teams have trouble effectively shooting three
            pointers. Making it important to understand how teams integrate post-shooting into their offense. As
            we can see, there are teams like RIT that depended on it way more in comparison to teams like Ithaca.
            This can be backed as RIT had two big-men who accounted for over 25% of their offense, each of which 
            were back to the basket type of players. While Ithaca led the Liberty League in both 3 point frequency and 
            3 point percentage. 
          </p>
          <div style={styles.videoContainer}>
            <div style={styles.videoCard}>
              <video 
                style={styles.video}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                controls={false}
                onLoadedData={(e) => {
                  e.target.play().catch(console.error);
                }}
              >
                <source src="/mp4s/Post-Ups.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <div style={styles.videoSection}>
          <h2 style={styles.sectionTitle}>Transition Statistics</h2>
          <p style={styles.paragraph}>
            The largest difference between old and new era's of basketball is most defintietly the pace to which
            the game is played. From the 2000's to present day, pace of play jumped from ~93 possessions per game
            to ~100 possessions per game. So it's no question teams on lower levels want to start integrating that
            into their offense. On the contrary, it should be mentioned that 3 out of the 4 teams with the lowest number of transition
            shots were actually the top 3 teams to finish in the Liberty League playoffs. This shows the
            importance of having a top tier half court offense. This checks out as we all know that games tend 
            to slow down come crunch time.
          </p>
          <div style={styles.videoContainer}>
            <div style={styles.videoCard}>
              <video 
                style={styles.video}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                controls={false}
                onLoadedData={(e) => {
                  e.target.play().catch(console.error);
                }}
              >
                <source src="/mp4s/Transitions.mp4" type="video/mp4" />
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
