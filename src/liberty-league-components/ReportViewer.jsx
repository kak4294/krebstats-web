import React, { useState } from 'react';
import { FileText, Download, ExternalLink, X } from 'lucide-react';

const ReportViewer = ({ reportPath, reportType, teamName, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const colorScheme = {
    background: '#f8f8f8',
    cardBg: '#ffffff',
    cardBorder: '#fff1e6',
    primaryText: '#333333',
    secondaryText: '#5a5a5a',
    accentLight: '#fff1e6',
    accent: '#ff9a5a',
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    },
    modal: {
      backgroundColor: colorScheme.cardBg,
      borderRadius: '16px',
      width: '90vw',
      height: '90vh',
      maxWidth: '1200px',
      maxHeight: '800px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      border: `2px solid ${colorScheme.accent}`,
    },
    header: {
      padding: '20px 30px',
      borderBottom: `1px solid ${colorScheme.cardBorder}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colorScheme.accentLight,
      borderRadius: '14px 14px 0 0',
    },
    title: {
      fontSize: '1.2rem',
      fontWeight: '700',
      color: colorScheme.primaryText,
      fontFamily: "'JetBrains Mono', monospace",
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    button: {
      padding: '8px 16px',
      backgroundColor: colorScheme.accent,
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '0.85rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.3s ease',
    },
    closeButton: {
      padding: '8px',
      backgroundColor: 'transparent',
      color: colorScheme.secondaryText,
      border: `1px solid ${colorScheme.cardBorder}`,
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
    },
    content: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    },
    iframe: {
      width: '100%',
      height: '100%',
      border: 'none',
      borderRadius: '8px',
    },
    errorContainer: {
      textAlign: 'center',
      color: colorScheme.secondaryText,
    },
    errorTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '10px',
      color: colorScheme.primaryText,
    },
    errorMessage: {
      marginBottom: '20px',
      lineHeight: '1.5',
    },
    loadingContainer: {
      textAlign: 'center',
      color: colorScheme.accent,
    },
    loadingText: {
      fontSize: '1.1rem',
      fontWeight: '600',
      marginTop: '10px',
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: `3px solid ${colorScheme.cardBorder}`,
      borderTop: `3px solid ${colorScheme.accent}`,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto',
    },
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = reportPath;
    link.download = `${teamName}_${reportType}_Report.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExternalOpen = () => {
    window.open(reportPath, '_blank');
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={styles.title}>
            <FileText size={20} color={colorScheme.accent} />
            {teamName} {reportType} Analysis Report
          </h3>
          <div style={styles.controls}>
            <button
              style={styles.button}
              onClick={handleDownload}
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
              style={styles.button}
              onClick={handleExternalOpen}
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
            <button
              style={styles.closeButton}
              onClick={onClose}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = colorScheme.cardBorder;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>
        
        <div style={styles.content}>
          {isLoading && !error && (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              <div style={styles.loadingText}>Loading report...</div>
            </div>
          )}
          
          {error && (
            <div style={styles.errorContainer}>
              <div style={styles.errorTitle}>Unable to load report</div>
              <div style={styles.errorMessage}>
                The PDF report could not be displayed in the browser. 
                You can try downloading it or opening it in a new tab.
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button style={styles.button} onClick={handleDownload}>
                  <Download size={16} />
                  Download Report
                </button>
                <button style={styles.button} onClick={handleExternalOpen}>
                  <ExternalLink size={16} />
                  Open in New Tab
                </button>
              </div>
            </div>
          )}
          
          {!error && (
            <iframe
              src={reportPath}
              style={styles.iframe}
              onLoad={handleLoad}
              onError={handleError}
              title={`${teamName} ${reportType} Report`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportViewer;
