import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Home, FileText, BarChart3, BookOpen, Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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

  const colorScheme = {
    accent: '#ff9a5a',
    primaryText: '#333333',
    accentLight: '#fff1e6',
  };

  const navItems = [
    { label: 'Home', path: '/liberty-league-dashboard', icon: Home },
    { label: 'Scouting', path: '/liberty-league-scouting-reports', icon: FileText },
    { label: 'Statistics', path: '/liberty-league-stats', icon: BarChart3 },
    { label: 'Blog', path: '/liberty-league-blog', icon: BookOpen },
  ];

  const isActive = (path) => {
    if (path === '/liberty-league-dashboard') return location.pathname === '/liberty-league-dashboard';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const handleNavClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  // Add CSS for responsive behavior
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .header-container {
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
        .header-container {
          padding: ${scrolled ? '0.8rem 1.5rem' : '1.2rem 1.5rem'};
        }
      }

      .logo-section {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        flex-shrink: 0;
      }

      .logo-image {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        object-fit: contain;
      }

      @media (min-width: 768px) {
        .logo-image {
          width: 40px;
          height: 40px;
        }
      }

      .logo-text {
        font-size: 1rem;
        font-weight: 700;
        color: #333333;
        font-family: 'JetBrains Mono', monospace;
        display: none;
      }

      @media (min-width: 480px) {
        .logo-text {
          display: block;
        }
      }

      @media (min-width: 768px) {
        .logo-text {
          font-size: 1.1rem;
        }
      }

      .desktop-nav {
        display: none;
        gap: 0.5rem;
        align-items: center;
      }

      @media (min-width: 900px) {
        .desktop-nav {
          display: flex;
        }
      }

      .nav-button {
        background-color: transparent;
        border: none;
        color: #333333;
        font-size: 0.9rem;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 500;
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        border-radius: 20px;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .nav-button:hover {
        background-color: rgba(255, 154, 90, 0.1);
      }

      .nav-button.active {
        background-color: rgba(255, 154, 90, 0.15);
        color: #ff9a5a;
      }

      .desktop-user-section {
        display: none;
        align-items: center;
        gap: 15px;
        margin-left: 20px;
      }

      @media (min-width: 900px) {
        .desktop-user-section {
          display: flex;
        }
      }

      .user-name {
        font-size: 0.85rem;
        color: #5a5a5a;
        font-family: 'JetBrains Mono', monospace;
        white-space: nowrap;
      }

      .logout-button {
        background-color: rgba(255, 154, 90, 0.1);
        border: 1px solid #ff9a5a;
        color: #ff9a5a;
        font-size: 0.85rem;
        font-family: 'JetBrains Mono', monospace;
        font-weight: 600;
        padding: 0.5rem 1rem;
        cursor: pointer;
        transition: all 0.2s ease;
        border-radius: 20px;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .logout-button:hover {
        background-color: #ff9a5a;
        color: white;
      }

      .mobile-menu-button {
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

      .mobile-menu-button:hover {
        background-color: rgba(255, 154, 90, 0.1);
      }

      @media (min-width: 900px) {
        .mobile-menu-button {
          display: none;
        }
      }

      .mobile-menu {
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

      .mobile-menu.open {
        max-height: 400px;
      }

      .mobile-user-info {
        padding: 16px 20px;
        border-bottom: 1px solid #fff1e6;
        font-size: 0.9rem;
        color: #5a5a5a;
        font-family: 'JetBrains Mono', monospace;
        background-color: #fff1e6;
      }

      .mobile-nav-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        border-bottom: 1px solid #fff1e6;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        color: #333333;
        transition: background-color 0.2s ease;
        font-family: 'JetBrains Mono', monospace;
      }

      .mobile-nav-item:hover {
        background-color: #f5f5f5;
      }

      .mobile-nav-item.active {
        background-color: #fff1e6;
        color: #ff9a5a;
      }

      .mobile-logout-button {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        background-color: #fff1e6;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 600;
        color: #ff9a5a;
        border: none;
        width: 100%;
        text-align: left;
        font-family: 'JetBrains Mono', monospace;
        transition: background-color 0.2s ease;
      }

      .mobile-logout-button:hover {
        background-color: #ff9a5a;
        color: white;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [scrolled]);

  return (
    <header className="header-container">
      {/* Logo Section */}
      <div className="logo-section" onClick={() => handleNavClick('/liberty-league-dashboard')}>
        <img 
          src="/BAClub-Logo.png" 
          alt="Liberty League Analytics" 
          className="logo-image"
        />
        <span className="logo-text">Liberty League Analytics</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              className={`nav-button ${active ? 'active' : ''}`}
              onClick={() => handleNavClick(item.path)}
            >
              <IconComponent size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Desktop User Section */}
      <div className="desktop-user-section">
        <span className="user-name">Welcome, {user?.name}</span>
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={14} />
          Logout
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-button mobile-menu-container"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu mobile-menu-container ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-user-info">
          Welcome, {user?.name}
        </div>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);
          return (
            <div
              key={item.path}
              className={`mobile-nav-item ${active ? 'active' : ''}`}
              onClick={() => handleNavClick(item.path)}
            >
              <IconComponent size={18} />
              {item.label}
            </div>
          );
        })}
        <button className="mobile-logout-button" onClick={handleLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;