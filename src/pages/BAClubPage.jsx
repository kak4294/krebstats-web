import React from 'react';

function BAClubPage() {
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
      <h1 style={styles.title}>Basketball Analytics Club at RIT</h1>
      {/* Add content here */}
    </div>
  );
}

export default BAClubPage; 