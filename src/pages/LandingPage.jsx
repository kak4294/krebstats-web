import React, { useState, useEffect } from 'react';
import { Linkedin, Github, Mail } from "lucide-react";
import AboutContent from '../components/AboutContent';
import BAClubSection from '../components/BAClubSection';
import PersonalProjects from '../components/PersonalProjects';

function LandingPage() {
  const [typewriterText, setTypewriterText] = useState('');
  const [showEducation, setShowEducation] = useState(false);
  
  const fullName = 'Kyle Krebs';
  const educationText = 'Computer Science + Applied Statistics @ Rochester Institute of Technology 26\'';
  
  // Updated color scheme to match your app
  const colorScheme = {
    background: '#f8f8f8',
    cardBg: '#ffffff',
    cardBorder: '#fff1e6',
    primaryText: '#333333',
    secondaryText: '#5a5a5a',
    accentLight: '#fff1e6',
    accent: '#ff9a5a'
  };

  // Education phases in first, then typewriter starts
  useEffect(() => {
    // Start education fade-in immediately
    setTimeout(() => {
      setShowEducation(true);
    }, 300);
    
    // Start typewriter after education has phased in
    setTimeout(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= fullName.length) {
          setTypewriterText(fullName.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 150);
    }, 1200); // Wait for education to fully fade in before starting typewriter
  }, []);

  const styles = {
    container: {
      backgroundColor: '#ffffff',
      backgroundImage: 'radial-gradient(circle, #e0e0e0 1px, transparent 1px)',
      backgroundSize: '20px 20px',
      fontFamily: "'JetBrains Mono', monospace",
    },
    heroSection: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    },
    heroContent: {
      textAlign: 'center',
      maxWidth: '1000px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    nameContainer: {
      marginBottom: '5px',
      minHeight: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    name: {
      fontSize: 'clamp(2rem, 6vw, 3.5rem)',
      fontWeight: '600',
      color: colorScheme.primaryText,
      fontFamily: "'JetBrains Mono', monospace",
      position: 'relative',
    },
    cursor: {
      display: 'inline-block',
      color: colorScheme.primaryText,
      marginLeft: '2px',
      animation: 'blink 1s infinite',
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: '600',
    },
    educationContainer: {
      marginBottom: '10px',
    },
    education: {
      fontSize: 'clamp(0.2rem, 3vw, 1.5rem)',
      color: colorScheme.secondaryText,
      fontWeight: '400',
      fontFamily: "'JetBrains Mono', monospace",
      opacity: showEducation ? 1 : 0,
      transition: 'opacity 0.5s ease-out',
      marginBottom: '0px',
      whiteSpace: 'nowrap',
    },
    flagsContainer: {
      marginBottom: '10px',
      minHeight: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '30px',
    },
    emoji: {
      fontSize: 'clamp(1.5rem, 1.75vw, 2.5rem)',
    },
    socialContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      marginBottom: '20px',
      opacity: showEducation ? 1 : 0,
      transition: 'opacity 0.5s ease-out 0.3s',
    },
    socialIcon: {
      color: colorScheme.accent,
      textDecoration: 'none',
      transition: 'all 0.3s ease',
      padding: '12px',
      borderRadius: '50%',
      backgroundColor: 'transparent',
      border: `2px solid transparent`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    resumeContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
      opacity: showEducation ? 1 : 0,
      transition: 'opacity 0.5s ease-out 0.5s',
    },
    resumeButton: {
      backgroundColor: 'rgba(255, 154, 90, 0.2)',
      border: `2px solid ${colorScheme.accent}`,
      borderRadius: '50px',
      padding: '15px 30px',
      fontSize: '1.1rem',
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: '600',
      color: colorScheme.accent,
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    arrow: {
      fontSize: '1.2rem',
      transform: 'rotate(45deg)',
      transition: 'transform 0.3s ease',
    },
    aboutSection: {
      backgroundColor: 'transparent',
      padding: '80px 20px',
      minHeight: '100vh',
    },
    contentContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2.5rem',
      margin: '0 auto',
      padding: '0',
      width: '85%',
      maxWidth: '2000px',
    },
    column: {
      backgroundColor: colorScheme.cardBg,
      borderRadius: '18px',
      padding: '40px',
      boxShadow: '0 10px 25px rgba(255, 154, 90, 0.08)',
      border: `2px solid ${colorScheme.accent}`,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    separator: {
      width: '100%',
      height: '2px',
      background: `linear-gradient(to right, transparent, ${colorScheme.accent}, transparent)`,
      margin: '2rem 0',
      opacity: 0.5,
    },
  };

  // Add keyframe animation for cursor blink
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.nameContainer}>
            <h1 style={styles.name}>
              {typewriterText}
              <span style={styles.cursor}>_</span>
            </h1>
          </div>
          
          {/* Flags and Basketball */}
          <div style={styles.flagsContainer}>
            <span style={styles.emoji}>🇺🇸</span>
            <span style={styles.emoji}>🏀</span>
            <span style={styles.emoji}>🇮🇪</span>
          </div>
          
          <div style={styles.educationContainer}>
            <p style={styles.education}>
              {educationText}
            </p>
          </div>
          
          {/* Social Icons */}
          <div style={styles.socialContainer}>
            <a 
              href="https://www.linkedin.com/in/kyle-krebs-48a62929a/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.socialIcon}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 154, 90, 0.1)';
                e.currentTarget.style.borderColor = colorScheme.accent;
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="https://github.com/kak4294" 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.socialIcon}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 154, 90, 0.1)';
                e.currentTarget.style.borderColor = colorScheme.accent;
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Github size={24} />
            </a>
            <a 
              href="mailto:kak4294@rit.edu" 
              style={styles.socialIcon}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 154, 90, 0.1)';
                e.currentTarget.style.borderColor = colorScheme.accent;
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Mail size={24} />
            </a>
          </div>
          
          {/* Resume Button */}
          <div style={styles.resumeContainer}>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.resumeButton}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = colorScheme.accent;
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.querySelector('.arrow').style.transform = 'rotate(45deg) translate(2px, -2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 154, 90, 0.2)';
                e.currentTarget.style.color = colorScheme.accent;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.querySelector('.arrow').style.transform = 'rotate(45deg)';
              }}
            >
              Resume
              <span className="arrow" style={styles.arrow}>↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* FIXED: About Section - Removed duplicate ID, properly structured */}
      <section style={styles.aboutSection}>
        <div style={styles.contentContainer}>
          {/* About Content Card - FIXED: Added proper ID here */}
          <div 
            style={styles.column}
            id="about-section"
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(255, 154, 90, 0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 154, 90, 0.08)';
            }}
          >
            <AboutContent />
          </div>
          
          {/* Separator */}
          <div style={styles.separator}></div>
          
          {/* FIXED: Basketball Analytics Club Section - Moved ID to proper container */}
          <div 
            style={styles.column} 
            id="baclub-section"
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(255, 154, 90, 0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 154, 90, 0.08)';
            }}
          >
            <BAClubSection />
          </div>

          {/* Separator */}
          <div style={styles.separator}></div>

          {/* FIXED: Projects Section - Added proper container with styling */}
          <div 
            style={styles.column} 
            id="projects-section"
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(255, 154, 90, 0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(255, 154, 90, 0.08)';
            }}
          >
            <PersonalProjects />
          </div>

          {/* Separator */}
          <div style={styles.separator}></div>

          {/* Resume Section */}
          <div style={styles.column} id="resume-section">
            <h2 style={{fontSize: '2rem', fontWeight: '700', color: colorScheme.primaryText, marginBottom: '20px', fontFamily: "'JetBrains Mono', monospace"}}>Resume</h2>
            <p style={{fontSize: '1.1rem', lineHeight: '1.6', color: colorScheme.secondaryText, marginBottom: '20px'}}>
              Download my resume to learn more about my experience in data analysis, basketball analytics, and software development.
            </p>
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: colorScheme.accent,
                color: 'white',
                padding: '15px 30px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.1rem',
                fontFamily: "'JetBrains Mono', monospace",
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#ffb78a';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = colorScheme.accent;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              📄 Download Resume
            </a>
          </div>

          {/* Separator */}
          <div style={styles.separator}></div>

          {/* Contact Section */}
          <div style={styles.column} id="contact-section">
            <h2 style={{fontSize: '2rem', fontWeight: '700', color: colorScheme.primaryText, marginBottom: '20px', fontFamily: "'JetBrains Mono', monospace"}}>Contact</h2>
            <p style={{fontSize: '1.1rem', lineHeight: '1.6', color: colorScheme.secondaryText, marginBottom: '30px'}}>
              Feel free to reach out for collaboration opportunities, questions about my work, or just to connect!
            </p>
            <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center'}}>
              <a 
                href="mailto:kak4294@rit.edu"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'rgba(255, 154, 90, 0.1)',
                  border: `2px solid ${colorScheme.accent}`,
                  padding: '15px 25px',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  color: colorScheme.accent,
                  fontWeight: '600',
                  fontSize: '1rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = colorScheme.accent;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 154, 90, 0.1)';
                  e.currentTarget.style.color = colorScheme.accent;
                }}
              >
                <Mail size={20} />
                Email Me
              </a>
              <a 
                href="https://www.linkedin.com/in/kyle-krebs-48a62929a/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: 'rgba(255, 154, 90, 0.1)',
                  border: `2px solid ${colorScheme.accent}`,
                  padding: '15px 25px',
                  borderRadius: '25px',
                  textDecoration: 'none',
                  color: colorScheme.accent,
                  fontWeight: '600',
                  fontSize: '1rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = colorScheme.accent;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 154, 90, 0.1)';
                  e.currentTarget.style.color = colorScheme.accent;
                }}
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;