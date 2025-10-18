'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { 
  Mic, MicOff, PhoneOff, Volume2, VolumeX, Loader, MessageCircle, 
  Phone, Bot, X, Minimize2, Maximize2, Send
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
  type?: 'text' | 'voice'
  transcript?: string
}

interface WorkingVoiceAgentProps {
  isOpen: boolean
  onClose: () => void
}

export default function WorkingVoiceAgent({ isOpen, onClose }: WorkingVoiceAgentProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Sanjeevan, your AI health assistant. Click "Start Voice Chat" to begin speaking with me!',
      sender: 'assistant',
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [isMinimized, setIsMinimized] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const recognitionRef = useRef<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const addMessage = (text: string, sender: 'user' | 'assistant', type: 'text' | 'voice' = 'text', transcript?: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type,
      transcript
    }
    setMessages(prev => [...prev, message])
  }

  const speakText = (text: string) => {
    if (!synthRef.current) return

    // Stop any current speech
    synthRef.current.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 0.8
    
    utterance.onstart = () => {
      setIsSpeaking(true)
    }
    
    utterance.onend = () => {
      setIsSpeaking(false)
    }
    
    utterance.onerror = () => {
      setIsSpeaking(false)
    }
    
    synthRef.current.speak(utterance)
  }

  const processAIQuery = async (query: string) => {
    setIsProcessing(true)
    console.log('🤖 Processing AI query:', query)
    
    try {
      // Call the test chat API
      console.log('📤 Sending request to /api/test-chat')
      const response = await fetch('/api/test-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: query
            }
          ]
        })
      })

      console.log('📨 API Response status:', response.status)

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('📨 API Response data:', data)
      return data.message
      
    } catch (error) {
      console.error('❌ Error calling AI API:', error)
      return `I apologize, but I'm having trouble processing your request right now. Error: ${error.message}. Please try again.`
    } finally {
      setIsProcessing(false)
    }
  }

  const startVoiceChat = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      addMessage('❌ Speech recognition is not supported in your browser. Please use Chrome or Edge.', 'assistant')
      return
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      addMessage('❌ Speech recognition is not supported in your browser. Please use Chrome or Edge.', 'assistant')
      return
    }

    try {
      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true })
      
      // Set up speech recognition
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'en-US'
      recognitionRef.current = recognition

      recognition.onstart = () => {
        setIsListening(true)
        addMessage('🎤 Listening... Please speak now!', 'assistant')
      }

      recognition.onresult = async (event: any) => {
        let finalTranscript = ''
        let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(finalTranscript || interimTranscript)

        if (finalTranscript) {
          // Add user message
          addMessage(finalTranscript, 'user', 'voice', finalTranscript)
          setTranscript('')
          
          // Process with AI
          addMessage('🤖 Processing your request...', 'assistant')
          const aiResponse = await processAIQuery(finalTranscript)
          
          // Add AI response
          addMessage(aiResponse, 'assistant', 'text')
          
          // Speak the response
          speakText(aiResponse)
        }
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
        addMessage(`❌ Speech recognition error: ${event.error}`, 'assistant')
      }

      recognition.onend = () => {
        setIsListening(false)
        console.log('Speech recognition ended')
      }

      // Start recognition
      recognition.start()
      setIsConnected(true)
      
    } catch (error) {
      console.error('Error starting voice chat:', error)
      addMessage('❌ Could not access microphone. Please check permissions.', 'assistant')
    }
  }

  const stopVoiceChat = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
    setIsConnected(false)
    setTranscript('')
  }

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
    }
    setIsSpeaking(false)
  }

  const handleTextSubmit = async () => {
    if (!inputText.trim()) return

    const userMessage = inputText.trim()
    setInputText('')
    
    // Add user message
    addMessage(userMessage, 'user', 'text')
    
    // Process with AI
    addMessage('🤖 Processing your request...', 'assistant')
    const aiResponse = await processAIQuery(userMessage)
    
    // Add AI response
    addMessage(aiResponse, 'assistant', 'text')
    
    // Speak the response
    speakText(aiResponse)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 bg-white rounded-xl shadow-2xl border border-gray-200 z-[100]"
          style={{
            width: isMinimized ? '320px' : '400px',
            height: isMinimized ? '80px' : '600px'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-sanjeevan-purple to-sanjeevan-dark-purple rounded-t-xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">AI Voice Assistant</h3>
                <p className="text-white/80 text-xs">
                  {isConnected ? '🎤 Voice Chat Active' : 'Ready to help'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4 text-white" /> : <Minimize2 className="w-4 h-4 text-white" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </motion.button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto" style={{ height: '350px' }}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user' 
                        ? 'bg-sanjeevan-purple text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      {message.transcript && (
                        <p className="text-xs opacity-75 mt-1">
                          📝 You said: "{message.transcript}"
                        </p>
                      )}
                      <p className="text-xs opacity-50 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start mb-4"
                  >
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      <div className="flex items-center space-x-2">
                        <Loader className="w-4 h-4 animate-spin text-sanjeevan-purple" />
                        <p className="text-sm text-gray-600">AI is thinking...</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Controls */}
              <div className="p-4 border-t border-gray-200">
                {!isConnected ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startVoiceChat}
                    className="w-full px-6 py-3 bg-sanjeevan-purple text-white rounded-xl font-semibold transition-all duration-300 hover:bg-sanjeevan-dark-purple"
                  >
                    <Mic className="w-5 h-5 inline mr-2" />
                    Start Voice Chat
                  </motion.button>
                ) : (
                  <div className="space-y-3">
                    {/* Voice Controls */}
                    <div className="flex justify-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={isListening ? stopVoiceChat : startVoiceChat}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          isListening 
                            ? 'bg-red-500 text-white hover:bg-red-600' 
                            : 'bg-sanjeevan-purple text-white hover:bg-sanjeevan-dark-purple'
                        }`}
                      >
                        {isListening ? (
                          <>
                            <MicOff className="w-5 h-5 inline mr-2" />
                            Stop Listening
                          </>
                        ) : (
                          <>
                            <Mic className="w-5 h-5 inline mr-2" />
                            Start Listening
                          </>
                        )}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={stopSpeaking}
                        className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          isSpeaking ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-400 text-white cursor-not-allowed'
                        }`}
                        disabled={!isSpeaking}
                      >
                        {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </motion.button>
                    </div>

                    {/* Text Input */}
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
                        placeholder="Or type your message here..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sanjeevan-purple text-sm"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTextSubmit}
                        disabled={!inputText.trim()}
                        className="px-3 py-2 bg-sanjeevan-purple text-white rounded-lg hover:bg-sanjeevan-dark-purple disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                )}
                
                {transcript && (
                  <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      🎤 Live transcript: "{transcript}"
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
