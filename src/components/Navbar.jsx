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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'rgba(10, 2, 5, 0.88)' : 'rgba(10, 2, 5, 0.4)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(216, 30, 61, 0.25)' : '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.7)' : 'none',
        padding: scrolled ? '14px 28px' : '22px 36px'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}
      >
        {/* Brand identity */}
        <div
          onClick={() => onNavigate(0)}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            userSelect: 'none'
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #d81e3d 0%, #7e0c1f 100%)',
              border: '1px solid rgba(255, 77, 107, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(216, 30, 61, 0.4)'
            }}
          >
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1rem', color: '#ffffff' }}>
              KC
            </span>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.05rem', letterSpacing: '0.04em', color: '#ffffff' }}>
                KARAN CHOPRA
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  padding: '2px 7px',
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
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Creative Designer</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#22c55e' }}></span>
              <span style={{ color: '#22c55e', fontSize: '0.7rem' }}>Available</span>
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

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Sound Toggle */}
          <button
            onClick={onToggleAudio}
            style={{
              background: isAudioPlaying ? 'rgba(244, 225, 46, 0.12)' : 'rgba(255, 255, 255, 0.05)',
              border: isAudioPlaying ? '1px solid rgba(244, 225, 46, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
              color: isAudioPlaying ? '#f4e12e' : 'var(--text-muted)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            title={isAudioPlaying ? 'Mute ambient atmosphere' : 'Play ambient atmosphere'}
          >
            {isAudioPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            )}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={onToggleFullscreen}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-muted)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen Presentation'}
          >
            {isFullscreen ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 14 10 14 10 20"></polyline>
                <polyline points="20 10 14 10 14 4"></polyline>
                <line x1="14" y1="10" x2="21" y2="3"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            className="btn-primary"
            style={{
              padding: '9px 20px',
              fontSize: '0.82rem'
            }}
          >
            <span>Let's Talk</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
