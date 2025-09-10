import React from 'react';
import { Link } from 'react-router-dom';

function ScoutingReportsPage() {
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
    orangeLabel: {
      fontSize: '0.85rem',
      color: colorScheme.accent,
      marginBottom: '8px',
      fontWeight: '600',
      textAlign: 'left',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
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
    pdfContainer: {
      display: 'flex',
      gap: '30px',
      marginTop: '30px',
      flexWrap: 'nowrap',
      justifyContent: 'space-between',
    },
    pdfCard: {
      flex: '1',
      backgroundColor: '#fafafa',
      borderRadius: '8px',
      padding: '20px',
      border: '1px solid #ddd',
      maxWidth: 'calc(50% - 15px)',
    },
    pdfTitle: {
      fontSize: '1.2rem',
      fontWeight: '600',
      color: colorScheme.primaryText,
      marginBottom: '15px',
      textAlign: 'left',
    },
    pdfPreview: {
      marginBottom: '20px',
      borderRadius: '6px',
      overflow: 'hidden',
      border: '1px solid #ddd',
    },
    pdfEmbed: {
      borderRadius: '6px',
      border: 'none',
    },
    downloadButton: {
      display: 'block',
      width: '100%',
      padding: '10px 20px',
      backgroundColor: colorScheme.accent,
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontWeight: '500',
      fontSize: '0.95rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <p style={styles.orangeLabel}>RIT Basketball</p>
        <h1 style={styles.heading}>Advanced Scouting Reports</h1>
        <p style={styles.subtitle}>
          Season-long statistical reports helping players identify statistical strengths and weaknesses</p>

        <div style={styles.section}>

          <p style={styles.highlightedParagraph}>
            As a statistics assistant for the RIT men's basketball team, these were built in the preseason
            for player development purposes. 
          </p>

          <h2 style={styles.sectionTitle}>Defensive Strategy Analysis</h2>
          <p style={styles.paragraph}>
            These reports were built to help players develop a better understanding of
            how opposing teams may guard them based off their statistical strengths and weaknesses from the
            prior year.
          </p>

          <p style={styles.paragraph}>
            In general, players understand the strongest parts of their game. However, its hard to anticipate
            the ways that teams plan to guard specific players. Especially earlier in the seaon. This was aimed to
            help prepare players for different coverages in specific actions which they will be apart of. Each report
            was specifically tailored to the player, prioritizing actions that players ran the most frequently.

          </p>

        </div>

        <div style={styles.section}>
          <div style={styles.pdfContainer}>
            <div 
              style={styles.pdfCard}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(255, 154, 90, 0.6), 0 0 40px rgba(255, 154, 90, 0.4), inset 0 0 25px rgba(255, 154, 90, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 154, 90, 0.4), 0 0 30px rgba(255, 154, 90, 0.3), inset 0 0 20px rgba(255, 154, 90, 0.1)';
              }}
            >
              <h3 style={styles.pdfTitle}>Kenny Wilburn Player Report</h3>
              <div style={styles.pdfPreview}>
                <embed 
                  src="/pdfs/Kenny_Wilburn_Player_Report.pdf" 
                  type="application/pdf" 
                  width="100%" 
                  height="400px"
                  style={styles.pdfEmbed}
                />
              </div>
              <button 
                style={styles.downloadButton}
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/pdfs/Kenny_Wilburn_Player_Report.pdf';
                  link.download = 'Kenny_Wilburn_Player_Report.pdf';
                  link.click();
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffb78a';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = colorScheme.accent;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                📄 Download Report
              </button>
            </div>

            <div 
              style={styles.pdfCard}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(255, 154, 90, 0.6), 0 0 40px rgba(255, 154, 90, 0.4), inset 0 0 25px rgba(255, 154, 90, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 154, 90, 0.4), 0 0 30px rgba(255, 154, 90, 0.3), inset 0 0 20px rgba(255, 154, 90, 0.1)';
              }}
            >
              <h3 style={styles.pdfTitle}>Matt Caggiano Player Report</h3>
              <div style={styles.pdfPreview}>
                <embed 
                  src="/pdfs/Matt_Cagg_Player_Report copy.pdf"
                  type="application/pdf" 
                  width="100%" 
                  height="400px"
                  style={styles.pdfEmbed}
                />
              </div>
              <button 
                style={styles.downloadButton}
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/pdfs/Matt_Cagg_Player_Report copy.pdf';
                  link.download = 'Matt_Cagg_Player_Report.pdf';
                  link.click();
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffb78a';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = colorScheme.accent;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                📄 Download Report
              </button>
            </div>
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Tech Stack</h2>
          <div style={styles.techItemsContainer}>
            <span style={styles.techItem}>Python</span>
            <span style={styles.techItem}>Latex</span>
            <span style={styles.techItem}>Matplotlib</span>
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

export default ScoutingReportsPage;
