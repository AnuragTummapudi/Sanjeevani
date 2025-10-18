'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Activity,
  Heart,
  Droplets,
  Thermometer,
  Zap
} from 'lucide-react'

interface GoogleFitData {
  heartRate: number
  steps: number
  calories: number
  distance: number
  activeMinutes: number
  sleepHours: number
  lastSync: string
  deviceInfo: {
    name: string
    type: string
    batteryLevel: number
  }
}

interface GoogleFitIntegrationProps {
  onDataReceived: (data: GoogleFitData) => void
  isConnected: boolean
  onConnectionChange: (connected: boolean) => void
}

export default function GoogleFitIntegration({ 
  onDataReceived, 
  isConnected, 
  onConnectionChange 
}: GoogleFitIntegrationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [lastSync, setLastSync] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle')

  // Google Fit API configuration
  const GOOGLE_FIT_CONFIG = {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_FIT_CLIENT_ID || 'your-google-fit-client-id',
    scopes: [
      'https://www.googleapis.com/auth/fitness.activity.read',
      'https://www.googleapis.com/auth/fitness.body.read',
      'https://www.googleapis.com/auth/fitness.heart_rate.read',
      'https://www.googleapis.com/auth/fitness.sleep.read'
    ]
  }

  // Initialize Google Fit connection
  const initializeGoogleFit = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      console.log('🔗 Initializing Google Fit connection...')
      
      // Check if Google Fit API is available
      if (typeof window !== 'undefined' && window.gapi) {
        await window.gapi.load('client:auth2', async () => {
          await window.gapi.client.init({
            clientId: GOOGLE_FIT_CONFIG.clientId,
            scope: GOOGLE_FIT_CONFIG.scopes.join(' ')
          })
          
          const authInstance = window.gapi.auth2.getAuthInstance()
          const isSignedIn = authInstance.isSignedIn.get()
          
          if (isSignedIn) {
            console.log('✅ Google Fit already connected')
            onConnectionChange(true)
            await fetchGoogleFitData()
          } else {
            console.log('🔐 Google Fit not connected, initiating OAuth...')
            await signInToGoogleFit()
          }
        })
      } else {
        // Fallback: Use our API endpoint for Google Fit data
        console.log('📱 Using API endpoint for Google Fit data...')
        await fetchGoogleFitDataViaAPI()
      }
    } catch (error) {
      console.error('❌ Google Fit initialization error:', error)
      setError('Failed to connect to Google Fit')
      onConnectionChange(false)
    } finally {
      setIsLoading(false)
    }
  }

  // Sign in to Google Fit
  const signInToGoogleFit = async () => {
    try {
      const authInstance = window.gapi.auth2.getAuthInstance()
      const user = await authInstance.signIn()
      
      if (user.isSignedIn()) {
        console.log('✅ Successfully signed in to Google Fit')
        onConnectionChange(true)
        await fetchGoogleFitData()
      }
    } catch (error) {
      console.error('❌ Google Fit sign-in error:', error)
      setError('Failed to sign in to Google Fit')
    }
  }

  // Fetch data directly from Google Fit API
  const fetchGoogleFitData = async () => {
    try {
      setSyncStatus('syncing')
      console.log('📊 Fetching data from Google Fit...')
      
      const today = new Date()
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
      
      // Fetch heart rate data
      const heartRateResponse = await window.gapi.client.fitness.users.dataSources.datasets.get({
        userId: 'me',
        dataSourceId: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
        datasetId: `${yesterday.getTime() * 1000000}-${today.getTime() * 1000000}`
      })
      
      // Fetch steps data
      const stepsResponse = await window.gapi.client.fitness.users.dataSources.datasets.get({
        userId: 'me',
        dataSourceId: 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
        datasetId: `${yesterday.getTime() * 1000000}-${today.getTime() * 1000000}`
      })
      
      // Process the data
      const heartRateData = heartRateResponse.result.point || []
      const stepsData = stepsResponse.result.point || []
      
      const latestHeartRate = heartRateData.length > 0 
        ? heartRateData[heartRateData.length - 1].value[0].fpVal 
        : 72
      
      const totalSteps = stepsData.reduce((sum: number, point: any) => 
        sum + (point.value[0]?.intVal || 0), 0
      )
      
      const fitData: GoogleFitData = {
        heartRate: Math.round(latestHeartRate),
        steps: totalSteps,
        calories: Math.round(totalSteps * 0.04), // Approximate calories
        distance: Math.round(totalSteps * 0.0008), // Approximate km
        activeMinutes: Math.round(totalSteps / 100), // Approximate active minutes
        sleepHours: 7.5, // Default sleep hours
        lastSync: new Date().toISOString(),
        deviceInfo: {
          name: 'Firebolt Watch (via DaFit)',
          type: 'smartwatch',
          batteryLevel: 85
        }
      }
      
      console.log('✅ Google Fit data received:', fitData)
      onDataReceived(fitData)
      setLastSync(new Date())
      setSyncStatus('success')
      
    } catch (error) {
      console.error('❌ Google Fit data fetch error:', error)
      setError('Failed to fetch data from Google Fit')
      setSyncStatus('error')
    }
  }

  // Fetch data via our API endpoint (fallback)
  const fetchGoogleFitDataViaAPI = async () => {
    try {
      setSyncStatus('syncing')
      console.log('📊 Fetching Google Fit data via API...')
      
      const response = await fetch('/api/google-fit-data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Google Fit data received via API:', data)
        onDataReceived(data)
        setLastSync(new Date())
        setSyncStatus('success')
        onConnectionChange(true)
      } else {
        throw new Error('API request failed')
      }
    } catch (error) {
      console.error('❌ Google Fit API error:', error)
      setError('Failed to fetch data from Google Fit API')
      setSyncStatus('error')
    }
  }

  // Manual sync
  const handleManualSync = async () => {
    if (isConnected) {
      await fetchGoogleFitData()
    } else {
      await initializeGoogleFit()
    }
  }

  // Auto-sync every 5 minutes
  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        fetchGoogleFitData()
      }, 5 * 60 * 1000) // 5 minutes
      
      return () => clearInterval(interval)
    }
  }, [isConnected])

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isConnected ? 'bg-green-100' : 'bg-gray-100'
          }`}>
            {isConnected ? (
              <Wifi className="w-5 h-5 text-green-600" />
            ) : (
              <WifiOff className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Google Fit Integration
            </h3>
            <p className="text-sm text-gray-500">
              Firebolt Watch → DaFit App → Google Fit
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {syncStatus === 'syncing' && (
            <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
          )}
          {syncStatus === 'success' && (
            <CheckCircle className="w-4 h-4 text-green-500" />
          )}
          {syncStatus === 'error' && (
            <AlertCircle className="w-4 h-4 text-red-500" />
          )}
        </div>
      </div>

      {/* Connection Status */}
      <div className="mb-6">
        <div className={`p-4 rounded-lg border ${
          isConnected 
            ? 'bg-green-50 border-green-200' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
            <div>
              <p className={`text-sm font-medium ${
                isConnected ? 'text-green-800' : 'text-gray-600'
              }`}>
                {isConnected ? 'Connected to Google Fit' : 'Not Connected'}
              </p>
              <p className="text-xs text-gray-500">
                {isConnected 
                  ? 'Real-time data from your Firebolt watch' 
                  : 'Click connect to sync with Google Fit'
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Device Info */}
      {isConnected && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Connected Device</h4>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Activity className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Firebolt Watch</p>
              <p className="text-xs text-gray-500">Connected via DaFit App</p>
            </div>
            <div className="ml-auto">
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-green-500" />
                <span className="text-xs text-gray-500">85%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Last Sync */}
      {lastSync && (
        <div className="mb-6">
          <p className="text-xs text-gray-500">
            Last sync: {lastSync.toLocaleString()}
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleManualSync}
          disabled={isLoading}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isConnected
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-sanjeevan-purple text-white hover:bg-sanjeevan-dark-purple'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Connecting...</span>
            </>
          ) : isConnected ? (
            <>
              <RefreshCw className="w-4 h-4" />
              <span>Sync Now</span>
            </>
          ) : (
            <>
              <Wifi className="w-4 h-4" />
              <span>Connect to Google Fit</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Instructions */}
      {!isConnected && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-800 mb-2">
            Setup Instructions:
          </h4>
          <ol className="text-xs text-yellow-700 space-y-1">
            <li>1. Ensure your Firebolt watch is connected to DaFit app</li>
            <li>2. Make sure DaFit app is syncing with Google Fit</li>
            <li>3. Click "Connect to Google Fit" above</li>
            <li>4. Authorize access to your health data</li>
          </ol>
        </div>
      )}
    </div>
  )
}
