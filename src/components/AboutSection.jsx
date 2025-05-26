import React from 'react';
import WelcomeSection from './WelcomeSection';
import AboutContent from './AboutContent';
import BAClubSection from './BAClubSection';
import PersonalProjects from './PersonalProjects';

function AboutSection() {
  // Add timestamp to bust cache
  const cacheKey = Date.now();
  
  // Updated color scheme - light gray background with light orange accent
  const colorScheme = {
    background: '#f8f8f8',     // Light gray background
    cardBg: '#ffffff',         // White card background
    cardBorder: '#fff1e6',     // Very light orange for borders
    primaryText: '#333333',    // Dark gray for primary text
    secondaryText: '#5a5a5a',  // Medium gray for secondary text
    accentLight: '#fff1e6',    // Very light orange for accents
    accent: '#ff9a5a'          // Light orange accent color
  };

  const styles = {
    container: {
      padding: '0 0 40px',
      backgroundColor: colorScheme.background,
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      margin: 0,
      left: 0,
      right: 0,
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem',
      margin: '0 auto',
      padding: '0',
      width: '85%',
      maxWidth: '2000px',
    },
    column: {
      backgroundColor: colorScheme.cardBg,
      borderRadius: '18px',
      padding: '40px',
      boxShadow: '0 10px 25px rgba(255, 154, 90, 0.08)',
      border: `2px solid ${colorScheme.accent}`,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    separator: {
      width: '100%',
      height: '2px',
      background: `linear-gradient(to right, transparent, ${colorScheme.accent}, transparent)`,
      margin: '2rem 0',
      opacity: 0.5,
    },
  };

  return (
    <section style={styles.container} id="about-section">
      <WelcomeSection />
      
      <div style={styles.contentContainer}>
        {/* About Section - Full Width */}
        <div 
          style={styles.column}
          id="about-content"
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(255, 154, 90, 0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 154, 90, 0.08)';
          }}
        >
          <AboutContent />
        </div>
        
        {/* Separator */}
        <div style={styles.separator}></div>
        
        {/* Basketball Analytics Club Section */}
        <div style={styles.column}>
          <BAClubSection />
        </div>

        {/* Separator */}
        <div style={styles.separator}></div>

        {/* Projects Section */}
        <PersonalProjects />
      </div>
    </section>
  );
}

export default AboutSection; 