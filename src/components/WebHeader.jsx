import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function WebHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

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

    // Close mobile menu
    setMobileMenuOpen(false);

    // Handle "home" separately
    if (section === 'home') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/', { replace: false });
      }
      return;
    }

    // Handle Liberty League Analytics
    if (section === 'liberty league analytics') {
      navigate('/liberty-league-login');
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

  // Add CSS for responsive behavior
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .main-header-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: ${scrolled ? '0.8rem 1rem' : '1.2rem 1rem'};
        background-color: ${scrolled ? 'rgba(255, 255, 255, 0.97)' : 'white'};
        color: #333333;
        box-shadow: ${scrolled ? '0 12px 24px rgba(255, 154, 90, 0.15)' : '0 2px 4px rgba(255, 154, 90, 0.1)'};
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 1000;
        transition: all 0.3s ease;
        border-bottom: ${scrolled ? '1px solid rgba(255, 154, 90, 0.2)' : 'none'};
        box-sizing: border-box;
      }

      @media (min-width: 768px) {
        .main-header-container {
          padding: ${scrolled ? '0.8rem 1.5rem' : '1.2rem 1.5rem'};
        }
      }

      .main-name-text {
        margin: 0;
        cursor: pointer;
        font-size: ${scrolled ? '1.1rem' : '1.3rem'};
        font-family: 'JetBrains Mono', monospace;
        font-weight: 700;
        color: #333333;
        transition: font-size 0.3s ease;
        letter-spacing: 0.5px;
        flex-shrink: 0;
      }

      @media (min-width: 768px) {
        .main-name-text {
          font-size: ${scrolled ? '1.3rem' : '1.5rem'};
        }
      }

      .main-desktop-nav {
        display: none;
        gap: 1.5rem;
        padding-right: 2rem;
        align-items: center;
      }

      @media (min-width: 900px) {
        .main-desktop-nav {
          display: flex;
        }
      }

      .main-nav-button {
        background-color: transparent;
        border: none;
        color: #333333;
        font-size: 0.95rem;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 400;
        padding: 0.4rem 0.6rem;
        cursor: pointer;
        transition: all 0.2s ease;
        border-radius: 20px;
        position: relative;
        letter-spacing: 0.3px;
      }

      .main-nav-button:hover {
        background-color: #fff1e6;
      }

      .main-nav-button:hover::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        height: 3px;
        background-color: #ff9a5a;
        border-radius: 10px;
      }

      .liberty-league-button {
        background-color: #ff9a5a;
        color: white;
        border: none;
        font-size: 0.9rem;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 600;
        padding: 0.6rem 1.2rem;
        cursor: pointer;
        transition: all 0.2s ease;
        border-radius: 25px;
        margin-left: 1rem;
        letter-spacing: 0.3px;
        box-shadow: 0 2px 8px rgba(255, 154, 90, 0.3);
        white-space: nowrap;
      }

      .liberty-league-button:hover {
        background-color: #e8894a;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(255, 154, 90, 0.4);
      }

      .main-mobile-menu-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: #333333;
        border-radius: 8px;
        transition: background-color 0.2s ease;
      }

      .main-mobile-menu-button:hover {
        background-color: rgba(255, 154, 90, 0.1);
      }

      @media (min-width: 900px) {
        .main-mobile-menu-button {
          display: none;
        }
      }

      .main-mobile-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: white;
        box-shadow: 0 4px 20px rgba(255, 154, 90, 0.15);
        border-top: 1px solid #fff1e6;
        z-index: 999;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
      }

      .main-mobile-menu.open {
        max-height: 500px;
      }

      .main-mobile-nav-item {
        display: flex;
        align-items: center;
        padding: 16px 20px;
        border-bottom: 1px solid #fff1e6;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        color: #333333;
        transition: background-color 0.2s ease;
        font-family: 'JetBrains Mono', monospace;
      }

      .main-mobile-nav-item:hover {
        background-color: #f5f5f5;
      }

      .main-mobile-liberty-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px 20px;
        background-color: #ff9a5a;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        color: white;
        border: none;
        width: 100%;
        text-align: center;
        font-family: 'JetBrains Mono', monospace;
        transition: background-color 0.2s ease;
      }

      .main-mobile-liberty-button:hover {
        background-color: #e8894a;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [scrolled]);

  return (
    <header className="main-header-container">
      {/* Name on the left */}
      <div 
        className="main-name-text"
        onClick={() => handleNavClick('home')}
      >
        Kyle Krebs
      </div>

      {/* Desktop Navigation buttons on the right */}
      <nav className="main-desktop-nav">
        {['About', 'Basketball Analytics Club', 'Projects', 'Resume', 'Contact'].map((item) => (
          <button
            key={item}
            className="main-nav-button"
            onClick={() => handleNavClick(item.toLowerCase())}
          >
            {item}
          </button>
        ))}
        
        {/* Liberty League Analytics Button */}
        <button
          className="liberty-league-button"
          onClick={() => handleNavClick('liberty league analytics')}
        >
          Liberty League Analytics
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="main-mobile-menu-button mobile-menu-container"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <div className={`main-mobile-menu mobile-menu-container ${mobileMenuOpen ? 'open' : ''}`}>
        {['About', 'Basketball Analytics Club', 'Projects', 'Resume', 'Contact'].map((item) => (
          <div
            key={item}
            className="main-mobile-nav-item"
            onClick={() => handleNavClick(item.toLowerCase())}
          >
            {item}
          </div>
        ))}
        <button
          className="main-mobile-liberty-button"
          onClick={() => handleNavClick('liberty league analytics')}
        >
          Liberty League Analytics
        </button>
      </div>
    </header>
  );
}

export default WebHeader;