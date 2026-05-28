# ⚡ Yashodip Sinha — High-Tech Interactive Portfolio

Welcome to my personal, high-tech interactive portfolio! This website is a premium, futuristic, and highly animated digital showcase designed with a custom **cyberpunk theme, hardware-accelerated canvas background, and rich fluid animations**. It features interactive custom layers that adapt dynamically from desktops to mobile screens.

🔗 **Live Link**: [yashodip.vercel.app](https://yashodip.vercel.app/)

---

## 🚀 High-Tech Features

### 🌌 1. Cyber-Circuit & Matrix Rain Canvas Background
* **Generative Circuit Traces**: An optimized HTML5 Canvas render loop generates structural circuit traces that crawl horizontally, vertically, and diagonally along a clean layout grid.
* **Byte Particles & Glowing Pulses**: completed traces host fast-moving light pulses equipped with glowing canvas shadow blurs.
* **Matrix Binary Rain**: A vertical waterfall cascade of flowing `0`s and `1`s blends behind your content with custom falling rates.
* **Fading Motion Blur Trails**: Every element fades with custom semi-transparent overlays (`rgba(5, 1, 8, 0.12)`) producing premium organic motion blur trails.
* **Interactive Cursor Glow**: Subtle reactive rings expand in the background canvas as your cursor moves, producing real-time feedback.

### 🎭 2. Fluid GSAP (GreenSock) Animations
* **Instant Direct Reveal**: Completely optimized loading experience! Bypasses boring progress bars to run a seamless GSAP hero animation timeline immediately upon page load.
* **ScrollTriggered Animations**: Section elements (labels, headers, text cards) reveal, slide, and scale beautifully only when scrolled into viewport.
* **Text Scramble Effect**: Modern visual "hacking/scrambling" terminal decoding effect triggers automatically on section headers when scrolled into view.
* **Magnetic Buttons**: Eye-catching physical pull reactions on CTAs and interactive pills that lock dynamically to your cursor.
* **3D Mouse Parallax & Tilt**: 
  - Dynamic 3D depth parallax on the background glowing elements.
  - Smooth 3D tilt transformations on project bento cards and your avatar photo frame on mouse-over.

### 📱 3. Responsive & Mobile-First Architecture
* **Canvas Auto-Scaling**: The canvas automatically resizes to full window height/width and scales columns cleanly on portrait mobile screens.
* **Touch Device Detection**: The custom cursor automatically hides on touchscreen devices (`pointer: coarse`) to guarantee standard mobile accessibility.
* **Polished Mobile Drawer Menu**: A fully responsive overlay slide menu staggered with GSAP entry animations.

---

## 🛠️ Built With

* **Core**: Vanilla HTML5, Advanced CSS3, and ES6 JavaScript.
* **Vite**: Ultra-fast frontend tooling for development, hot-reloading, and production bundling.
* **GSAP (GreenSock)**: The core animation suite, including:
  * `ScrollTrigger` for timeline scrolling triggers.
  * `TextPlugin` for typing and erasing animations.
  * `ScrollToPlugin` for premium easing anchor navigation.
* **Remix Icons**: High-quality, modern, lightweight developer icons.
* **Typography**: Modern Google Fonts pairing — `Syne` (for headers), `Inter` (for readability), and `Space Grotesk` (for code details).

---

## 💻 Local Development Setup

To run this project locally on your machine, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/Yashodip2802/YashodipPortfolio.git
cd YashodipPortfolio
```

### 2. Install Dependencies
Make sure you have [Node.js](https://nodejs.org/) installed. Run:
```bash
npm install
```

### 3. Start Development Server
Run the local Vite hot-reloading dev server:
```bash
npm run dev
```
Open **http://localhost:5173/** in your browser to view the live workspace.

### 4. Build for Production
Generate a highly optimized production bundle inside the `dist/` directory:
```bash
npm run build
```

---

## 🌐 Deploying to Vercel

This repository is optimized for one-click, continuous deployment on **Vercel**:

1. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
2. Import the `YashodipPortfolio` repository directly from your GitHub account.
3. Keep default settings (Vercel automatically detects the Vite config and uses `npm run build` with `dist` output).
4. Click **Deploy**. Any future commits you push directly to the `main` branch will automatically trigger Vercel to rebuild and update your live site instantly!
