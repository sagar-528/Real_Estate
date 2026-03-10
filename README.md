# 🏡 Primevest — Real Estate Investment Platform

> A premium real estate investment landing page built with Next.js 14, TypeScript, and GSAP animations.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📸 Preview

A fully responsive real estate investment website featuring scroll-triggered animations, a video hero banner, animated statistics, and a modern glassmorphism UI.

---

## ✨ Features

- 🎬 **Video Hero Banner** — Full-screen background video with animated headline and CTA
- 🔢 **Animated Stats Counter** — Count-up animations for key metrics (properties, clients, ROI)
- 👥 **Team Section** — Agent profile cards with react-slick carousel on mobile
- 📋 **Contact Form** — Fully validated form with real-time error handling
- 🌀 **Page Loader** — Smooth GSAP-powered entry animation
- 📱 **Fully Responsive** — Optimized for all screen sizes
- ⚡ **Scroll Animations** — GSAP ScrollTrigger for section reveals

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe development |
| [GSAP](https://greensock.com/gsap/) | Animations & scroll triggers |
| [react-slick](https://react-slick.neostack.com/) | Carousel / slider component |
| Vanilla CSS | Custom design system with CSS variables |

---

## 📁 Project Structure

```
primevest/
├── public/
│   └── video/
│       └── Screen-Recording.mp4     # Hero background video
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout & metadata
│   │   └── page.tsx                 # Main page (all sections assembled)
│   ├── components/
│   │   ├── Header.tsx               # Sticky navigation bar
│   │   ├── Loader.tsx               # Animated page loader
│   │   ├── HeroBanner.tsx           # Full-screen video hero
│   │   ├── AboutSection.tsx         # Company overview
│   │   ├── InfoSection.tsx          # Property highlights
│   │   ├── StatsSection.tsx         # Animated metrics counter
│   │   ├── InvestmentApproach.tsx   # Step-by-step process
│   │   ├── TeamSection.tsx          # Team member profiles
│   │   ├── ContactForm.tsx          # Validated contact form
│   │   └── Footer.tsx               # Footer with links
│   └── styles/
│       └── globals.css              # Global CSS design tokens
├── .gitignore
├── next.config.mjs
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `18+`
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:sagar-528/Real_Estate.git
cd Real_Estate

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at `localhost:3000` |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint checks |

---

## 🗂️ Component Overview

### `Header`
Sticky top navigation with logo, nav links, and a prominent CTA button. Transitions on scroll.

### `Loader`
Animated loading screen using GSAP timelines. Plays once on initial page load, then reveals the main content with a smooth transition.

### `HeroBanner`
Full-viewport hero section with autoplay muted video background. Features animated headline and sub-headline using GSAP with staggered entrance effects.

### `AboutSection`
Company mission and overview section with image and rich text layout. Scroll-triggered slide-in animation.

### `InfoSection`
Highlights key property features and investment details in a responsive grid card layout.

### `StatsSection`
Displays key metrics (e.g., properties sold, happy clients, average ROI) with GSAP count-up animations triggered on scroll.

### `InvestmentApproach`
Step-by-step breakdown of the investment process using numbered cards with hover effects.

### `TeamSection`
Showcases team members with profile cards. Includes a `react-slick` carousel for mobile viewports.

### `ContactForm`
Functional contact form with fields for name, email, phone, and message. Includes client-side validation and animated submission feedback.

### `Footer`
Brand footer with quick links, social media icons, and copyright info.

---

## 🎨 Design System

The project uses a custom CSS design system with:

- **CSS Custom Properties** for all colors, spacing, and typography
- **Fluid Typography** scaling across screen sizes
- **Glassmorphism** effects on key UI cards
- **Smooth gradients** and hover micro-animations throughout

---

## 📅 Changelog

| Date | Update |
|---|---|
| Feb 08, 2026 | Project initialized with Next.js 14 + TypeScript |
| Feb 10, 2026 | Global CSS design system & root layout |
| Feb 13, 2026 | Header + Loader components |
| Feb 17, 2026 | Hero Banner with video background |
| Feb 20, 2026 | About & Info sections |
| Feb 24, 2026 | Stats counter + Investment Approach |
| Feb 27, 2026 | Team section with carousel |
| Mar 03, 2026 | Contact Form + Footer |
| Mar 05, 2026 | Full page assembly & integration |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/sagar-528">Sagar</a>
</div>