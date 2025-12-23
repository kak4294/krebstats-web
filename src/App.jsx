import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigationType, Navigate } from 'react-router-dom'
import './App.css'
import './fonts.css'
import { AuthProvider, useAuth } from './context/AuthContext'
import WebHeader from './components/WebHeader'
import LandingPage from './pages/LandingPage'
import PlayActionDashboardPage from './pages/PlayActionDashboardPage'
import ScoutingReportsPage from './pages/ScoutingReportsPage'
import BookDatabasePage from './pages/BookDatabasePage'
import RITBasketballPage from './pages/RIT-Basketball-Page'
import LoginPage from './liberty-league-components/LoginPage'
import DashboardPage from './liberty-league-components/DashboardPage'
import LibertyScoutingReportsPage from './liberty-league-components/ScoutingReportsPage'
import GameScoutingPage from './liberty-league-components/GameScoutingPage'
import LeagueStatsPage from './liberty-league-components/LeagueStatsPage'
import PlayerLeaderboardsPage from './liberty-league-components/PlayerLeaderboardsPage'
import TeamLeaderboardsPage from './liberty-league-components/TeamLeaderboardsPage'
import BlogPostsPage from './liberty-league-components/BlogPostsPage'
import Header from './liberty-league-components/Header'

// Protected Route Component for Liberty League Analytics
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f8f8'
      }}>
        <div style={{
          fontSize: '1.2rem',
          color: '#ff9a5a',
          fontFamily: "'JetBrains Mono', monospace"
        }}>
          Loading...
        </div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/liberty-league-login" replace />;
};

// App Content with routing
const AppContent = () => {
  const location = useLocation()
  const navType = useNavigationType()
  const { isAuthenticated } = useAuth();

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
    backgroundColor: '#ffffff',
    backgroundImage: 'radial-gradient(circle, #e0e0e0 1px, transparent 1px)',
    backgroundSize: '20px 20px',
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
    // Set Georgia as the main font (system font, no need to import)
    
    // Apply global styles
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.backgroundImage = 'radial-gradient(circle, #e0e0e0 1px, transparent 1px)';
    document.body.style.backgroundSize = '20px 20px';
    document.body.style.color = colorScheme.primaryText;
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.body.style.fontFamily = "Georgia, serif";
    document.body.style.overflowX = 'hidden';
    
    // Remove any light blue classes from the body
    document.body.classList.remove('bg-light-blue');
    
    // Override any CSS variables with orange theme
    document.documentElement.style.setProperty('--primary-color', colorScheme.accent);
    document.documentElement.style.setProperty('--primary-light', colorScheme.accentLight);
    document.documentElement.style.setProperty('--shadow-color', 'rgba(255, 154, 90, 0.1)');
  }, []);

  // Handle navigation with state-based scroll targets (keeps URL as '/')
  useEffect(() => {
    const state = location.state;
    if (state && state.scrollTo) {
      const elementId = state.scrollTo;
      
      console.log(`🎯 Navigation scroll triggered for: ${elementId}`);
      
      // Clear the state to prevent re-scrolling on subsequent renders
      window.history.replaceState({}, document.title);
      
      // Function to scroll to target element
      const scrollToTarget = () => {
        const element = document.getElementById(elementId);
        if (element) {
          console.log(`✅ Found element for navigation scroll:`, element);
          
          // Use scrollIntoView since that worked in our tests
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
          
          // Add offset for sticky header
          setTimeout(() => {
            window.scrollBy(0, -180);
          }, 100);
          
          return true;
        } else {
          console.log(`❌ Element '${elementId}' not found during navigation`);
          return false;
        }
      };

      // Try scrolling with multiple delays to ensure content is loaded
      const attempts = [200, 500, 800, 1200];
      
      attempts.forEach((delay) => {
        setTimeout(() => {
          if (document.getElementById(elementId)) {
            scrollToTarget();
          }
        }, delay);
      });
    }
  }, [location.state]); 

  // Handle hash-based navigation for scrolling to sections (fallback if hash exists)
  useEffect(() => {
    if (!location.hash) return;
    const elementId = location.hash.substring(1); // Remove the '#'

    let attempts = 0;
    const tryScroll = () => {
      const element = document.getElementById(elementId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - 180,
          behavior: 'smooth'
        });
      } else if (attempts < 10) {
        attempts += 1;
        setTimeout(tryScroll, 100);
      }
    };

    // Start trying to scroll after a short delay to allow render
    setTimeout(tryScroll, 100);
  }, [location]);

  const styles = {
    mainContent: {
      maxWidth: '2400px',
      margin: '0 auto',
      padding: '0',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      border: 'none',
      width: '100%',
    },
    contentWrapper: {
      padding: '0',
      backgroundColor: 'transparent',
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
      fontFamily: "Georgia, serif",
      fontWeight: '700',
      color: colorScheme.primaryText,
      marginBottom: '16px',
    },
    paragraph: {
      fontFamily: "Georgia, serif",
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
      fontFamily: "Georgia, serif",
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
      fontFamily: "Georgia, serif",
    },
    code: {
      backgroundColor: colorScheme.accentLight,
      padding: '2px 6px',
      borderRadius: '8px', // More rounded for bubble style
      fontFamily: "Georgia, serif",
      color: colorScheme.accent,
    }
  };

  // Check if we're in Liberty League Analytics section
  const isLibertyLeagueSection = location.pathname.startsWith('/liberty-league');

  return (
    <div style={rootStyle}>
      {/* Conditional Header - show Liberty League header when in that section */}
      {isLibertyLeagueSection && isAuthenticated ? <Header /> : <WebHeader />}
      
      {/* Main content with routing */}
      <div style={styles.mainContent}>
        <Routes>
          {/* Main website routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects/play-action-dashboard" element={<PlayActionDashboardPage />} />
          <Route path="/projects/scouting-reports" element={<ScoutingReportsPage />} />
          <Route path="/projects/book-database-analysis" element={<BookDatabasePage />} />
          <Route path="/baclub" element={<RITBasketballPage />} />
          
          {/* Liberty League Analytics routes */}
          <Route path="/liberty-league-login" element={<LoginPage />} />
          <Route path="/liberty-league-dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/liberty-league-scouting-reports" element={
            <ProtectedRoute>
              <LibertyScoutingReportsPage />
            </ProtectedRoute>
          } />
          <Route path="/liberty-league-scouting-reports/:team/:gameId" element={
            <ProtectedRoute>
              <GameScoutingPage />
            </ProtectedRoute>
          } />
          <Route path="/liberty-league-stats" element={
            <ProtectedRoute>
              <LeagueStatsPage />
            </ProtectedRoute>
          } />
          <Route path="/liberty-league-stats/players" element={
            <ProtectedRoute>
              <PlayerLeaderboardsPage />
            </ProtectedRoute>
          } />
          <Route path="/liberty-league-stats/teams" element={
            <ProtectedRoute>
              <TeamLeaderboardsPage />
            </ProtectedRoute>
          } />
          <Route path="/liberty-league-blog" element={
            <ProtectedRoute>
              <BlogPostsPage />
            </ProtectedRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App
