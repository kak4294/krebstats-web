import React from 'react';
import { FileText, Users, BarChart3, Download, ExternalLink } from 'lucide-react';
import { getAvailableReports } from '../data/reportMappings';

const ReportsSection = ({ teamName, gender }) => {
  
  const colorScheme = {
    background: '#f8f8f8',
    cardBg: '#ffffff',
    cardBorder: '#fff1e6',
    primaryText: '#333333',
    secondaryText: '#5a5a5a',
    accentLight: '#fff1e6',
    accent: '#ff9a5a',
  };

  const availableReports = getAvailableReports(teamName, gender);

  if (availableReports.length === 0) {
    return null; // Don't render anything if no reports are available
  }

  const styles = {
    container: {
      marginTop: '30px',
    },
    sectionTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: colorScheme.primaryText,
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    reportsGrid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
    },
    reportCard: {
      backgroundColor: colorScheme.cardBg,
      borderRadius: '16px',
      padding: '25px',
      boxShadow: '0 4px 15px rgba(255, 154, 90, 0.08)',
      border: `2px solid ${colorScheme.accent}`,
      transition: 'all 0.3s ease',
    },
    reportHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '15px',
    },
    reportIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      backgroundColor: colorScheme.accentLight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: colorScheme.accent,
    },
    reportTitle: {
      fontSize: '1.1rem',
      fontWeight: '700',
      color: colorScheme.primaryText,
      fontFamily: "'JetBrains Mono', monospace",
    },
    reportDescription: {
      color: colorScheme.secondaryText,
      lineHeight: '1.5',
      marginBottom: '20px',
      fontSize: '0.9rem',
    },
    pdfContainer: {
      width: '100%',
      height: window.innerWidth < 768 ? '400px' : '600px',
      border: `2px solid ${colorScheme.cardBorder}`,
      borderRadius: '12px',
      overflow: 'hidden',
      marginBottom: '15px',
    },
    pdfFrame: {
      width: '100%',
      height: '100%',
      border: 'none',
    },
    buttonContainer: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 20px',
      backgroundColor: colorScheme.accent,
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '0.9rem',
      fontWeight: '600',
      color: 'white',
      transition: 'all 0.3s ease',
    },
  };

  const getReportIcon = (reportType) => {
    switch (reportType) {
      case 'Player':
        return <Users size={20} />;
      case 'Team':
        return <BarChart3 size={20} />;
      default:
        return <FileText size={20} />;
    }
  };

  const getReportDescription = (reportType) => {
    switch (reportType) {
      case 'Player':
        return 'Detailed analysis of individual players, including statistics, strengths, weaknesses, and key matchup information.';
      case 'Team':
        return 'Comprehensive team analysis covering offensive and defensive strategies, play patterns, and tactical insights.';
      default:
        return 'Detailed scouting report with strategic analysis and recommendations.';
    }
  };

  const handleDownload = (reportPath, reportType) => {
    const link = document.createElement('a');
    link.href = reportPath;
    link.download = `${teamName}_${reportType}_Report.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExternalOpen = (reportPath) => {
    window.open(reportPath, '_blank');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.sectionTitle}>
        <FileText size={20} color={colorScheme.accent} />
        Available Scouting Reports
      </h2>
      
      <div style={styles.reportsGrid}>
        {availableReports.map((report, index) => (
          <div key={index} style={styles.reportCard}>
            <div style={styles.reportHeader}>
              <div style={styles.reportIcon}>
                {getReportIcon(report.type)}
              </div>
              <div style={styles.reportTitle}>
                {report.type} Analysis Report
              </div>
            </div>
            
            <div style={styles.reportDescription}>
              {getReportDescription(report.type)}
            </div>
            
            <div style={styles.pdfContainer}>
              <iframe
                src={report.path}
                style={styles.pdfFrame}
                title={`${teamName} ${report.type} Report`}
              />
            </div>
            
            <div style={styles.buttonContainer}>
              <button
                style={styles.actionButton}
                onClick={() => handleDownload(report.path, report.type)}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#e8894a';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = colorScheme.accent;
                }}
              >
                <Download size={16} />
                Download
              </button>
              <button
                style={styles.actionButton}
                onClick={() => handleExternalOpen(report.path)}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#e8894a';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = colorScheme.accent;
                }}
              >
                <ExternalLink size={16} />
                Open in New Tab
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsSection;
