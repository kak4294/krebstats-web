import React from 'react';

function AboutContent() {
  const colorScheme = {
    background: '#f8f8f8',
    cardBg: '#ffffff',
    primaryText: '#333333',
    secondaryText: '#5a5a5a',
    accent: '#ff9a5a'
  };

  const styles = {
    cardsContainer: {
      display: 'flex',
      gap: '2rem',
      flexWrap: 'wrap',
      position: 'relative',
    },
    card: {
      flex: '1 1 400px',
      backgroundColor: colorScheme.cardBg,
      borderRadius: '18px',
      padding: '30px',
      boxShadow: '0 10px 25px rgba(255, 154, 90, 0.08)',
      position: 'relative',
    },
    cardSeparator: {
      position: 'absolute',
      left: '50%',
      top: '5%',
      bottom: '5%',
      width: '3px',
      background: `linear-gradient(to bottom, transparent, ${colorScheme.accent}, transparent)`,
      opacity: 0.3,
      transform: 'translateX(-50%)',
      borderRadius: '2px',
      '@media (max-width: 900px)': {
        display: 'none',
      },
    },
    heading: {
      fontSize: '2.2rem',
      fontWeight: '700',
      marginBottom: '20px',
      color: colorScheme.primaryText,
      fontFamily: "'Quicksand', sans-serif",
      position: 'relative',
      display: 'inline-block',
      paddingBottom: '25px',
      width: '100%',
      textAlign: 'center',
    },
    sectionUnderline: {
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '60px',
      height: '3px',
      background: `linear-gradient(to right, ${colorScheme.accent}, #ffb78a)`,
      borderRadius: '2px',
    },
    paragraph: {
      fontSize: '1.2rem',
      lineHeight: '1.8',
      marginBottom: '24px',
      color: colorScheme.secondaryText,
      fontFamily: "'Nunito', sans-serif",
      fontWeight: '500',
      textAlign: 'left',
    },
    highlightText: {
      color: colorScheme.accent,
      fontWeight: 'bold',
      fontSize: '1.25rem',
    },
  };

  return (
    <div style={styles.cardsContainer}>
      {/* Personal Bio Card */}
      <div style={styles.card}>
        <h2 style={styles.heading}>
          Personal Bio
          <span style={styles.sectionUnderline}></span>
        </h2>
        <p style={styles.paragraph}>
          My name is <span style={styles.highlightText}>Kyle Krebs</span>! I'm currently a fourth year student at RIT who has grown 
          to have a deep passion for analytics. I'm big into being outdoors whenever possible, including golf, 
          basketball, and any type of fitness.
        </p>
        <p style={styles.paragraph}>
          When I got to high school, I started to really understand the power of gaining knowledge. I know it seems like 
          a basic concept to comprehend, but until then the only thing that interested me was playing the sport 
          of basketball. A YouTuber named <span style={styles.highlightText}>Ken Jee</span> then introduced me to the term 
          "sports data science," and I remember telling myself, "That's it right there, I want to do that for the rest of my life."
        </p>
        <p style={styles.paragraph}>
          I played college basketball for a year before shoulder injuries got the best of me, but they could not keep me away 
          from the game. I love watching and learning about it, and I will be a basketball coach one day.
        </p>
        <p style={styles.paragraph}>
          Hope you enjoy my website!
        </p>
      </div>

      {/* Vertical Separator */}
      <div style={styles.cardSeparator}></div>

      {/* Professional Bio Card */}
      <div style={styles.card}>
        <h2 style={styles.heading}>
          Professional Bio
          <span style={styles.sectionUnderline}></span>
        </h2>
        <p style={styles.paragraph}>
          <span style={styles.highlightText}>Education:</span><br />
          • 4th Year Student at the <span style={styles.highlightText}>Rochester Institute of Technology (RIT)</span> <br />
          • Computer Science Major<br />
          • Applied Statistics Minor
        </p>
        <p style={styles.paragraph}>
          <span style={styles.highlightText}>Experience:</span><br />
          • Software Engineering Intern at MicroEra Power<br />
          • Statistics Assistant for RIT Men's Basketball Team<br />
          • Founder & President of the Basketball Analytics Club at RIT
        </p>
        <p style={styles.paragraph}>
          Integrating both software engineering & data analytics concepts into single projects has given me the opportunity 
          to show off my versatility in what I am able to accomplish. I believe having these two skills working together 
          will set me up for success in whatever my future career has in store for me.
        </p>
      </div>
    </div>
  );
}

export default AboutContent; 