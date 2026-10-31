import React, { useState, useEffect } from 'react';
import { portfolioSlides } from '../data/portfolioData';

export default function Lightbox({ activeSlideId, onClose, onNavigate }) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const currentSlide = portfolioSlides.find((s) => s.id === activeSlideId) || portfolioSlides[0];

  // Reset zoom on slide change
  useEffect(() => {
    setZoomLevel(1);
  }, [activeSlideId]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        const nextId = activeSlideId >= portfolioSlides.length ? 1 : activeSlideId + 1;
        onNavigate(nextId);
      }
      if (e.key === 'ArrowLeft') {
        const prevId = activeSlideId <= 1 ? portfolioSlides.length : activeSlideId - 1;
        onNavigate(prevId);
      }
      if (e.key === '+' || e.key === '=') {
        setZoomLevel((z) => Math.min(z + 0.25, 3));
      }
      if (e.key === '-') {
        setZoomLevel((z) => Math.max(z - 0.25, 0.75));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlideId, onClose, onNavigate]);

  const handleNext = (e) => {
    e.stopPropagation();
    const nextId = activeSlideId >= portfolioSlides.length ? 1 : activeSlideId + 1;
    onNavigate(nextId);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const prevId = activeSlideId <= 1 ? portfolioSlides.length : activeSlideId - 1;
    onNavigate(prevId);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 100,
        background: 'rgba(5, 1, 3, 0.94)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px',
        animation: 'fadeInLightbox 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Top Lightbox Header */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.85rem',
              fontWeight: '700',
              color: '#f4e12e',
              background: 'rgba(244, 225, 46, 0.12)',
              border: '1px solid rgba(244, 225, 46, 0.3)',
              padding: '3px 10px',
              borderRadius: '999px'
            }}
          >
            {currentSlide.slideNumber} / {String(portfolioSlides.length).padStart(2, '0')}
          </span>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#ffffff' }}>
              {currentSlide.title}
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {currentSlide.category}
            </p>
          </div>
        </div>

        {/* Zoom & Close controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '2px 6px'
            }}
          >
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Zoom out (-)"
            >
              -
            </button>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', padding: '0 8px', color: '#f4e12e' }}>
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Zoom in (+)"
            >
              +
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.72rem',
                padding: '4px 8px',
                cursor: 'pointer',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              Reset
            </button>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(216, 30, 61, 0.25)',
              border: '1px solid rgba(255, 43, 80, 0.5)',
              color: '#ffffff',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Close Lightbox (Esc)"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1240px',
          height: '78vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
          userSelect: 'none'
        }}
      >
        <img
          src={currentSlide.image}
          alt={currentSlide.alt}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            borderRadius: '12px',
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.95), 0 0 50px rgba(216, 30, 61, 0.25)'
          }}
        />

        {/* Prev Arrow */}
        <button
          onClick={handlePrev}
          style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(15, 3, 7, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s ease',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.7)'
          }}
          title="Previous slide (Left Arrow)"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          style={{
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(15, 3, 7, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s ease',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.7)'
          }}
          title="Next slide (Right Arrow)"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Footer Navigation Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '650px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '8px 16px',
          borderRadius: '999px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {portfolioSlides.map((s) => (
          <button
            key={s.id}
            onClick={() => onNavigate(s.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '999px',
              border: s.id === activeSlideId ? '1px solid rgba(244, 225, 46, 0.4)' : '1px solid transparent',
              background: s.id === activeSlideId ? 'linear-gradient(135deg, #d81e3d 0%, #870b1e 100%)' : 'transparent',
              color: s.id === activeSlideId ? '#ffffff' : 'var(--text-muted)',
              fontSize: '0.78rem',
              fontWeight: s.id === activeSlideId ? '700' : '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {s.slideNumber}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes fadeInLightbox {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
