'use client'

import { motion } from 'framer-motion'

interface Simple3DModelProps {
  className?: string
}

export default function Simple3DModel({ className = '' }: Simple3DModelProps) {
  return (
    <div className={`w-full h-full overflow-visible ${className}`}>
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg relative">
        {/* Animated DNA-like structure */}
        <div className="relative w-32 h-32">
          {/* Central helix */}
          <motion.div
            className="absolute inset-0 border-2 border-purple-300 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Outer helix */}
          <motion.div
            className="absolute inset-2 border-2 border-blue-300 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner helix */}
          <motion.div
            className="absolute inset-4 border-2 border-pink-300 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full"
              style={{
                top: `${20 + (i * 15)}%`,
                left: `${20 + (i * 10)}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-200 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Text overlay */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-gray-600 font-medium text-sm">Interactive 3D Model</p>
          <p className="text-gray-500 text-xs mt-1">AI-Powered Health Diagnostics</p>
        </div>
      </div>
    </div>
  )
}
