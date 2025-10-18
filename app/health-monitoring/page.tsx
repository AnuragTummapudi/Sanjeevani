'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  Download,
  Share2,
  Settings,
  RefreshCw
} from 'lucide-react'
import VitalsMonitor from '../../components/VitalsMonitor'

export default function HealthMonitoring() {
  const [user, setUser] = useState<any>(null)
  const [selectedDevice, setSelectedDevice] = useState('fireboltWatch')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/login')
    }
  }, [router])

  const devices = [
    { id: 'fireboltWatch', name: 'Firebolt Watch', icon: '⌚' }
  ]

  const handleDeviceChange = async (deviceId: string) => {
    setSelectedDevice(deviceId)
    setIsLoading(true)
    
    try {
      // Simulate device connection
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log(`📱 Connected to ${deviceId}`)
    } catch (error) {
      console.error('Device connection error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const exportHealthData = () => {
    console.log('📊 Exporting health data...')
    // In a real app, this would generate a PDF or CSV
    alert('Health data export feature coming soon!')
  }

  const shareHealthData = () => {
    console.log('📤 Sharing health data...')
    // In a real app, this would share with doctor or family
    alert('Health data sharing feature coming soon!')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sanjeevan-purple"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="w-10 h-10 bg-sanjeevan-purple rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Health Monitoring</h1>
                <p className="text-sm text-gray-500">Real-time vitals & AI analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportHealthData}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Export</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareHealthData}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </motion.button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Device Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Firebolt Watch</h2>
              <p className="text-sm text-gray-500">Your connected wearable device for health monitoring</p>
            </div>
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">Auto-sync enabled</span>
            </div>
          </div>
          
          <div className="flex justify-center">
            {devices.map((device) => (
              <motion.button
                key={device.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDeviceChange(device.id)}
                disabled={isLoading}
                className={`p-6 rounded-xl border-2 transition-all w-48 ${
                  selectedDevice === device.id
                    ? 'border-sanjeevan-purple bg-sanjeevan-purple/10'
                    : 'border-gray-200 hover:border-gray-300'
                } disabled:opacity-50`}
              >
                <div className="text-4xl mb-3">{device.icon}</div>
                <div className="text-base font-semibold text-gray-900">{device.name}</div>
                <div className={`text-sm mt-2 ${
                  selectedDevice === device.id ? 'text-sanjeevan-purple font-medium' : 'text-gray-500'
                }`}>
                  {selectedDevice === device.id ? 'Connected' : 'Available'}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Health Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Data Points</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Health Score</p>
                <p className="text-2xl font-bold text-gray-900">87%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Alerts</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Days Monitored</p>
                <p className="text-2xl font-bold text-gray-900">14</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Vitals Monitor Component */}
        <VitalsMonitor />

        {/* Health Trends Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border mt-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Health Trends</h3>
              <p className="text-sm text-gray-500">7-day overview of your vital signs</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                7D
              </button>
              <button className="px-3 py-1 text-sm bg-sanjeevan-purple text-white rounded-lg">
                30D
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                90D
              </button>
            </div>
          </div>
          
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Health trends chart will be displayed here</p>
              <p className="text-sm text-gray-400">Integration with Chart.js coming soon</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
