'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation'
import {
  Shield, Lock, Eye, EyeOff, Smartphone, Monitor, Database,
  Users, Bell, BellOff, Download, Upload, Trash2, Key,
  Globe, Wifi, WifiOff, CheckCircle, AlertTriangle, Info,
  Settings as SettingsIcon, User, Mail, Phone, MapPin, Calendar, Save, Clock
} from 'lucide-react'

export default function Settings() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState('privacy')
  const [showPasswords, setShowPasswords] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    reminders: true,
    alerts: false
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const settingsSections = [
    { id: 'privacy', label: 'Data Privacy', icon: Shield },
    { id: 'access', label: 'Access Controls', icon: Lock },
    { id: 'devices', label: 'Device Sync', icon: Smartphone },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'account', label: 'Account', icon: User }
  ]

  const privacySettings = {
    dataRetention: '2 years',
    dataSharing: false,
    analytics: true,
    marketing: false,
    blockchainStorage: true,
    encryptionLevel: 'AES-256',
    backupFrequency: 'Daily'
  }

  const accessControls = [
    {
      id: 'biometric',
      name: 'Biometric Authentication',
      description: 'Use fingerprint or face recognition',
      enabled: true,
      icon: Shield
    },
    {
      id: 'twoFactor',
      name: 'Two-Factor Authentication',
      description: 'Require additional verification',
      enabled: true,
      icon: Key
    },
    {
      id: 'sessionTimeout',
      name: 'Session Timeout',
      description: 'Auto-logout after inactivity',
      enabled: true,
      timeout: '30 minutes',
      icon: Clock
    },
    {
      id: 'ipWhitelist',
      name: 'IP Whitelist',
      description: 'Restrict access to specific locations',
      enabled: false,
      icon: Globe
    }
  ]

  const syncedDevices = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      type: 'mobile',
      lastSync: '2024-03-15 10:30 AM',
      status: 'connected',
      location: 'Mumbai, India'
    },
    {
      id: '2',
      name: 'MacBook Pro',
      type: 'desktop',
      lastSync: '2024-03-15 09:15 AM',
      status: 'connected',
      location: 'Mumbai, India'
    },
    {
      id: '3',
      name: 'iPad Air',
      type: 'tablet',
      lastSync: '2024-03-14 08:45 PM',
      status: 'offline',
      location: 'Delhi, India'
    }
  ]

  const accountInfo = {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91 98765 43210',
    address: '123 MG Road, Mumbai, Maharashtra 400001',
    joinDate: '2023-01-15',
    lastLogin: '2024-03-15 10:30 AM'
  }

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleAccessControlToggle = (id: string) => {
    // Handle access control toggle logic
    console.log(`Toggle ${id}`)
  }

  const handleDeviceAction = (deviceId: string, action: string) => {
    console.log(`${action} device ${deviceId}`)
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile': return Smartphone
      case 'desktop': return Monitor
      case 'tablet': return Monitor
      default: return Smartphone
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100'
      case 'offline': return 'text-gray-600 bg-gray-100'
      case 'syncing': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
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
          <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-4">Settings</h1>
          <p className="text-lg text-gray-600 font-inter">Manage your account, privacy, and device preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 group hover:shadow-2xl transition-all duration-300 overflow-hidden sticky top-32">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Settings</h3>
                <nav className="space-y-2">
                  {settingsSections.map((section) => (
                    <motion.button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
                        activeSection === section.id
                          ? 'bg-sanjeevan-purple text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <section.icon className="w-5 h-5" />
                      <span className="font-medium">{section.label}</span>
                    </motion.button>
                  ))}
                </nav>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Data Privacy */}
            {activeSection === 'privacy' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 group hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Data Privacy & Security</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Data Retention</h4>
                            <p className="text-sm text-gray-600">How long we keep your data</p>
                          </div>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {privacySettings.dataRetention}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Data Sharing</h4>
                            <p className="text-sm text-gray-600">Share data with third parties</p>
                          </div>
                          <div className={`w-12 h-6 rounded-full ${privacySettings.dataSharing ? 'bg-red-500' : 'bg-gray-300'} transition-colors`}>
                            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${privacySettings.dataSharing ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`}></div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Blockchain Storage</h4>
                            <p className="text-sm text-gray-600">Store medical records on blockchain</p>
                          </div>
                          <div className={`w-12 h-6 rounded-full ${privacySettings.blockchainStorage ? 'bg-green-500' : 'bg-gray-300'} transition-colors`}>
                            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${privacySettings.blockchainStorage ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`}></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Encryption Level</h4>
                            <p className="text-sm text-gray-600">Data encryption standard</p>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            {privacySettings.encryptionLevel}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Backup Frequency</h4>
                            <p className="text-sm text-gray-600">How often data is backed up</p>
                          </div>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {privacySettings.backupFrequency}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">Analytics</h4>
                            <p className="text-sm text-gray-600">Help improve our service</p>
                          </div>
                          <div className={`w-12 h-6 rounded-full ${privacySettings.analytics ? 'bg-green-500' : 'bg-gray-300'} transition-colors`}>
                            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${privacySettings.analytics ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Access Controls */}
            {activeSection === 'access' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 group hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400/20 via-indigo-400/20 to-blue-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Access Controls</h2>
                    
                    <div className="space-y-4">
                      {accessControls.map((control) => (
                        <motion.div
                          key={control.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <control.icon className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{control.name}</h4>
                              <p className="text-sm text-gray-600">{control.description}</p>
                              {control.timeout && (
                                <p className="text-xs text-blue-600 mt-1">Timeout: {control.timeout}</p>
                              )}
                            </div>
                          </div>
                          <div className={`w-12 h-6 rounded-full ${control.enabled ? 'bg-green-500' : 'bg-gray-300'} transition-colors`}>
                            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${control.enabled ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`}></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Device Sync */}
            {activeSection === 'devices' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 group hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400/20 via-yellow-400/20 to-red-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-semibold text-gray-900">Connected Devices</h2>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Wifi className="w-4 h-4" />
                        <span>Sync Now</span>
                      </motion.button>
                    </div>
                    
                    <div className="space-y-4">
                      {syncedDevices.map((device) => {
                        const DeviceIcon = getDeviceIcon(device.type)
                        return (
                          <motion.div
                            key={device.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                <DeviceIcon className="w-6 h-6 text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{device.name}</h4>
                                <p className="text-sm text-gray-600">Last sync: {device.lastSync}</p>
                                <p className="text-xs text-gray-500">{device.location}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                                {device.status}
                              </span>
                              <div className="flex space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDeviceAction(device.id, 'sync')}
                                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                                >
                                  <Upload className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDeviceAction(device.id, 'remove')}
                                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifications */}
            {activeSection === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 group hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                    
                    <div className="space-y-4">
                      {Object.entries(notifications).map(([key, value]) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                              <Bell className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
                              <p className="text-sm text-gray-600">
                                {key === 'email' && 'Receive notifications via email'}
                                {key === 'sms' && 'Receive SMS notifications'}
                                {key === 'push' && 'Receive push notifications'}
                                {key === 'reminders' && 'Medication and appointment reminders'}
                                {key === 'alerts' && 'Emergency and health alerts'}
                              </p>
                            </div>
                          </div>
                          <div 
                            className={`w-12 h-6 rounded-full ${value ? 'bg-green-500' : 'bg-gray-300'} transition-colors cursor-pointer`}
                            onClick={() => handleNotificationToggle(key)}
                          >
                            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`}></div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Account */}
            {activeSection === 'account' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 group hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Account Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                          <User className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="text-sm text-gray-600">Full Name</p>
                            <p className="font-medium text-gray-900">{accountInfo.name}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                          <Mail className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium text-gray-900">{accountInfo.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                          <Phone className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="font-medium text-gray-900">{accountInfo.phone}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                          <MapPin className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="text-sm text-gray-600">Address</p>
                            <p className="font-medium text-gray-900">{accountInfo.address}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                          <Calendar className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="text-sm text-gray-600">Member Since</p>
                            <p className="font-medium text-gray-900">{accountInfo.joinDate}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-sm text-gray-600">Last Login</p>
                            <p className="font-medium text-gray-900">{accountInfo.lastLogin}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-6 py-3 bg-sanjeevan-purple text-white rounded-lg hover:bg-sanjeevan-dark-purple transition-colors"
                      >
                        <Save className="w-5 h-5" />
                        <span>Save Changes</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        <span>Export Data</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
