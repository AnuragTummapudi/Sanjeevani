'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import VitalsMonitor from '../../components/VitalsMonitor'
import { Mail, Brain, Heart, AlertTriangle } from 'lucide-react'

export default function VitalsDemo() {
  const [activeTab, setActiveTab] = useState('monitor')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Health Monitoring Demo</h1>
              <p className="text-gray-600">AI-Powered Vitals Analysis with Email Reports</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">System Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('monitor')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'monitor'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Vitals Monitor</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'features'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>AI Features</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('alerts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'alerts'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Email Alerts</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {activeTab === 'monitor' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Demo Instructions */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Quick Demo Instructions</h3>
                  <p className="text-sm text-gray-600">Test the complete health monitoring and email system</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">1. Enable Demo Mode</h4>
                  <ol className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">1</span>
                      <span>Toggle "Demo Mode" to ON in the device status section</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">2</span>
                      <span>Demo alert buttons will appear below</span>
                    </li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">2. Test Email Alerts</h4>
                  <ol className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">1</span>
                      <span>Click any demo alert button (High BP, Low Oxygen, etc.)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">2</span>
                      <span>Check your email for immediate alert notification</span>
                    </li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">3. Test AI Analysis</h4>
                  <ol className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium">1</span>
                      <span>Click "Demo AI + Email" button</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-medium">2</span>
                      <span>Wait for AI analysis and check email for detailed report</span>
                    </li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">4. Complete Flow</h4>
                  <ol className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-medium">1</span>
                      <span>Start data collection normally</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-medium">2</span>
                      <span>Use demo buttons to trigger alerts</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-medium">3</span>
                      <span>Run AI analysis for comprehensive email report</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            
            <VitalsMonitor />
          </motion.div>
        )}

        {activeTab === 'features' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">AI Predictive Analysis</h3>
                  <p className="text-sm text-gray-500">Powered by Gemini 2.0 Flash</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Analysis Features</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Risk level assessment (Low/Medium/High)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Health trend predictions</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Personalized recommendations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Medical insights and patterns</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Email Reports</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Comprehensive health analysis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Professional HTML formatting</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Risk level visualization</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Actionable recommendations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email Service Integration</h3>
                  <p className="text-sm text-gray-500">Powered by Resend API</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Analysis Reports</h4>
                  <p className="text-sm text-gray-600">Detailed health analysis sent automatically after AI processing</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Health Alerts</h4>
                  <p className="text-sm text-gray-600">Immediate notifications for critical vitals readings</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Professional Format</h4>
                  <p className="text-sm text-gray-600">Medical-grade email templates with clear visual indicators</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'alerts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Health Alert System</h3>
                  <p className="text-sm text-gray-500">Automatic email notifications for critical health metrics</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Alert Thresholds</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <span className="font-medium text-red-900">Critical Alerts</span>
                        <p className="text-sm text-red-700">Always trigger email</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-red-900">BP > 140/90</div>
                        <div className="text-sm font-medium text-red-900">SpO2 < 92%</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <span className="font-medium text-yellow-900">Warning Alerts</span>
                        <p className="text-sm text-yellow-700">Trigger email for severe readings</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-yellow-900">HR > 120 BPM</div>
                        <div className="text-sm font-medium text-yellow-900">Temp > 38°C</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Email Features</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Immediate delivery for critical alerts</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Current vitals data included</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Professional medical formatting</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Emergency contact recommendations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">How to Test Email Features</h3>
                  <p className="text-sm text-gray-500">Follow these steps to see the email system in action</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">1. Analysis Email</h4>
                  <ol className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">1</span>
                      <span>Enter your email address in the input field</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">2</span>
                      <span>Start data collection and wait for 5+ readings</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">3</span>
                      <span>Click "AI Analysis" button</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">4</span>
                      <span>Check your email for the detailed health report</span>
                    </li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">2. Alert Emails</h4>
                  <ol className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">1</span>
                      <span>Start data collection</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">2</span>
                      <span>Wait for abnormal readings (high BP, low SpO2, etc.)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">3</span>
                      <span>System automatically sends alert emails</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium">4</span>
                      <span>Check your email for immediate health alerts</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
