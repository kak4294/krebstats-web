import React from 'react';
import { Link } from 'react-router-dom';

function BookDatabasePage() {
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
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '30px',
      color: colorScheme.primaryText,
      fontFamily: "'Quicksand', sans-serif",
      textAlign: 'center',
    },
    subheading: {
      fontSize: '1.3rem',
      color: colorScheme.secondaryText,
      marginBottom: '40px',
      textAlign: 'center',
      lineHeight: '1.6',
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Statistical Analysis of Book Database</h1>
        
        <p style={styles.subheading}>
          Comprehensive data pipeline and analysis project using Python, SQL, and Java
        </p>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Project Overview</h2>
          <p style={styles.paragraph}>
            This project involved leading the complete data lifecycle for a book database analysis, 
            from initial data cleaning and insertion through advanced statistical analysis. The project 
            focused on understanding user book preferences and presenting actionable insights to stakeholders.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Key Responsibilities</h2>
          <p style={styles.paragraph}>
            • Led comprehensive data cleaning and validation processes<br/>
            • Designed and implemented database insertion procedures<br/>
            • Managed data pipelines with Java and SQL connectors<br/>
            • Executed complex SQL queries for data extraction<br/>
            • Conducted statistical analysis of user reading patterns<br/>
            • Created clear Excel visualizations for non-technical stakeholders
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Technologies Used</h2>
          <p style={styles.paragraph}>
            • Python (Pandas) for data processing and analysis<br/>
            • SQL for database management and queries<br/>
            • Java for data pipeline connectors<br/>
            • Excel for stakeholder-friendly visualizations<br/>
            • Statistical analysis methodologies<br/>
            • Large dataset handling techniques
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Key Insights</h2>
          <p style={styles.paragraph}>
            The analysis revealed significant patterns in user book preferences, reading habits, and 
            engagement metrics. These findings were successfully communicated to stakeholders through 
            clear, actionable visualizations that informed business decisions.
          </p>
        </div>

        <div style={styles.comingSoon}>
          <h3 style={{...styles.sectionTitle, marginBottom: '10px'}}>Coming Soon</h3>
          <p style={styles.paragraph}>
            Sample visualizations, code examples, and detailed methodology documentation coming soon!
          </p>
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

export default BookDatabasePage;
