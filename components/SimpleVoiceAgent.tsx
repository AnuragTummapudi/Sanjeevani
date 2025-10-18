'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { X, Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX, Send } from 'lucide-react'

interface SimpleVoiceAgentProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  type: 'welcome' | 'response' | 'error' | 'user'
  message: string
  timestamp: string
}

export default function SimpleVoiceAgent({ isOpen, onClose }: SimpleVoiceAgentProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const wsRef = useRef<WebSocket | null>(null)
  const recognitionRef = useRef<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && !isConnected) {
      connectToAgent()
    }
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputText(transcript)
        sendMessage(transcript)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const connectToAgent = () => {
    setIsConnecting(true)
    setError(null)
    
    try {
      const ws = new WebSocket('ws://localhost:8765')
      wsRef.current = ws

      ws.onopen = () => {
        console.log('Connected to voice agent')
        setIsConnected(true)
        setIsConnecting(false)
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          setMessages(prev => [...prev, data])
          
          // Auto-speak AI responses
          if (data.type === 'response') {
            speakResponse(data.message)
          }
        } catch (err) {
          console.error('Error parsing message:', err)
        }
      }

      ws.onclose = () => {
        console.log('Disconnected from voice agent')
        setIsConnected(false)
        setIsConnecting(false)
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setError('Failed to connect to voice agent. Make sure the agent is running.')
        setIsConnecting(false)
      }
    } catch (err) {
      console.error('Error connecting:', err)
      setError('Failed to connect to voice agent.')
      setIsConnecting(false)
    }
  }

  const sendMessage = (text: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && text.trim()) {
      const message = {
        type: 'query',
        message: text.trim(),
        user_id: 'user_001',
        timestamp: new Date().toISOString()
      }
      
      wsRef.current.send(JSON.stringify(message))
      
      // Add user message to UI
      setMessages(prev => [...prev, {
        type: 'user',
        message: text.trim(),
        timestamp: new Date().toISOString()
      }])
      
      setInputText('')
    }
  }

  const handleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      recognitionRef.current?.start()
      setIsListening(true)
    }
  }

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        speechSynthesis.cancel()
        setIsSpeaking(false)
      } else {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.onend = () => setIsSpeaking(false)
        utterance.onstart = () => setIsSpeaking(true)
        speechSynthesis.speak(utterance)
      }
    }
  }

  const handleClose = () => {
    if (wsRef.current) {
      wsRef.current.close()
    }
    setMessages([])
    setError(null)
    onClose()
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
                    <p className="text-white/80 text-sm">
                      {isConnecting ? 'Connecting...' : 
                       isConnected ? 'Connected' : 
                       'Disconnected'}
                    </p>
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
            <div className="p-6 h-[500px] flex flex-col">
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

              {isConnected && !error && (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] p-3 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <p className="text-sm">{message.message}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs opacity-70">
                              {formatTime(message.timestamp)}
                            </span>
                            {message.type !== 'user' && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => speakResponse(message.message)}
                                className="ml-2 p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                {isSpeaking ? (
                                  <VolumeX className="w-3 h-3 text-gray-600" />
                                ) : (
                                  <Volume2 className="w-3 h-3 text-gray-600" />
                                )}
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 relative">
                        <input
                          type="text"
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
                          placeholder="Type your health question or use voice..."
                          className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleVoiceInput}
                          className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors ${
                            isListening 
                              ? 'bg-red-100 text-red-600' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </motion.button>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => sendMessage(inputText)}
                        disabled={!inputText.trim()}
                        className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>Press Enter to send</span>
                      <span>Click mic for voice input</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    isConnected ? 'bg-green-500' : 'bg-gray-400'
                  }`}></div>
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
