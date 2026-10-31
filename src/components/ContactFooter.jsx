import React, { useState } from 'react';
import { designerInfo } from '../data/portfolioData';

export default function ContactFooter({ onScrollToTop }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(designerInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        background: 'linear-gradient(180deg, #070204 0%, #150409 60%, #20060d 100%)',
        borderTop: '1px solid rgba(216, 30, 61, 0.25)',
        padding: '100px 24px 60px 24px',
        overflow: 'hidden'
      }}
    >
      {/* Background glow accent */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '250px',
          background: 'radial-gradient(ellipse, rgba(216, 30, 61, 0.22) 0%, rgba(216, 30, 61, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '36px'
        }}
      >
        {/* Quote Accent */}
        <div style={{ maxWidth: '800px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.82rem',
              fontWeight: '700',
              color: '#f4e12e',
              background: 'rgba(244, 225, 46, 0.1)',
              border: '1px solid rgba(244, 225, 46, 0.3)',
              padding: '6px 16px',
              borderRadius: '999px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '20px'
            }}
          >
            Let's Collaborate
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              fontWeight: '800',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '16px'
            }}
          >
            Ready to bring your brand's <br />
            <span className="gold-gradient-text">visual experience</span> to life?
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              fontStyle: 'italic',
              marginTop: '10px'
            }}
          >
            "I don't just create designs. I create visual experiences with intention."
          </p>
        </div>

        {/* Contact Actions Grid */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginTop: '10px'
          }}
        >
          {/* Email action */}
          <a
            href={`mailto:${designerInfo.email}?subject=Project%20Inquiry%20-%20Karan%20Chopra`}
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '0.95rem' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>{designerInfo.email}</span>
          </a>

          {/* Copy Email button */}
          <button
            onClick={handleCopyEmail}
            className="btn-secondary"
            style={{ padding: '14px 22px', fontSize: '0.95rem' }}
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span style={{ color: '#22c55e' }}>Email Copied!</span>
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Copy Email</span>
              </>
            )}
          </button>

          {/* Phone / WhatsApp action */}
          <a
            href={`https://wa.me/916232629208?text=Hi%20Karan,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!`}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
            style={{ padding: '14px 24px', fontSize: '0.95rem' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span>WhatsApp (+91 6232629208)</span>
          </a>
        </div>

        {/* Software Stack Pills */}
        <div style={{ marginTop: '20px' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '12px' }}>
            Primary Creative Software
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {designerInfo.tools.map((tool) => (
              <span
                key={tool}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '999px',
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)'
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(255, 255, 255, 0.08)',
            margin: '20px 0 10px 0'
          }}
        />

        {/* Bottom Credits & Back to Top */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.82rem',
            color: 'var(--text-dim)'
          }}
        >
          <div>
            <span>© {designerInfo.year} Karan Chopra. All visual designs & rights reserved.</span>
          </div>

          <button
            onClick={onScrollToTop}
            className="btn-secondary"
            style={{
              padding: '8px 16px',
              fontSize: '0.8rem',
              gap: '6px'
            }}
          >
            <span>Back to Top</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
