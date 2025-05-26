import React from 'react';

function ResumePage() {
  const styles = {
    container: {
      padding: '60px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '2rem',
      color: '#333333',
      fontFamily: "'Quicksand', sans-serif",
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Resume</h1>
      {/* Add resume content here */}
    </div>
  );
}

export default ResumePage; 