import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/liberty-league-dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const colorScheme = {
    background: '#f8f8f8',
    cardBg: '#ffffff',
    cardBorder: '#fff1e6',
    primaryText: '#333333',
    secondaryText: '#5a5a5a',
    accentLight: '#fff1e6',
    accent: '#ff9a5a',
    error: '#e74c3c'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate brief loading for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = login(username, password);
    
    if (result.success) {
      navigate('/liberty-league-dashboard', { replace: true });
    } else {
      setError(result.error);
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      backgroundImage: 'radial-gradient(circle, #e0e0e0 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      padding: '20px',
    },
    loginCard: {
      backgroundColor: colorScheme.cardBg,
      borderRadius: '24px',
      padding: '50px 40px',
      width: '100%',
      maxWidth: '440px',
      boxShadow: '0 20px 60px rgba(255, 154, 90, 0.15)',
      border: `2px solid ${colorScheme.accent}`,
      animation: 'fadeInUp 0.6s ease-out',
    },
    logoContainer: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    logo: {
      width: '100px',
      height: '100px',
      borderRadius: '20px',
      objectFit: 'contain',
      marginBottom: '15px',
      boxShadow: '0 8px 20px rgba(255, 154, 90, 0.2)',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: '700',
      color: colorScheme.primaryText,
      fontFamily: "'JetBrains Mono', monospace",
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '0.95rem',
      color: colorScheme.secondaryText,
      fontFamily: "'JetBrains Mono', monospace",
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    inputGroup: {
      position: 'relative',
    },
    label: {
      display: 'block',
      fontSize: '0.85rem',
      fontWeight: '600',
      color: colorScheme.primaryText,
      marginBottom: '8px',
      fontFamily: "'JetBrains Mono', monospace",
    },
    inputWrapper: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    inputIcon: {
      position: 'absolute',
      left: '16px',
      color: colorScheme.secondaryText,
      zIndex: 1,
    },
    input: {
      width: '100%',
      padding: '16px 16px 16px 50px',
      fontSize: '1rem',
      fontFamily: "'JetBrains Mono', monospace",
      border: `2px solid ${colorScheme.cardBorder}`,
      borderRadius: '12px',
      backgroundColor: '#fafafa',
      color: colorScheme.primaryText,
      transition: 'all 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box',
    },
    passwordToggle: {
      position: 'absolute',
      right: '16px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: colorScheme.secondaryText,
      padding: '5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'color 0.2s ease',
    },
    errorContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 16px',
      backgroundColor: 'rgba(231, 76, 60, 0.1)',
      border: `1px solid ${colorScheme.error}`,
      borderRadius: '10px',
      color: colorScheme.error,
      fontSize: '0.9rem',
      fontFamily: "'JetBrains Mono', monospace",
    },
    submitButton: {
      width: '100%',
      padding: '16px',
      fontSize: '1.1rem',
      fontWeight: '600',
      fontFamily: "'JetBrains Mono', monospace",
      color: 'white',
      backgroundColor: colorScheme.accent,
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(255, 154, 90, 0.3)',
      marginTop: '10px',
    },
    footer: {
      marginTop: '30px',
      textAlign: 'center',
      color: colorScheme.secondaryText,
      fontSize: '0.85rem',
      fontFamily: "'JetBrains Mono', monospace",
    },
  };

  // Add keyframe animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        <div style={styles.logoContainer}>
          <img 
            src="/BAClub-Logo.png" 
            alt="Liberty League Analytics" 
            style={styles.logo}
          />
          <h1 style={styles.title}>Liberty League Analytics</h1>
          <p style={styles.subtitle}>Sign in to access the platform</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <div style={styles.inputWrapper}>
              <User size={20} style={styles.inputIcon} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = colorScheme.accent;
                  e.target.style.backgroundColor = '#ffffff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colorScheme.cardBorder;
                  e.target.style.backgroundColor = '#fafafa';
                }}
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <Lock size={20} style={styles.inputIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={styles.input}
                onFocus={(e) => {
                  e.target.style.borderColor = colorScheme.accent;
                  e.target.style.backgroundColor = '#ffffff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colorScheme.cardBorder;
                  e.target.style.backgroundColor = '#fafafa';
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
                onMouseOver={(e) => e.currentTarget.style.color = colorScheme.accent}
                onMouseOut={(e) => e.currentTarget.style.color = colorScheme.secondaryText}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={styles.errorContainer}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            style={styles.submitButton}
            disabled={isLoading}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.currentTarget.style.backgroundColor = '#ffb078';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 154, 90, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = colorScheme.accent;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 154, 90, 0.3)';
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={styles.footer}>
          <p>🏀 Liberty League Analytics Platform</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
