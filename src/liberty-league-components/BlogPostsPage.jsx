import React, { useState } from 'react';
import { BookOpen, Calendar, User, ChevronRight, Clock, Tag } from 'lucide-react';

const BlogPostsPage = () => {
  const [hoveredPost, setHoveredPost] = useState(null);

  const colorScheme = {
    background: '#f8f8f8',
    cardBg: '#ffffff',
    cardBorder: '#fff1e6',
    primaryText: '#333333',
    secondaryText: '#5a5a5a',
    accentLight: '#fff1e6',
    accent: '#ff9a5a',
  };

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Breaking Down RIT's Pick and Roll Efficiency",
      excerpt: "An in-depth analysis of how RIT's pick and roll game has evolved this season, featuring advanced metrics and video breakdowns of key possessions.",
      author: "Analytics Team",
      date: "December 15, 2025",
      readTime: "8 min read",
      category: "Game Analysis",
      image: null, // Placeholder for future image
      featured: true,
    },
    {
      id: 2,
      title: "Liberty League Defensive Rankings: A Deep Dive",
      excerpt: "Which teams are the best at stopping opponents? We analyze defensive efficiency, shot contest rates, and transition defense across the conference.",
      author: "Analytics Team",
      date: "December 10, 2025",
      readTime: "12 min read",
      category: "Conference Analysis",
      image: null,
      featured: true,
    },
    {
      id: 3,
      title: "Player Spotlight: Emerging Scorers in the League",
      excerpt: "Highlighting the top scoring threats in the Liberty League and breaking down what makes them effective on offense.",
      author: "Analytics Team",
      date: "December 5, 2025",
      readTime: "6 min read",
      category: "Player Analysis",
      image: null,
      featured: false,
    },
    {
      id: 4,
      title: "Shot Chart Analysis: Finding Efficient Shots",
      excerpt: "Using shot location data to understand where teams are most and least efficient on the court.",
      author: "Analytics Team",
      date: "December 1, 2025",
      readTime: "10 min read",
      category: "Statistical Analysis",
      image: null,
      featured: false,
    },
    {
      id: 5,
      title: "Transition Offense: Speed Kills",
      excerpt: "Breaking down which teams excel in fast break situations and how they create easy scoring opportunities.",
      author: "Analytics Team",
      date: "November 25, 2025",
      readTime: "7 min read",
      category: "Game Analysis",
      image: null,
      featured: false,
    },
    {
      id: 6,
      title: "The Impact of Three-Point Shooting",
      excerpt: "How the three-point shot has changed Liberty League basketball and which teams are leveraging it most effectively.",
      author: "Analytics Team",
      date: "November 20, 2025",
      readTime: "9 min read",
      category: "Statistical Analysis",
      image: null,
      featured: false,
    },
  ];

  const categories = ["All", "Game Analysis", "Player Analysis", "Statistical Analysis", "Conference Analysis"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  const styles = {
    container: {
      minHeight: 'calc(100vh - 80px)',
      padding: '40px 20px',
      fontFamily: "'JetBrains Mono', monospace",
    },
    contentWrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      textAlign: 'center',
      marginBottom: '50px',
    },
    title: {
      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
      fontWeight: '700',
      color: colorScheme.primaryText,
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
    },
    subtitle: {
      fontSize: '1rem',
      color: colorScheme.secondaryText,
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6',
    },
    categoriesContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '10px',
      marginBottom: '40px',
    },
    categoryButton: {
      padding: '10px 20px',
      fontSize: '0.85rem',
      fontWeight: '600',
      fontFamily: "'JetBrains Mono', monospace",
      border: `2px solid ${colorScheme.cardBorder}`,
      borderRadius: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    featuredSection: {
      marginBottom: '50px',
    },
    sectionTitle: {
      fontSize: '1.3rem',
      fontWeight: '700',
      color: colorScheme.primaryText,
      marginBottom: '25px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    featuredGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '25px',
    },
    postsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '25px',
    },
    postCard: {
      backgroundColor: colorScheme.cardBg,
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 6px 20px rgba(255, 154, 90, 0.08)',
      border: `1px solid ${colorScheme.cardBorder}`,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    },
    postCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 30px rgba(255, 154, 90, 0.15)',
      borderColor: colorScheme.accent,
    },
    featuredCard: {
      borderWidth: '2px',
    },
    imageContainer: {
      width: '100%',
      height: '200px',
      backgroundColor: colorScheme.accentLight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imagePlaceholder: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      color: colorScheme.accent,
    },
    postContent: {
      padding: '25px',
    },
    categoryTag: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      padding: '5px 12px',
      backgroundColor: colorScheme.accentLight,
      color: colorScheme.accent,
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '600',
      marginBottom: '15px',
    },
    postTitle: {
      fontSize: '1.2rem',
      fontWeight: '700',
      color: colorScheme.primaryText,
      marginBottom: '12px',
      lineHeight: '1.4',
    },
    postExcerpt: {
      fontSize: '0.9rem',
      color: colorScheme.secondaryText,
      lineHeight: '1.6',
      marginBottom: '20px',
    },
    postMeta: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      fontSize: '0.8rem',
      color: colorScheme.secondaryText,
      marginBottom: '20px',
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    readButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 20px',
      backgroundColor: colorScheme.accentLight,
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '0.85rem',
      fontWeight: '600',
      color: colorScheme.accent,
      transition: 'all 0.3s ease',
      width: '100%',
      justifyContent: 'center',
    },
    noPostsMessage: {
      textAlign: 'center',
      padding: '60px 20px',
      color: colorScheme.secondaryText,
    },
  };

  const handlePostClick = (postId) => {
    // For now, just log - will navigate to individual post in future
    console.log(`Navigate to post ${postId}`);
    alert('Individual blog post pages coming soon!');
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            <BookOpen size={32} color={colorScheme.accent} />
            Blog Posts
          </h1>
          <p style={styles.subtitle}>
            In-depth analysis of games, player spotlights, and strategic breakdowns 
            written by our basketball analytics team.
          </p>
        </div>

        {/* Category Filters */}
        <div style={styles.categoriesContainer}>
          {categories.map((category) => (
            <button
              key={category}
              style={{
                ...styles.categoryButton,
                backgroundColor: selectedCategory === category ? colorScheme.accent : 'white',
                color: selectedCategory === category ? 'white' : colorScheme.primaryText,
                borderColor: selectedCategory === category ? colorScheme.accent : colorScheme.cardBorder,
              }}
              onClick={() => setSelectedCategory(category)}
              onMouseOver={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = colorScheme.accentLight;
                }
              }}
              onMouseOut={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Posts */}
        {selectedCategory === "All" && featuredPosts.length > 0 && (
          <div style={styles.featuredSection}>
            <h2 style={styles.sectionTitle}>
              ⭐ Featured Posts
            </h2>
            <div style={styles.featuredGrid}>
              {featuredPosts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    ...styles.postCard,
                    ...styles.featuredCard,
                    ...(hoveredPost === post.id ? styles.postCardHover : {}),
                  }}
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                  onClick={() => handlePostClick(post.id)}
                >
                  <div style={styles.imageContainer}>
                    <div style={styles.imagePlaceholder}>
                      <BookOpen size={40} />
                      <span style={{ fontSize: '0.8rem' }}>Featured Article</span>
                    </div>
                  </div>
                  
                  <div style={styles.postContent}>
                    <span style={styles.categoryTag}>
                      <Tag size={12} />
                      {post.category}
                    </span>
                    
                    <h3 style={styles.postTitle}>{post.title}</h3>
                    <p style={styles.postExcerpt}>{post.excerpt}</p>
                    
                    <div style={styles.postMeta}>
                      <span style={styles.metaItem}>
                        <User size={14} />
                        {post.author}
                      </span>
                      <span style={styles.metaItem}>
                        <Calendar size={14} />
                        {post.date}
                      </span>
                      <span style={styles.metaItem}>
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <button
                      style={styles.readButton}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = colorScheme.accent;
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = colorScheme.accentLight;
                        e.currentTarget.style.color = colorScheme.accent;
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePostClick(post.id);
                      }}
                    >
                      Read More
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 style={styles.sectionTitle}>
            {selectedCategory === "All" ? "📝 All Posts" : `📝 ${selectedCategory}`}
          </h2>
          
          {filteredPosts.length > 0 ? (
            <div style={styles.postsGrid}>
              {filteredPosts.filter(p => selectedCategory !== "All" || !p.featured).map((post) => (
                <div
                  key={post.id}
                  style={{
                    ...styles.postCard,
                    ...(hoveredPost === post.id ? styles.postCardHover : {}),
                  }}
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                  onClick={() => handlePostClick(post.id)}
                >
                  <div style={{...styles.imageContainer, height: '150px'}}>
                    <div style={styles.imagePlaceholder}>
                      <BookOpen size={30} />
                    </div>
                  </div>
                  
                  <div style={styles.postContent}>
                    <span style={styles.categoryTag}>
                      <Tag size={12} />
                      {post.category}
                    </span>
                    
                    <h3 style={{...styles.postTitle, fontSize: '1.1rem'}}>{post.title}</h3>
                    <p style={{...styles.postExcerpt, fontSize: '0.85rem'}}>
                      {post.excerpt.length > 120 ? post.excerpt.substring(0, 120) + '...' : post.excerpt}
                    </p>
                    
                    <div style={styles.postMeta}>
                      <span style={styles.metaItem}>
                        <Calendar size={14} />
                        {post.date}
                      </span>
                      <span style={styles.metaItem}>
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <button
                      style={styles.readButton}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = colorScheme.accent;
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = colorScheme.accentLight;
                        e.currentTarget.style.color = colorScheme.accent;
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePostClick(post.id);
                      }}
                    >
                      Read More
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.noPostsMessage}>
              <p style={{ fontSize: '1.1rem', marginBottom: '10px' }}>No posts found in this category.</p>
              <p style={{ fontSize: '0.9rem' }}>Check back soon for new content!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostsPage;
