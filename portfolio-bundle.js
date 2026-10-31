// Karan Chopra - Animated Portfolio Website
// Standalone React 18 + GSAP + ScrollTrigger + Lenis Bundle

(function () {
  const { useState, useEffect, useRef, createElement: h } = React;

  // --- Portfolio Data ---
  const portfolioSlides = [
    {
      id: 1,
      slideNumber: "01",
      title: "PORTFOLIO",
      role: "Creative Designer",
      author: "Karan Chopra",
      category: "Cover & Visual Identity",
      summary: "Visual identity, creative design thinking, and high-impact art direction.",
      image: "./JJ/1.png",
      alt: "Karan Chopra - Creative Designer Portfolio Cover",
      tagline: "Creative Designer",
      navLabel: "Cover",
      glowColor: "rgba(196, 27, 53, 0.45)"
    },
    {
      id: 2,
      slideNumber: "02",
      title: "HELLO! I'm Karan Chopra",
      role: "Visual Creative & Graphic Designer",
      author: "Karan Chopra",
      category: "Philosophy & Bio",
      summary: "Great design is more than just making things look beautiful — it is about understanding people, communicating ideas and creating visuals that make an impact.",
      keyQuote: "I don't just create designs. I create visual experiences with intention.",
      image: "./JJ/2.png",
      alt: "About Karan Chopra - Graphic Designer & Visual Creative",
      tagline: "Creativity With Intention",
      navLabel: "About",
      glowColor: "rgba(225, 41, 65, 0.4)"
    },
    {
      id: 3,
      slideNumber: "03",
      title: "TOOLS & CONTACT",
      role: "Software Arsenal & Reaching Out",
      author: "Karan Chopra",
      category: "Tools & Connectivity",
      summary: "Photoshop, Illustrator, Canva, CorelDRAW. Open for creative collaborations, branding, and design projects.",
      keyQuote: "Beyond the Prompt, Beyond the Ordinary.",
      contactInfo: {
        phone: "+91 6232629208",
        email: "kchopra9484@gmail.com",
        tools: ["Photoshop", "Illustrator", "Canva", "CorelDRAW"]
      },
      image: "./JJ/3.png",
      alt: "Tools and Contact Details - Karan Chopra",
      tagline: "Beyond The Prompt, Beyond The Ordinary",
      navLabel: "Contact",
      glowColor: "rgba(235, 35, 75, 0.4)"
    },
    {
      id: 4,
      slideNumber: "04",
      title: "TABLE OF CONTENT",
      role: "Design Capabilities",
      author: "Karan Chopra",
      category: "Deliverables & Service Spectrum",
      summary: "Specialized in Social Media Designing, Personal Branding, Printable Designs, AI Based Ads, and Creative Campaigns.",
      image: "./JJ/4.png",
      alt: "Table of Content - Design Capabilities by Karan Chopra",
      tagline: "Holistic Visual Solutions",
      navLabel: "Index",
      glowColor: "rgba(215, 25, 55, 0.4)"
    },
    {
      id: 5,
      slideNumber: "05",
      title: "SOCIAL MEDIA DESIGNING",
      role: "Project Showcase 01",
      author: "Karan Chopra",
      category: "Social Media & Visual Strategy",
      summary: "Transforming ideas into meaningful visuals that connect with audiences. Thoughtfully crafted to reflect brands, capture attention, and build a stronger social media presence.",
      image: "./JJ/5.png",
      alt: "Social Media Designing Showcase - Karan Chopra",
      tagline: "Visual Experiences With Purpose",
      navLabel: "Social",
      glowColor: "rgba(240, 40, 70, 0.45)"
    },
    {
      id: 6,
      slideNumber: "06",
      title: "DESIGNING FOR EDUCATION BRANDS",
      role: "Project Showcase 02",
      author: "Karan Chopra",
      category: "Campaign Design & AI Synergy",
      summary: "Speed and visual quality alone cannot replace human creativity, originality, and emotional depth. Featured campaigns for Skill Wala, Dussehra habits, and Mission MBBS.",
      image: "./JJ/6.png",
      alt: "Designing for Education Brands - High Impact Campaigns",
      tagline: "Human Creativity Meets Modern Precision",
      navLabel: "Education",
      glowColor: "rgba(210, 30, 60, 0.45)"
    },
    {
      id: 7,
      slideNumber: "07",
      title: "DESIGNING FOR REAL STATE",
      role: "Project Showcase 03",
      author: "Karan Chopra",
      category: "Real Estate & Architecture",
      summary: "Visual storytelling for luxury living and architectural excellence. Featured campaigns for Resido Realty Goa, Beyond Living Sky Villas, and Arha Luxury Apartments.",
      keyQuote: "Own a prestigious address with visuals designed for elevated lifestyles.",
      image: "./JJ/7.png",
      alt: "Designing for Real State - Karan Chopra Luxury Architectural Campaigns",
      tagline: "Elevated Architectural Visuals",
      navLabel: "Real Estate",
      glowColor: "rgba(244, 225, 46, 0.4)"
    },
    {
      id: 8,
      slideNumber: "08",
      title: "DESIGNING FOR PRODUCT",
      role: "Project Showcase 04",
      author: "Karan Chopra",
      category: "E-Commerce & High-Impact Ads",
      summary: "From raw product cutout to dynamic, high-conversion visual ad. Transforming the COMET UNO sneaker into an explosive 'PLAY Different' campaign with custom game-card art direction.",
      keyQuote: "Transforming raw product photography into explosive, high-converting creative ad experiences.",
      image: "./JJ/8.png",
      alt: "Designing for Product - COMET UNO Play Different Campaign by Karan Chopra",
      tagline: "Raw Product to Cinematic Ad",
      navLabel: "Product",
      glowColor: "rgba(255, 43, 80, 0.45)"
    },
    {
      id: 9,
      slideNumber: "09",
      title: "PERSONAL BRANDING",
      role: "Project Showcase 05",
      author: "Karan Chopra",
      category: "Brand Identity & Large Format",
      summary: "Personal branding is more than just creating a logo — it's about building an enduring identity. Featuring large-format billboard advertising for Fossil Gen 5: Time Meets Tomorrow.",
      keyQuote: "We combine creativity, strategy, and design thinking to transform your vision into a distinctive visual identity.",
      image: "./JJ/9.png",
      alt: "Personal Branding - Fossil Gen 5 Billboard Campaign by Karan Chopra",
      tagline: "Identity Beyond The Logo",
      navLabel: "Personal",
      glowColor: "rgba(216, 30, 61, 0.45)"
    },
    {
      id: 10,
      slideNumber: "10",
      title: "BRANDING FOR WATCH BRAND",
      role: "Project Showcase 06",
      author: "Karan Chopra",
      category: "Horology & Premium Packaging",
      summary: "Comprehensive visual identity and packaging suite for luxury watchmaker 'समय' (Samay). Combining artisanal typography, bespoke packaging, and macro chronometer craftsmanship.",
      keyQuote: "Timeless elegance crafted through thoughtful typography, luxury packaging, and horological precision.",
      image: "./JJ/10.png",
      alt: "Branding for Watch Brand Samay by Karan Chopra",
      tagline: "Timeless Elegance & Horology",
      navLabel: "Watches",
      glowColor: "rgba(244, 225, 46, 0.45)"
    },
    {
      id: 11,
      slideNumber: "11",
      title: "DESIGNS FOR PRINTING",
      role: "Project Showcase 07",
      author: "Karan Chopra",
      category: "Retail Storefront & Merchandising",
      summary: "High-impact retail storefront displays, luxury jewelry campaigns for KIRTI, and custom merchandise printing. Designed for large-format clarity, tactile beauty, and brand prestige.",
      keyQuote: "Print is tactile emotion — designed with millimeter precision for maximum retail presence.",
      image: "./JJ/11.png",
      alt: "Designs for Printing - Kirti Luxury Storefront and Merchandise by Karan Chopra",
      tagline: "Precision Print & Retail Presence",
      navLabel: "Printing",
      glowColor: "rgba(216, 30, 61, 0.5)"
    }
  ];

  const designerInfo = {
    name: "Karan Chopra",
    title: "Creative Designer & Visual Strategist",
    phone: "+91 6232629208",
    email: "kchopra9484@gmail.com",
    tools: ["Adobe Photoshop", "Adobe Illustrator", "Canva", "CorelDRAW"],
    year: "2026"
  };

  // --- Web Audio Procedural Atmosphere ---
  class AudioAtmosphere {
    constructor() {
      this.ctx = null;
      this.oscillators = [];
      this.gainNode = null;
      this.isPlaying = false;
    }
    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.ctx = new AudioContext();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }
    start() {
      this.init();
      if (!this.ctx || this.isPlaying) return;
      try {
        const now = this.ctx.currentTime;
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.001, now);
        this.gainNode.gain.exponentialRampToValueAtTime(0.06, now + 3);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(260, now);

        this.gainNode.connect(filter);
        filter.connect(this.ctx.destination);

        const freqs = [73.42, 110.0, 174.61, 220.0];
        this.oscillators = freqs.map((freq, i) => {
          const osc = this.ctx.createOscillator();
          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          osc.detune.setValueAtTime((i - 1.5) * 4, now);

          const oscGain = this.ctx.createGain();
          oscGain.gain.setValueAtTime(0.25, now);
          osc.connect(oscGain);
          oscGain.connect(this.gainNode);

          osc.start();
          return osc;
        });
        this.isPlaying = true;
      } catch (e) {
        console.warn('Audio error:', e);
      }
    }
    stop() {
      if (!this.isPlaying || !this.gainNode) return;
      try {
        const now = this.ctx.currentTime;
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1);
        setTimeout(() => {
          this.oscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch (e) {}
          });
          this.oscillators = [];
          this.isPlaying = false;
        }, 1100);
      } catch (e) {
        this.isPlaying = false;
      }
    }
    toggle() {
      if (this.isPlaying) {
        this.stop();
        return false;
      } else {
        this.start();
        return true;
      }
    }
  }

  const ambientSound = new AudioAtmosphere();

  // --- Navbar Component ---
  function Navbar({ activeSlide, onNavigate, isAudioPlaying, onToggleAudio, isFullscreen, onToggleFullscreen }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 40);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const shortTitles = ['Cover', 'About', 'Contact', 'Index', 'Social', 'Campaigns'];

    return h('header', {
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'rgba(9, 2, 5, 0.9)' : 'rgba(9, 2, 5, 0.45)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(216, 30, 61, 0.25)' : '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.7)' : 'none',
        padding: scrolled ? '14px 28px' : '20px 36px'
      }
    },
      h('div', {
        style: {
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }
      },
        // Brand Identity
        h('div', {
          onClick: () => onNavigate(0),
          style: { cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', userSelect: 'none' }
        },
          h('div', {
            style: {
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #d81e3d 0%, #7e0c1f 100%)',
              border: '1px solid rgba(255, 77, 107, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(216, 30, 61, 0.4)'
            }
          },
            h('span', { style: { fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1rem', color: '#ffffff' } }, 'KC')
          ),
          h('div', null,
            h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
              h('span', { style: { fontFamily: 'var(--font-heading)', fontWeight: '700', fontSize: '1.05rem', letterSpacing: '0.04em', color: '#ffffff' } }, 'KARAN CHOPRA'),
              h('span', {
                style: {
                  fontSize: '0.65rem',
                  padding: '2px 7px',
                  borderRadius: '20px',
                  background: 'rgba(244, 225, 46, 0.15)',
                  color: '#f4e12e',
                  border: '1px solid rgba(244, 225, 46, 0.3)',
                  fontWeight: '600'
                }
              }, 'PRO')
            ),
            h('div', { style: { fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' } },
              h('span', null, 'Creative Designer'),
              h('span', { style: { width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e' } }),
              h('span', { style: { color: '#22c55e', fontSize: '0.7rem' } }, 'Available for Work')
            )
          )
        ),

        // Navigation Items
        h('nav', {
          className: 'desktop-nav',
          style: {
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
          }
        },
          h('button', {
            onClick: () => onNavigate(0),
            style: {
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
            },
            title: '360° Camera Orbit Experience'
          }, '360° Orbit'),
          portfolioSlides.map(slide => {
            const isActive = activeSlide === slide.id;
            return h('button', {
              key: slide.id,
              onClick: () => onNavigate(slide.id),
              style: {
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
              },
              title: slide.title
            },
              h('span', { style: { opacity: isActive ? 1 : 0.6, marginRight: '4px', fontSize: '0.7rem' } }, slide.slideNumber),
              slide.navLabel || slide.title
            );
          })
        ),

        // Controls
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          // Audio
          h('button', {
            onClick: onToggleAudio,
            style: {
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
            },
            title: isAudioPlaying ? 'Mute Atmosphere' : 'Play Cinematic Atmosphere'
          },
            isAudioPlaying
              ? h('svg', { width: 17, height: 17, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
                  h('polygon', { points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5' }),
                  h('path', { d: 'M15.54 8.46a5 5 0 0 1 0 7.07' }),
                  h('path', { d: 'M19.07 4.93a10 10 0 0 1 0 14.14' })
                )
              : h('svg', { width: 17, height: 17, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
                  h('polygon', { points: '11 5 6 9 2 9 2 15 6 15 11 19 11 5' }),
                  h('line', { x1: 23, y1: 9, x2: 17, y2: 15 }),
                  h('line', { x1: 17, y1: 9, x2: 23, y2: 15 })
                )
          ),

          // Fullscreen
          h('button', {
            onClick: onToggleFullscreen,
            style: {
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-muted)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            },
            title: isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'
          },
            h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
              h('polyline', { points: '15 3 21 3 21 9' }),
              h('polyline', { points: '9 21 3 21 3 15' }),
              h('line', { x1: 21, y1: 3, x2: 14, y2: 10 }),
              h('line', { x1: 3, y1: 21, x2: 10, y2: 14 })
            )
          ),

          // Let's Talk CTA
          h('a', {
            href: `mailto:${designerInfo.email}?subject=Design%20Inquiry%20from%20Portfolio`,
            className: 'btn-primary',
            style: { padding: '9px 20px', fontSize: '0.82rem' }
          },
            h('span', null, "Let's Talk"),
            h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' },
              h('line', { x1: 5, y1: 12, x2: 19, y2: 12 }),
              h('polyline', { points: '12 5 19 12 12 19' })
            )
          )
        )
      )
    );
  }

  // --- SlideCard Component ---
  function SlideCard({ slide, index, onInspect, onNavigate, onCopyContact }) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageSrc, setImageSrc] = useState(slide.image);

    const handleImgError = () => {
      setImageSrc(`./JJ/${slide.id}.jpg`);
    };

    return h('section', {
      id: `slide-${slide.id}`,
      className: 'portfolio-slide-section',
      style: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '110px 24px 80px 24px',
        position: 'relative',
        zIndex: 2
      }
    },
      h('div', {
        style: {
          width: '100%',
          maxWidth: '1240px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }
      },
        // Header Meta
        h('div', {
          className: 'slide-header-meta',
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            padding: '0 8px'
          }
        },
          h('div', { style: { display: 'flex', alignItems: 'center', gap: '14px' } },
            h('span', {
              style: {
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: '700',
                color: '#f4e12e',
                background: 'rgba(244, 225, 46, 0.1)',
                border: '1px solid rgba(244, 225, 46, 0.25)',
                padding: '4px 12px',
                borderRadius: '999px',
                letterSpacing: '0.08em'
              }
            }, `${slide.slideNumber} / ${String(portfolioSlides.length).padStart(2, '0')}`),
            h('span', {
              style: {
                fontSize: '0.82rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--text-muted)',
                fontWeight: '600'
              }
            }, slide.category)
          ),
          h('button', {
            onClick: () => onInspect(slide.id),
            className: 'btn-secondary',
            style: { padding: '6px 14px', fontSize: '0.78rem', gap: '6px' }
          },
            h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
              h('circle', { cx: 11, cy: 11, r: 8 }),
              h('line', { x1: 21, y1: 21, x2: 16.65, y2: 16.65 }),
              h('line', { x1: 11, y1: 8, x2: 11, y2: 14 }),
              h('line', { x1: 8, y1: 11, x2: 14, y2: 11 })
            ),
            h('span', null, 'Inspect High-Res')
          )
        ),

        // 16:9 Image Frame
        h('div', {
          className: 'slide-image-frame',
          onMouseEnter: () => setIsHovered(true),
          onMouseLeave: () => setIsHovered(false),
          onClick: () => onInspect(slide.id),
          style: {
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
          }
        },
          h('img', {
            src: imageSrc,
            alt: slide.alt,
            onError: handleImgError,
            loading: index === 0 ? 'eager' : 'lazy',
            style: {
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isHovered ? 'scale(1.02)' : 'scale(1)'
            }
          }),
          // Hover Sheen
          h('div', {
            style: {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 50%)',
              pointerEvents: 'none',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.4s ease'
            }
          }),
          // Hover Tag
          h('div', {
            style: {
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
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }
          },
            h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: '#f4e12e', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' },
              h('circle', { cx: 11, cy: 11, r: 8 }),
              h('line', { x1: 21, y1: 21, x2: 16.65, y2: 16.65 })
            ),
            h('span', null, 'Click to Zoom & Inspect')
          )
        ),

        // Footer Meta
        h('div', {
          className: 'slide-footer-meta',
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            padding: '4px 10px'
          }
        },
          h('div', null,
            h('h2', {
              style: {
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: '700',
                letterSpacing: '0.02em',
                color: '#ffffff',
                marginBottom: '4px'
              }
            }, slide.title),
            h('p', {
              style: {
                color: 'var(--text-muted)',
                fontSize: '0.88rem',
                maxWidth: '750px',
                lineHeight: '1.5'
              }
            }, slide.summary)
          ),

          // Slide Specific Actions
          slide.id === 3 ? h('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
            h('button', {
              onClick: () => onCopyContact('email'),
              className: 'btn-secondary',
              style: { fontSize: '0.82rem', padding: '8px 16px' }
            },
              h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
                h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }),
                h('polyline', { points: '22,6 12,13 2,6' })
              ),
              h('span', null, 'kchopra9484@gmail.com')
            ),
            h('a', {
              href: 'tel:+916232629208',
              className: 'btn-secondary',
              style: { fontSize: '0.82rem', padding: '8px 16px' }
            },
              h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
                h('path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' })
              ),
              h('span', null, '+91 6232629208')
            )
          ) : null,

          slide.id === 4 ? h('div', null,
            h('button', {
              onClick: () => onNavigate(5),
              className: 'btn-secondary',
              style: { fontSize: '0.82rem', padding: '8px 16px' }
            },
              h('span', null, 'Explore Social Media (05)'),
              h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
                h('line', { x1: 5, y1: 12, x2: 19, y2: 12 }),
                h('polyline', { points: '12 5 19 12 12 19' })
              )
            )
          ) : null,

          slide.id === portfolioSlides.length ? h('div', null,
            h('button', {
              onClick: () => onNavigate(1),
              className: 'btn-secondary',
              style: { fontSize: '0.82rem', padding: '8px 16px' }
            },
              h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
                h('line', { x1: 12, y1: 19, x2: 12, y2: 5 }),
                h('polyline', { points: '5 12 12 5 19 12' })
              ),
              h('span', null, 'Back to Top (Cover)')
            )
          ) : (slide.id !== 3 && slide.id !== 4 ? h('div', null,
            h('button', {
              onClick: () => onNavigate(slide.id + 1),
              className: 'btn-secondary',
              style: { fontSize: '0.82rem', padding: '8px 16px' }
            },
              h('span', null, `Next (${portfolioSlides[slide.id]?.navLabel || String(slide.id + 1).padStart(2, '0')})`),
              h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
                h('line', { x1: 5, y1: 12, x2: 19, y2: 12 }),
                h('polyline', { points: '12 5 19 12 12 19' })
              )
            )
          ) : null)
        )
      )
    );
  }

  // --- SlidePagination Component ---
  function SlidePagination({ activeSlide, onNavigate }) {
    return h('aside', {
      className: 'slide-pagination-rail',
      style: {
        position: 'fixed',
        right: '28px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        background: 'rgba(15, 3, 7, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '10px 6px',
        borderRadius: '999px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)'
      }
    },
      // 360° Hero Indicator Dot
      h('div', {
        style: { position: 'relative', display: 'flex', alignItems: 'center' },
        className: 'pagination-item-wrap'
      },
        h('div', {
          className: 'pagination-tooltip',
          style: {
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
          }
        },
          h('span', { style: { color: '#f4e12e', marginRight: '6px' } }, '360°'),
          'Camera Orbit Intro'
        ),
        h('button', {
          onClick: () => onNavigate(0),
          style: {
            width: activeSlide === 0 ? '12px' : '8px',
            height: activeSlide === 0 ? '28px' : '8px',
            borderRadius: '999px',
            background: activeSlide === 0 ? 'linear-gradient(180deg, #f4e12e 0%, #d81e3d 100%)' : 'rgba(255, 255, 255, 0.25)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            padding: 0,
            boxShadow: activeSlide === 0 ? '0 0 12px rgba(244, 225, 46, 0.6)' : 'none'
          },
          'aria-label': 'Go to 360 Degree Camera Orbit'
        })
      ),
      portfolioSlides.map(slide => {
        const isActive = activeSlide === slide.id;
        return h('div', {
          key: slide.id,
          style: { position: 'relative', display: 'flex', alignItems: 'center' },
          className: 'pagination-item-wrap'
        },
          h('div', {
            className: 'pagination-tooltip',
            style: {
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
            }
          },
            h('span', { style: { color: '#f4e12e', marginRight: '6px' } }, slide.slideNumber),
            slide.title
          ),
          h('button', {
            onClick: () => onNavigate(slide.id),
            style: {
              width: isActive ? '12px' : '8px',
              height: isActive ? '28px' : '8px',
              borderRadius: '999px',
              background: isActive ? 'linear-gradient(180deg, #f4e12e 0%, #d81e3d 100%)' : 'rgba(255, 255, 255, 0.25)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              padding: 0,
              boxShadow: isActive ? '0 0 12px rgba(244, 225, 46, 0.6)' : 'none'
            },
            'aria-label': `Go to ${slide.title}`
          })
        );
      })
    );
  }

  // --- Lightbox Component ---
  function Lightbox({ activeSlideId, onClose, onNavigate }) {
    const [zoomLevel, setZoomLevel] = useState(1);
    const currentSlide = portfolioSlides.find(s => s.id === activeSlideId) || portfolioSlides[0];

    useEffect(() => {
      setZoomLevel(1);
    }, [activeSlideId]);

    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') {
          const next = activeSlideId >= portfolioSlides.length ? 1 : activeSlideId + 1;
          onNavigate(next);
        }
        if (e.key === 'ArrowLeft') {
          const prev = activeSlideId <= 1 ? portfolioSlides.length : activeSlideId - 1;
          onNavigate(prev);
        }
        if (e.key === '+' || e.key === '=') setZoomLevel(z => Math.min(z + 0.25, 3));
        if (e.key === '-') setZoomLevel(z => Math.max(z - 0.25, 0.75));
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeSlideId, onClose, onNavigate]);

    return h('div', {
      onClick: onClose,
      style: {
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
        padding: '24px'
      }
    },
      // Header
      h('div', {
        onClick: (e) => e.stopPropagation(),
        style: {
          width: '100%',
          maxWidth: '1300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10
        }
      },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '14px' } },
          h('span', {
            style: {
              fontFamily: 'var(--font-heading)',
              fontSize: '0.85rem',
              fontWeight: '700',
              color: '#f4e12e',
              background: 'rgba(244, 225, 46, 0.12)',
              border: '1px solid rgba(244, 225, 46, 0.3)',
              padding: '3px 10px',
              borderRadius: '999px'
            }
          }, `${currentSlide.slideNumber} / ${String(portfolioSlides.length).padStart(2, '0')}`),
          h('div', null,
            h('h3', { style: { fontSize: '1rem', fontWeight: '700', color: '#ffffff' } }, currentSlide.title),
            h('p', { style: { fontSize: '0.78rem', color: 'var(--text-muted)' } }, currentSlide.category)
          )
        ),

        // Controls
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } },
          h('div', {
            style: {
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '2px 6px'
            }
          },
            h('button', {
              onClick: () => setZoomLevel(z => Math.max(z - 0.25, 0.75)),
              style: { background: 'transparent', border: 'none', color: '#fff', width: 32, height: 32, cursor: 'pointer', fontSize: '1.1rem' }
            }, '-'),
            h('span', { style: { fontSize: '0.75rem', fontWeight: '600', padding: '0 8px', color: '#f4e12e' } }, `${Math.round(zoomLevel * 100)}%`),
            h('button', {
              onClick: () => setZoomLevel(z => Math.min(z + 0.25, 2.5)),
              style: { background: 'transparent', border: 'none', color: '#fff', width: 32, height: 32, cursor: 'pointer', fontSize: '1.1rem' }
            }, '+'),
            h('button', {
              onClick: () => setZoomLevel(1),
              style: { background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.72rem', padding: '4px 8px', cursor: 'pointer' }
            }, 'Reset')
          ),

          h('button', {
            onClick: onClose,
            style: {
              background: 'rgba(216, 30, 61, 0.25)',
              border: '1px solid rgba(255, 43, 80, 0.5)',
              color: '#ffffff',
              width: 38,
              height: 38,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }
          },
            h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' },
              h('line', { x1: 18, y1: 6, x2: 6, y2: 18 }),
              h('line', { x1: 6, y1: 6, x2: 18, y2: 18 })
            )
          )
        )
      ),

      // Stage
      h('div', {
        onClick: (e) => e.stopPropagation(),
        style: {
          position: 'relative',
          width: '100%',
          maxWidth: '1240px',
          height: '78vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'auto',
          userSelect: 'none'
        }
      },
        h('img', {
          src: currentSlide.image,
          alt: currentSlide.alt,
          style: {
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            borderRadius: '12px',
            transform: `scale(${zoomLevel})`,
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.95), 0 0 50px rgba(216, 30, 61, 0.25)'
          }
        }),

        // Arrows
        h('button', {
          onClick: (e) => { e.stopPropagation(); onNavigate(activeSlideId <= 1 ? portfolioSlides.length : activeSlideId - 1); },
          style: {
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(15, 3, 7, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#fff',
            width: 46,
            height: 46,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }
        },
          h('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' },
            h('polyline', { points: '15 18 9 12 15 6' })
          )
        ),

        h('button', {
          onClick: (e) => { e.stopPropagation(); onNavigate(activeSlideId >= portfolioSlides.length ? 1 : activeSlideId + 1); },
          style: {
            position: 'absolute',
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(15, 3, 7, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#fff',
            width: 46,
            height: 46,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }
        },
          h('svg', { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' },
            h('polyline', { points: '9 18 15 12 9 6' })
          )
        )
      ),

      // Footer
      h('div', {
        onClick: (e) => e.stopPropagation(),
        style: {
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
        }
      },
        portfolioSlides.map(s => h('button', {
          key: s.id,
          onClick: () => onNavigate(s.id),
          style: {
            padding: '6px 14px',
            borderRadius: '999px',
            border: s.id === activeSlideId ? '1px solid rgba(244, 225, 46, 0.4)' : '1px solid transparent',
            background: s.id === activeSlideId ? 'linear-gradient(135deg, #d81e3d 0%, #870b1e 100%)' : 'transparent',
            color: s.id === activeSlideId ? '#ffffff' : 'var(--text-muted)',
            fontSize: '0.78rem',
            fontWeight: s.id === activeSlideId ? '700' : '500',
            cursor: 'pointer'
          }
        }, s.slideNumber))
      )
    );
  }

  // --- ContactFooter Component ---
  function ContactFooter({ onScrollToTop }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(designerInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    };

    return h('footer', {
      style: {
        position: 'relative',
        zIndex: 10,
        background: 'linear-gradient(180deg, #070204 0%, #150409 60%, #20060d 100%)',
        borderTop: '1px solid rgba(216, 30, 61, 0.25)',
        padding: '100px 24px 60px 24px',
        overflow: 'hidden'
      }
    },
      h('div', {
        style: {
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '36px'
        }
      },
        h('div', { style: { maxWidth: '800px' } },
          h('span', {
            style: {
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
            }
          }, "Let's Collaborate"),
          h('h2', {
            style: {
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
              fontWeight: '800',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
              color: '#ffffff',
              marginBottom: '16px'
            }
          },
            'Ready to bring your brand\'s ',
            h('br'),
            h('span', { className: 'gold-gradient-text' }, 'visual experience'),
            ' to life?'
          ),
          h('p', {
            style: {
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              fontStyle: 'italic',
              marginTop: '10px'
            }
          }, '"I don\'t just create designs. I create visual experiences with intention."')
        ),

        // Actions
        h('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginTop: '10px'
          }
        },
          h('a', {
            href: `mailto:${designerInfo.email}?subject=Project%20Inquiry%20-%20Karan%20Chopra`,
            className: 'btn-primary',
            style: { padding: '14px 28px', fontSize: '0.95rem' }
          },
            h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' },
              h('path', { d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' }),
              h('polyline', { points: '22,6 12,13 2,6' })
            ),
            h('span', null, designerInfo.email)
          ),

          h('button', {
            onClick: handleCopy,
            className: 'btn-secondary',
            style: { padding: '14px 22px', fontSize: '0.95rem' }
          },
            copied
              ? [
                  h('svg', { key: 'c', width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#22c55e', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' },
                      h('polyline', { points: '20 6 9 17 4 12' })
                    ),
                  h('span', { key: 't', style: { color: '#22c55e' } }, 'Email Copied!')
                ]
              : [
                  h('svg', { key: 'i', width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
                      h('rect', { x: 9, y: 9, width: 13, height: 13, rx: 2, ry: 2 }),
                      h('path', { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' })
                    ),
                  h('span', { key: 't2' }, 'Copy Email')
                ]
          ),

          h('a', {
            href: 'https://wa.me/916232629208?text=Hi%20Karan,%20I%20saw%20your%20portfolio!',
            target: '_blank',
            rel: 'noreferrer',
            className: 'btn-secondary',
            style: { padding: '14px 24px', fontSize: '0.95rem' }
          },
            h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: '#25D366', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
              h('path', { d: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' })
            ),
            h('span', null, 'WhatsApp (+91 6232629208)')
          )
        ),

        // Stack
        h('div', { style: { marginTop: '20px' } },
          h('p', { style: { fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '12px' } },
            'Primary Creative Software'
          ),
          h('div', { style: { display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' } },
            designerInfo.tools.map(tool => h('span', {
              key: tool,
              style: {
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '999px',
                padding: '6px 14px',
                fontSize: '0.8rem',
                color: 'var(--text-muted)'
              }
            }, tool))
          )
        ),

        // Bottom
        h('div', {
          style: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            fontSize: '0.82rem',
            color: 'var(--text-dim)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '30px'
          }
        },
          h('div', null, `© ${designerInfo.year} Karan Chopra. All visual designs & rights reserved.`),
          h('button', {
            onClick: onScrollToTop,
            className: 'btn-secondary',
            style: { padding: '8px 16px', fontSize: '0.8rem', gap: '6px' }
          },
            h('span', null, 'Back to Top'),
            h('svg', { width: 14, height: 14, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' },
              h('polyline', { points: '18 15 12 9 6 15' })
            )
          )
        )
      )
    );
  }

  // --- Main App Component ---
  function App() {
    const [activeSlide, setActiveSlide] = useState(0); // 0 = 360° Hero, 1..6 = Slides
    const [lightboxId, setLightboxId] = useState(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const videoRef = useRef(null);
    const progressLineRef = useRef(null);
    const lenisRef = useRef(null);
    const gsapRef = useRef(null);

    useEffect(() => {
      let lenisInstance = null;
      let updateVideoTick = null;

      // 1. Lenis Smooth Scroll (Single unified ticker — No double RAF lag)
      if (typeof window.Lenis !== 'undefined') {
        lenisInstance = new window.Lenis({
          duration: 0.9,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1.0,
          touchMultiplier: 1.5,
          infinite: false
        });
        lenisRef.current = lenisInstance;
      }

      // 2. GSAP & ScrollTrigger
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;

      if (gsap && ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        gsapRef.current = gsap;

        if (lenisInstance) {
          lenisInstance.on('scroll', () => {
            ScrollTrigger.update();
            detectActiveSection();
            updateProgressBar();
          });

          gsap.ticker.add((time) => {
            lenisInstance.raf(time * 1000);
          });
          gsap.ticker.lagSmoothing(0);
        }

        // 3. 360° Video Scrubbing Setup (Single Clean Full-Bleed Video)
        const video = videoRef.current;

        if (video) {
          video.pause();
          video.muted = true;

          const setupVideoScrub = () => {
            const duration = video.duration || 9.89;
            let targetTime = 0;
            let currentTime = 0;

            // Smooth seeking lerp loop in GSAP ticker: zero stutter, zero decoder queue overflow
            updateVideoTick = () => {
              const diff = targetTime - currentTime;
              if (Math.abs(diff) > 0.005) {
                currentTime += diff * 0.28;
                if (video && !video.seeking) {
                  try {
                    if (typeof video.fastSeek === 'function') {
                      video.fastSeek(currentTime);
                    } else {
                      video.currentTime = currentTime;
                    }
                  } catch (e) {
                    video.currentTime = currentTime;
                  }
                }
              }
            };

            gsap.ticker.add(updateVideoTick);

            // Pin the video container across 2000px scroll sequence
            const introTl = gsap.timeline({
              scrollTrigger: {
                trigger: '#video-intro-container',
                start: 'top top',
                end: '+=2000',
                pin: true,
                scrub: 0.3,
                anticipatePin: 1,
                onUpdate: (self) => {
                  const scrubProgress = Math.min(self.progress / 0.85, 1.0);
                  targetTime = scrubProgress * (duration - 0.05);
                }
              }
            });

            // PHASE 2: Fade out video container completely before Slide 1 begins
            introTl.fromTo(
              '#video-intro-container',
              { opacity: 1 },
              { opacity: 0, ease: 'power2.inOut', duration: 0.15 },
              0.85
            );
          };

          if (video.readyState >= 1) {
            setupVideoScrub();
          } else {
            video.addEventListener('loadedmetadata', setupVideoScrub, { once: true });
          }
        }

        // 4. Existing 6 Portfolio Slides
        portfolioSlides.forEach((slide) => {
          const el = document.getElementById(`slide-${slide.id}`);
          if (!el) return;

          const frame = el.querySelector('.slide-image-frame');
          const metaHeader = el.querySelector('.slide-header-meta');
          const metaFooter = el.querySelector('.slide-footer-meta');

          if (frame) {
            gsap.fromTo(
              frame,
              {
                opacity: 0,
                scale: 0.93,
                y: 50,
                clipPath: 'polygon(0 8%, 100% 8%, 100% 92%, 0 92%)'
              },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 78%',
                  end: 'bottom 20%',
                  toggleActions: 'play none none reverse'
                }
              }
            );
          }

          if (metaHeader) {
            gsap.fromTo(metaHeader,
              { opacity: 0, y: -20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 82%' }
              }
            );
          }

          if (metaFooter) {
            gsap.fromTo(metaFooter,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 75%' }
              }
            );
          }
        });
      }

      // 5. Accurate Section Detection based on viewport bounding rect
      const detectActiveSection = () => {
        let currentActive = 0;
        const introEl = document.getElementById('video-intro-container');
        if (introEl) {
          const rect = introEl.getBoundingClientRect();
          if (rect.bottom > 120) {
            currentActive = 0;
          }
        }

        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY > 150) {
          const focusY = window.innerHeight * 0.45;
          for (let i = 0; i < portfolioSlides.length; i++) {
            const slide = portfolioSlides[i];
            const el = document.getElementById(`slide-${slide.id}`);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= focusY && rect.bottom >= focusY) {
                currentActive = slide.id;
                break;
              }
            }
          }
        }

        setActiveSlide((prev) => (prev !== currentActive ? currentActive : prev));
      };

      // 6. Direct DOM update for scroll progress bar (Zero React re-render lag)
      const updateProgressBar = () => {
        if (progressLineRef.current) {
          const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
          progressLineRef.current.style.width = scrolled + '%';
        }
      };

      window.addEventListener('scroll', () => {
        detectActiveSection();
        updateProgressBar();
      }, { passive: true });

      return () => {
        if (updateVideoTick && gsapRef.current) {
          gsapRef.current.ticker.remove(updateVideoTick);
        }
        if (lenisInstance) lenisInstance.destroy();
      };
    }, []);

    // Smooth Navigation with Navbar Height Offset
    const handleNavigate = (targetId) => {
      if (targetId === 0) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { duration: 1.0 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setActiveSlide(0);
        return;
      }

      const el = document.getElementById(`slide-${targetId}`);
      if (!el) return;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -85, duration: 1.0 });
      } else {
        const top = el.getBoundingClientRect().top + window.scrollY - 85;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      setActiveSlide(targetId);
    };

    const handleScrollToTop = () => {
      handleNavigate(0);
    };

    const handleToggleAudio = () => {
      const playing = ambientSound.toggle();
      setIsAudioPlaying(playing);
      showToast(playing ? 'Ambient soundscape enabled' : 'Sound muted');
    };

    const handleToggleFullscreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
        }
      }
    };

    const showToast = (msg) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(''), 2500);
    };

    const handleCopyContact = (type) => {
      if (type === 'email') {
        navigator.clipboard.writeText(designerInfo.email);
        showToast('Email copied to clipboard!');
      }
    };

    return h('div', { className: 'portfolio-app-root' },
      // Progress line (direct ref - zero React state updates on scroll)
      h('div', { ref: progressLineRef, className: 'scroll-progress-line', style: { width: '0%' } }),

      // Noise Texture
      h('div', { className: 'noise-overlay' }),

      // Header
      h(Navbar, {
        activeSlide,
        onNavigate: handleNavigate,
        isAudioPlaying,
        onToggleAudio: handleToggleAudio,
        isFullscreen,
        onToggleFullscreen: handleToggleFullscreen
      }),

      // Pagination Rail
      h(SlidePagination, {
        activeSlide,
        onNavigate: handleNavigate
      }),

      // PHASE 1 & 2: 360° Full-Screen Full-Bleed Video Intro
      h('div', { id: 'video-intro-container', className: 'video-intro-container' },
        h('video', {
          ref: videoRef,
          id: 'hero-360-video',
          className: 'intro-video-element',
          playsInline: true,
          'webkit-playsinline': 'true',
          muted: true,
          preload: 'auto'
        },
          h('source', { src: './videos/hero-360.mp4', type: 'video/mp4' }),
          h('source', { src: './videos/hero-360.mov', type: 'video/quicktime' })
        )
      ),

      // Main Slides (All 6 Original Slides Preserved)
      h('main', { style: { position: 'relative', zIndex: 2 } },
        portfolioSlides.map((slide, index) => h(SlideCard, {
          key: slide.id,
          slide,
          index,
          onInspect: (id) => setLightboxId(id),
          onNavigate: handleNavigate,
          onCopyContact: handleCopyContact
        }))
      ),

      // Footer
      h(ContactFooter, { onScrollToTop: handleScrollToTop }),

      // Lightbox
      lightboxId !== null ? h(Lightbox, {
        activeSlideId: lightboxId,
        onClose: () => setLightboxId(null),
        onNavigate: (id) => setLightboxId(id)
      }) : null,

      // Toast
      toastMessage ? h('div', {
        style: {
          position: 'fixed',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(20, 4, 8, 0.95)',
          border: '1px solid rgba(244, 225, 46, 0.4)',
          color: '#ffffff',
          padding: '10px 22px',
          borderRadius: '999px',
          fontSize: '0.85rem',
          fontWeight: '600',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(216, 30, 61, 0.3)',
          zIndex: 200
        }
      }, toastMessage) : null
    );
  }

  // Mount React Root
  const container = document.getElementById('root');
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(h(App));
  }
})();
