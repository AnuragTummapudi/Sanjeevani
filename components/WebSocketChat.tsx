'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, Phone, Video, X, User, MessageCircle } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'doctor' | 'patient' | 'system'
  timestamp: Date
  type: 'text' | 'system'
}

interface WebSocketChatProps {
  isOpen: boolean
  onClose: () => void
  patient?: any
  userType: 'doctor' | 'patient'
}

export default function WebSocketChat({ isOpen, onClose, patient, userType }: WebSocketChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: userType === 'doctor' 
        ? `Chat started with ${patient?.name || 'Patient'}`
        : 'Chat started with your doctor',
      sender: 'system',
      timestamp: new Date(),
      type: 'system'
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      connectWebSocket()
    } else {
      disconnectWebSocket()
    }

    return () => {
      disconnectWebSocket()
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const connectWebSocket = () => {
    try {
      // For demo purposes, we'll simulate WebSocket connection
      // In production, this would connect to your WebSocket server
      const ws = new WebSocket('ws://localhost:8080/chat')
      wsRef.current = ws

      ws.onopen = () => {
        console.log('WebSocket connected')
        setIsConnected(true)
        
        // Send join message
        const joinMessage = {
          type: 'join',
          userType: userType,
          userId: userType === 'doctor' ? 'doctor_001' : 'patient_001',
          patientId: patient?.id || 'patient_001'
        }
        ws.send(JSON.stringify(joinMessage))
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          console.log('Received message:', data)
          
          if (data.type === 'message') {
            // Check if message already exists to prevent duplicates
            setMessages(prev => {
              const messageExists = prev.some(msg => msg.id === data.id)
              if (messageExists) {
                console.log('Message already exists, skipping duplicate')
                return prev
              }
              
              const newMessage: Message = {
                id: data.id || Date.now().toString(),
                text: data.text,
                sender: data.sender,
                timestamp: new Date(data.timestamp),
                type: 'text'
              }
              return [...prev, newMessage]
            })
          } else if (data.type === 'typing') {
            setIsTyping(data.isTyping)
          } else if (data.type === 'joined') {
            console.log('Successfully joined chat:', data.message)
          } else if (data.type === 'welcome') {
            console.log('Welcome message:', data.message)
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      ws.onclose = () => {
        console.log('WebSocket disconnected')
        setIsConnected(false)
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setIsConnected(false)
      }
    } catch (error) {
      console.error('Error connecting to WebSocket:', error)
      // For demo purposes, simulate connection
      setTimeout(() => {
        setIsConnected(true)
        addDemoMessage()
      }, 1000)
    }
  }

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
    setIsConnected(false)
  }

  const addDemoMessage = () => {
    const demoMessage: Message = {
      id: Date.now().toString(),
      text: userType === 'doctor' 
        ? "Hello Doctor! I have some questions about my medication."
        : "Hello! I'm here to help with your health questions.",
      sender: userType === 'doctor' ? 'patient' : 'doctor',
      timestamp: new Date(),
      type: 'text'
    }
    setMessages(prev => [...prev, demoMessage])
  }

  const sendMessage = () => {
    if (!inputText.trim() || !isConnected) return

    const messageText = inputText
    const messageId = Date.now().toString()
    const messageTimestamp = new Date().toISOString()
    
    // Send via WebSocket
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const wsMessage = {
        type: 'message',
        id: messageId,
        text: messageText,
        sender: userType,
        timestamp: messageTimestamp,
        patientId: patient?.id || 'patient_001'
      }
      wsRef.current.send(JSON.stringify(wsMessage))
    } else {
      // If WebSocket is not connected, add message locally
      const message: Message = {
        id: messageId,
        text: messageText,
        sender: userType,
        timestamp: new Date(messageTimestamp),
        type: 'text'
      }
      setMessages(prev => [...prev, message])
    }

    setInputText('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}
    >
      <div className="bg-white rounded-xl w-full max-w-2xl h-[600px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b bg-gradient-to-r from-sanjeevan-purple to-sanjeevan-dark-purple text-white rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-medium">
                  {userType === 'doctor' ? patient?.name || 'Patient' : 'Dr. Priya Sharma'}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-sm opacity-80">
                    {isConnected ? 'Online' : 'Connecting...'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                <Video className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === userType ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.type === 'system'
                    ? 'bg-gray-200 text-gray-600 text-center mx-auto'
                    : message.sender === userType
                    ? 'bg-sanjeevan-purple text-white'
                    : 'bg-white text-gray-900 shadow-sm'
                }`}>
                  <p className="text-sm">{message.text}</p>
                  {message.type === 'text' && (
                    <p className={`text-xs mt-1 ${
                      message.sender === userType ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm">
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
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sanjeevan-purple focus:border-transparent"
              disabled={!isConnected}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={!inputText.trim() || !isConnected}
              className="px-4 py-3 bg-sanjeevan-purple text-white rounded-lg hover:bg-sanjeevan-dark-purple disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

