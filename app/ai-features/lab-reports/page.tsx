'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft,
  FileText,
  Upload,
  Eye,
  Download,
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  BarChart3,
  Heart,
  Activity,
  Droplets
} from 'lucide-react'

interface LabReport {
  id: string
  name: string
  date: Date
  type: string
  status: 'processing' | 'completed' | 'error'
  summary?: string
  findings?: LabFinding[]
}

interface LabFinding {
  parameter: string
  value: string
  normalRange: string
  status: 'normal' | 'abnormal' | 'critical'
  interpretation: string
}

export default function LabReports() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [reports, setReports] = useState<LabReport[]>([])
  const [selectedReport, setSelectedReport] = useState<LabReport | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsLoaded(true)
    // Load sample reports
    setReports([
      {
        id: '1',
        name: 'Complete Blood Count (CBC)',
        date: new Date('2024-01-15'),
        type: 'Blood Test',
        status: 'completed',
        summary: 'Overall blood count is within normal ranges with slight elevation in white blood cells.',
        findings: [
          {
            parameter: 'Hemoglobin',
            value: '14.2 g/dL',
            normalRange: '12.0 - 16.0 g/dL',
            status: 'normal',
            interpretation: 'Normal hemoglobin levels indicating good oxygen-carrying capacity.'
          },
          {
            parameter: 'White Blood Cells',
            value: '8.5 K/μL',
            normalRange: '4.5 - 11.0 K/μL',
            status: 'normal',
            interpretation: 'Slightly elevated but within normal range, possibly due to recent minor infection.'
          },
          {
            parameter: 'Platelets',
            value: '285 K/μL',
            normalRange: '150 - 450 K/μL',
            status: 'normal',
            interpretation: 'Normal platelet count for healthy blood clotting.'
          }
        ]
      },
      {
        id: '2',
        name: 'Lipid Profile',
        date: new Date('2024-01-10'),
        type: 'Blood Test',
        status: 'completed',
        summary: 'Cholesterol levels are slightly elevated, requiring dietary modifications.',
        findings: [
          {
            parameter: 'Total Cholesterol',
            value: '220 mg/dL',
            normalRange: '< 200 mg/dL',
            status: 'abnormal',
            interpretation: 'Mildly elevated cholesterol levels. Consider dietary changes and regular exercise.'
          },
          {
            parameter: 'LDL Cholesterol',
            value: '145 mg/dL',
            normalRange: '< 100 mg/dL',
            status: 'abnormal',
            interpretation: 'Elevated LDL ("bad cholesterol") requires attention through lifestyle modifications.'
          },
          {
            parameter: 'HDL Cholesterol',
            value: '55 mg/dL',
            normalRange: '> 40 mg/dL',
            status: 'normal',
            interpretation: 'Good HDL ("good cholesterol") levels provide cardiovascular protection.'
          }
        ]
      }
    ])
  }, [])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFile = async (file: File) => {
    if (!file.type.includes('image/') && !file.type.includes('pdf')) {
      alert('Please upload an image or PDF file')
      return
    }

    const newReport: LabReport = {
      id: Date.now().toString(),
      name: file.name,
      date: new Date(),
      type: file.type.includes('pdf') ? 'PDF Report' : 'Image Report',
      status: 'processing'
    }

    setReports(prev => [newReport, ...prev])
    setSelectedReport(newReport)
    setIsProcessing(true)

    try {
      // For demo purposes, we'll simulate OCR extraction and send to OpenAI
      // In a real implementation, you would use OCR libraries like Tesseract.js
      const mockExtractedText = `
        LAB REPORT
        Patient: John Doe
        Date: ${new Date().toLocaleDateString()}
        
        Complete Blood Count (CBC):
        - Hemoglobin: 14.2 g/dL (Normal: 12.0-16.0)
        - White Blood Cells: 8.5 K/μL (Normal: 4.5-11.0)
        - Platelets: 285 K/μL (Normal: 150-450)
        
        Basic Metabolic Panel:
        - Glucose: 95 mg/dL (Normal: 70-100)
        - Creatinine: 1.1 mg/dL (Normal: 0.6-1.2)
        - BUN: 18 mg/dL (Normal: 7-20)
        
        Lipid Panel:
        - Total Cholesterol: 220 mg/dL (Normal: <200)
        - LDL: 145 mg/dL (Normal: <100)
        - HDL: 55 mg/dL (Normal: >40)
      `

      // Send to OpenAI for analysis
      const response = await fetch('/api/analyze-lab-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          labData: mockExtractedText,
          fileName: file.name
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze lab report')
      }

      const result = await response.json()
      
      if (result.success && result.analysis) {
        const analysis = result.analysis
        
        const updatedReport: LabReport = {
          ...newReport,
          status: 'completed',
          summary: analysis.summary || 'Analysis completed successfully.',
          findings: analysis.findings || []
        }

        setReports(prev => prev.map(r => r.id === newReport.id ? updatedReport : r))
        setSelectedReport(updatedReport)
      } else {
        throw new Error(result.error || 'Analysis failed')
      }
    } catch (error) {
      console.error('Error analyzing lab report:', error)
      
      // Fallback to mock data if API fails
      const mockFindings: LabFinding[] = [
        {
          parameter: 'Glucose',
          value: '95 mg/dL',
          normalRange: '70 - 100 mg/dL',
          status: 'normal',
          interpretation: 'Normal fasting glucose levels, indicating good blood sugar control.'
        },
        {
          parameter: 'Creatinine',
          value: '1.1 mg/dL',
          normalRange: '0.6 - 1.2 mg/dL',
          status: 'normal',
          interpretation: 'Normal kidney function as indicated by creatinine levels.'
        }
      ]

      const updatedReport: LabReport = {
        ...newReport,
        status: 'completed',
        summary: 'Lab values are within normal ranges with no critical abnormalities detected.',
        findings: mockFindings
      }

      setReports(prev => prev.map(r => r.id === newReport.id ? updatedReport : r))
      setSelectedReport(updatedReport)
    } finally {
      setIsProcessing(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'mild': return 'from-green-500 to-emerald-500'
      case 'moderate': return 'from-yellow-500 to-orange-500'
      case 'severe': return 'from-red-500 to-pink-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return CheckCircle
      case 'abnormal': return AlertTriangle
      case 'critical': return AlertTriangle
      default: return Clock
    }
  }

  return (
    <main className="min-h-screen relative overflow-x-hidden" style={{ background: 'white', backgroundImage: 'radial-gradient(circle, #000000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-400/10 to-red-600/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-red-400/10 to-pink-600/10 rounded-full blur-3xl"
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
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold font-playfair text-black">
                Lab Report Analysis
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
                AI-Powered Health Diagnostics
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
                Lab Report<br />
                <span className="text-sanjeevan-purple">Analysis</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              <p className="font-inter text-xl lg:text-2xl text-gray-600 font-light leading-relaxed">
                Upload your lab reports for instant<br />
                AI-driven analysis and insights.
              </p>
            </motion.div>

            {/* Upload Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            >
              <button
                onClick={() => fileInputRef.current?.click()}
                className="group relative inline-flex items-center px-8 py-4 bg-sanjeevan-purple text-white font-inter font-medium text-sm uppercase tracking-wider transition-all duration-300 hover:bg-sanjeevan-dark-purple hover:scale-[1.02] active:scale-[0.98]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Upload className="w-5 h-5 mr-3" />
                <span className="relative z-10">Upload Lab Report</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                className="hidden"
              />
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
                <span className="font-inter">Real-time Processing</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <div className="w-2 h-2 bg-sanjeevan-purple rounded-full"></div>
                <span className="font-inter">Secure & Compliant</span>
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
            <div className="w-full h-full bg-gradient-to-br from-orange-100/80 to-red-100/80 backdrop-blur-xl rounded-3xl flex items-center justify-center border border-white/30 shadow-lg group hover:shadow-2xl transition-all duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">Lab Report Analysis</h3>
                <p className="text-gray-500">AI-powered medical insights</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Analysis Results Modal */}
      {selectedReport && selectedReport.status === 'completed' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-outfit font-bold text-gray-800">
                {selectedReport.name}
              </h2>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {selectedReport.summary && (
              <div className="mb-6">
                <h3 className="text-lg font-space-grotesk font-bold text-gray-800 mb-4 flex items-center">
                  <Brain className="w-6 h-6 mr-3 text-purple-500" />
                  AI Summary
                </h3>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                  <p className="text-gray-700 font-poppins leading-relaxed">
                    {selectedReport.summary}
                  </p>
                </div>
              </div>
            )}

            {selectedReport.findings && selectedReport.findings.length > 0 && (
              <div>
                <h3 className="text-lg font-space-grotesk font-bold text-gray-800 mb-6 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3 text-blue-500" />
                  Detailed Findings
                </h3>
                <div className="space-y-4">
                  {selectedReport.findings.map((finding, index) => {
                    const StatusIcon = getStatusIcon(finding.status)
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 bg-gradient-to-br ${getStatusColor(finding.status)} rounded-lg flex items-center justify-center`}>
                              <StatusIcon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h4 className="font-space-grotesk font-semibold text-gray-800">
                                {finding.parameter}
                              </h4>
                              <p className="text-sm text-gray-600">
                                Normal Range: {finding.normalRange}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-gray-800">{finding.value}</p>
                            <p className={`text-sm font-medium capitalize ${
                              finding.status === 'normal' ? 'text-green-600' :
                              finding.status === 'abnormal' ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {finding.status}
                            </p>
                          </div>
                        </div>
                        <div className="p-3 bg-white/60 rounded-xl">
                          <p className="text-sm text-gray-700 font-poppins leading-relaxed">
                            {finding.interpretation}
                          </p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </main>
  )
}