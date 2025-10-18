'use client'

import { motion } from 'framer-motion'
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
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      {/* Main content - Centered */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12 md:space-y-16">
          
          {/* Sanjeevan Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          >
            <h1 className="font-playfair font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-sanjeevan-purple mb-4">
              Sanjeevan
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="font-inter font-medium text-sm sm:text-base uppercase tracking-[0.2em] text-sanjeevan-purple mb-8">
              AI-Powered Health Diagnostics
            </div>
          </motion.div>

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black leading-[0.9] tracking-tight">
              Advanced,<br />
              Accessible and<br />
              Precise Medical<br />
              <span className="text-sanjeevan-purple">Intelligence</span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          >
            <p className="font-inter text-lg sm:text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
              Transforming Healthcare.<br />
              Intelligently.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.7, ease: 'easeOut' }}
          >
            <button
              onClick={handleDemoClick}
              className="group relative inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 bg-sanjeevan-purple text-white font-inter font-medium text-sm sm:text-base uppercase tracking-wider transition-all duration-300 hover:bg-sanjeevan-dark-purple hover:scale-[1.02] active:scale-[0.98] rounded-sm"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-sm"></div>
            </button>
          </motion.div>

          {/* Status indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-12 pt-8 sm:pt-12"
          >
            <div className="flex items-center space-x-3 text-sm sm:text-base text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
              <span className="font-inter">AI-Powered Analysis</span>
            </div>
            <div className="flex items-center space-x-3 text-sm sm:text-base text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
              <span className="font-inter">Real-time Processing</span>
            </div>
            <div className="flex items-center space-x-3 text-sm sm:text-base text-gray-500">
              <div className="w-2 h-2 bg-sanjeevan-purple rounded-full flex-shrink-0"></div>
              <span className="font-inter">Secure & Compliant</span>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
