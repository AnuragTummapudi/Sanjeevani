'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import {
  MessageCircle, Mic, MicOff, Send, X, Bot, Volume2, VolumeX,
  Minimize2, Maximize2, Phone, PhoneOff, Zap, MessageSquare
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
  type?: 'text' | 'voice'
  transcript?: string
}

export default function AIAssistantPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [chatMode, setChatMode] = useState<'text' | 'voice'>('text') // New state for chat mode
  const [isConnectedToVoiceAgent, setIsConnectedToVoiceAgent] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected')
  const [transcript, setTranscript] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Sanjeevan AI, your specialized health assistant. I can help you with your medical records, explain test results, provide health guidance, and assist with appointments. How can I help you today?',
      sender: 'assistant',
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const wsRef = useRef<WebSocket | null>(null) // WebSocket reference for voice agent

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Cleanup LiveKit room on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

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
        handleSendMessage(transcript)
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

  const connectToVoiceAgent = async () => {
    if (isConnectedToVoiceAgent) {
      return // Already connected
    }

    setConnectionStatus('connecting')
    
    // Add connecting message
    const connectingMessage: Message = {
      id: Date.now().toString(),
      text: "🔄 Starting Voice Agent...",
      sender: 'assistant',
      timestamp: new Date(),
      type: 'text'
    }
    setMessages(prev => [...prev, connectingMessage])

    try {
      // Check for speech recognition support
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        throw new Error('Speech recognition not supported. Please use Chrome or Edge browser.')
      }

      // Request microphone permission
      await navigator.mediaDevices.getUserMedia({ audio: true })
      
      setIsConnectedToVoiceAgent(true)
      setConnectionStatus('connected')
      setChatMode('voice')
      
      // Add connection success message
      const connectionMessage: Message = {
        id: Date.now().toString(),
        text: "🎤 ✅ Voice Agent Ready! Click the microphone to start speaking.",
        sender: 'assistant',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, connectionMessage])
      
    } catch (error) {
      console.error('❌ Voice agent setup error:', error)
      setConnectionStatus('error')
      setIsConnectedToVoiceAgent(false)
      setChatMode('text')
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: `❌ Failed to start Voice Agent: ${error.message}`,
        sender: 'assistant',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, errorMessage])
    }
  }

  const disconnectFromVoiceAgent = () => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    setIsConnectedToVoiceAgent(false)
    setConnectionStatus('disconnected')
    setChatMode('text')
  }

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      type: text ? 'voice' : 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')

    // If connected to voice agent, send via WebSocket
    if (isConnectedToVoiceAgent && wsRef.current) {
      try {
        // Send message via WebSocket
        const data = {
          type: 'query',
          message: messageText,
          user_id: 'user_001',
          timestamp: new Date().toISOString()
        }
        
        wsRef.current.send(JSON.stringify(data))
        
        console.log('📤 Message sent via WebSocket:', messageText)
        return
      } catch (error) {
        console.error('❌ Error sending message via WebSocket:', error)
        // Fall back to regular text chat
      }
    }

    // Otherwise, use regular text chat
    setIsTyping(true)
    console.log('🤖 Processing text message:', messageText)

    try {
      // Prepare messages for API
      const apiMessages = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }))
      
      // Add current user message
      apiMessages.push({
        role: 'user',
        content: messageText
      })

      console.log('📤 Sending to /api/test-chat:', apiMessages)

      // Call test chat API
      const response = await fetch('/api/test-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages
        })
      })

      console.log('📨 API Response status:', response.status)

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('📨 API Response data:', data)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message,
        sender: 'assistant',
        timestamp: new Date(),
        type: 'text'
      }

      setMessages(prev => [...prev, assistantMessage])
      
      // Auto-speak AI responses in voice mode
      if (chatMode === 'voice' && isConnectedToVoiceAgent) {
        // Use Web Speech API for text-to-speech
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(data.message)
          speechSynthesis.speak(utterance)
        }
      }
    } catch (error) {
      console.error('❌ Error calling API:', error)
      
      // Fallback response if API fails
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `I apologize, but I'm having trouble connecting right now. Error: ${error.message}. Please try again.`,
        sender: 'assistant',
        timestamp: new Date(),
        type: 'text'
      }
      
      setMessages(prev => [...prev, fallbackMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleVoiceInput = async () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    if (!isConnectedToVoiceAgent) {
      addMessage('❌ Please connect to Voice Agent first.', 'assistant')
      return
    }

    try {
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
          // Process the voice input as a regular message
          await handleSendMessage(finalTranscript)
          setTranscript('')
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
      
    } catch (error) {
      console.error('Error starting voice input:', error)
      addMessage('❌ Could not start voice input. Please check microphone permissions.', 'assistant')
    }
  }

  const handleTextToSpeech = (text: string) => {
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", bounce: 0.3 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-sanjeevan-purple rounded-full shadow-2xl hover:bg-sanjeevan-dark-purple transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">AI</span>
        </div>
      </motion.button>

      {/* AI Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
            } transition-all duration-300`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-sanjeevan-purple to-sanjeevan-dark-purple rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Health Assistant</h3>
                  <p className="text-white/80 text-xs">
                    {connectionStatus === 'connecting' && '🔄 Connecting to Voice Agent...'}
                    {connectionStatus === 'connected' && '🎤 Voice Agent Connected'}
                    {connectionStatus === 'error' && '❌ Connection Error'}
                    {connectionStatus === 'disconnected' && 'Always here to help'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {/* Voice Agent Toggle */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={isConnectedToVoiceAgent ? disconnectFromVoiceAgent : connectToVoiceAgent}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isConnectedToVoiceAgent 
                      ? 'bg-green-500/20 text-green-200 hover:bg-green-500/30' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                  title={isConnectedToVoiceAgent ? 'Disconnect Voice Agent' : 'Connect Voice Agent'}
                >
                  {isConnectedToVoiceAgent ? <PhoneOff className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                </motion.button>
                
                {/* Chat Mode Toggle */}
                <div className="flex bg-white/20 rounded-lg p-0.5">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setChatMode('text')}
                    className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                      chatMode === 'text' 
                        ? 'bg-white text-sanjeevan-purple shadow-sm' 
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3 h-3 inline mr-1" />
                    Text
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setChatMode('voice')}
                    className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${
                      chatMode === 'voice' 
                        ? 'bg-white text-sanjeevan-purple shadow-sm' 
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <Zap className="w-3 h-3 inline mr-1" />
                    Voice
                  </motion.button>
                </div>

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
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 h-[480px] overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-sanjeevan-purple text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <div className="flex items-start space-x-2">
                          <div className="flex-1">
                            <p className="text-sm">{message.text}</p>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs opacity-70">
                                {formatTime(message.timestamp)}
                              </span>
                              {message.sender === 'assistant' && (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleTextToSpeech(message.text)}
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
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-100 p-3 rounded-2xl">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200">
                  {isConnectedToVoiceAgent && chatMode === 'voice' ? (
                    /* Voice Mode Input */
                    <div className="text-center">
                      <div className="mb-3">
                        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                          isListening 
                            ? 'bg-red-100 text-red-600 animate-pulse' 
                            : 'bg-sanjeevan-purple text-white hover:bg-sanjeevan-dark-purple'
                        }`}>
                          {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          {isListening ? 'Listening... Click to stop' : 'Click to start voice input'}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleVoiceInput}
                        className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                          isListening 
                            ? 'bg-red-500 text-white hover:bg-red-600' 
                            : 'bg-sanjeevan-purple text-white hover:bg-sanjeevan-dark-purple'
                        }`}
                      >
                        {isListening ? 'Stop Listening' : 'Start Voice Input'}
                      </motion.button>
                    </div>
                  ) : (
                    /* Text Mode Input */
                    <>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder={isConnectedToVoiceAgent ? "Type your message (Voice Agent Connected)" : "Type your message or use voice..."}
                            className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sanjeevan-purple focus:border-transparent text-sm"
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
                          onClick={() => handleSendMessage()}
                          disabled={!inputText.trim()}
                          className="p-3 bg-sanjeevan-purple text-white rounded-xl hover:bg-sanjeevan-dark-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-4 h-4" />
                        </motion.button>
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>Press Enter to send</span>
                        <span>Click mic for voice input</span>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
