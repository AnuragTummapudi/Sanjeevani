'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { 
  Mic, MicOff, PhoneOff, Volume2, VolumeX, Loader, MessageCircle, 
  Phone, Zap, MessageSquare, Bot, X, Minimize2, Maximize2 
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
  type?: 'text' | 'voice'
  transcript?: string
}

interface LiveKitVoiceAgentProps {
  isOpen: boolean
  onClose: () => void
}

export default function LiveKitVoiceAgent({ isOpen, onClose }: LiveKitVoiceAgentProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Sanjeevan, your AI health assistant. Click "Connect" to start voice interaction.',
      sender: 'assistant',
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected')
  const [isMinimized, setIsMinimized] = useState(false)
  
  const roomRef = useRef<any>(null)
  const localTrackRef = useRef<any>(null)
  const recognitionRef = useRef<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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

  const connectToLiveKit = async () => {
    setIsConnecting(true)
    setConnectionStatus('connecting')
    addMessage('🔄 Connecting to LiveKit Voice Agent...', 'assistant')

    try {
      // Get LiveKit token from your API
      const response = await fetch('/api/livekit-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          participantName: 'user_001',
          roomName: 'health-assistant'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get LiveKit token')
      }

      const { token } = await response.json()
      
      // Import LiveKit dynamically
      const { Room, RoomEvent, Track, RemoteTrack, RemoteTrackPublication } = await import('livekit-client')
      
      const room = new Room()
      roomRef.current = room

      // Set up event listeners
      room.on(RoomEvent.Connected, () => {
        console.log('✅ Connected to LiveKit room')
        setIsConnected(true)
        setConnectionStatus('connected')
        addMessage('🎤 ✅ Connected to Voice Agent! You can now speak directly to your AI health assistant.', 'assistant')
      })

      room.on(RoomEvent.Disconnected, () => {
        console.log('🔌 Disconnected from LiveKit room')
        setIsConnected(false)
        setConnectionStatus('disconnected')
        addMessage('🔌 Disconnected from Voice Agent', 'assistant')
      })

      room.on(RoomEvent.TrackSubscribed, (track: RemoteTrack, publication: RemoteTrackPublication) => {
        console.log('📡 Track subscribed:', track.kind)
        
        if (track.kind === Track.Kind.Audio) {
          // Handle incoming audio (AI responses)
          const audioElement = track.attach()
          audioElement.play()
          setIsSpeaking(true)
          
          audioElement.onended = () => {
            setIsSpeaking(false)
          }
        }
      })

      // Connect to room
      await room.connect(process.env.NEXT_PUBLIC_LIVEKIT_URL || 'wss://sanjeevan-23bj7opl.livekit.cloud', token)
      
    } catch (error) {
      console.error('❌ LiveKit connection error:', error)
      setConnectionStatus('error')
      addMessage(`❌ Failed to connect to Voice Agent: ${error.message}`, 'assistant')
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectFromLiveKit = () => {
    if (roomRef.current) {
      roomRef.current.disconnect()
      roomRef.current = null
    }
    setIsConnected(false)
    setConnectionStatus('disconnected')
    stopListening()
    stopSpeaking()
  }

  const startListening = async () => {
    if (!isConnected) {
      addMessage('❌ Not connected to agent. Please connect first.', 'assistant')
      return
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      addMessage('❌ getUserMedia is not supported in your browser.', 'assistant')
      return
    }

    try {
      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      // Publish audio track to LiveKit room
      if (roomRef.current) {
        const audioTrack = await roomRef.current.localParticipant.setMicrophoneEnabled(true)
        localTrackRef.current = audioTrack
      }

      // Set up speech recognition for transcript
      const recognition = new ((window as any).webkitSpeechRecognition || window.SpeechRecognition)()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = 'en-US'
      recognitionRef.current = recognition

      recognition.onresult = (event: any) => {
        let interimTranscript = ''
        let finalTranscript = ''
        
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          } else {
            interimTranscript += event.results[i][0].transcript
          }
        }
        
        setTranscript(finalTranscript || interimTranscript)
        
        if (finalTranscript) {
          addMessage(finalTranscript, 'user', 'voice', finalTranscript)
          setTranscript('')
        }
      }

      recognition.onend = () => {
        setIsListening(false)
        console.log('🎤 Speech recognition ended')
      }

      recognition.onerror = (event: any) => {
        console.error('❌ Speech recognition error:', event.error)
        setIsListening(false)
        addMessage(`❌ Speech recognition error: ${event.error}`, 'assistant')
      }

      recognition.start()
      setIsListening(true)
      addMessage('🎤 Listening... Speak now!', 'assistant')

    } catch (error) {
      console.error('❌ Error accessing microphone:', error)
      addMessage('❌ Could not access microphone. Please check permissions.', 'assistant')
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    
    if (roomRef.current && localTrackRef.current) {
      roomRef.current.localParticipant.setMicrophoneEnabled(false)
    }
    
    setIsListening(false)
    setTranscript('')
  }

  const stopSpeaking = () => {
    setIsSpeaking(false)
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
                <h3 className="text-white font-semibold">LiveKit Voice Agent</h3>
                <p className="text-white/80 text-xs">
                  {connectionStatus === 'connecting' && '🔄 Connecting...'}
                  {connectionStatus === 'connected' && '🎤 Connected'}
                  {connectionStatus === 'error' && '❌ Error'}
                  {connectionStatus === 'disconnected' && 'Disconnected'}
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
              <div className="flex-1 p-4 overflow-y-auto" style={{ height: '400px' }}>
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
                          📝 Transcript: "{message.transcript}"
                        </p>
                      )}
                      <p className="text-xs opacity-50 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Controls */}
              <div className="p-4 border-t border-gray-200">
                {!isConnected ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={connectToLiveKit}
                    disabled={isConnecting}
                    className="w-full px-6 py-3 bg-sanjeevan-purple text-white rounded-xl font-semibold transition-all duration-300 hover:bg-sanjeevan-dark-purple disabled:opacity-50"
                  >
                    {isConnecting ? (
                      <>
                        <Loader className="w-5 h-5 inline mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Phone className="w-5 h-5 inline mr-2" />
                        Connect to Voice Agent
                      </>
                    )}
                  </motion.button>
                ) : (
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={isListening ? stopListening : startListening}
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
                      onClick={disconnectFromLiveKit}
                      className="px-4 py-3 bg-gray-500 text-white rounded-xl font-semibold transition-all duration-300 hover:bg-gray-600"
                    >
                      <PhoneOff className="w-5 h-5" />
                    </motion.button>
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
