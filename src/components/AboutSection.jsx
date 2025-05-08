import React from 'react';

function AboutSection() {
  // Add timestamp to bust cache
  const cacheKey = Date.now();
  
  // Updated color scheme - white background with light orange accent
  const colorScheme = {
    background: '#ffffff',     // White background
    cardBg: '#ffffff',         // White card background
    cardBorder: '#fff1e6',     // Very light orange for borders
    primaryText: '#333333',    // Dark gray for primary text
    secondaryText: '#5a5a5a',  // Medium gray for secondary text
    accentLight: '#fff1e6',    // Very light orange for accents
    accent: '#ff9a5a'          // Light orange accent color
  };

  const styles = {
    container: {
      padding: '60px 0 40px',
      backgroundColor: colorScheme.background,
      color: colorScheme.primaryText,
      position: 'relative',
    },
    sectionTitle: {
      fontSize: '2.8rem',
      fontWeight: '700',
      marginBottom: '3rem',
      textAlign: 'center',
      color: colorScheme.primaryText,
      fontFamily: "'Quicksand', sans-serif",
      position: 'relative',
      display: 'inline-block',
      padding: '0 30px',
    },
    titleContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '0.5rem',
    },
    titleUnderline: {
      position: 'absolute',
      bottom: '-10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80px',
      height: '4px',
      background: `linear-gradient(to right, ${colorScheme.accent}, #ffb78a)`,
      borderRadius: '2px',
    },
    collageContainer: {
      width: '100%',
      marginBottom: '1.5rem',
      display: 'flex',
      justifyContent: 'center',
    },
    collageImage: {
      width: '100%',
      maxWidth: '1400px',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(255, 154, 90, 0.15)',
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '2.5rem',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    column: {
      flex: '1 1 500px',
      backgroundColor: colorScheme.cardBg,
      borderRadius: '18px',
      padding: '30px',
      boxShadow: '0 10px 25px rgba(255, 154, 90, 0.08)',
      border: `1px solid ${colorScheme.cardBorder}`,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    profileSection: {
      display: 'flex',
      gap: '25px',
      alignItems: 'flex-start',
    },
    profileImageContainer: {
      width: '200px',
      flexShrink: 0,
    },
    profileImage: {
      width: '100%',
      borderRadius: '15px',
      boxShadow: '0 8px 20px rgba(255, 154, 90, 0.12)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    profileInfo: {
      flex: 1,
    },
    clubSection: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      borderRadius: '15px',
      overflow: 'hidden',
      padding: '20px',
    },
    clubBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url('imgs/BAClub-Logo.png')`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.1, // Making the background faint
      zIndex: 0,
    },
    clubContent: {
      position: 'relative',
      zIndex: 1, // Ensures content appears above the background image
    },
    clubHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '20px',
    },
    clubLogo: {
      width: '65px',
      height: '65px',
      borderRadius: '12px',
      boxShadow: '0 4px 10px rgba(255, 154, 90, 0.15)',
      transition: 'transform 0.3s ease',
    },
    heading: {
      fontSize: '1.8rem',
      fontWeight: '700',
      marginBottom: '18px',
      color: colorScheme.primaryText,
      fontFamily: "'Quicksand', sans-serif",
    },
    paragraph: {
      fontSize: '1.05rem',
      lineHeight: '1.8',
      marginBottom: '18px',
      color: colorScheme.secondaryText,
      fontFamily: "'Nunito', sans-serif",
      fontWeight: '500',
    },
    highlightText: {
      color: colorScheme.accent,
      fontWeight: 'bold',
    },
  };

  return (
    <section style={styles.container}>
      <div style={styles.titleContainer}>
        <h1 style={styles.sectionTitle}>
          Welcome to KrebStats!
          <span style={styles.titleUnderline}></span>
        </h1>
      </div>
      
      {/* Lifestyle Collage Image */}
      <div style={styles.collageContainer}>
        <img 
          src={`imgs/KrebStats-Lifestyle-Collage.png?v=${cacheKey}`}
          alt="KrebStats Lifestyle Collage" 
          style={styles.collageImage}
        />
      </div>
      
      <div style={styles.contentContainer}>
        {/* Left Column - Personal Info */}
        <div 
          style={styles.column}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(255, 154, 90, 0.12)';
            
            // Also animate the profile image
            const img = e.currentTarget.querySelector('.profile-image');
            if (img) {
              img.style.transform = 'scale(1.02)';
              img.style.boxShadow = '0 12px 25px rgba(255, 154, 90, 0.18)';
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 154, 90, 0.08)';
            
            // Reset profile image animation
            const img = e.currentTarget.querySelector('.profile-image');
            if (img) {
              img.style.transform = 'scale(1)';
              img.style.boxShadow = '0 8px 20px rgba(255, 154, 90, 0.12)';
            }
          }}
        >
          <div style={styles.profileSection}>            
            {/* Personal Information */}
            <div style={styles.profileInfo}>
              <h2 style={styles.heading}>Kyle Krebs</h2>
              <p style={styles.paragraph}>
                I'm a data analyst and sports enthusiast passionate about leveraging 
                statistics to uncover insights in basketball and other sports. With a 
                background in data science and analytics, I focus on creating meaningful
                visualizations and analysis that tell compelling stories.
              </p>
              <p style={styles.paragraph}>
                Currently, I'm working on developing statistical models that help predict 
                player performance and team strategies. I enjoy finding patterns in data
                that can provide competitive advantages and deeper understanding of the game.
              </p>
              <p style={styles.paragraph}>
                When I'm not analyzing data, you can find me watching games, playing
                basketball, or exploring new statistical methodologies.
              </p>
            </div>
          </div>
        </div>
        
        {/* Right Column - Basketball Analytics Club */}
        <div 
          style={styles.column}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 30px rgba(255, 154, 90, 0.12)';
            
            // Also animate the club logo
            const logo = e.currentTarget.querySelector('.club-logo');
            if (logo) {
              logo.style.transform = 'scale(1.05) rotate(5deg)';
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 154, 90, 0.08)';
            
            // Reset club logo animation
            const logo = e.currentTarget.querySelector('.club-logo');
            if (logo) {
              logo.style.transform = 'scale(1) rotate(0deg)';
            }
          }}
        >
          <div style={styles.clubSection}>
            <div style={styles.clubBackground}></div>
            <div style={styles.clubContent}>
              {/* <div style={styles.clubHeader}>
                {/* Club Logo - Replace with actual logo path }
                <img 
                  className="club-logo"
                  src={`/imgs/KrebStats-Logo-White.png?v=${cacheKey}`}
                  alt="Basketball Analytics Club Logo" 
                  style={styles.clubLogo}
                />
                <h2 style={styles.heading}>Basketball Analytics Club at RIT</h2>
              </div>
               */}
               <h2 style={styles.heading}>Basketball Analytics Club at RIT</h2>
                <p style={styles.paragraph}>
                When I founded the <span style={styles.highlightText}>Basketball Analytics Club at RIT</span>,
                my goal was straightforward: unite students who love basketball and give them a real‑world platform to explore
                the game through data. Tackling hands‑on projects together not only builds technical skills but also captures
                that rush of discovering a new insight on the court.
                </p>
              
                <p style={styles.paragraph}>
                Although we’re still young, I’m committed to tapping every tool we can find to help this club prosper—whether it’s
                through web development, content creation, or diving into basketball research. I don’t want members to 
                simply slot into a preset role; I want each person to shape the club with their own ideas and strengths, building
                something we all can be proud of.
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection; 