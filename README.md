# ✨ Karan Chopra — Animated Creative Designer Portfolio with 360° Video Orbit

A premium, modern, and smoothly animated single-page portfolio website showcasing Karan Chopra's 360-degree camera orbit video and 6 original graphic design presentation slides.

---

## 🎥 360° Cinematic Video Scroll Animation

- **Pure Full-Screen Video (Zero Text Overlays)**: Opens with your 360-degree camera movement video at 100vw × 100vh with no headings, badges, subtitles, or captions over it.
- **Uncropped 16:9 Composition (Dual-Layer)**:
  - Foreground video uses `object-fit: contain` so the head, shoulders, and camera movement are never cut off on any screen.
  - Background duplicate uses a soft, blurred enlarged video (`object-fit: cover; filter: blur(40px)`) that fills wide and tall viewports without black bars.
- **Flow Watermark Concealment**:
  - Soft, natural multi-stop black gradient overlay along the bottom 180px with radial corner coverage to completely conceal the Flow watermark without a solid bar.
- **Hardware-Optimized Scrubbing & Smooth Scroll**:
  - Unified GSAP ticker driver for Lenis (double RAF removed).
  - Video seek lerp loop eliminates decoder queue stalls and frame jumping.
  - Direct DOM updates for progress tracking (zero React re-render scroll lag).
- **Synchronized Active Navigation**:
  - Continuous viewport-center section detection accurately highlights the active section in both the top navigation and vertical pagination rail.
  - Header-height offset (`-85px`) ensures clean section alignment when clicking jump links.
- **Clean 3-Phase Progression**:
  - **Phase 1 (Video Intro)**: Full-screen 360° video intro at 100% visibility.
  - **Phase 2 (Exit Transition)**: Between 85% and 100% of the intro scroll sequence, the video smoothly fades to 0% opacity.
  - **Phase 3 (Original Portfolio)**: The video completely disappears. The original portfolio slides (01 to 06) appear sequentially over the clean dark background with zero video behind them.



---

## 🎨 100% Original Design Preservation

- **Exact Original Designs**: All 6 original portfolio images located in the `JJ/` folder are preserved in their exact design, layout, typography, colors, and graphics.
- **Strict Aspect Ratio (16:9 Widescreen)**: Displayed with zero cropping, zero stretching, and zero distortion across all screen sizes.
- **Sequential Flow**: Slides 1 to 6 appear in their exact intended narrative sequence.

---

## 🚀 How to Launch and Preview

### Method 1: Instant Launch (Recommended for Windows)
Double-click **`preview.bat`** in the project directory.
- It automatically detects your local Node.js environment and starts the server on `http://localhost:3000`.
- Opens automatically in your default web browser (Chrome, Edge, etc.).

### Method 2: Command Line
```powershell
node server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Method 3: Direct Double-Click
Simply double-click **`index.html`** to open it directly in Google Chrome, Microsoft Edge, or Firefox.

### Method 4: Standard Vite Development
```bash
npm install
npm run dev
```

---

## 🌟 Interactive Features & Animations

1. **Lenis Smooth Momentum Scrolling**:
   - Natural inertia-based vertical scrolling.
   - Synchronized with GSAP's rendering ticker.
2. **GSAP ScrollTrigger Reveal Animations**:
   - Smooth `clip-path` wipe and gentle zoom entrance on each portfolio slide as it scrolls into viewport.
   - Staggered caption and metadata reveals.
   - Dynamic slide indicator tracking on the right-hand pagination rail.
3. **Interactive High-Resolution Lightbox**:
   - Click any slide or the **"Inspect High-Res"** button to open the full-screen inspector.
   - Controls: Zoom In (`+`), Zoom Out (`-`), Reset (`1:1`), Previous/Next slide arrows, and `Esc` to close.
   - Inspect typography kerning, color gradients, and textures at 100% sharpness.
4. **Procedural Ambient Atmosphere (Web Audio API)**:
   - Click the sound toggle in the top navbar to enable a subtle, warm, luxury ambient harmonic tone.
   - Procedurally synthesized directly by the browser — no audio files needed.
5. **Interactive Header & Navigation**:
   - Quick jump pills for each of the 6 slides (`Cover`, `About`, `Contact`, `Index`, `Social`, `Campaigns`).
   - Top dynamic scroll progress bar.
   - Fullscreen presentation mode toggle.
6. **Direct Contact Quick-Actions**:
   - One-click copy email (`kchopra9484@gmail.com`) with instant feedback toast.
   - Direct call link (`+91 6232629208`).
   - Direct WhatsApp conversation link.

---

## 📁 Project Structure

```
portfolio jj/
├── index.html              # Main HTML entry point
├── portfolio-bundle.js     # React 18 + GSAP + Lenis production bundle
├── server.js               # Zero-dependency local Node server
├── preview.bat             # One-click Windows launcher
├── package.json            # Vite + React dependencies configuration
├── vite.config.js          # Vite config
├── JJ/                     # Original 6 portfolio slides (1920x1080)
│   ├── 1.png / 1.jpg       # 01 - Portfolio Cover (Karan Chopra)
│   ├── 2.png / 2.jpg       # 02 - About & Philosophy (Creativity with Intention)
│   ├── 3.png / 3.jpg       # 03 - Tools & Direct Contact
│   ├── 4.png / 4.jpg       # 04 - Table of Content (5 Service Categories)
│   ├── 5.png / 5.jpg       # 05 - Social Media Designing Case Study
│   └── 6.png / 6.jpg       # 06 - Designing for Education Brands Case Study
├── public/                 # Static assets for Vite
│   └── JJ/                 # Portfolio slides mirror
└── src/                    # Source React application
    ├── main.jsx            # React root mount
    ├── App.jsx             # Core application layout & GSAP triggers
    ├── index.css           # Cinematic luxury dark stylesheet
    ├── components/
    │   ├── Navbar.jsx          # Header with branding and controls
    │   ├── SlideCard.jsx       # 16:9 presentation frame for each slide
    │   ├── SlidePagination.jsx # Right-side vertical navigation rail
    │   ├── Lightbox.jsx        # Fullscreen high-resolution inspection modal
    │   └── ContactFooter.jsx   # Closing section with direct contact options
    ├── data/
    │   └── portfolioData.js    # Slide metadata & contact details
    └── utils/
        └── audio.js            # Web Audio API ambient sound generator
```
