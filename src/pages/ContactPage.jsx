import React from 'react';

function ContactPage() {
  const styles = {
    container: {
      padding: '60px 20px',
      maxWidth: '800px',
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
    contactForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Contact Me</h1>
      <div style={styles.contactForm}>
        {/* Add contact form or contact information here */}
      </div>
    </div>
  );
}

export default ContactPage; 