'use client'

import { motion } from 'framer-motion'
import SplineModel from '../components/SplineModel'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleDemoClick = () => {
    router.push('/login')
  }

  return (
    <main className="min-h-screen relative overflow-x-hidden overflow-y-visible">
      {/* Sanjeevan Title - Top Center */}
      <div className="absolute top-4 sm:top-6 md:top-8 left-1/2 transform -translate-x-1/2 z-20 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="font-playfair font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-sanjeevan-purple text-center"
        >
          Sanjeevan
        </motion.h1>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center min-h-screen pt-16 sm:pt-20 md:pt-24">
          
          {/* Left side - Content */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 max-w-2xl order-2 lg:order-1">
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-2"
            >
              <div className="font-inter font-medium text-xs sm:text-sm uppercase tracking-[0.2em] text-sanjeevan-purple">
                AI-Powered Health Diagnostics
              </div>
            </motion.div>

            {/* Main title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="space-y-4 sm:space-y-6"
            >
              <h1 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-black leading-[0.9] tracking-tight">
                Advanced,<br />
                Accessible and<br />
                Precise Medical<br />
                <span className="text-sanjeevan-purple">Intelligence</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              <p className="font-inter text-lg sm:text-xl md:text-2xl text-gray-600 font-light leading-relaxed">
                Transforming Healthcare.<br />
                Intelligently.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            >
              <button
                onClick={handleDemoClick}
                className="group relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-sanjeevan-purple text-white font-inter font-medium text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 hover:bg-sanjeevan-dark-purple hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
            </motion.div>

            {/* Status indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6 md:pt-8"
            >
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span className="font-inter">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                <span className="font-inter">Real-time Processing</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-500">
                <div className="w-2 h-2 bg-sanjeevan-purple rounded-full flex-shrink-0"></div>
                <span className="font-inter">Secure & Compliant</span>
              </div>
            </motion.div>
          </div>

          {/* Right side - Spline Model */}
          <motion.div
            className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[800px] overflow-visible order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          >
            <div className="w-full h-full overflow-visible relative">
              <SplineModel className="w-full h-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
