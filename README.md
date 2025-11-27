# Iridescent Portfolio

A modern, high-performance personal portfolio website built with React, showcasing a glassmorphism aesthetic, 3D interactive elements, and seamless page transitions.

🌐 **Live Demo:** [yahyah-odin.is-a.dev](https://yahyah-odin.is-a.dev)

## Features

* **Bento Grid Layout:** A responsive, modular grid system for the landing page.
* **Iridescent Theme:** Custom light/dark mode with "Planet Her" inspired gradients and glassmorphism effects.
* **Interactive 3D Background:** Procedural particle system using Three.js that reacts to mouse movement.
* **Seamless Animations:** Page transitions and micro-interactions powered by Framer Motion.
* **Project Lightbox:** A custom modal system for viewing project details and high-res galleries with zoom/pan support.
* **Optimized Performance:** Lazy loading, WebP assets, and GPU-accelerated animations.

## Tech Stack

* **Framework:** React + Vite
* **Language:** TypeScript
* **Styling:** Material UI (MUI) + Emotion
* **Animation:** Framer Motion
* **3D Graphics:** Three.js + React Three Fiber
* **Routing:** React Router DOM

## Running Locally

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yyaahhzxc/portfolio.git](https://github.com/yyaahhzxc/portfolio.git)
    cd portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

## Project Structure

* `/components` - Reusable UI components (BentoGrid, NavBar, Footer, etc.)
* `/pages` - Main route views (Home, ProjectList, CV)
* `/public` - Static assets (Images, PDFs, CNAME)
* `theme.ts` - Custom MUI theme definitions

## License

This project is open source and available under the [MIT License](LICENSE).
