'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Stethoscope, Users, FileText, Video, MessageCircle, 
  Upload, Bell, Settings, LogOut, User, Calendar,
  Heart, Activity, TrendingUp, Clock, Droplets, Thermometer
} from 'lucide-react'
import WebSocketChat from '../../components/WebSocketChat'
import ReportUpload from '../../components/ReportUpload'

export default function DoctorDashboard() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('patients')
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [isReportUploadOpen, setIsReportUploadOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/login')
    }
  }, [router])

  const patients = [
    {
      id: 1,
      name: 'Anurag Tummapudi',
      age: 28,
      condition: 'Hypertension',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-03-20',
      status: 'active',
      reports: 3,
      messages: 5
    },
    {
      id: 2,
      name: 'Priya Sharma',
      age: 35,
      condition: 'Diabetes',
      lastVisit: '2024-01-10',
      nextAppointment: '2024-02-15',
      status: 'active',
      reports: 2,
      messages: 2
    },
    {
      id: 3,
      name: 'Rajesh Kumar',
      age: 45,
      condition: 'Heart Disease',
      lastVisit: '2024-01-05',
      nextAppointment: '2024-02-10',
      status: 'follow-up',
      reports: 5,
      messages: 8
    }
  ]

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient)
    setIsChatOpen(true)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sanjeevan-purple"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{ background: 'white', backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-sanjeevan-purple rounded-full flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Doctor Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, Dr. {user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-6 h-6" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Messages</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Reports to Review</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patients List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Your Patients</h2>
              </div>
              <div className="divide-y">
                {patients.map((patient) => (
                  <motion.div
                    key={patient.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: patient.id * 0.1 }}
                    className="p-6 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handlePatientSelect(patient)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-sanjeevan-purple rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{patient.name}</h3>
                          <p className="text-sm text-gray-500">
                            {patient.age} years • {patient.condition}
                          </p>
                          <p className="text-xs text-gray-400">
                            Last visit: {patient.lastVisit}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <FileText className="w-4 h-4" />
                            <span>{patient.reports} reports</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <MessageCircle className="w-4 h-4" />
                            <span>{patient.messages} messages</span>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          patient.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {patient.status}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Details Section */}
          {selectedPatient && (
            <div className="lg:col-span-2 mt-8">
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold text-gray-900">Patient Details - {selectedPatient.name}</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Vital Signs */}
                    <div>
                      <h3 className="text-md font-semibold text-gray-900 mb-4">Current Vitals</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                              <Heart className="w-4 h-4 text-red-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">Blood Pressure</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">120/80 mmHg</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Droplets className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">Oxygen Saturation</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">98% SpO2</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                              <Thermometer className="w-4 h-4 text-yellow-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">Temperature</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">36.8°C</span>
                        </div>
                      </div>
                    </div>

                    {/* Current Medications */}
                    <div>
                      <h3 className="text-md font-semibold text-gray-900 mb-4">Current Medications</h3>
                      <div className="space-y-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-900">Amoxicillin</span>
                            <span className="text-xs text-gray-500">Cipla</span>
                          </div>
                          <p className="text-xs text-gray-600">250mg • Twice Daily • After Meals</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-900">Paracetamol</span>
                            <span className="text-xs text-gray-500">Dolo</span>
                          </div>
                          <p className="text-xs text-gray-600">500mg • Every 6 Hours • As Needed</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="mt-6">
                    <h3 className="text-md font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Lab Report Uploaded</p>
                          <p className="text-xs text-gray-500">Blood test results - 2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Medication Taken</p>
                          <p className="text-xs text-gray-500">Amoxicillin 250mg - 4 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Appointment Scheduled</p>
                          <p className="text-xs text-gray-500">Follow-up visit - March 20, 2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsChatOpen(true)}
                  className="w-full flex items-center p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="font-medium text-blue-900">Start Chat</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsVideoOpen(true)}
                  className="w-full flex items-center p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <Video className="w-5 h-5 text-green-600 mr-3" />
                  <span className="font-medium text-green-900">Video Consultation</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsReportUploadOpen(true)}
                  className="w-full flex items-center p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <Upload className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="font-medium text-purple-900">Upload Report</span>
                </motion.button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Anurag Tummapudi</p>
                    <p className="text-xs text-gray-500">Uploaded new lab report</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Priya Sharma</p>
                    <p className="text-xs text-gray-500">Scheduled appointment</p>
                    <p className="text-xs text-gray-400">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Rajesh Kumar</p>
                    <p className="text-xs text-gray-500">Sent message</p>
                    <p className="text-xs text-gray-400">6 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WebSocket Chat */}
      <WebSocketChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        patient={selectedPatient}
        userType="doctor"
      />

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl h-96 flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Video Consultation</h3>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="flex-1 bg-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <Video className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">Video consultation will start here</p>
                <p className="text-sm text-gray-400">LiveKit integration coming soon</p>
              </div>
            </div>
            <div className="p-4 border-t flex justify-center space-x-4">
              <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                End Call
              </button>
              <button className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                Mute
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Upload Modal */}
      <ReportUpload
        isOpen={isReportUploadOpen}
        onClose={() => setIsReportUploadOpen(false)}
        patient={selectedPatient}
      />
    </div>
  )
}
