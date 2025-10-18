'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Heart, 
  Calendar, 
  MessageCircle, 
  Video, 
  Activity,
  Bell,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  User,
  Stethoscope,
  Settings
} from 'lucide-react'
import WebSocketChat from '../../components/WebSocketChat'

export default function PatientPortal() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    setIsLoaded(true)
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Priya Sharma',
      specialty: 'Cardiologist',
      date: '2024-03-20',
      time: '10:00 AM',
      type: 'Follow-up',
      status: 'confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Rajesh Kumar',
      specialty: 'General Medicine',
      date: '2024-03-25',
      time: '2:30 PM',
      type: 'Consultation',
      status: 'pending'
    }
  ]

  const healthReminders = [
    {
      id: 1,
      title: 'Take Morning Medication',
      time: '8:00 AM',
      completed: true,
      type: 'medication'
    },
    {
      id: 2,
      title: 'Blood Pressure Check',
      time: '6:00 PM',
      completed: false,
      type: 'vitals'
    },
    {
      id: 3,
      title: 'Evening Walk',
      time: '7:00 PM',
      completed: false,
      type: 'exercise'
    }
  ]

  const quickActions = [
    {
      id: 1,
      title: 'Health Monitor',
      description: 'Track your vitals',
      icon: Activity,
      color: 'bg-blue-500',
      href: '/health-monitoring'
    },
    {
      id: 2,
      title: 'Chat with Doctor',
      description: 'Get medical advice',
      icon: MessageCircle,
      color: 'bg-sanjeevan-purple',
      action: () => setIsChatOpen(true)
    },
    {
      id: 3,
      title: 'Video Consultation',
      description: 'Schedule a call',
      icon: Video,
      color: 'bg-green-500',
      action: () => alert('Video consultation coming soon!')
    },
    {
      id: 4,
      title: 'View Reports',
      description: 'Check test results',
      icon: Stethoscope,
      color: 'bg-orange-500',
      action: () => alert('Reports section coming soon!')
    }
  ]

  return (
    <main className="min-h-screen bg-gray-50" style={{ background: 'white', backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-sanjeevan-purple rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Patient Portal</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.name || 'Anurag Tummapudi'}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * action.id }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                onClick={action.action || (() => router.push(action.href))}
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
              <button className="text-sanjeevan-purple hover:text-sanjeevan-dark-purple text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + appointment.id * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-sanjeevan-purple rounded-full flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{appointment.doctor}</h4>
                      <p className="text-sm text-gray-500">{appointment.specialty}</p>
                      <p className="text-xs text-gray-400">{appointment.date} at {appointment.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Health Reminders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm border"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Today's Reminders</h3>
              <button className="text-sanjeevan-purple hover:text-sanjeevan-dark-purple text-sm font-medium">
                Manage
              </button>
            </div>
            <div className="space-y-4">
              {healthReminders.map((reminder) => (
                <motion.div
                  key={reminder.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + reminder.id * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      reminder.completed ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      {reminder.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{reminder.title}</h4>
                      <p className="text-sm text-gray-500">{reminder.time}</p>
                    </div>
                  </div>
                  <button className={`px-3 py-1 rounded-full text-xs font-medium ${
                    reminder.completed 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {reminder.completed ? 'Done' : 'Pending'}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Health Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-xl p-6 shadow-sm border"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Health Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Heart Rate</h4>
              <p className="text-2xl font-bold text-green-600">72 BPM</p>
              <p className="text-sm text-gray-500">Normal</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Steps Today</h4>
              <p className="text-2xl font-bold text-blue-600">8,500</p>
              <p className="text-sm text-gray-500">Goal: 10,000</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Health Score</h4>
              <p className="text-2xl font-bold text-purple-600">87%</p>
              <p className="text-sm text-gray-500">Excellent</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* WebSocket Chat */}
      <WebSocketChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        userType="patient"
      />
    </main>
  )
}
