'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft,
  Stethoscope,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  Heart,
  Brain,
  Wind,
  Activity,
  Thermometer,
  Eye,
  Headphones,
  Zap
} from 'lucide-react'

interface Symptom {
  id: string
  name: string
  category: string
  severity: 'mild' | 'moderate' | 'severe'
  selected: boolean
}

interface Condition {
  name: string
  probability: number
  description: string
  urgency: 'low' | 'medium' | 'high'
}

export default function SymptomChecker() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [analysisResults, setAnalysisResults] = useState<Condition[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const router = useRouter()

  const symptoms: Symptom[] = [
    { id: '1', name: 'Headache', category: 'Neurological', severity: 'moderate', selected: false },
    { id: '2', name: 'Fever', category: 'General', severity: 'moderate', selected: false },
    { id: '3', name: 'Cough', category: 'Respiratory', severity: 'mild', selected: false },
    { id: '4', name: 'Chest Pain', category: 'Cardiovascular', severity: 'severe', selected: false },
    { id: '5', name: 'Nausea', category: 'Digestive', severity: 'moderate', selected: false },
    { id: '6', name: 'Dizziness', category: 'Neurological', severity: 'moderate', selected: false },
    { id: '7', name: 'Shortness of Breath', category: 'Respiratory', severity: 'severe', selected: false },
    { id: '8', name: 'Fatigue', category: 'General', severity: 'mild', selected: false },
    { id: '9', name: 'Joint Pain', category: 'Musculoskeletal', severity: 'moderate', selected: false },
    { id: '10', name: 'Rash', category: 'Dermatological', severity: 'mild', selected: false },
    { id: '11', name: 'Abdominal Pain', category: 'Digestive', severity: 'moderate', selected: false },
    { id: '12', name: 'Blurred Vision', category: 'Ocular', severity: 'severe', selected: false },
    { id: '13', name: 'High Blood Pressure', category: 'Cardiovascular', severity: 'severe', selected: false },
    { id: '14', name: 'Insomnia', category: 'Neurological', severity: 'mild', selected: false },
    { id: '15', name: 'Weight Loss', category: 'General', severity: 'moderate', selected: false },
    { id: '16', name: 'Muscle Weakness', category: 'Musculoskeletal', severity: 'moderate', selected: false }
  ]

  const categories = [
    { name: 'General', icon: Activity, color: 'from-blue-500 to-cyan-500' },
    { name: 'Neurological', icon: Brain, color: 'from-purple-500 to-pink-500' },
    { name: 'Cardiovascular', icon: Heart, color: 'from-red-500 to-pink-500' },
    { name: 'Respiratory', icon: Wind, color: 'from-green-500 to-emerald-500' },
    { name: 'Digestive', icon: Thermometer, color: 'from-orange-500 to-red-500' },
    { name: 'Musculoskeletal', icon: Activity, color: 'from-indigo-500 to-purple-500' },
    { name: 'Dermatological', icon: Eye, color: 'from-yellow-500 to-orange-500' },
    { name: 'Ocular', icon: Eye, color: 'from-teal-500 to-blue-500' }
  ]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredSymptoms = symptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    symptom.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleSymptom = (symptomId: string) => {
    const symptom = symptoms.find(s => s.id === symptomId)
    if (!symptom) return

    if (selectedSymptoms.find(s => s.id === symptomId)) {
      setSelectedSymptoms(prev => prev.filter(s => s.id !== symptomId))
    } else {
      setSelectedSymptoms(prev => [...prev, { ...symptom, selected: true }])
    }
  }

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0) return

    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults: Condition[] = [
        {
          name: 'Tension Headache',
          probability: 75,
          description: 'Most common type of headache, often caused by stress, muscle tension, or poor posture.',
          urgency: 'low'
        },
        {
          name: 'Migraine',
          probability: 45,
          description: 'Recurring headache disorder characterized by moderate to severe headache attacks.',
          urgency: 'medium'
        },
        {
          name: 'Viral Infection',
          probability: 30,
          description: 'Common viral infection that may cause headache, fatigue, and general malaise.',
          urgency: 'low'
        }
      ]
      
      setAnalysisResults(mockResults)
      setIsAnalyzing(false)
    }, 3000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'from-green-500 to-emerald-500'
      case 'moderate': return 'from-yellow-500 to-orange-500'
      case 'severe': return 'from-red-500 to-pink-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'bg-green-100 text-green-700 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'high': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <main className="min-h-screen relative overflow-x-hidden" style={{ background: 'white', backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-green-400/10 to-emerald-600/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl"
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
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Stethoscope className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold font-playfair text-black">
                Symptom Checker
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
                AI-Powered Symptom Analysis
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
                Symptom<br />
                <span className="text-sanjeevan-purple">Checker</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              <p className="font-inter text-xl lg:text-2xl text-gray-600 font-light leading-relaxed">
                Get instant assessment of your symptoms<br />
                with AI-powered analysis and insights.
              </p>
            </motion.div>

            {/* Analyze Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            >
              <motion.button
                onClick={analyzeSymptoms}
                disabled={selectedSymptoms.length === 0 || isAnalyzing}
                className={`group relative inline-flex items-center px-8 py-4 font-inter font-medium text-sm uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                  selectedSymptoms.length > 0 && !isAnalyzing
                    ? 'bg-sanjeevan-purple text-white hover:bg-sanjeevan-dark-purple'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={{ scale: selectedSymptoms.length > 0 && !isAnalyzing ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Stethoscope className="w-5 h-5 mr-3" />
                <span className="relative z-10">
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Symptoms'}
                </span>
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
                <span className="font-inter">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-inter">Condition Assessment</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <div className="w-2 h-2 bg-sanjeevan-purple rounded-full"></div>
                <span className="font-inter">Urgency Levels</span>
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
                   <div className="w-full h-full bg-gradient-to-br from-green-100/80 to-teal-100/80 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/30 shadow-lg group hover:shadow-2xl transition-all duration-300">
                     <div className="text-center">
                       <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                         <Stethoscope className="w-8 h-8 text-white" />
                       </div>
                       <h3 className="text-2xl font-bold text-gray-700 mb-2">Symptom Checker</h3>
                       <p className="text-gray-500">AI-powered symptom analysis</p>
                     </div>
                   </div>
          </motion.div>
        </div>
      </div>

    </main>
  )
}
