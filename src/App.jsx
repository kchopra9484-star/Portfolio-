import React, { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import SlideCard from './components/SlideCard';
import SlidePagination from './components/SlidePagination';
import Lightbox from './components/Lightbox';
import ContactFooter from './components/ContactFooter';
import { portfolioSlides, designerInfo } from './data/portfolioData';
import { ambientSound } from './utils/audio';

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0); // 0 = 360° Hero, 1..6 = Slides
  const [lightboxId, setLightboxId] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const videoRef = useRef(null);
  const progressLineRef = useRef(null);
  const lenisRef = useRef(null);
  const gsapRef = useRef(null);

  // Initialize Lenis, GSAP ScrollTrigger & Video Scrubbing
  useEffect(() => {
    let lenisInstance = null;
    let updateVideoTick = null;

    const initExperience = async () => {
      try {
        // 1. Lenis Smooth Scrolling (Single unified ticker - No double RAF)
        let LenisClass = window.Lenis;
        if (!LenisClass && typeof window !== 'undefined') {
          try {
            const module = await import('lenis');
            LenisClass = module.default || module.Lenis;
          } catch (e) {}
        }

        if (LenisClass) {
          lenisInstance = new LenisClass({
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

        // 2. GSAP & ScrollTrigger setup
        let gsap = window.gsap;
        let ScrollTrigger = window.ScrollTrigger;

        if (!gsap && typeof window !== 'undefined') {
          try {
            const gsapModule = await import('gsap');
            const stModule = await import('gsap/ScrollTrigger');
            gsap = gsapModule.gsap || gsapModule.default;
            ScrollTrigger = stModule.ScrollTrigger || stModule.default;
          } catch (err) {}
        }

        if (gsap && ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
          gsapRef.current = gsap;

          // Connect Lenis cleanly to GSAP ticker (only single driver)
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

              // GSAP ticker loop: smoothly lerps currentTime towards targetTime (zero decoder queue choking)
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
                    // Phase 1 (0.0 to 0.85): forward & reverse scrub
                    // Phase 2 (0.85 to 1.0): video finishes and completely fades out
                    const scrubProgress = Math.min(self.progress / 0.85, 1.0);
                    targetTime = scrubProgress * (duration - 0.05);
                  }
                }
              });

              // Complete fade out of video container before Slide 1 begins
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

          // 4. Setup Existing Portfolio Slide Animations
          portfolioSlides.forEach((slide) => {
            const element = document.getElementById(`slide-${slide.id}`);
            if (!element) return;

            const frame = element.querySelector('.slide-image-frame');
            const metaHeader = element.querySelector('.slide-header-meta');
            const metaFooter = element.querySelector('.slide-footer-meta');

            if (frame) {
              gsap.fromTo(
                frame,
                {
                  opacity: 0,
                  scale: 0.94,
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
                    trigger: element,
                    start: 'top 75%',
                    end: 'bottom 25%',
                    toggleActions: 'play none none reverse'
                  }
                }
              );
            }

            if (metaHeader) {
              gsap.fromTo(
                metaHeader,
                { opacity: 0, y: -20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: element,
                    start: 'top 80%'
                  }
                }
              );
            }

            if (metaFooter) {
              gsap.fromTo(
                metaFooter,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: element,
                    start: 'top 75%'
                  }
                }
              );
            }
          });
        }
      } catch (err) {
        console.error('Experience initialization error:', err);
      }
    };

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

    initExperience();

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

  // Smooth Navigation Handler (Accounts for fixed header)
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

    const targetElement = document.getElementById(`slide-${targetId}`);
    if (!targetElement) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetElement, {
        offset: -85, // Properly offsets fixed navbar height
        duration: 1.0
      });
    } else {
      const top = targetElement.getBoundingClientRect().top + window.scrollY - 85;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setActiveSlide(targetId);
  };

  const handleScrollToTop = () => {
    handleNavigate(0);
  };

  // Audio Toggle
  const handleToggleAudio = () => {
    const playing = ambientSound.toggle();
    setIsAudioPlaying(playing);
    showToast(playing ? 'Ambient soundscape enabled' : 'Sound muted');
  };

  // Fullscreen Toggle
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  };

  // Toast confirmation
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

  return (
    <div className="portfolio-app-root">
      {/* Scroll Progress Line (Direct DOM ref - zero React re-render bottleneck) */}
      <div ref={progressLineRef} className="scroll-progress-line" style={{ width: '0%' }} />

      {/* Subtle Noise Texture */}
      <div className="noise-overlay" />

      {/* Top Navbar */}
      <Navbar
        activeSlide={activeSlide}
        onNavigate={handleNavigate}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Right Side Slide Pagination Rail */}
      <SlidePagination
        activeSlide={activeSlide}
        onNavigate={handleNavigate}
      />

      {/* PHASE 1 & 2: 360° Full-Screen Full-Bleed Video Intro */}
      <div id="video-intro-container" className="video-intro-container">
        <video
          ref={videoRef}
          id="hero-360-video"
          className="intro-video-element"
          playsInline
          webkit-playsinline="true"
          muted
          preload="auto"
        >
          <source src="./videos/hero-360.mp4" type="video/mp4" />
          <source src="./videos/hero-360.mov" type="video/quicktime" />
        </video>
      </div>

      {/* PHASE 3: Main Portfolio Scrolling Experience (Original Designs, No Video in Background) */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        {portfolioSlides.map((slide, index) => (
          <SlideCard
            key={slide.id}
            slide={slide}
            index={index}
            onInspect={(id) => setLightboxId(id)}
            onNavigate={handleNavigate}
            onCopyContact={handleCopyContact}
          />
        ))}
      </main>

      {/* High-Impact Contact Footer */}
      <ContactFooter onScrollToTop={handleScrollToTop} />

      {/* Lightbox High-Resolution Inspector */}
      {lightboxId !== null && (
        <Lightbox
          activeSlideId={lightboxId}
          onClose={() => setLightboxId(null)}
          onNavigate={(id) => setLightboxId(id)}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
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
            zIndex: 200,
            animation: 'toastFade 0.25s ease'
          }}
        >
          {toastMessage}
        </div>
      )}

      <style>{`
        @keyframes toastFade {
          from { opacity: 0; transform: translate(-50%, 15px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
