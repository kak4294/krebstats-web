import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WebHeader from './components/WebHeader'
import AboutSection from './components/AboutSection'

function App() {
  const [count, setCount] = useState(0)

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

  const rootStyle = {
    backgroundColor: colorScheme.background,
    minHeight: '100vh',
    height: '100vh',
    width: '100%',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    color: colorScheme.primaryText,
    overflowX: 'hidden'
  };

  useEffect(() => {
    // Import Google Fonts - Changed to bubble-style fonts
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
    
    // Apply global styles
    document.body.style.backgroundColor = colorScheme.background;
    document.body.style.color = colorScheme.primaryText;
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.body.style.fontFamily = "'Quicksand', sans-serif";
    document.body.style.overflowX = 'hidden';
    
    // Remove any light blue classes from the body
    document.body.classList.remove('bg-light-blue');
    
    // Override any CSS variables with orange theme
    document.documentElement.style.setProperty('--primary-color', colorScheme.accent);
    document.documentElement.style.setProperty('--primary-light', colorScheme.accentLight);
    document.documentElement.style.setProperty('--shadow-color', 'rgba(255, 154, 90, 0.1)');
    
    // Cleanup function
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const styles = {
    mainContent: {
      maxWidth: '2400px',
      margin: '0 auto',
      padding: '0',
      backgroundColor: colorScheme.background,
      boxShadow: 'none',
      border: 'none',
      width: '100%',
    },
    contentWrapper: {
      padding: '0',
      backgroundColor: colorScheme.background,
      width: '100%',
    },
    introCard: {
      backgroundColor: colorScheme.cardBg,
      padding: '30px',
      borderRadius: '18px', // More rounded for bubble style
      margin: '20px 0', 
      boxShadow: '0 6px 20px rgba(255, 154, 90, 0.08)',
      border: `1px solid ${colorScheme.cardBorder}`,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    heading: {
      fontFamily: "'Quicksand', sans-serif", // Bubble font
      fontWeight: '700',
      color: colorScheme.primaryText,
      marginBottom: '16px',
    },
    paragraph: {
      fontFamily: "'Nunito', sans-serif", // Bubble font for body text
      fontSize: '1.05rem',
      lineHeight: '1.7',
      color: colorScheme.secondaryText,
    },
    button: {
      backgroundColor: colorScheme.accent,
      color: 'white',
      border: 'none',
      padding: '10px 24px',
      borderRadius: '25px', // Fully rounded for bubble style
      cursor: 'pointer',
      fontFamily: "'Quicksand', sans-serif", // Bubble font
      fontWeight: '600',
      fontSize: '0.95rem',
      letterSpacing: '0.5px',
      transition: 'all 0.2s ease',
      boxShadow: '0 2px 6px rgba(255, 154, 90, 0.3)',
    },
    footer: {
      textAlign: 'center',
      marginTop: '40px',
      padding: '20px 10px',
      borderTop: `1px solid ${colorScheme.accentLight}`,
      color: colorScheme.secondaryText,
      fontSize: '0.9rem',
      fontFamily: "'Nunito', sans-serif", // Bubble font
    },
    code: {
      backgroundColor: colorScheme.accentLight,
      padding: '2px 6px',
      borderRadius: '8px', // More rounded for bubble style
      fontFamily: "'Quicksand', monospace", // Bubble-ish monospace
      color: colorScheme.accent,
    }
  };

  return (
    <div style={rootStyle}>
      {/* Header is now positioned at the very top */}
      <WebHeader />
      
      {/* Main content */}
      <div style={styles.mainContent}>
        <AboutSection />
      </div>
    </div>
  )
}

export default App
