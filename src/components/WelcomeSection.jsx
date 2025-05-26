import React from 'react';

function WelcomeSection() {
  const styles = {
    titleContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '0.25rem',
    },
    sectionTitle: {
      fontSize: '2.8rem',
      fontWeight: '700',
      marginBottom: '1.5rem',
      textAlign: 'center',
      color: '#333333',
      fontFamily: "'Quicksand', sans-serif",
      position: 'relative',
      display: 'inline-block',
      padding: '25px 0',
    },
    titleUnderline: {
      position: 'absolute',
      bottom: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '80px',
      height: '4px',
      background: 'linear-gradient(to right, #ff9a5a, #ffb78a)',
      borderRadius: '2px',
    },
    collageContainer: {
      width: '85%',
      maxWidth: '2000px',
      display: 'flex',
      justifyContent: 'center',
      margin: '0 auto 4rem auto',
    },
    collageImage: {
      width: '100%',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(255, 154, 90, 0.15)',
    },
  };

  return (
    <>
      <div style={styles.titleContainer}>
        <h1 style={styles.sectionTitle}>
          Official Website of Kyle Krebs!
          <span style={styles.titleUnderline}></span>
        </h1>
      </div>
      
      <div style={styles.collageContainer}>
        <img 
          src={`/imgs/KrebStats-Lifestyle-Collage.png`}
          alt="KrebStats Lifestyle Collage" 
          style={styles.collageImage}
        />
      </div>
    </>
  );
}

export default WelcomeSection; 