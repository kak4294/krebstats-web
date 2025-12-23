import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FileText, BarChart3, BookOpen, ChevronRight, Calendar, Users, TrendingUp } from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hoveredCard, setHoveredCard] = useState(null);

  const colorScheme = {
    background: '#f8f8f8',
    cardBg: '#ffffff',
    cardBorder: '#fff1e6',
    primaryText: '#333333',
    secondaryText: '#5a5a5a',
    accentLight: '#fff1e6',
    accent: '#ff9a5a'
  };

  const sections = [
    {
      id: 'scouting',
      title: 'Scouting Reports',
      description: 'Access detailed scouting reports for upcoming opponents. View team tendencies, player analysis, and strategic insights for both men\'s and women\'s basketball.',
      icon: FileText,
      path: '/liberty-league-scouting-reports',
      stats: ['25+ Games', 'Men\'s & Women\'s', 'Full Analysis'],
      gradient: 'linear-gradient(135deg, #ff9a5a 0%, #ffb078 100%)',
    },
    {
      id: 'stats',
      title: 'Liberty League Statistics',
      description: 'Explore comprehensive player and team statistics from across the Liberty League. View leaderboards, compare performances, and track trends.',
      icon: BarChart3,
      path: '/league-stats',
      stats: ['Player Rankings', 'Team Stats', 'Conference Data'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      id: 'blog',
      title: 'Blog Posts',
      description: 'Read in-depth analysis of games, player spotlights, and strategic breakdowns written by our analytics team.',
      icon: BookOpen,
      path: '/blog',
      stats: ['Game Analysis', 'Player Features', 'Strategic Insights'],
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    },
  ];

  const quickStats = [
    { label: 'Men\'s Record', value: '2-6', sublabel: '1-1 Liberty League', icon: Users },
    { label: 'Women\'s Record', value: '5-3', sublabel: '2-0 Liberty League', icon: Users },
    { label: 'Upcoming Games', value: '36', sublabel: 'Combined schedule', icon: Calendar },
    { label: 'Reports Ready', value: '12', sublabel: 'Scouting reports', icon: TrendingUp },
  ];

  const styles = {
    container: {
      minHeight: 'calc(100vh - 80px)',
      padding: window.innerWidth < 768 ? '20px 10px' : '40px 20px',
      fontFamily: "'JetBrains Mono', monospace",
    },
    contentWrapper: {
      maxWidth: '1400px',
      margin: '0 auto',
    },
    welcomeSection: {
      textAlign: 'center',
      marginBottom: '50px',
    },
    welcomeTitle: {
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      fontWeight: '700',
      color: colorScheme.primaryText,
      marginBottom: '10px',
    },
    welcomeSubtitle: {
      fontSize: '1.1rem',
      color: colorScheme.secondaryText,
      marginBottom: '30px',
    },
    quickStatsGrid: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth < 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: window.innerWidth < 768 ? '15px' : '20px',
      marginBottom: window.innerWidth < 768 ? '30px' : '50px',
    },
    quickStatCard: {
      backgroundColor: colorScheme.cardBg,
      borderRadius: '16px',
      padding: '25px',
      boxShadow: '0 4px 15px rgba(255, 154, 90, 0.08)',
      border: `1px solid ${colorScheme.cardBorder}`,
      textAlign: 'center',
      transition: 'all 0.3s ease',
    },
    quickStatIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      backgroundColor: colorScheme.accentLight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 15px',
      color: colorScheme.accent,
    },
    quickStatValue: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: colorScheme.primaryText,
      marginBottom: '5px',
    },
    quickStatLabel: {
      fontSize: '0.9rem',
      color: colorScheme.secondaryText,
      marginBottom: '5px',
    },
    quickStatSublabel: {
      fontSize: '0.75rem',
      color: '#999',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: colorScheme.primaryText,
      marginBottom: '25px',
      textAlign: 'center',
    },
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: window.innerWidth < 768 ? '20px' : '30px',
      marginBottom: window.innerWidth < 768 ? '30px' : '40px',
    },
    card: {
      backgroundColor: colorScheme.cardBg,
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 10px 30px rgba(255, 154, 90, 0.1)',
      border: `2px solid ${colorScheme.cardBorder}`,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 40px rgba(255, 154, 90, 0.15)',
      borderColor: colorScheme.accent,
    },
    cardHeader: {
      padding: '30px',
      color: 'white',
    },
    cardIcon: {
      width: '60px',
      height: '60px',
      borderRadius: '15px',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '20px',
    },
    cardTitle: {
      fontSize: '1.4rem',
      fontWeight: '700',
      marginBottom: '10px',
    },
    cardBody: {
      padding: '25px 30px',
    },
    cardDescription: {
      fontSize: '0.95rem',
      lineHeight: '1.6',
      color: colorScheme.secondaryText,
      marginBottom: '20px',
    },
    cardStats: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginBottom: '20px',
    },
    cardStatBadge: {
      backgroundColor: colorScheme.accentLight,
      color: colorScheme.accent,
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
    },
    cardButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: '15px 20px',
      backgroundColor: colorScheme.accentLight,
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '0.95rem',
      fontWeight: '600',
      color: colorScheme.accent,
      transition: 'all 0.3s ease',
    },
  };

  // Add animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .dashboard-card {
        animation: fadeInUp 0.5s ease-out;
      }
      .dashboard-card:nth-child(1) { animation-delay: 0.1s; }
      .dashboard-card:nth-child(2) { animation-delay: 0.2s; }
      .dashboard-card:nth-child(3) { animation-delay: 0.3s; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Welcome Section */}
        <div style={styles.welcomeSection}>
          <h1 style={styles.welcomeTitle}>
            Welcome back, {user?.name?.split(' ')[0] || 'Coach'} 🏀
          </h1>
          <p style={styles.welcomeSubtitle}>
            RIT Basketball Analytics Platform - Your hub for game insights and team performance
          </p>
        </div>

        {/* Quick Stats */}
        <div style={styles.quickStatsGrid}>
          {quickStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                style={styles.quickStatCard}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 154, 90, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 154, 90, 0.08)';
                }}
              >
                <div style={styles.quickStatIcon}>
                  <IconComponent size={20} />
                </div>
                <div style={styles.quickStatValue}>{stat.value}</div>
                <div style={styles.quickStatLabel}>{stat.label}</div>
                <div style={styles.quickStatSublabel}>{stat.sublabel}</div>
              </div>
            );
          })}
        </div>

        {/* Main Navigation Cards */}
        <h2 style={styles.sectionTitle}>Explore Analytics</h2>
        <div style={styles.cardsGrid}>
          {sections.map((section) => {
            const IconComponent = section.icon;
            const isHovered = hoveredCard === section.id;
            
            return (
              <div
                key={section.id}
                className="dashboard-card"
                style={{
                  ...styles.card,
                  ...(isHovered ? styles.cardHover : {})
                }}
                onMouseEnter={() => setHoveredCard(section.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate(section.path)}
              >
                <div style={{
                  ...styles.cardHeader,
                  background: section.gradient,
                }}>
                  <div style={styles.cardIcon}>
                    <IconComponent size={30} />
                  </div>
                  <h3 style={styles.cardTitle}>{section.title}</h3>
                </div>
                
                <div style={styles.cardBody}>
                  <p style={styles.cardDescription}>{section.description}</p>
                  
                  <div style={styles.cardStats}>
                    {section.stats.map((stat, idx) => (
                      <span key={idx} style={styles.cardStatBadge}>{stat}</span>
                    ))}
                  </div>
                  
                  <button
                    style={styles.cardButton}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = colorScheme.accent;
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = colorScheme.accentLight;
                      e.currentTarget.style.color = colorScheme.accent;
                    }}
                  >
                    <span>Explore</span>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

