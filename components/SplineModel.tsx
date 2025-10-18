'use client'

import { Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Spline to avoid SSR issues
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-sanjeevan-purple border-t-transparent"></div>
    </div>
  )
})

interface SplineModelProps {
  className?: string
}

export default function SplineModel({ className = '' }: SplineModelProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  return (
    <div className={`w-full h-full overflow-visible ${className}`}>
      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-sanjeevan-purple border-t-transparent"></div>
        </div>
      }>
        <Spline
          scene="https://prod.spline.design/g6Cyyp4g2YX2RfTD/scene.splinecode"
          onLoad={handleLoad}
          className="w-full h-full"
          style={{ 
            background: 'transparent',
            overflow: 'visible',
            maxWidth: 'none',
            maxHeight: 'none',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center'
          }}
        />
      </Suspense>
    </div>
  )
}
