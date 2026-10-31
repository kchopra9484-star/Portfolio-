import React, { useRef, useState } from 'react';
import { portfolioSlides } from '../data/portfolioData';

export default function SlideCard({ slide, index, onInspect, onNavigate, onCopyContact }) {
  const cardRef = useRef(null);
  const imageFrameRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [imageSrc, setImageSrc] = useState(slide.image);

  // If PNG fails or is slow, try alternate path
  const handleImageError = () => {
    if (!imgError) {
      setImgError(true);
      setImageSrc(`/JJ/${slide.id}.png`);
    }
  };

  return (
    <section
      id={`slide-${slide.id}`}
      ref={cardRef}
      className="portfolio-slide-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '110px 24px 80px 24px',
        position: 'relative',
        zIndex: 2
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {/* Slide Meta Bar */}
        <div
          className="slide-header-meta"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '0 8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: '700',
                color: '#f4e12e',
                background: 'rgba(244, 225, 46, 0.1)',
                border: '1px solid rgba(244, 225, 46, 0.25)',
                padding: '4px 12px',
                borderRadius: '999px',
                letterSpacing: '0.08em'
              }}
            >
              {slide.slideNumber} / {String(portfolioSlides.length).padStart(2, '0')}
            </span>
            <span
              style={{
                fontSize: '0.82rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                fontWeight: '600'
              }}
            >
              {slide.category}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => onInspect(slide.id)}
              className="btn-secondary"
              style={{
                padding: '6px 14px',
                fontSize: '0.78rem',
                gap: '6px'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
              <span>Inspect High-Res</span>
            </button>
          </div>
        </div>

        {/* 16:9 Image Presentation Frame */}
        <div
          ref={imageFrameRef}
          className="slide-image-frame"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => onInspect(slide.id)}
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: '20px',
            overflow: 'hidden',
            background: '#090305',
            border: isHovered ? '1px solid rgba(255, 43, 80, 0.5)' : '1px solid rgba(216, 30, 61, 0.25)',
            boxShadow: isHovered
              ? `0 35px 90px -15px rgba(0, 0, 0, 0.98), 0 0 65px ${slide.glowColor}`
              : `0 25px 70px -20px rgba(0, 0, 0, 0.92), 0 0 40px rgba(180, 20, 45, 0.2)`,
            cursor: 'zoom-in',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: isHovered ? 'scale(1.008)' : 'scale(1)'
          }}
        >
          {/* Exact, Undistorted Portfolio Image */}
          <img
            src={imageSrc}
            alt={slide.alt}
            onError={handleImageError}
            loading={index === 0 ? 'eager' : 'lazy'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isHovered ? 'scale(1.02)' : 'scale(1)'
            }}
          />

          {/* Hover Specular Sheen */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 50%)',
              pointerEvents: 'none',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.4s ease'
            }}
          />

          {/* Floating Hover Inspection Tag */}
          <div
            style={{
              position: 'absolute',
              bottom: '22px',
              right: '22px',
              background: 'rgba(10, 2, 5, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '999px',
              padding: '8px 18px',
              color: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f4e12e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Click to Zoom & Inspect</span>
          </div>
        </div>

        {/* Slide Context Footer / Interactive Actions */}
        <div
          className="slide-footer-meta"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            padding: '4px 10px'
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: '700',
                letterSpacing: '0.02em',
                color: '#ffffff',
                marginBottom: '4px'
              }}
            >
              {slide.title}
            </h2>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '0.88rem',
                maxWidth: '750px',
                lineHeight: '1.5'
              }}
            >
              {slide.summary}
            </p>
          </div>

          {/* Dedicated Quick Action depending on slide type */}
          {slide.id === 3 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onCopyContact('email')}
                className="btn-secondary"
                style={{ fontSize: '0.82rem', padding: '8px 16px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>kchopra9484@gmail.com</span>
              </button>
              <a
                href="tel:+916232629208"
                className="btn-secondary"
                style={{ fontSize: '0.82rem', padding: '8px 16px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>+91 6232629208</span>
              </a>
            </div>
          )}

          {slide.id === 4 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => onNavigate(5)}
                className="btn-secondary"
                style={{ fontSize: '0.82rem', padding: '8px 16px' }}
              >
                <span>Explore Social Media (05)</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          )}

          {slide.id === portfolioSlides.length ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => onNavigate(1)}
                className="btn-secondary"
                style={{ fontSize: '0.82rem', padding: '8px 16px' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
                <span>Back to Top (Cover)</span>
              </button>
            </div>
          ) : slide.id !== 3 && slide.id !== 4 && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => onNavigate(slide.id + 1)}
                className="btn-secondary"
                style={{ fontSize: '0.82rem', padding: '8px 16px' }}
              >
                <span>Next ({portfolioSlides[slide.id]?.navLabel || String(slide.id + 1).padStart(2, '0')})</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
