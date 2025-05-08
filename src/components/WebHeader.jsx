import React, { useState, useEffect } from 'react';
// Import the logo directly
import logoImage from '/imgs/KrebStats-Logo-Orange.png';

function WebHeader() {
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Styles for the header components with a light orange color scheme
  const headerStyles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: scrolled ? '0.7rem 2rem' : '1.2rem 2rem',
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.97)' : 'white', // White background
      color: '#333333', // Dark gray text color
      boxShadow: scrolled ? '0 4px 12px rgba(255, 154, 90, 0.15)' : '0 2px 4px rgba(255, 154, 90, 0.1)',
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      borderBottom: scrolled ? '1px solid rgba(255, 154, 90, 0.2)' : 'none',
    },
    logo: {
      margin: 0,
      cursor: 'pointer',
      height: scrolled ? '60px' : '75px',
      display: 'flex',
      alignItems: 'center',
      transition: 'height 0.3s ease',
    },
    logoImage: {
      height: '100%',
      maxHeight: scrolled ? '60px' : '75px',
      width: 'auto',
      transition: 'max-height 0.3s ease',
    },
    nav: {
      display: 'flex',
      gap: '2rem',
    },
    navButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#333333', // Dark gray text
      fontSize: '1.05rem',
      fontFamily: "'Quicksand', sans-serif", // Bubble-styled font
      fontWeight: '600',
      padding: '0.5rem 0.75rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      borderRadius: '20px', // More rounded for bubble style
      position: 'relative',
      letterSpacing: '0.3px',
    },
    activeNavButton: {
      backgroundColor: 'rgba(255, 154, 90, 0.2)' // Semi-transparent light orange
    },
    buttonHighlight: {
      content: '""',
      position: 'absolute',
      bottom: '-3px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '0%',
      height: '3px',
      backgroundColor: '#ff9a5a', // Light orange for underline
      transition: 'width 0.3s ease',
      borderRadius: '10px', // Rounded underline
    },
    // Add hover styles
    hoverStyle: {
      ':hover': {
        backgroundColor: '#fff1e6' // Very light orange on hover
      }
    }
  };

  // Function to handle button clicks (for future navigation implementation)
  const handleNavClick = (section) => {
    console.log(`Navigating to ${section}`);
    // You would implement actual navigation here, such as with React Router
  };

  return (
    <header style={headerStyles.header}>
      {/* Logo/Brand on the left */}
      <div 
        style={headerStyles.logo}
        onClick={() => handleNavClick('home')}
      >
        <img 
          src={logoImage} 
          alt="KrebStats Logo" 
          style={headerStyles.logoImage}
        />
      </div>

      {/* Navigation buttons on the right */}
      <nav style={headerStyles.nav}>
        {['About', 'Projects', 'Resume', 'Contact'].map((item) => (
          <button
            key={item}
            style={headerStyles.navButton}
            onClick={() => handleNavClick(item.toLowerCase())}
            onMouseOver={(e) => {
              // Add background color on hover for better visual feedback
              e.currentTarget.style.backgroundColor = '#fff1e6';
              
              // Create/modify the highlight element
              const highlight = e.currentTarget.querySelector('.button-highlight') || 
                  document.createElement('div');
              
              if (!e.currentTarget.querySelector('.button-highlight')) {
                highlight.className = 'button-highlight';
                Object.assign(highlight.style, {
                  position: 'absolute',
                  bottom: '-3px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  height: '3px',
                  backgroundColor: '#ff9a5a',
                  transition: 'width 0.3s ease',
                  borderRadius: '10px',
                });
                e.currentTarget.appendChild(highlight);
              }
              
              // Expand the highlight
              highlight.style.width = '80%';
            }}
            onMouseOut={(e) => {
              // Remove background color
              e.currentTarget.style.backgroundColor = 'transparent';
              
              // Shrink the highlight
              const highlight = e.currentTarget.querySelector('.button-highlight');
              if (highlight) {
                highlight.style.width = '0%';
              }
            }}
          >
            {item}
            <div className="button-highlight" style={{ 
              position: 'absolute',
              bottom: '-3px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '0%',
              height: '3px',
              backgroundColor: '#ff9a5a',
              transition: 'width 0.3s ease',
              borderRadius: '10px',
            }}></div>
          </button>
        ))}
      </nav>
    </header>
  );
}

export default WebHeader;
