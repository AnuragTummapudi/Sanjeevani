'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation'
import { 
  MoreHorizontal,
  Users,
  Calendar,
  FileText,
  AlertTriangle,
  Plus,
  Filter,
  Download
} from 'lucide-react'

export default function Patients() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const patients = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 45,
      condition: 'Hypertension',
      lastVisit: '2024-01-15',
      status: 'Active',
      avatar: 'RK'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      age: 32,
      condition: 'Diabetes Type 2',
      lastVisit: '2024-01-12',
      status: 'Active',
      avatar: 'PS'
    },
    {
      id: 3,
      name: 'Amit Patel',
      age: 58,
      condition: 'Cardiovascular Disease',
      lastVisit: '2024-01-10',
      status: 'Follow-up',
      avatar: 'AP'
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      age: 28,
      condition: 'Asthma',
      lastVisit: '2024-01-08',
      status: 'Active',
      avatar: 'SR'
    }
  ]

  return (
    <main className="min-h-screen bg-gray-50" style={{ background: 'white', backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      <Navigation />

      {/* Main Content */}
      <div className="container mx-auto px-8 pt-20 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Patients</h1>
            <p className="text-gray-600">Manage your patient records and health data</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Patient</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <motion.div 
            className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl hover:bg-white/90 transition-all duration-300 group overflow-hidden"
            whileHover={{ scale: 1.02, y: -3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100/80 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-blue-200/80 transition-colors duration-300">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">1,247</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl hover:bg-white/90 transition-all duration-300 group overflow-hidden"
            whileHover={{ scale: 1.02, y: -3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100/80 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-green-200/80 transition-colors duration-300">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">24</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl hover:bg-white/90 transition-all duration-300 group overflow-hidden"
            whileHover={{ scale: 1.02, y: -3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400/20 via-yellow-400/20 to-red-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100/80 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-orange-200/80 transition-colors duration-300">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Pending Reports</p>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">12</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-2xl hover:bg-white/90 transition-all duration-300 group overflow-hidden"
            whileHover={{ scale: 1.02, y: -3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-400/20 via-pink-400/20 to-rose-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100/80 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-red-200/80 transition-colors duration-300">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Urgent Cases</p>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300">3</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Patients List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Patient Records</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Patient</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Age</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Condition</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Last Visit</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {patients.map((patient, index) => (
                  <motion.tr
                    key={patient.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {patient.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-600">ID: {patient.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{patient.age}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{patient.condition}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{patient.lastVisit}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
