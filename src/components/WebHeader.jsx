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
      padding: scrolled ? '0.8rem 1.5rem' : '1.2rem 1.5rem',
      backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.97)' : 'white',
      color: '#333333',
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
      paddingRight: '2rem',
    },
    navButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#333333',
      fontSize: '0.95rem',
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: '400',
      padding: '0.4rem 0.6rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      borderRadius: '20px',
      position: 'relative',
      letterSpacing: '0.3px',
    },
    activeNavButton: {
      backgroundColor: 'rgba(255, 154, 90, 0.2)'
    },
    buttonHighlight: {
      content: '""',
      position: 'absolute',
      bottom: '-3px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '0%',
      height: '3px',
      backgroundColor: '#ff9a5a',
      transition: 'width 0.3s ease',
      borderRadius: '10px',
    },
  };

  // Reliable scroll function that works with your setup
  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      // Use scrollIntoView since it worked in our tests
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
      
      // Add a small offset by scrolling up a bit after the initial scroll
      setTimeout(() => {
        window.scrollBy(0, -180);
      }, 100);
      
      return true;
    }
    return false;
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

    const targetId = getTargetId(section);
    
    if (location.pathname === '/') {
      // Already on home page, just scroll
      if (targetId) {
        // Try immediate scroll first
        if (!scrollToElement(targetId)) {
          // If element not found, try again after a short delay
          setTimeout(() => scrollToElement(targetId), 100);
        }
      }
    } else {
      // Navigate to home page with scroll target
      if (targetId) {
        navigate('/', { state: { scrollTo: targetId }, replace: false });
      } else {
        navigate('/', { replace: false });
      }
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