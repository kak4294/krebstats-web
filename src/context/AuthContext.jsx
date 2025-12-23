import React, { createContext, useContext, useState, useEffect } from 'react';

// Hardcoded users - these can be modified as needed
const USERS = [
  { username: 'coach', password: 'rittigers2025', role: 'coach', name: 'Coach Account' },
  { username: 'player', password: 'tigerball25', role: 'player', name: 'Player Account' },
  { username: 'admin', password: 'analytics123', role: 'admin', name: 'Admin Account' },
  { username: 'staff', password: 'ritstaff25', role: 'staff', name: 'Staff Account' },
];

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('liberty_league_analytics_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('liberty_league_analytics_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (username, password) => {
    const foundUser = USERS.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );
    
    if (foundUser) {
      const userData = {
        username: foundUser.username,
        role: foundUser.role,
        name: foundUser.name,
      };
      setUser(userData);
      localStorage.setItem('liberty_league_analytics_user', JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: 'Invalid username or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('liberty_league_analytics_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
