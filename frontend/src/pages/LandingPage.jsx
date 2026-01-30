import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax effects
  const heroTranslateY = scrollY * 0.5;
  const problemCardsScale = 1 - Math.min(scrollY * 0.001, 0.1);
  const featuresOpacity = 1 - Math.min((scrollY - 800) * 0.002, 1);

  const styles = {
    // Global styles


    // Hero Section
    hero: {
      position: 'relative',
      height: '100vh',
      minHeight: '800px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    heroVideo: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: 'translate(-50%, -50%)',
      opacity: videoLoaded ? 0.4 : 0,
      transition: 'opacity 1s ease',
      filter: 'brightness(0.3) contrast(1.2)',
    },
    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(180deg, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.4) 100%)',
    },
    heroContent: {
      position: 'relative',
      zIndex: 2,
      textAlign: 'center',
      padding: '0 0px',
      maxWidth: '1400px',
      margin: '0',
      transform: `translateY(${heroTranslateY}px)`,
      transition: 'transform 0.1s ease-out',
    },
    logo: {
      position: 'absolute',
      top: '40px',
      left: '40px',
      fontSize: '32px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #fca90e 0%, #e7d507 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '-1px',
      zIndex: 10,
    },
    headline: {
      fontSize: 'clamp(42px, 2vw, 90px)',
      fontWeight: '800',
      lineHeight: 1.1,
      marginBottom: '28px',
      background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 50%, #38bdf8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'fadeIn 1s ease-out',
      letterSpacing: '-2px',
      marginTop: '-200px',
    },
    subtext: {
      fontSize: 'clamp(18px, 2vw, 24px)',
      fontWeight: '400',
      color: '#d1d5db',
      maxWidth: '800px',
      margin: '0 auto 48px',
      lineHeight: 1.6,
      animation: 'fadeIn 1s ease-out 0.3s both',
    },
    ctaContainer: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      animation: 'fadeIn 1s ease-out 0.6s both',
      marginTop: '20px',
    },
    primaryButton: {
      padding: '0px 58px',
      fontSize: '16px',
      fontWeight: '400',
      background: 'linear-gradient(135deg, #fca90e 0%, #e7d507 100%)',
      border: 'none',
      borderRadius: '36px',
      color: '#150c0c',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2)',
      position: 'relative',
      overflow: 'hidden',
    },
    secondaryButton: {
      padding: '20px 48px',
      fontSize: '16px',
      fontWeight: '400',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '36px',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    floatingElements: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      pointerEvents: 'none',
    },
    /* floatingElement removed from here and moved to a standalone function */

    // Problem Section
    problemSection: {
      padding: '120px 20px',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #111827 100%)',
      position: 'relative',
    },
    sectionTitle: {
      fontSize: 'clamp(36px, 4vw, 40px)',
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: '80px',
      background: 'linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    problemCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '40px',
      maxWidth: '1200px',
      margin: '0 auto',
      transform: `scale(${problemCardsScale})`,
    },
    problemCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      padding: '40px',
      transition: 'all 0.4s ease',
      position: 'relative',
      overflow: 'hidden',
    },
    problemNumber: {
      fontSize: '124px',
      fontWeight: '800',
      color: 'rgba(255, 255, 255, 0.1)',
      position: 'absolute',
      top: '0px',
      right: '20px',
    },
    problemTitle: {
      fontSize: '24px',
      fontWeight: '700',
      marginBottom: '16px',
      color: '#ffffff',
      marginTop: '70px',
    },
    problemText: {
      fontSize: '16px',
      color: '#d1d5db',
      lineHeight: 1.6,
    },


    // Features Section
    featuresSection: {
      padding: '120px 20px',
      background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
      opacity: featuresOpacity,
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    featureCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '40px 30px',
      textAlign: 'center',
      transition: 'all 0.3s ease',
    },
    featureIcon: {
      fontSize: '48px',
      marginBottom: '24px',
    },
    featureTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '12px',
      color: '#ffffff',
    },
    featureDesc: {
      fontSize: '14px',
      color: '#94a3b8',
      lineHeight: 1.6,
    },

    // Trust Section
    trustSection: {
      padding: '120px 20px',
      background: 'linear-gradient(180deg, #0f172a 0%, #0a0a0a 100%)',
    },
    trustGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    trustCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '40px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '20px',
    },
    trustIcon: {
      fontSize: '32px',
      flexShrink: 0,
    },

    // Footer
    footer: {
      padding: '60px 20px',
      background: '#0a0a0a',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    },
    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '40px',
    },
    footerLinks: {
      display: 'flex',
      gap: '24px',
      flexWrap: 'wrap',
    },
    footerLink: {
      color: '#94a3b8',
      fontSize: '14px',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
    },
    copyright: {
      color: '#64748b',
      fontSize: '14px',
    },


  };

  const handlePrimaryClick = () => {
    navigate('/login');
  };

  const handleSecondaryClick = () => {
    navigate('/login?guest=true');
  };

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      minHeight: '100vh',
      overflowX: 'hidden'
    }}>
      {/* Hero Section */}
      <section style={styles.hero}>
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={styles.heroVideo}
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div style={styles.heroOverlay} />

        {/* Floating Elements */}
        <div style={styles.floatingElements}>
          <div style={getFloatingElementStyle(20, 10, 200, 0)} />
          <div style={getFloatingElementStyle(70, 80, 150, 2)} />
          <div style={getFloatingElementStyle(30, 85, 100, 4)} />
          <div style={getFloatingElementStyle(80, 20, 180, 1)} />
        </div>

        {/* Logo */}
        <div style={styles.logo}>NutriFit</div>

        {/* Hero Content */}
        <div style={styles.heroContent}>
          <h1 style={styles.headline}>
            Understand what food does to you,<br />before it happens.
          </h1>

          <div style={styles.ctaContainer}>
            <button
              style={styles.primaryButton}
              onClick={handlePrimaryClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.4)';
              }}
            >
              Start Now
            </button>
            <button
              style={styles.secondaryButton}
              onClick={handleSecondaryClick}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Try it Out
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#94a3b8',
          fontSize: '14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          animation: 'pulse 1s infinite',
        }}>
          <span>Scroll more</span>
          <div style={{
            width: '24px',
            height: '40px',
            border: '2px solid #94a3b8',
            borderRadius: '12px',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '8px',
              background: '#94a3b8',
              borderRadius: '2px',
              animation: 'scrollDown 1s infinite',
            }} />
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section style={styles.problemSection}>
        <h2 style={styles.sectionTitle}>Why Most Nutrition Apps Fail</h2>
        <div style={styles.problemCards}>
          {[
            {
              number: '01',
              title: 'They track numbers, not outcomes',
              text: 'Endless calorie counting without showing how food actually affects your body\'s energy, mood, and performance.',
            },
            {
              number: '02',
              title: 'They show the past, not the future',
              text: 'Traditional tracking only tells you what you ate yesterday, not what it will do to you tomorrow.',
            },
            {
              number: '03',
              title: 'They create guilt instead of insight',
              text: 'Red numbers and warnings promote shame and anxiety rather than genuine understanding and growth.',
            },
          ].map((problem, index) => (
            <div
              key={index}
              style={styles.problemCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div style={styles.problemNumber}>{problem.number}</div>
              <h3 style={styles.problemTitle}>{problem.title}</h3>
              <p style={styles.problemText}>{problem.text}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Final CTA */}
      <section style={{
        padding: '120px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: 'clamp(36px, 4vw, 60px)',
          fontWeight: '800',
          marginBottom: '24px',
          color: '#ffffff',
        }}>
          Ready to experience food differently?
        </h2>
        <p style={{
          fontSize: '20px',
          color: 'rgba(255, 255, 255, 0.9)',
          maxWidth: '600px',
          margin: '0 auto 48px',
          lineHeight: 1.6,
        }}>
          Join thousands who've transformed their relationship with food.
        </p>
        <button
          style={{
            ...styles.primaryButton,
            background: '#ffffff',
            color: '#667eea',
            fontSize: '20px',
            padding: '24px 60px',
          }}
          onClick={handlePrimaryClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
          }}
        >
          Start Now
        </button>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              NutriFit
            </div>

          </div>
          <div style={styles.footerLinks}>
            <a href="#" style={styles.footerLink}>Privacy</a>
            <a href="#" style={styles.footerLink}>About</a>
            <a href="#" style={styles.footerLink}>Contact</a>
            <a href="#" style={styles.footerLink}>Research</a>
          </div>

        </div>
      </footer>

      {/* Add CSS animations */}
      <style>{`
        @keyframes scrollDown {
          0% {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateX(-50%) translateY(12px);
            opacity: 0;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseRing {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 0.7;
  }
}
      `}</style>
    </div>
  );
};

const getFloatingElementStyle = (top, left, size, delay) => ({
  position: 'absolute',
  top: `${top}%`,
  left: `${left}%`,
  width: `${size}px`,
  height: `${size}px`,
  background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0) 70%)',
  borderRadius: '50%',
  animation: `float 6s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  filter: 'blur(20px)',
});

export default LandingPage;