'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '../../components/Navigation'
import { 
  Heart, 
  Droplets, 
  Thermometer, 
  Bell, 
  Pill, 
  Stethoscope,
  MoreHorizontal,
  User,
  MessageCircle,
  Video,
  Activity,
  Mic
} from 'lucide-react'
import WebSocketChat from '../../components/WebSocketChat'
import AIChatbot from '../../components/AIChatbot'
import VoiceInteraction from '../../components/VoiceInteraction'

export default function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isAIChatOpen, setIsAIChatOpen] = useState(false)
  const [isVoiceOpen, setIsVoiceOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const vitalSigns = [
    {
      icon: Heart,
      title: 'Blood Pressure',
      value: '120/80 Bpm',
      graph: 'line'
    },
    {
      icon: Droplets,
      title: 'Oxygen Saturation',
      value: '98% SpO2',
      graph: 'bar'
    },
    {
      icon: Thermometer,
      title: 'Body Temperature',
      value: '36.8 °C',
      graph: 'wave'
    }
  ]

  const medications = [
    {
      name: 'Amoxicillin',
      dosage: '250 Mg',
      frequency: 'Take Twice Daily',
      timing: 'After Meals',
      icon: Pill,
      brand: 'Cipla',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop&crop=center'
    },
    {
      name: 'Paracetamol',
      dosage: '500 Mg',
      frequency: 'Every 6 Hours If Required',
      timing: 'After Meals',
      icon: Pill,
      brand: 'Dolo',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=100&h=100&fit=crop&crop=center'
    }
  ]

  const scheduleData = [
    { 
      name: 'Vitamin D3', 
      dosage: '100 Omg', 
      day: 'Thu 07', 
      time: 'Morning', 
      icon: 'AM', 
      brand: 'Sun Pharma',
      image: 'https://images.unsplash.com/photo-1550572017-edd951aa0b92?w=100&h=100&fit=crop&crop=center'
    },
    { 
      name: 'Loratadine', 
      dosage: '10 Mg', 
      day: 'Fri 08', 
      time: 'Morning', 
      icon: 'AM', 
      brand: 'Dr. Reddy\'s',
      image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=100&h=100&fit=crop&crop=center'
    },
    { 
      name: 'Vitamin B12', 
      dosage: '1000 Mcg', 
      day: 'Sat 09', 
      time: 'Evening', 
      icon: 'PM', 
      brand: 'Lupin',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=100&h=100&fit=crop&crop=center'
    },
    { 
      name: 'Magnesium', 
      dosage: '250 Mg', 
      day: 'Sun 10', 
      time: 'Evening', 
      icon: 'PM', 
      brand: 'Zydus',
      image: 'https://images.unsplash.com/photo-1550572017-edd951aa0b92?w=100&h=100&fit=crop&crop=center'
    }
  ]

  const days = ['Mon 04', 'Tue 05', 'Wed 06', 'Thu 07', 'Fri 08', 'Sat 09', 'Sun 10']

  return (
    <main className="min-h-screen bg-gray-50" style={{ background: 'white', backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <Navigation />

      {/* Main Content */}
      <div className="container mx-auto px-8 pt-32 pb-8">
        {/* Header with Patient Name and Chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name || 'Anurag Tummapudi'}!
              </h1>
              <p className="text-gray-600 mt-1">Here's your health overview for today</p>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/health-monitoring')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Activity className="w-5 h-5" />
                <span>Health Monitor</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAIChatOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-sanjeevan-purple text-white rounded-lg hover:bg-sanjeevan-dark-purple transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>AI Assistant</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVoiceOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Mic className="w-5 h-5" />
                <span>Voice Chat</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsChatOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Video className="w-5 h-5" />
                <span>Doctor Chat</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
        {/* Vital Signs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          {vitalSigns.map((vital, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ 
                scale: 1.01,
                y: -2,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                    <vital.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700 text-sm">{vital.title}</h3>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xl font-semibold text-gray-900">{vital.value}</div>
                <div className="w-12 h-8 bg-gray-50 rounded-md flex items-center justify-center">
                  <div className="w-8 h-4 bg-gray-200 rounded-sm relative">
                    {vital.graph === 'line' && (
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full h-0.5 bg-blue-500 transform rotate-12"></div>
                      </div>
                    )}
                    {vital.graph === 'bar' && (
                      <div className="absolute inset-0 flex items-end justify-around p-0.5">
                        <div className="w-0.5 h-2 bg-blue-500 rounded"></div>
                        <div className="w-0.5 h-3 bg-blue-500 rounded"></div>
                        <div className="w-0.5 h-1.5 bg-blue-500 rounded"></div>
                      </div>
                    )}
                    {vital.graph === 'wave' && (
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full h-0.5 bg-blue-500 rounded-full"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Today's Reminder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl hover:bg-white/90 transition-all duration-300 group overflow-hidden"
          >
            {/* Glassmorphism glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400/20 via-yellow-400/20 to-red-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-orange-100/80 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-orange-200/80 transition-colors duration-300">
                  <Bell className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">Today's Reminder</h3>
              </div>
              <button className="p-1 hover:bg-white/50 rounded backdrop-blur-sm transition-colors duration-300">
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="relative z-10 mb-4">
              <h4 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                You're Booked For A Health Consultation Today!
              </h4>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 shadow-md">
                  <img 
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face" 
                    alt="Dr. Arjun Patel"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-gray-800 transition-colors duration-300">Dr. Arjun Patel</p>
                  <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Pulmonologist - Apollo Hospital</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Medication List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl hover:bg-white/90 transition-all duration-300 group overflow-hidden"
          >
            {/* Glassmorphism glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100/80 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-green-200/80 transition-colors duration-300">
                  <Pill className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">Medication List</h3>
              </div>
              <button className="p-1 hover:bg-white/50 rounded backdrop-blur-sm transition-colors duration-300">
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="relative z-10 space-y-4">
              {medications.map((med, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center space-x-4 p-3 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300 group/item"
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-gray-200">
                    <img 
                      src={med.image} 
                      alt={med.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 group-hover/item:text-gray-800 transition-colors duration-300">{med.name}</h4>
                    <p className="text-sm text-gray-600 group-hover/item:text-gray-700 transition-colors duration-300">{med.frequency}</p>
                    <p className="text-sm text-gray-500 group-hover/item:text-gray-600 transition-colors duration-300">{med.dosage} - {med.brand}</p>
                  </div>
                  <button className="px-3 py-1 bg-blue-100/80 backdrop-blur-sm text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200/80 transition-all duration-300">
                    {med.timing}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Medication Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ 
            scale: 1.01,
            y: -3,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl hover:bg-white/90 transition-all duration-300 group overflow-hidden"
        >
          {/* Glassmorphism glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400/20 via-indigo-400/20 to-blue-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100/80 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-purple-200/80 transition-colors duration-300">
                <Stethoscope className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">Medication</h3>
            </div>
            <button className="p-1 hover:bg-white/50 rounded backdrop-blur-sm transition-colors duration-300">
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Calendar Header */}
          <div className="relative z-10 grid grid-cols-7 gap-2 mb-4">
            {days.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-sm font-medium text-gray-600 py-2 group-hover:text-gray-700 transition-colors duration-300">{day}</div>
              </div>
            ))}
          </div>

          {/* Schedule Items */}
          <div className="relative z-10 space-y-3">
            {scheduleData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all duration-300 group/schedule"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-white border border-gray-200">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover/schedule:text-gray-800 transition-colors duration-300">{item.name}</h4>
                    <p className="text-sm text-gray-600 group-hover/schedule:text-gray-700 transition-colors duration-300">{item.dosage} - {item.brand}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 h-0.5 bg-gray-300/60 group-hover/schedule:bg-gray-400/80 transition-colors duration-300"></div>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-600 group-hover/schedule:text-gray-700 transition-colors duration-300">{item.day}</span>
                    <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600 group-hover/schedule:bg-gray-200 transition-colors duration-300">{item.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Chatbot */}
      <AIChatbot
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
      />

      {/* Voice Interaction */}
      <VoiceInteraction
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />

      {/* WebSocket Chat */}
      <WebSocketChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        userType="patient"
      />
    </main>
  )
}
