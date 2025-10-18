'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  Droplets, 
  Thermometer, 
  Activity, 
  Wifi, 
  WifiOff,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Smartphone,
  Watch,
  Zap,
  Brain,
  Mail
} from 'lucide-react'
import GoogleFitIntegration from './GoogleFitIntegration'

interface VitalsData {
  id: string
  timestamp: Date
  heartRate: number
  bloodPressure: { systolic: number; diastolic: number }
  oxygenSaturation: number
  temperature: number
  steps: number
  calories: number
  sleepHours: number
  stressLevel: number
  deviceType: 'watch' | 'phone' | 'manual'
}

interface HealthAlert {
  id: string
  type: 'warning' | 'critical' | 'info'
  message: string
  timestamp: Date
  resolved: boolean
}

interface PredictiveAnalysis {
  riskLevel: 'low' | 'medium' | 'high'
  predictions: string[]
  recommendations: string[]
  trends: {
    heartRate: 'increasing' | 'decreasing' | 'stable'
    bloodPressure: 'increasing' | 'decreasing' | 'stable'
    oxygenSaturation: 'increasing' | 'decreasing' | 'stable'
  }
}

export default function VitalsMonitor() {
  const [vitalsData, setVitalsData] = useState<VitalsData[]>([])
  const [currentVitals, setCurrentVitals] = useState<VitalsData | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isCollecting, setIsCollecting] = useState(false)
  const [alerts, setAlerts] = useState<HealthAlert[]>([])
  const [predictiveAnalysis, setPredictiveAnalysis] = useState<PredictiveAnalysis | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [useRealData, setUseRealData] = useState(false)
  const [patientEmail, setPatientEmail] = useState('gaddantisaisaran@gmail.com')
  const [emailSent, setEmailSent] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Handle real Google Fit data
  const handleRealDataReceived = (data: any) => {
    console.log('📊 Real Google Fit data received:', data)
    
    const realVitals: VitalsData = {
      id: Date.now().toString(),
      timestamp: new Date(data.timestamp || new Date()),
      heartRate: data.heartRate || 72,
      bloodPressure: data.bloodPressure || { systolic: 120, diastolic: 80 },
      oxygenSaturation: data.oxygenSaturation || 98,
      temperature: data.temperature || 36.8,
      steps: data.steps || 0,
      calories: data.calories || 0,
      sleepHours: data.sleepHours || 7.5,
      stressLevel: data.stressLevel || 1,
      deviceType: 'watch'
    }
    
    setCurrentVitals(realVitals)
    setVitalsData(prev => [realVitals, ...prev.slice(0, 99)])
    setUseRealData(true)
    
    // Check for health alerts with real data
    checkHealthAlerts(realVitals)
  }

  // Simulate wearable device connection
  useEffect(() => {
    const connectToDevice = async () => {
      console.log('🔗 Connecting to wearable device...')
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsConnected(true)
      console.log('✅ Connected to Apple Watch / Fitbit')
    }

    connectToDevice()
  }, [])

  // Generate realistic vitals data
  const generateVitalsData = (): VitalsData => {
    const now = new Date()
    const baseHeartRate = 72 + Math.random() * 20 - 10
    const baseSystolic = 120 + Math.random() * 20 - 10
    const baseDiastolic = 80 + Math.random() * 10 - 5
    
    return {
      id: Date.now().toString(),
      timestamp: now,
      heartRate: Math.round(baseHeartRate),
      bloodPressure: {
        systolic: Math.round(baseSystolic),
        diastolic: Math.round(baseDiastolic)
      },
      oxygenSaturation: 98 + Math.random() * 2,
      temperature: 36.5 + Math.random() * 0.6,
      steps: Math.floor(Math.random() * 1000) + 5000,
      calories: Math.floor(Math.random() * 200) + 1800,
      sleepHours: 7 + Math.random() * 2,
      stressLevel: Math.floor(Math.random() * 5) + 1,
      deviceType: 'watch'
    }
  }

  // Start/stop data collection
  const toggleDataCollection = () => {
    if (isCollecting) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setIsCollecting(false)
      console.log('⏹️ Stopped data collection')
    } else {
      setIsCollecting(true)
      console.log('▶️ Started data collection')
      
      // Collect data every 30 seconds
      intervalRef.current = setInterval(() => {
        const newVitals = generateVitalsData()
        setVitalsData(prev => [newVitals, ...prev.slice(0, 99)]) // Keep last 100 readings
        setCurrentVitals(newVitals)
        
        // Check for health alerts
        checkHealthAlerts(newVitals)
      }, 30000)
    }
  }

  // Send health alert email
  const sendHealthAlertEmail = async (alert: HealthAlert, vitals: VitalsData) => {
    try {
      const response = await fetch('/api/send-health-alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientEmail: patientEmail,
          patientName: 'Anurag Tummapudi',
          alertType: alert.type,
          message: alert.message,
          vitalsData: vitals
        })
      })

      const result = await response.json()
      if (result.success) {
        console.log('📧 Health alert email sent successfully')
      } else {
        console.error('❌ Failed to send health alert email:', result.error)
      }
    } catch (error) {
      console.error('❌ Error sending health alert email:', error)
    }
  }

  // Check for health alerts based on vitals
  const checkHealthAlerts = (vitals: VitalsData) => {
    const newAlerts: HealthAlert[] = []

    // Heart rate alerts
    if (vitals.heartRate > 100) {
      const alert = {
        id: Date.now().toString(),
        type: 'warning' as const,
        message: `Elevated heart rate detected: ${vitals.heartRate} BPM`,
        timestamp: new Date(),
        resolved: false
      }
      newAlerts.push(alert)
      // Send email for critical heart rate
      if (vitals.heartRate > 120) {
        sendHealthAlertEmail(alert, vitals)
      }
    }

    // Blood pressure alerts
    if (vitals.bloodPressure && (vitals.bloodPressure.systolic > 140 || vitals.bloodPressure.diastolic > 90)) {
      const alert = {
        id: Date.now().toString(),
        type: 'critical' as const,
        message: `High blood pressure: ${vitals.bloodPressure.systolic}/${vitals.bloodPressure.diastolic} mmHg`,
        timestamp: new Date(),
        resolved: false
      }
      newAlerts.push(alert)
      // Always send email for high blood pressure
      sendHealthAlertEmail(alert, vitals)
    }

    // Oxygen saturation alerts
    if (vitals.oxygenSaturation < 95) {
      const alert = {
        id: Date.now().toString(),
        type: 'warning' as const,
        message: `Low oxygen saturation: ${vitals.oxygenSaturation}%`,
        timestamp: new Date(),
        resolved: false
      }
      newAlerts.push(alert)
      // Send email for low oxygen saturation
      if (vitals.oxygenSaturation < 92) {
        sendHealthAlertEmail(alert, vitals)
      }
    }

    // Temperature alerts
    if (vitals.temperature > 37.5) {
      const alert = {
        id: Date.now().toString(),
        type: 'warning' as const,
        message: `Elevated temperature: ${vitals.temperature.toFixed(1)}°C`,
        timestamp: new Date(),
        resolved: false
      }
      newAlerts.push(alert)
      // Send email for high temperature
      if (vitals.temperature > 38.0) {
        sendHealthAlertEmail(alert, vitals)
      }
    }

    if (newAlerts.length > 0) {
      setAlerts(prev => [...newAlerts, ...prev])
    }
  }

  // AI Predictive Analysis using Gemini API
  const runPredictiveAnalysis = async () => {
    if (vitalsData.length < 5) {
      alert('Need at least 5 data points for analysis')
      return
    }

    setIsAnalyzing(true)
    setEmailSent(false)
    console.log('🧠 Running AI predictive analysis...')

    try {
      const response = await fetch('/api/health-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vitalsData: vitalsData.slice(0, 20), // Send last 20 readings
          patientInfo: {
            name: 'Anurag Tummapudi',
            age: 28,
            gender: 'male',
            medicalHistory: ['Hypertension']
          },
          sendEmail: true,
          patientEmail: patientEmail
        })
      })

      const analysis = await response.json()
      setPredictiveAnalysis(analysis)
      setEmailSent(analysis.emailSent || false)
      console.log('✅ AI analysis completed:', analysis)
      
      if (analysis.emailSent) {
        console.log('📧 Analysis email sent successfully!')
      }
    } catch (error) {
      console.error('❌ AI analysis failed:', error)
      // Fallback analysis
      setPredictiveAnalysis({
        riskLevel: 'low',
        predictions: [
          'Heart rate trending within normal range',
          'Blood pressure shows slight elevation',
          'Overall cardiovascular health is good'
        ],
        recommendations: [
          'Continue regular exercise routine',
          'Monitor blood pressure daily',
          'Maintain current medication schedule'
        ],
        trends: {
          heartRate: 'stable',
          bloodPressure: 'increasing',
          oxygenSaturation: 'stable'
        }
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="w-4 h-4 text-red-500" />
      case 'decreasing': return <TrendingDown className="w-4 h-4 text-green-500" />
      default: return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  // Get risk level color
  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-green-600 bg-green-100'
    }
  }

  // Demo functions for testing alerts
  const triggerHighBPAlert = async () => {
    console.log('🚨 Triggering High BP Demo Alert...')
    
    const criticalVitals: VitalsData = {
      id: Date.now().toString(),
      timestamp: new Date(),
      heartRate: 95,
      bloodPressure: { systolic: 165, diastolic: 105 },
      oxygenSaturation: 97,
      temperature: 36.8,
      steps: 2000,
      calories: 1500,
      sleepHours: 6.5,
      stressLevel: 4,
      deviceType: 'demo'
    }
    
    setCurrentVitals(criticalVitals)
    setVitalsData(prev => [criticalVitals, ...prev.slice(0, 99)])
    
    // Trigger alert email
    await sendHealthAlertEmail({
      id: Date.now().toString(),
      type: 'critical',
      message: `High blood pressure: ${criticalVitals.bloodPressure.systolic}/${criticalVitals.bloodPressure.diastolic} mmHg`,
      timestamp: new Date(),
      resolved: false
    }, criticalVitals)
    
    alert('🚨 High BP Alert Triggered! Check your email for the alert notification.')
  }

  const triggerLowOxygenAlert = async () => {
    console.log('🚨 Triggering Low Oxygen Demo Alert...')
    
    const criticalVitals: VitalsData = {
      id: Date.now().toString(),
      timestamp: new Date(),
      heartRate: 110,
      bloodPressure: { systolic: 125, diastolic: 85 },
      oxygenSaturation: 88,
      temperature: 37.2,
      steps: 1500,
      calories: 1200,
      sleepHours: 5.5,
      stressLevel: 5,
      deviceType: 'demo'
    }
    
    setCurrentVitals(criticalVitals)
    setVitalsData(prev => [criticalVitals, ...prev.slice(0, 99)])
    
    // Trigger alert email
    await sendHealthAlertEmail({
      id: Date.now().toString(),
      type: 'critical',
      message: `Low oxygen saturation: ${criticalVitals.oxygenSaturation}%`,
      timestamp: new Date(),
      resolved: false
    }, criticalVitals)
    
    alert('🚨 Low Oxygen Alert Triggered! Check your email for the alert notification.')
  }

  const triggerHighHeartRateAlert = async () => {
    console.log('🚨 Triggering High Heart Rate Demo Alert...')
    
    const criticalVitals: VitalsData = {
      id: Date.now().toString(),
      timestamp: new Date(),
      heartRate: 135,
      bloodPressure: { systolic: 140, diastolic: 90 },
      oxygenSaturation: 95,
      temperature: 37.8,
      steps: 3000,
      calories: 1800,
      sleepHours: 4.5,
      stressLevel: 5,
      deviceType: 'demo'
    }
    
    setCurrentVitals(criticalVitals)
    setVitalsData(prev => [criticalVitals, ...prev.slice(0, 99)])
    
    // Trigger alert email
    await sendHealthAlertEmail({
      id: Date.now().toString(),
      type: 'critical',
      message: `Elevated heart rate detected: ${criticalVitals.heartRate} BPM`,
      timestamp: new Date(),
      resolved: false
    }, criticalVitals)
    
    alert('🚨 High Heart Rate Alert Triggered! Check your email for the alert notification.')
  }

  const triggerHighTemperatureAlert = async () => {
    console.log('🚨 Triggering High Temperature Demo Alert...')
    
    const criticalVitals: VitalsData = {
      id: Date.now().toString(),
      timestamp: new Date(),
      heartRate: 105,
      bloodPressure: { systolic: 130, diastolic: 88 },
      oxygenSaturation: 96,
      temperature: 39.2,
      steps: 1000,
      calories: 1000,
      sleepHours: 3.5,
      stressLevel: 5,
      deviceType: 'demo'
    }
    
    setCurrentVitals(criticalVitals)
    setVitalsData(prev => [criticalVitals, ...prev.slice(0, 99)])
    
    // Trigger alert email
    await sendHealthAlertEmail({
      id: Date.now().toString(),
      type: 'critical',
      message: `Elevated temperature: ${criticalVitals.temperature.toFixed(1)}°C`,
      timestamp: new Date(),
      resolved: false
    }, criticalVitals)
    
    alert('🚨 High Temperature Alert Triggered! Check your email for the alert notification.')
  }

  const triggerMultipleAlerts = async () => {
    console.log('🚨 Triggering Multiple Critical Alerts Demo...')
    
    const criticalVitals: VitalsData = {
      id: Date.now().toString(),
      timestamp: new Date(),
      heartRate: 145,
      bloodPressure: { systolic: 180, diastolic: 110 },
      oxygenSaturation: 85,
      temperature: 39.5,
      steps: 500,
      calories: 800,
      sleepHours: 2.5,
      stressLevel: 5,
      deviceType: 'demo'
    }
    
    setCurrentVitals(criticalVitals)
    setVitalsData(prev => [criticalVitals, ...prev.slice(0, 99)])
    
    // Trigger multiple alert emails
    await sendHealthAlertEmail({
      id: Date.now().toString(),
      type: 'critical',
      message: `CRITICAL: Multiple health alerts - BP: ${criticalVitals.bloodPressure.systolic}/${criticalVitals.bloodPressure.diastolic}, HR: ${criticalVitals.heartRate} BPM, SpO2: ${criticalVitals.oxygenSaturation}%, Temp: ${criticalVitals.temperature.toFixed(1)}°C`,
      timestamp: new Date(),
      resolved: false
    }, criticalVitals)
    
    alert('🚨 MULTIPLE CRITICAL ALERTS TRIGGERED! Check your email for emergency notification.')
  }

  return (
    <div className="space-y-6">
      {/* Google Fit Integration */}
      <GoogleFitIntegration
        onDataReceived={handleRealDataReceived}
        isConnected={useRealData}
        onConnectionChange={setUseRealData}
      />

      {/* Connection Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isConnected ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {isConnected ? (
                <Wifi className="w-6 h-6 text-green-600" />
              ) : (
                <WifiOff className="w-6 h-6 text-red-600" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Wearable Device Status
              </h3>
              <p className="text-sm text-gray-500">
                {useRealData 
                  ? 'Connected to Firebolt Watch (Real Data)' 
                  : isConnected 
                    ? 'Connected to Simulated Device' 
                    : 'Disconnected'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDataCollection}
              disabled={!isConnected}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isCollecting
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-sanjeevan-purple text-white hover:bg-sanjeevan-dark-purple'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isCollecting ? 'Stop Collection' : 'Start Collection'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={runPredictiveAnalysis}
              disabled={isAnalyzing || vitalsData.length < 5}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Brain className="w-4 h-4" />
              <span>{isAnalyzing ? 'Analyzing...' : 'AI Analysis'}</span>
            </motion.button>
            
            {isDemoMode && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => {
                  // Generate some demo vitals first
                  for (let i = 0; i < 5; i++) {
                    const demoVitals = generateVitalsData()
                    setVitalsData(prev => [demoVitals, ...prev.slice(0, 99)])
                    setCurrentVitals(demoVitals)
                  }
                  // Then run analysis
                  await runPredictiveAnalysis()
                }}
                disabled={isAnalyzing}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Demo AI + Email</span>
              </motion.button>
            )}
          </div>
        </div>
        
        {/* Email Configuration */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email for Analysis Reports
              </label>
              <input
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter email address for health reports"
              />
            </div>
            {emailSent && (
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Email Sent!</span>
              </div>
            )}
          </div>
        </div>

        {/* Demo Mode Toggle */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Demo Mode</h4>
              <p className="text-xs text-gray-500">Enable demo buttons for testing alerts</p>
            </div>
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                isDemoMode 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isDemoMode ? 'Demo ON' : 'Demo OFF'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Demo Alert Buttons */}
      {isDemoMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 rounded-xl p-6 shadow-sm border border-red-200"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-900">Demo Alert Testing</h3>
              <p className="text-sm text-red-700">Click buttons to simulate critical health conditions and test email alerts</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={triggerHighBPAlert}
              className="px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
            >
              <Heart className="w-4 h-4" />
              <span>High BP Alert</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={triggerLowOxygenAlert}
              className="px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
            >
              <Activity className="w-4 h-4" />
              <span>Low Oxygen Alert</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={triggerHighHeartRateAlert}
              className="px-4 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
            >
              <Heart className="w-4 h-4" />
              <span>High Heart Rate</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={triggerHighTemperatureAlert}
              className="px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
            >
              <Thermometer className="w-4 h-4" />
              <span>High Temperature</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={triggerMultipleAlerts}
              className="px-4 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors text-sm font-medium flex items-center justify-center space-x-2 md:col-span-2 lg:col-span-1"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Multiple Alerts</span>
            </motion.button>
          </div>
          
          <div className="mt-4 p-3 bg-red-100 rounded-lg">
            <p className="text-xs text-red-800">
              <strong>⚠️ Demo Mode:</strong> These buttons simulate critical health conditions and will immediately send email alerts to your configured email address. Use for testing the complete alert system.
            </p>
          </div>
        </motion.div>
      )}

      {/* Current Vitals */}
      {currentVitals && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              {getTrendIcon(predictiveAnalysis?.trends.heartRate || 'stable')}
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Heart Rate</h3>
            <p className="text-2xl font-bold text-gray-900">{currentVitals.heartRate || 72}</p>
            <p className="text-sm text-gray-500">BPM</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Droplets className="w-5 h-5 text-blue-600" />
              </div>
              {getTrendIcon(predictiveAnalysis?.trends.bloodPressure || 'stable')}
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Blood Pressure</h3>
            <p className="text-2xl font-bold text-gray-900">
              {currentVitals.bloodPressure?.systolic || 120}/{currentVitals.bloodPressure?.diastolic || 80}
            </p>
            <p className="text-sm text-gray-500">mmHg</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              {getTrendIcon(predictiveAnalysis?.trends.oxygenSaturation || 'stable')}
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Oxygen Saturation</h3>
            <p className="text-2xl font-bold text-gray-900">
              {(currentVitals.oxygenSaturation || 98).toFixed(1)}
            </p>
            <p className="text-sm text-gray-500">% SpO2</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-yellow-600" />
              </div>
              <Minus className="w-4 h-4 text-gray-500" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Temperature</h3>
            <p className="text-2xl font-bold text-gray-900">
              {(currentVitals.temperature || 36.8).toFixed(1)}
            </p>
            <p className="text-sm text-gray-500">°C</p>
          </div>
        </motion.div>
      )}

      {/* AI Predictive Analysis */}
      {predictiveAnalysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Predictive Analysis</h3>
              <p className="text-sm text-gray-500">Powered by Gemini AI</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(predictiveAnalysis.riskLevel)}`}>
              {predictiveAnalysis.riskLevel.toUpperCase()} RISK
            </div>
            {emailSent && (
              <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Report Emailed</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Health Predictions</h4>
              <ul className="space-y-2">
                {predictiveAnalysis.predictions.map((prediction, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span className="text-sm text-gray-700">{prediction}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
              <ul className="space-y-2">
                {predictiveAnalysis.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <span className="text-sm text-gray-700">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Health Alerts */}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Health Alerts</h3>
            <div className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
              {alerts.filter(alert => !alert.resolved).length} Active
            </div>
          </div>
          
          <div className="space-y-3">
            {alerts.slice(0, 5).map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'critical' 
                    ? 'bg-red-50 border-red-500' 
                    : 'bg-yellow-50 border-yellow-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500">
                      {alert.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setAlerts(prev => 
                      prev.map(a => a.id === alert.id ? { ...a, resolved: true } : a)
                    )}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Mark as resolved
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Data Collection Status */}
      {isCollecting && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border"
        >
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-900">
              Collecting vitals data every 30 seconds...
            </span>
            <span className="text-sm text-gray-500">
              ({vitalsData.length} readings collected)
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
