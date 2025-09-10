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
    pdfSection: {
      marginBottom: '30px',
    },
    pdfContainer: {
      backgroundColor: '#fafafa',
      borderRadius: '8px',
      padding: '20px',
      border: '1px solid #ddd',
      marginTop: '20px',
    },
    pdfEmbed: {
      borderRadius: '6px',
      border: 'none',
      width: '100%',
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <p style={styles.orangeLabel}>Data Analysis Project</p>
        <h1 style={styles.heading}>Statistical Analysis of Book Database</h1>
        <p style={styles.subtitle}>Comprehensive data pipeline and analysis project using Python, SQL, and Java</p>

        <div style={styles.section}>
          <p style={styles.highlightedParagraph}>
            As the lead data analyst for my group project, I was tasked with effectively finding insights 
            about a relational database which was planned, built, and maintained by my team. 
          </p>

          <h2 style={styles.sectionTitle}>Data Processing & Analysis</h2>
          <p style={styles.paragraph}>
            This project included many different analysis methods. This includes clustering, scatter plots, goodness of 
            fit tests, heat maps, and pie charts.
          </p>

          <p style={styles.paragraph}>
            Led all data cleaning and validation processes, then as a team we built an extensive amount of SQL-Java 
            connectors which was a key part of our data pipeline. After which, I built all SQL queries for data extraction.
            All returned queries were exported to Excel and then visualizations were created from there.
          </p>
        </div>

        <div style={styles.pdfSection}>
          <h2 style={styles.sectionTitle}>Project Poster Visualization</h2>
          <p style={styles.paragraph}>
            Below is a comprehensive poster visualization showcasing the data analysis methodology, key findings, and insights from the book database project.
          </p>
          <div style={styles.pdfContainer}>
            <embed 
              src="/pdfs/PDM_Poster_DataAnalysis.pdf" 
              type="application/pdf" 
              width="100%" 
              height="450px"
              style={styles.pdfEmbed}
            />
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Tech Stack</h2>
          <div style={styles.techItemsContainer}>
            <span style={styles.techItem}>Python</span>
            <span style={styles.techItem}>SQL</span>
            <span style={styles.techItem}>Java</span>
            <span style={styles.techItem}>Excel</span>
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

export default BookDatabasePage;
