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
      textAlign: 'center'
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
    pdfContainer: {
      display: 'flex',
      gap: '30px',
      marginTop: '30px',
      flexWrap: 'wrap',
    },
    pdfCard: {
      flex: '1 1 400px',
      backgroundColor: '#fafafa',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: `0 12px 35px rgba(255, 154, 90, 0.4), 0 0 30px rgba(255, 154, 90, 0.3), inset 0 0 20px rgba(255, 154, 90, 0.1)`,
      border: `3px solid ${colorScheme.accent}`,
      minWidth: '400px',
      position: 'relative',
      transition: 'all 0.3s ease',
    },
    pdfTitle: {
      fontSize: '1.3rem',
      fontWeight: '600',
      color: colorScheme.primaryText,
      marginBottom: '15px',
      textAlign: 'center',
      fontFamily: "'Quicksand', sans-serif",
    },
    pdfPreview: {
      marginBottom: '20px',
      borderRadius: '10px',
      overflow: 'hidden',
      border: '1px solid #ddd',
    },
    pdfEmbed: {
      borderRadius: '10px',
      border: 'none',
    },
    downloadButton: {
      display: 'block',
      width: '100%',
      padding: '12px 20px',
      backgroundColor: colorScheme.accent,
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      fontWeight: '600',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontFamily: "'Quicksand', sans-serif",
      boxShadow: '0 4px 12px rgba(255, 154, 90, 0.3)',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Advanced Scouting Reports</h1>
        
        <p style={styles.paragraph}>
        These were created as season-long statistical reports to help players identify and understand their strengths and weaknesses from the previous year. These insights were super helpful in the preseason, when teams prepare scouting reports and set training priorities. By grounding feedback in data, I helped players focus on the most important areas for improvement and reinforced why specific skill development would benefit their performance.
        </p>

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
              <h3 style={styles.pdfTitle}>Matt Cagg Player Report</h3>
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
