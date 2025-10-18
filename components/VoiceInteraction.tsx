'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff, Settings, Bot } from 'lucide-react'

interface VoiceInteractionProps {
  isOpen: boolean
  onClose: () => void
  onMinimize?: () => void
  isMinimized?: boolean
}

export default function VoiceInteraction({ isOpen, onClose, onMinimize, isMinimized = false }: VoiceInteractionProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = 'en-US'

        recognitionRef.current.onstart = () => {
          setIsListening(true)
        }

        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join('')
          setTranscript(transcript)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }
      }

      // Initialize speech synthesis
      synthRef.current = window.speechSynthesis
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('')
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const speak = (text: string) => {
    if (synthRef.current && !isMuted) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.volume = volume / 100
      utterance.rate = 0.9
      utterance.pitch = 1

      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)

      synthRef.current.speak(utterance)
    }
  }

  const handleVoiceCommand = async () => {
    if (!transcript.trim()) return

    try {
      // Send transcript to AI chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{
            text: transcript,
            sender: 'user'
          }]
        })
      })

      const data = await response.json()
      setResponse(data.message || 'I heard you, but I need a moment to process that.')
      
      // Speak the response
      speak(data.message || 'I heard you, but I need a moment to process that.')
    } catch (error) {
      console.error('Error processing voice command:', error)
      const errorResponse = 'I apologize, but I encountered an error processing your request.'
      setResponse(errorResponse)
      speak(errorResponse)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (synthRef.current && isSpeaking) {
      synthRef.current.cancel()
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className={`fixed bottom-4 left-4 z-50 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
      } transition-all duration-300 ease-in-out`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden h-full flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">Voice Assistant</h3>
              <p className="text-xs opacity-80">Speak with Sanjeevan AI</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {onMinimize && (
              <button
                onClick={onMinimize}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <PhoneOff className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Status */}
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm text-gray-600">
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className={`p-2 rounded-lg transition-colors ${
                      isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">Vol</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Controls */}
            <div className="flex-1 p-6 flex flex-col items-center justify-center space-y-6">
              {/* Main Voice Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isListening ? stopListening : startListening}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                    : 'bg-blue-500 hover:bg-blue-600'
                } shadow-lg`}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8 text-white" />
                ) : (
                  <Mic className="w-8 h-8 text-white" />
                )}
              </motion.button>

              {/* Status Text */}
              <div className="text-center">
                <p className="text-lg font-medium text-gray-900">
                  {isListening ? 'Listening...' : 'Tap to speak'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {isListening ? 'Speak your health question' : 'Ask about your health'}
                </p>
              </div>

              {/* Transcript */}
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full bg-gray-100 rounded-lg p-4"
                >
                  <p className="text-sm text-gray-700 mb-2">You said:</p>
                  <p className="text-gray-900 font-medium">{transcript}</p>
                  <button
                    onClick={handleVoiceCommand}
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    Process Command
                  </button>
                </motion.div>
              )}

              {/* AI Response */}
              {response && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full bg-blue-50 rounded-lg p-4"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 mb-2">AI Response:</p>
                      <p className="text-gray-900">{response}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Commands */}
              <div className="w-full">
                <p className="text-sm text-gray-500 mb-2">Try saying:</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "What's my blood pressure?",
                    "Tell me about my medications",
                    "When is my next appointment?",
                    "I'm feeling unwell"
                  ].map((command, index) => (
                    <button
                      key={index}
                      onClick={() => setTranscript(command)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs text-gray-700 transition-colors"
                    >
                      {command}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}
