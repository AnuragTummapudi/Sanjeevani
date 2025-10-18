'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation'
import { 
  Video,
  Phone,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  MessageCircle,
  FileText,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Heart,
  Activity,
  MoreHorizontal,
  Send,
  Paperclip,
  CheckCircle,
  AlertTriangle,
  X
} from 'lucide-react'

export default function Consultation() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [activeTab, setActiveTab] = useState('call')
  const [notes, setNotes] = useState('')
  const [messages, setMessages] = useState<Array<{id: string, text: string, sender: 'doctor' | 'patient', time: string}>>([
    {
      id: '1',
      text: 'Hello! I can see you\'re experiencing chest pain. Can you describe when it started?',
      sender: 'doctor',
      time: '10:30 AM'
    },
    {
      id: '2',
      text: 'It started about 2 hours ago, feels like pressure in the center of my chest.',
      sender: 'patient',
      time: '10:32 AM'
    }
  ])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const consultationData = {
    doctor: {
      name: 'Dr. Arjun Patel',
      specialty: 'Pulmonologist',
      hospital: 'Apollo Hospital',
      experience: '12 years',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face'
    },
    patient: {
      name: 'Rajesh Kumar',
      age: 45,
      condition: 'Chest Pain',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
    },
    appointment: {
      date: 'Today',
      time: '10:30 AM - 11:00 AM',
      duration: '30 minutes',
      type: 'Video Consultation',
      status: 'Active'
    }
  }

  const vitals = [
    { name: 'Heart Rate', value: '72 BPM', status: 'normal', icon: Heart },
    { name: 'Blood Pressure', value: '120/80', status: 'normal', icon: Activity },
    { name: 'Temperature', value: '98.6°F', status: 'normal', icon: Activity }
  ]

  const sendMessage = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender: 'patient' as const,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, newMessage])
  }

  const saveNotes = () => {
    // Save notes functionality
    console.log('Saving notes:', notes)
  }

  return (
    <main className="min-h-screen bg-gray-50" style={{ background: 'white', backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <Navigation />

      {/* Main Content */}
      <div className="container mx-auto px-8 pt-32 pb-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Consultation</h1>
              <p className="text-gray-600">Video consultation with Dr. Arjun Patel</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live</span>
              </div>
              <div className="text-sm text-gray-500">
                Duration: 15:30
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Video Call */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            
            {/* Video Call Interface */}
            <div className="bg-black rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-96 bg-gradient-to-br from-gray-800 to-gray-900">
                {/* Main Video */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-semibold">{consultationData.doctor.name}</h3>
                    <p className="text-gray-300">{consultationData.doctor.specialty}</p>
                  </div>
                </div>

                {/* Patient Video (Picture-in-Picture) */}
                <div className="absolute top-4 right-4 w-32 h-24 bg-gray-700 rounded-lg overflow-hidden border-2 border-white">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Call Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`p-3 rounded-full ${isMicOn ? 'bg-white' : 'bg-red-500'} text-gray-800 shadow-lg`}
                  >
                    {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`p-3 rounded-full ${isVideoOn ? 'bg-white' : 'bg-red-500'} text-gray-800 shadow-lg`}
                  >
                    {isVideoOn ? <Camera className="w-6 h-6" /> : <CameraOff className="w-6 h-6" />}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-red-500 text-white shadow-lg"
                  >
                    <Phone className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="flex border-b border-gray-100">
                {[
                  { id: 'call', label: 'Video Call', icon: Video },
                  { id: 'chat', label: 'Chat', icon: MessageCircle },
                  { id: 'notes', label: 'Doctor Notes', icon: FileText },
                  { id: 'appointment', label: 'Appointment', icon: Calendar }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'call' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Call Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="text-xl font-semibold">15:30</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-600">Quality</p>
                        <p className="text-xl font-semibold text-green-600">HD</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'chat' && (
                  <div className="space-y-4">
                    <div className="h-64 overflow-y-auto space-y-3">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'doctor' ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-xs px-4 py-2 rounded-lg ${
                            message.sender === 'doctor' 
                              ? 'bg-blue-100 text-blue-900' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm">{message.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            sendMessage((e.target as HTMLInputElement).value)
                            ;(e.target as HTMLInputElement).value = ''
                          }
                        }}
                      />
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Doctor Notes</h3>
                      <button
                        onClick={saveNotes}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                      >
                        Save Notes
                      </button>
                    </div>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Doctor will add notes here..."
                      className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    <div className="text-sm text-gray-500">
                      Patient symptoms, diagnosis, treatment plan, and recommendations will be recorded here.
                    </div>
                  </div>
                )}

                {activeTab === 'appointment' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Appointment Details</h3>
                    
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Current Appointment</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Date & Time</p>
                          <p className="font-semibold">{consultationData.appointment.date} - {consultationData.appointment.time}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Duration</p>
                          <p className="font-semibold">{consultationData.appointment.duration}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Schedule Follow-up</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <p className="text-sm text-gray-600">Next Available</p>
                          <p className="font-semibold">Tomorrow, 2:00 PM</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <p className="text-sm text-gray-600">Type</p>
                          <p className="font-semibold">Follow-up</p>
                        </div>
                      </div>
                      <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Schedule Follow-up
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Patient Info & Vitals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            
            {/* Patient Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500">
                  <img 
                    src={consultationData.patient.image} 
                    alt={consultationData.patient.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{consultationData.patient.name}</h3>
                  <p className="text-gray-600">{consultationData.patient.age} years old</p>
                  <p className="text-sm text-red-600 font-medium">{consultationData.patient.condition}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Patient ID</span>
                  <span className="font-medium">#P-2024-001</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Last Visit</span>
                  <span className="font-medium">2 weeks ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Insurance</span>
                  <span className="font-medium">Covered</span>
                </div>
              </div>
            </div>

            {/* Vital Signs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Vitals</h3>
              <div className="space-y-4">
                {vitals.map((vital, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <vital.icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-700">{vital.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{vital.value}</p>
                      <p className={`text-xs ${vital.status === 'normal' ? 'text-green-600' : 'text-red-600'}`}>
                        {vital.status}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Doctor Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Consulting Doctor</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
                  <img 
                    src={consultationData.doctor.image} 
                    alt={consultationData.doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{consultationData.doctor.name}</h4>
                  <p className="text-sm text-gray-600">{consultationData.doctor.specialty}</p>
                  <p className="text-xs text-gray-500">{consultationData.doctor.hospital}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium">{consultationData.doctor.experience}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">{consultationData.doctor.rating}</span>
                    <span className="text-yellow-500">★</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <FileText className="w-4 h-4" />
                  <span>Generate Prescription</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Follow-up</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Paperclip className="w-4 h-4" />
                  <span>Share Files</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
