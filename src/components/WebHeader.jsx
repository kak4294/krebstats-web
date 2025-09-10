import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function WebHeader() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
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
      padding: scrolled ? '0.4rem 1.5rem' : '0.6rem 1.5rem',
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.97)' : 'white', // White background
      color: '#333333', // Dark gray text color
      boxShadow: scrolled ? '0 12px 24px rgba(255, 154, 90, 0.15)' : '0 2px 4px rgba(255, 154, 90, 0.1)',
      position: 'sticky',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      borderBottom: scrolled ? '1px solid rgba(255, 154, 90, 0.2)' : 'none',
    },
    nameText: {
      margin: 0,
      cursor: 'pointer',
      fontSize: scrolled ? '1.3rem' : '1.5rem',
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: '700',
      color: '#333333',
      transition: 'font-size 0.3s ease',
      letterSpacing: '0.5px',
    },
    nav: {
      display: 'flex',
      gap: '1.5rem',
    },
    navButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#333333', // Dark gray text
      fontSize: '0.95rem',
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: '400',
      padding: '0.4rem 0.6rem',
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

  // Function to handle button clicks
  const handleNavClick = (section) => {
    const getTargetId = (sec) => {
      if (sec === 'about') return 'about-section';
      if (sec === 'basketball analytics club') return 'baclub-section';
      if (sec === 'projects') return 'projects-section';
      if (sec === 'resume') return 'resume-section';
      if (sec === 'contact') return 'contact-section';
      return '';
    };

    // Handle "home" separately
    if (section === 'home') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/', { replace: false });
      }
      return;
    }

    // Compute target and navigate using router while keeping URL as '/'
    const targetId = getTargetId(section);
    if (targetId) {
      navigate('/', { state: { scrollTo: targetId }, replace: false });
    } else {
      navigate('/', { replace: false });
    }
  };

  return (
    <header style={headerStyles.header}>
      {/* Name on the left */}
      <div 
        style={headerStyles.nameText}
        onClick={() => handleNavClick('home')}
      >
        Kyle Krebs
      </div>

      {/* Navigation buttons on the right */}
      <nav style={headerStyles.nav}>
        {['About', 'Basketball Analytics Club', 'Projects', 'Resume', 'Contact'].map((item) => (
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
