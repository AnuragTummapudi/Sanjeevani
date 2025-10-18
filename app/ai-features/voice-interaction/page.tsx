'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  ArrowLeft,
  MessageCircle,
  Settings,
  Brain,
  Zap,
  Globe,
  Phone
} from 'lucide-react'
import WorkingVoiceAgent from '../../../components/WorkingVoiceAgent'

export default function VoiceInteraction() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [language, setLanguage] = useState('en')
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false)
  const router = useRouter()
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    setIsLoaded(true)
    
    // Initialize Web Speech API
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = language

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript)
          handleVoiceQuery(finalTranscript)
        }
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [language])

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      setIsListening(false)
      recognitionRef.current.stop()
    }
  }

  const handleVoiceQuery = async (query: string) => {
    try {
      // Simulate API call to backend
      const mockResponse = `I understand you said: "${query}". As your AI health assistant, I'm here to help with your health concerns. Could you please provide more details about your symptoms or questions?`
      setResponse(mockResponse)
      
      // Simulate text-to-speech
      setTimeout(() => {
        speakResponse(mockResponse)
      }, 1000)
    } catch (error) {
      console.error('Error processing voice query:', error)
      setResponse('Sorry, I encountered an error processing your request. Please try again.')
    }
  }

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true)
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'zh', name: '中文' }
  ]

  return (
    <main className="min-h-screen relative overflow-x-hidden" style={{ background: 'white', backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-cyan-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-teal-400/10 to-blue-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20"
      >
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => router.push('/ai-features')}
              className="group relative inline-flex items-center px-6 py-3 bg-sanjeevan-purple text-white font-inter font-medium text-sm uppercase tracking-wider transition-all duration-300 hover:bg-sanjeevan-dark-purple hover:scale-[1.02] active:scale-[0.98]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back to AI Features</span>
            </motion.button>
            
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Mic className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold font-playfair text-black">
                Voice Interaction
              </span>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
          
          {/* Left side - Content */}
          <div className="space-y-12 max-w-2xl">
            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-2"
            >
              <div className="font-inter font-medium text-sm uppercase tracking-[0.2em] text-sanjeevan-purple">
                AI-Powered Voice Assistant
              </div>
            </motion.div>

            {/* Main title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="space-y-6"
            >
              <h1 className="font-playfair font-bold text-6xl lg:text-7xl xl:text-8xl text-black leading-[0.9] tracking-tight">
                Voice<br />
                <span className="text-sanjeevan-purple">Interaction</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              <p className="font-inter text-xl lg:text-2xl text-gray-600 font-light leading-relaxed">
                Experience seamless voice conversations<br />
                with our AI health assistant.
              </p>
            </motion.div>

            {/* Voice Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
              className="flex gap-4"
            >
              <motion.button
                onClick={() => setIsVoiceAgentOpen(true)}
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-inter font-medium text-sm uppercase tracking-wider transition-all duration-300 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5 mr-3" />
                <span className="relative z-10">Connect to AI Agent</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </motion.button>
              
              <motion.button
                onClick={isListening ? stopListening : startListening}
                className="group relative inline-flex items-center px-8 py-4 bg-sanjeevan-purple text-white font-inter font-medium text-sm uppercase tracking-wider transition-all duration-300 hover:bg-sanjeevan-dark-purple hover:scale-[1.02] active:scale-[0.98]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mic className="w-5 h-5 mr-3" />
                <span className="relative z-10">{isListening ? 'Stop Listening' : 'Start Voice Chat'}</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </motion.button>
            </motion.div>

            {/* Status indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
              className="flex flex-wrap gap-8 pt-8"
            >
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-inter">Speech Recognition</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-inter">Text-to-Speech</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <div className="w-2 h-2 bg-sanjeevan-purple rounded-full"></div>
                <span className="font-inter">Multi-language</span>
              </div>
            </motion.div>
          </div>

          {/* Right side - Simple Display */}
          <motion.div
            className="relative w-full h-[600px] lg:h-[700px] xl:h-[800px] overflow-visible"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          >
                   <div className="w-full h-full bg-gradient-to-br from-blue-100/80 to-cyan-100/80 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/30 shadow-lg group hover:shadow-2xl transition-all duration-300">
                     <div className="text-center">
                       <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                         <Mic className="w-8 h-8 text-white" />
                       </div>
                       <h3 className="text-2xl font-bold text-gray-700 mb-2">Voice Interaction</h3>
                       <p className="text-gray-500">AI-powered voice conversations</p>
                     </div>
                   </div>
          </motion.div>
        </div>
      </div>

      {/* Working Voice Agent */}
      <WorkingVoiceAgent 
        isOpen={isVoiceAgentOpen} 
        onClose={() => setIsVoiceAgentOpen(false)} 
      />
    </main>
  )
}
