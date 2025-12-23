# KrebStats Web Development Guide

## Overview
This README provides step-by-step instructions for making updates to your personal website and integrating external projects like the Peach Basket Platform.

## Project Structure
```
krebstats-web/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Basic UI components (buttons, cards, etc.)
│   │   ├── WebHeader.jsx    # Main navigation header
│   │   └── ...              # Other components
│   ├── pages/               # Full page components
│   │   ├── LandingPage.jsx  # Home page
│   │   └── ...              # Other pages
│   ├── rit-basketball-components/  # RIT Basketball specific components
│   └── App.jsx              # Main app component with routing
├── public/                  # Static assets
├── pdfs/                   # PDF documents
└── imgs/                   # Image assets
```

## How to Add the Peach Basket Platform Login Button

### Step 1: Add Dependencies
The Peach Basket Platform uses additional dependencies that your current site doesn't have. Add these to your `package.json`:

```bash
npm install react-router-dom@^7.1.1
# Note: You already have lucide-react and react-router-dom, but may need to update versions
```

### Step 2: Create Authentication Context
1. Create a new folder: `src/context/`
2. Copy the `AuthContext.jsx` from peach-basket-platform to handle login state
3. This manages user authentication across the integrated platform

### Step 3: Add Peach Basket Components
1. Create folder: `src/peach-basket-components/`
2. Copy these key components from peach-basket-platform:
   - `LoginPage.jsx`
   - `DashboardPage.jsx` 
   - `ScoutingReportsPage.jsx`
   - `GameScoutingPage.jsx`
   - `ReportsSection.jsx`
   - `ReportViewer.jsx`

### Step 4: Add Data Files
1. Create folder: `src/data/`
2. Copy these data files:
   - `mensSchedule.js`
   - `womensSchedule.js`
   - `reportMappings.js`

### Step 5: Add PDF Reports
1. Copy the entire `data/` folder from peach-basket-platform to `public/data/`
2. This includes all player and team reports

### Step 6: Update WebHeader Component
Add a new navigation button to `src/components/WebHeader.jsx`:

```jsx
// In the navigation array, add:
['About', 'Basketball Analytics Club', 'Projects', 'Peach Basket Platform', 'Resume', 'Contact']

// In handleNavClick function, add:
if (section === 'peach basket platform') {
  navigate('/peach-basket-login');
  return;
}
```

### Step 7: Update App.jsx Routing
Add new routes to `src/App.jsx`:

```jsx
import { AuthProvider } from './context/AuthContext';
import LoginPage from './peach-basket-components/LoginPage';
import DashboardPage from './peach-basket-components/DashboardPage';
// ... other imports

// Wrap your app in AuthProvider:
function App() {
  return (
    <AuthProvider>
      <div style={rootStyle}>
        <WebHeader />
        <div style={styles.mainContent}>
          <Routes>
            {/* Existing routes */}
            <Route path="/" element={<LandingPage />} />
            
            {/* New Peach Basket Platform routes */}
            <Route path="/peach-basket-login" element={<LoginPage />} />
            <Route path="/peach-basket-dashboard" element={<DashboardPage />} />
            <Route path="/scouting-reports" element={<ScoutingReportsPage />} />
            <Route path="/scouting-reports/:team/:gameId" element={<GameScoutingPage />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}
```

### Step 8: Style Integration
The Peach Basket Platform uses similar color schemes, so minimal style conflicts should occur. Both use:
- Orange accent color (`#ff9a5a`)
- JetBrains Mono font
- Similar card-based layouts

## General Website Update Process

### Adding New Pages
1. **Create the page component** in `src/pages/`
2. **Add route** in `src/App.jsx`
3. **Add navigation** in `src/components/WebHeader.jsx` (if needed)
4. **Test routing** and navigation

### Adding New Components
1. **Create component** in appropriate folder (`src/components/` or `src/rit-basketball-components/`)
2. **Import and use** in parent components
3. **Ensure consistent styling** with existing color scheme

### Adding New Static Assets
1. **Images**: Place in `src/imgs/` or `public/imgs/`
2. **PDFs**: Place in `public/pdfs/`
3. **Other files**: Place in `public/` folder

### Updating Styles
1. **Global styles**: Modify `src/App.css` or `src/index.css`
2. **Component styles**: Use inline styles (current pattern) or CSS modules
3. **Color scheme**: Update the `colorScheme` object in `src/App.jsx`

### Development Workflow
1. **Start development server**: `npm run dev`
2. **Make changes** to components/pages
3. **Test in browser** at `http://localhost:5173`
4. **Build for production**: `npm run build`
5. **Deploy**: `npm run deploy` (uses gh-pages)

## File Organization Best Practices

### Component Structure
```jsx
// Standard component template
import React from 'react';
import { /* required imports */ } from 'lucide-react';

const ComponentName = ({ props }) => {
  const colorScheme = {
    // Use consistent color scheme
    accent: '#ff9a5a',
    // ... other colors
  };

  const styles = {
    // Define styles object
  };

  return (
    <div style={styles.container}>
      {/* Component JSX */}
    </div>
  );
};

export default ComponentName;
```

### Naming Conventions
- **Components**: PascalCase (`WebHeader.jsx`)
- **Pages**: PascalCase with "Page" suffix (`LandingPage.jsx`)
- **Folders**: kebab-case (`rit-basketball-components`)
- **Files**: camelCase for data files (`mensSchedule.js`)

## Testing Integration

### Before Deploying
1. **Test all navigation** links work correctly
2. **Verify responsive design** on different screen sizes
3. **Check PDF loading** in the reports section
4. **Test authentication flow** if integrating login
5. **Validate all routes** return correct components

### Common Issues & Solutions
1. **Route conflicts**: Ensure unique paths for all routes
2. **Style conflicts**: Use consistent color schemes and CSS specificity
3. **Import errors**: Check file paths and component exports
4. **PDF loading**: Ensure PDFs are in `public/` folder, not `src/`

## Deployment Process
1. **Test locally**: `npm run dev`
2. **Build**: `npm run build`
3. **Preview build**: `npm run preview`
4. **Deploy to GitHub Pages**: `npm run deploy`

## Environment Setup
- **Node.js**: Version 18 or higher
- **Package Manager**: npm (included with Node.js)
- **Browser**: Modern browser with ES6+ support
- **Editor**: VS Code recommended with React extensions

## Maintenance
- **Regular updates**: Keep dependencies updated with `npm update`
- **Security**: Run `npm audit` periodically
- **Performance**: Monitor bundle size with build output
- **Backup**: Keep regular backups of your project

---

## Quick Reference Commands
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run deploy       # Deploy to GitHub Pages

# Package Management
npm install          # Install dependencies
npm update           # Update dependencies
npm audit            # Check for security issues

# Git Workflow
git add .            # Stage changes
git commit -m "msg"  # Commit changes
git push origin main # Push to repository
```

This guide should help you maintain and extend your website efficiently while integrating external projects like the Peach Basket Platform.
