'use client'

import { Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Simple3DModel from './Simple3DModel'

// Fallback component for when Spline fails to load
const SplineFallback = () => <Simple3DModel />

// Dynamically import Spline to avoid SSR issues with better error handling
const Spline = dynamic(() => import('@splinetool/react-spline').catch((error) => {
  console.warn('Spline failed to load:', error)
  return { default: SplineFallback }
}), {
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
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  // If there's an error, show fallback
  if (hasError) {
    return <Simple3DModel className={className} />
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
          onError={handleError}
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
