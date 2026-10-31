import React, { useState, useEffect } from 'react';
import { portfolioSlides, designerInfo } from '../data/portfolioData';

export default function Navbar({ activeSlide, onNavigate, isAudioPlaying, onToggleAudio, isFullscreen, onToggleFullscreen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="main-navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled || mobileMenuOpen ? 'rgba(10, 2, 5, 0.94)' : 'rgba(10, 2, 5, 0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled || mobileMenuOpen ? '1px solid rgba(216, 30, 61, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: scrolled || mobileMenuOpen ? '0 10px 30px rgba(0, 0, 0, 0.7)' : 'none',
        padding: scrolled ? '12px 24px' : '18px 32px'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        {/* Brand identity */}
        <div
          onClick={() => {
            onNavigate(0);
            setMobileMenuOpen(false);
          }}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            userSelect: 'none',
            flexShrink: 0
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '9px',
              background: 'linear-gradient(135deg, #d81e3d 0%, #7e0c1f 100%)',
              border: '1px solid rgba(255, 77, 107, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(216, 30, 61, 0.4)',
              flexShrink: 0
            }}
          >
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '0.95rem', color: '#ffffff' }}>
              KC
            </span>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: '700',
                  fontSize: 'clamp(0.9rem, 2.8vw, 1.05rem)',
                  letterSpacing: '0.03em',
                  color: '#ffffff',
                  whiteSpace: 'nowrap'
                }}
              >
                KARAN CHOPRA
              </span>
              <span
                className="hide-mobile-extra"
                style={{
                  fontSize: '0.62rem',
                  padding: '1px 6px',
                  borderRadius: '20px',
                  background: 'rgba(244, 225, 46, 0.15)',
                  color: '#f4e12e',
                  border: '1px solid rgba(244, 225, 46, 0.3)',
                  fontWeight: '600',
                  letterSpacing: '0.04em'
                }}
              >
                PRO
              </span>
            </div>
            <div
              className="hide-mobile-extra"
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.02em',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span>Creative Designer</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#22c55e' }}></span>
              <span style={{ color: '#22c55e', fontSize: '0.68rem' }}>Available</span>
            </div>
          </div>
        </div>

        {/* Desktop Slide Quick Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '4px 6px',
            borderRadius: '999px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            maxWidth: 'calc(100vw - 420px)',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            whiteSpace: 'nowrap'
          }}
          className="desktop-nav"
        >
          <button
            onClick={() => onNavigate(0)}
            style={{
              background: activeSlide === 0 ? 'linear-gradient(135deg, #f4e12e 0%, #d81e3d 100%)' : 'transparent',
              color: activeSlide === 0 ? '#000000' : 'var(--text-muted)',
              border: activeSlide === 0 ? '1px solid rgba(244, 225, 46, 0.5)' : '1px solid transparent',
              padding: '5px 12px',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: activeSlide === 0 ? '700' : '500',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.25s ease',
              boxShadow: activeSlide === 0 ? '0 4px 14px rgba(244, 225, 46, 0.4)' : 'none'
            }}
            title="360° Camera Orbit Experience"
          >
            360° Orbit
          </button>
          {portfolioSlides.map((slide) => {
            const isActive = activeSlide === slide.id;
            return (
              <button
                key={slide.id}
                onClick={() => onNavigate(slide.id)}
                style={{
                  background: isActive ? 'linear-gradient(135deg, #d81e3d 0%, #990f25 100%)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  border: isActive ? '1px solid rgba(255, 77, 107, 0.4)' : '1px solid transparent',
                  padding: '5px 11px',
                  borderRadius: '999px',
                  fontSize: '0.76rem',
                  fontWeight: isActive ? '600' : '500',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 4px 14px rgba(216, 30, 61, 0.4)' : 'none'
                }}
                title={slide.title}
              >
                <span style={{ opacity: isActive ? 1 : 0.6, marginRight: '4px', fontSize: '0.7rem' }}>
                  {slide.slideNumber}
                </span>
                {slide.navLabel || slide.title}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Mobile Menu Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Mobile Slide Drawer Toggle Button (Visible on <= 900px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              background: mobileMenuOpen ? 'rgba(216, 30, 61, 0.3)' : 'rgba(255, 255, 255, 0.06)',
              border: mobileMenuOpen ? '1px solid rgba(255, 43, 80, 0.6)' : '1px solid rgba(255, 255, 255, 0.12)',
              color: mobileMenuOpen ? '#ff2b50' : '#ffffff',
              padding: '6px 12px',
              borderRadius: '999px',
              display: 'none',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.76rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            title="Toggle Slide Menu"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
            <span>Slides ({portfolioSlides.length})</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleAudio}
            style={{
              background: isAudioPlaying ? 'rgba(244, 225, 46, 0.12)' : 'rgba(255, 255, 255, 0.05)',
              border: isAudioPlaying ? '1px solid rgba(244, 225, 46, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
              color: isAudioPlaying ? '#f4e12e' : 'var(--text-muted)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              flexShrink: 0
            }}
            title={isAudioPlaying ? 'Mute ambient atmosphere' : 'Play ambient atmosphere'}
          >
            {isAudioPlaying ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            )}
          </button>

          {/* Fullscreen Toggle (Hidden on small mobile where native fullscreen is disabled) */}
          <button
            onClick={onToggleFullscreen}
            className="hide-mobile-extra"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-muted)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              flexShrink: 0
            }}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen Presentation'}
          >
            {isFullscreen ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 14 10 14 10 20"></polyline>
                <polyline points="20 10 14 10 14 4"></polyline>
                <line x1="14" y1="10" x2="21" y2="3"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            )}
          </button>

          {/* Direct CTA */}
          <a
            href={`mailto:${designerInfo.email}?subject=Creative%20Design%20Inquiry%20from%20Portfolio`}
            className="btn-primary nav-cta-btn"
            style={{
              padding: '8px 16px',
              fontSize: '0.8rem',
              flexShrink: 0
            }}
          >
            <span className="cta-label">Let's Talk</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>

      {/* Mobile Slide Drawer (Smooth Dropdown on Touch Devices) */}
      {mobileMenuOpen && (
        <div
          className="mobile-slide-drawer"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            maxHeight: 'calc(80vh - 60px)',
            overflowY: 'auto',
            background: 'rgba(12, 3, 6, 0.98)',
            borderBottom: '1px solid rgba(216, 30, 61, 0.4)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.9)',
            padding: '16px 20px 24px 20px',
            animation: 'slideDownDrawer 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.72rem', color: '#f4e12e', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Quick Slide Navigator
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              ✕ Close
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '8px' }}>
            <button
              onClick={() => {
                onNavigate(0);
                setMobileMenuOpen(false);
              }}
              style={{
                background: activeSlide === 0 ? 'linear-gradient(135deg, #f4e12e 0%, #d81e3d 100%)' : 'rgba(255, 255, 255, 0.05)',
                color: activeSlide === 0 ? '#000000' : '#ffffff',
                border: activeSlide === 0 ? '1px solid rgba(244, 225, 46, 0.6)' : '1px solid rgba(255, 255, 255, 0.08)',
                padding: '9px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: activeSlide === 0 ? '700' : '500',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>🎥</span>
              <span>360° Orbit</span>
            </button>

            {portfolioSlides.map((slide) => {
              const isActive = activeSlide === slide.id;
              return (
                <button
                  key={slide.id}
                  onClick={() => {
                    onNavigate(slide.id);
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    background: isActive ? 'linear-gradient(135deg, #d81e3d 0%, #870b1e 100%)' : 'rgba(255, 255, 255, 0.04)',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    border: isActive ? '1px solid rgba(255, 77, 107, 0.5)' : '1px solid rgba(255, 255, 255, 0.06)',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    fontSize: '0.76rem',
                    fontWeight: isActive ? '700' : '500',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ color: isActive ? '#f4e12e' : '#ff4d6b', fontWeight: '700', fontSize: '0.7rem' }}>
                    {slide.slideNumber}
                  </span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {slide.navLabel || slide.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDownDrawer {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: inline-flex !important;
          }
        }

        @media (max-width: 640px) {
          .main-navbar {
            padding: 10px 16px !important;
          }
        }

        @media (max-width: 480px) {
          .hide-mobile-extra {
            display: none !important;
          }
          .cta-label {
            display: none !important;
          }
          .nav-cta-btn {
            padding: 8px 11px !important;
          }
        }
      `}</style>
    </header>
  );
}
