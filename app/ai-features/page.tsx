'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Mic, 
  MicOff, 
  MessageCircle, 
  FileText, 
  TrendingUp, 
  Pill, 
  Globe, 
  Calendar,
  BarChart3,
  AlertTriangle,
  ArrowLeft,
  Brain,
  Heart,
  Stethoscope
} from 'lucide-react'

export default function AIFeatures() {
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const aiFeatures = [
    {
      id: 'voice-interaction',
      title: 'Voice Interaction',
      description: 'Real-time speech-to-text and text-to-speech for seamless voice queries',
      icon: Mic,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      status: 'active'
    },
    {
      id: 'health-qa',
      title: 'Health Q&A',
      description: 'LLM-powered dialogue with contextual memory and personalized responses',
      icon: MessageCircle,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50',
      status: 'active'
    },
    {
      id: 'symptom-checker',
      title: 'Symptom Checker',
      description: 'Automated assessment with likelihood scores for common conditions',
      icon: Stethoscope,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      status: 'active'
    },
    {
      id: 'lab-reports',
      title: 'Lab Report Analysis',
      description: 'OCR extraction and AI-driven plain-language summaries',
      icon: FileText,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      status: 'active'
    },
    {
      id: 'predictive-alerts',
      title: 'Predictive Health Alerts',
      description: 'ML-based risk analysis with proactive voice notifications',
      icon: TrendingUp,
      color: 'from-teal-500 to-blue-500',
      bgColor: 'from-teal-50 to-blue-50',
      status: 'active'
    },
    {
      id: 'medication-recommendations',
      title: 'Medication & Lifestyle',
      description: 'Personalized AI suggestions for dosing and lifestyle adjustments',
      icon: Pill,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'from-indigo-50 to-purple-50',
      status: 'active'
    },
    {
      id: 'multi-language',
      title: 'Multi-Language Support',
      description: 'Automatic language detection and translation for diverse users',
      icon: Globe,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50',
      status: 'active'
    },
    {
      id: 'appointment-scheduling',
      title: 'Voice Appointment Booking',
      description: 'Natural-language booking with calendar integration',
      icon: Calendar,
      color: 'from-cyan-500 to-teal-500',
      bgColor: 'from-cyan-50 to-teal-50',
      status: 'active'
    },
    {
      id: 'trend-analysis',
      title: 'Interactive Trend Analysis',
      description: 'AI-generated insights on health metrics with visualizations',
      icon: BarChart3,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      status: 'active'
    },
    {
      id: 'emergency-triage',
      title: 'Emergency Triage',
      description: 'Voice-activated emergency protocols for critical situations',
      icon: AlertTriangle,
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50',
      status: 'active'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  }

  const handleFeatureClick = (featureId: string) => {
    router.push(`/ai-features/${featureId}`)
  }

  return (
    <main className="min-h-screen relative overflow-x-hidden" style={{ background: 'white', backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/10 to-cyan-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
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
              onClick={() => router.push('/')}
              className="group relative inline-flex items-center px-6 py-3 bg-sanjeevan-purple text-white font-inter font-medium text-sm uppercase tracking-wider transition-all duration-300 hover:bg-sanjeevan-dark-purple hover:scale-[1.02] active:scale-[0.98]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back to Home</span>
            </motion.button>
            
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold font-playfair text-black">
                Sanjeevan AI
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
                AI-Powered Healthcare Solutions
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
                Advanced AI<br />
                Healthcare<br />
                <span className="text-sanjeevan-purple">Features</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              <p className="font-inter text-xl lg:text-2xl text-gray-600 font-light leading-relaxed">
                Comprehensive AI-powered tools for<br />
                personalized healthcare experiences.
              </p>
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
                <span className="font-inter">Voice Interaction</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-inter">Health Analysis</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <div className="w-2 h-2 bg-sanjeevan-purple rounded-full"></div>
                <span className="font-inter">AI Diagnostics</span>
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
                   <div className="w-full h-full bg-gradient-to-br from-blue-100/80 to-purple-100/80 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/30 shadow-lg group hover:shadow-2xl transition-all duration-300">
                     <div className="text-center">
                       <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                         <Brain className="w-8 h-8 text-white" />
                       </div>
                       <h3 className="text-2xl font-bold text-gray-700 mb-2">AI Features</h3>
                       <p className="text-gray-500">Advanced healthcare AI solutions</p>
                     </div>
                   </div>
          </motion.div>
        </div>
      </div>

    </main>
  )
}
