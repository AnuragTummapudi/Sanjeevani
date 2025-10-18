# Sanjeevan Landing Page

A modern, interactive React landing page for Sanjeevan - AI-Powered Health Diagnostics, featuring a 3D Spline model and smooth animations.

## Features

- 🎨 **Modern Design**: Clean, minimalist design with white background and subtle dot pattern
- 🧬 **3D DNA Model**: Interactive Spline 3D model integrated using React
- ✨ **Smooth Animations**: Framer Motion animations throughout the site
- 📱 **Responsive**: Fully responsive design for all devices
- 🎯 **Interactive Elements**: Hover effects, floating animations, and particle effects
- 🎭 **Typewriter Effect**: Dynamic text animations
- 🌟 **Particle System**: Floating particles for enhanced visual appeal

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Spline** - 3D models
- **React Spline** - Spline integration

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
UI/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page component
├── components/
│   ├── SplineModel.tsx      # 3D model component
│   ├── InteractiveButton.tsx # Animated button
│   ├── AnimatedText.tsx     # Text animations
│   └── FloatingElements.tsx # Floating animations
├── package.json
├── tailwind.config.js
└── next.config.js
```

## Components

### SplineModel
- Handles the 3D DNA model integration
- Includes loading states and error handling
- Dynamic import for better performance

### InteractiveButton
- Animated CTA button with hover effects
- Multiple variants (primary/secondary)
- Smooth transitions and feedback

### AnimatedText
- Text animations with customizable delays
- Typewriter effect for dynamic text
- Smooth fade-in animations

### FloatingElements
- Floating animations for visual elements
- Particle system for background effects
- Configurable timing and behavior

## Customization

- **Colors**: Modify colors in `tailwind.config.js`
- **Fonts**: Update font imports in `layout.tsx`
- **Animations**: Adjust timing in component files
- **Spline Model**: Change the scene URL in `SplineModel.tsx`

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Notes

- The Spline model is dynamically imported to prevent SSR issues
- Animations are optimized for 60fps
- Images and assets are optimized for web delivery

## Deployment

For production deployment:

```bash
npm run build
npm start
```

Or deploy to Vercel, Netlify, or any other hosting platform that supports Next.js.
