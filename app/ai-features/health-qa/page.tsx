'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft,
  MessageCircle,
  Send,
  Brain,
  Clock,
  User,
  Bot,
  Heart,
  Activity,
  Zap,
  TrendingUp
} from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'ai'
  timestamp: Date
  type: 'text' | 'health_insight' | 'recommendation'
}

export default function HealthQA() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m Sanjeevan, your AI health assistant. How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        type: aiResponse.type
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase()
    
    if (input.includes('headache') || input.includes('head pain')) {
      return {
        text: 'I understand you\'re experiencing a headache. Based on your symptoms, here are some insights:\n\n**Possible Causes:**\n• Tension headaches (most common)\n• Dehydration\n• Eye strain\n• Stress\n\n**Recommendations:**\n• Stay hydrated\n• Take breaks from screens\n• Practice relaxation techniques\n• Consider over-the-counter pain relief\n\n**When to seek medical attention:**\n• Sudden severe headache\n• Headache with fever\n• Vision changes\n• Nausea or vomiting',
        type: 'health_insight' as const
      }
    } else if (input.includes('sleep') || input.includes('insomnia')) {
      return {
        text: 'Sleep issues can significantly impact your health. Let me help you improve your sleep quality:\n\n**Sleep Hygiene Tips:**\n• Maintain consistent sleep schedule\n• Create a relaxing bedtime routine\n• Keep bedroom cool and dark\n• Limit screen time before bed\n• Avoid caffeine 6 hours before sleep\n\n**Sleep Tracking:**\nI can help you monitor your sleep patterns and suggest personalized improvements.',
        type: 'recommendation' as const
      }
    } else if (input.includes('exercise') || input.includes('workout')) {
      return {
        text: 'Great question about exercise! Here\'s a personalized approach:\n\n**Recommended Activities:**\n• 150 minutes moderate cardio weekly\n• Strength training 2-3 times/week\n• Flexibility exercises daily\n• Walking 10,000 steps/day\n\n**Based on your profile:**\n• Start with low-impact activities\n• Gradually increase intensity\n• Focus on consistency over intensity\n• Listen to your body\n\nWould you like me to create a personalized exercise plan?',
        type: 'recommendation' as const
      }
    } else {
      return {
        text: 'Thank you for sharing that with me. I\'m here to help with any health-related questions you might have. Could you provide more specific details about your symptoms or concerns? I can help with:\n\n• Symptom analysis\n• Health recommendations\n• Medication questions\n• Lifestyle advice\n• Preventive care\n\nFeel free to ask me anything about your health!',
        type: 'text' as const
      }
    }
  }

  const quickQuestions = [
    'What should I do about my headache?',
    'How can I improve my sleep?',
    'What exercises are best for me?',
    'Is this medication right for me?',
    'How can I boost my immune system?'
  ]

  return (
    <main className="min-h-screen relative overflow-x-hidden" style={{ background: 'white', backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-pink-400/10 to-purple-600/10 rounded-full blur-3xl"
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
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold font-playfair text-black">
                Health Q&A
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
                AI-Powered Health Assistant
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
                Health<br />
                <span className="text-sanjeevan-purple">Q&A</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              <p className="font-inter text-xl lg:text-2xl text-gray-600 font-light leading-relaxed">
                Get personalized health advice from our<br />
                AI assistant with intelligent follow-ups.
              </p>
            </motion.div>

            {/* Chat Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
              className="space-y-4"
            >
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about your health..."
                  className="flex-1 px-6 py-4 bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sanjeevan-purple/50 font-inter"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className={`px-6 py-4 rounded-2xl font-medium transition-all duration-300 ${
                    inputText.trim() && !isTyping
                      ? 'bg-sanjeevan-purple text-white hover:bg-sanjeevan-dark-purple hover:scale-[1.02]'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
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
                <span className="font-inter">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-inter">Real-time Responses</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <div className="w-2 h-2 bg-sanjeevan-purple rounded-full"></div>
                <span className="font-inter">Personalized Advice</span>
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
                   <div className="w-full h-full bg-gradient-to-br from-purple-100/80 to-pink-100/80 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/30 shadow-lg group hover:shadow-2xl transition-all duration-300">
                     <div className="text-center">
                       <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                         <MessageCircle className="w-8 h-8 text-white" />
                       </div>
                       <h3 className="text-2xl font-bold text-gray-700 mb-2">Health Q&A</h3>
                       <p className="text-gray-500">AI-powered health conversations</p>
                     </div>
                   </div>
          </motion.div>
        </div>
      </div>

    </main>
  )
}
