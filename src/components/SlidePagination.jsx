import React from 'react';
import { portfolioSlides } from '../data/portfolioData';

export default function SlidePagination({ activeSlide, onNavigate }) {
  return (
    <aside
      className="slide-pagination-rail"
      style={{
        position: 'fixed',
        right: '28px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        background: 'rgba(15, 3, 7, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '12px 8px',
        borderRadius: '999px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)'
      }}
    >
      {/* 360° Hero Indicator Dot */}
      <div
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
        className="pagination-item-wrap"
      >
        <div
          className="pagination-tooltip"
          style={{
            position: 'absolute',
            right: '34px',
            background: 'rgba(12, 3, 6, 0.92)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(244, 225, 46, 0.4)',
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '0.72rem',
            fontWeight: '600',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            opacity: 0,
            transform: 'translateX(6px)',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
          }}
        >
          <span style={{ color: '#f4e12e', marginRight: '6px' }}>360°</span>
          Camera Orbit Intro
        </div>
        <button
          onClick={() => onNavigate(0)}
          style={{
            width: activeSlide === 0 ? '12px' : '8px',
            height: activeSlide === 0 ? '28px' : '8px',
            borderRadius: '999px',
            background: activeSlide === 0
              ? 'linear-gradient(180deg, #f4e12e 0%, #d81e3d 100%)'
              : 'rgba(255, 255, 255, 0.25)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            padding: 0,
            boxShadow: activeSlide === 0 ? '0 0 12px rgba(244, 225, 46, 0.6)' : 'none'
          }}
          aria-label="Go to 360 Degree Camera Orbit"
        />
      </div>

      {portfolioSlides.map((slide) => {
        const isActive = activeSlide === slide.id;
        return (
          <div
            key={slide.id}
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
            className="pagination-item-wrap"
          >
            {/* Hover Tooltip */}
            <div
              className="pagination-tooltip"
              style={{
                position: 'absolute',
                right: '34px',
                background: 'rgba(12, 3, 6, 0.92)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(216, 30, 61, 0.35)',
                color: '#ffffff',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                opacity: 0,
                transform: 'translateX(6px)',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
              }}
            >
              <span style={{ color: '#f4e12e', marginRight: '6px' }}>{slide.slideNumber}</span>
              {slide.title}
            </div>

            {/* Dot button */}
            <button
              onClick={() => onNavigate(slide.id)}
              style={{
                width: isActive ? '12px' : '8px',
                height: isActive ? '28px' : '8px',
                borderRadius: '999px',
                background: isActive
                  ? 'linear-gradient(180deg, #f4e12e 0%, #d81e3d 100%)'
                  : 'rgba(255, 255, 255, 0.25)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                padding: 0,
                boxShadow: isActive ? '0 0 12px rgba(244, 225, 46, 0.6)' : 'none'
              }}
              aria-label={`Go to ${slide.title}`}
            />
          </div>
        );
      })}

      <style>{`
        .pagination-item-wrap:hover .pagination-tooltip {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
        @media (max-width: 768px) {
          .slide-pagination-rail {
            display: none !important;
          }
        }
      `}</style>
    </aside>
  );
}
