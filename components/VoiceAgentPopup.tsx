'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX } from 'lucide-react'
import { LiveKitRoom, RoomAudioRenderer, useVoiceAssistant, BarVisualizer } from '@livekit/components-react'
import '@livekit/components-styles'

interface VoiceAgentPopupProps {
  isOpen: boolean
  onClose: () => void
}

function VoiceAssistantUI() {
  const { state, audioTrack } = useVoiceAssistant()
  
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      {/* Agent Status */}
      <div className="text-center space-y-2">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto ${
          state === 'listening' ? 'bg-red-500 animate-pulse' :
          state === 'thinking' ? 'bg-yellow-500 animate-pulse' :
          state === 'speaking' ? 'bg-green-500 animate-pulse' :
          'bg-blue-500'
        }`}>
          <Mic className="w-12 h-12 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800">
          {state === 'listening' ? 'Listening...' :
           state === 'thinking' ? 'Thinking...' :
           state === 'speaking' ? 'Speaking...' :
           'Ready to assist'}
        </h3>
        
        <p className="text-sm text-gray-600">
          Sanjeevan AI Health Assistant
        </p>
      </div>

      {/* Audio Visualizer */}
      {audioTrack && (
        <div className="w-full max-w-md">
          <BarVisualizer
            state={state}
            barCount={5}
            trackRef={audioTrack}
            className="h-16"
          />
        </div>
      )}

      {/* Status Message */}
      <div className="text-center text-sm text-gray-500 max-w-md">
        {state === 'connecting' && 'Connecting to voice assistant...'}
        {state === 'listening' && 'Speak now, I\'m listening to your health concerns'}
        {state === 'thinking' && 'Analyzing your query with AI...'}
        {state === 'speaking' && 'Providing personalized health guidance'}
      </div>
    </div>
  )
}

export default function VoiceAgentPopup({ isOpen, onClose }: VoiceAgentPopupProps) {
  const [connectionDetails, setConnectionDetails] = useState<{ token: string; url: string } | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && !connectionDetails) {
      connectToAgent()
    }
  }, [isOpen])

  const connectToAgent = async () => {
    setIsConnecting(true)
    setError(null)
    
    try {
      // Get connection token from your backend
      const response = await fetch('/api/livekit-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomName: `health-session-${Date.now()}`,
          participantName: 'User',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get connection token')
      }

      const data = await response.json()
      setConnectionDetails({
        token: data.token,
        url: data.url,
      })
    } catch (err) {
      console.error('Error connecting to agent:', err)
      setError('Failed to connect to voice assistant. Please try again.')
    } finally {
      setIsConnecting(false)
    }
  }

  const handleClose = () => {
    setConnectionDetails(null)
    setError(null)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Voice Health Assistant</h2>
                    <p className="text-white/80 text-sm">AI-Powered Health Consultation</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 h-[500px]">
              {isConnecting && (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-600">Connecting to voice assistant...</p>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center justify-center h-full space-y-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <PhoneOff className="w-8 h-8 text-red-500" />
                  </div>
                  <p className="text-red-600 text-center">{error}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={connectToAgent}
                    className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    Try Again
                  </motion.button>
                </div>
              )}

              {connectionDetails && !error && (
                <LiveKitRoom
                  token={connectionDetails.token}
                  serverUrl={connectionDetails.url}
                  connect={true}
                  audio={true}
                  video={false}
                  className="h-full"
                >
                  <VoiceAssistantUI />
                  <RoomAudioRenderer />
                </LiveKitRoom>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Real-time Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span>Secure & Private</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
