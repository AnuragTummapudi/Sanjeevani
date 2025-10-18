'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation'
import {
  FileText, Calendar, Shield, Eye, Download, Search, Filter, 
  Clock, User, Stethoscope, Pill, Activity, TrendingUp,
  CheckCircle, AlertTriangle, Info, ExternalLink, Copy,
  Upload, File, Bot, Loader2, X
} from 'lucide-react'

export default function HealthHistory() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState('reports')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [aiSummaries, setAiSummaries] = useState<{[key: string]: string}>({})
  const [showUploadSection, setShowUploadSection] = useState(false)
  const [processingFiles, setProcessingFiles] = useState<{[key: string]: boolean}>({})

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const healthReports = [
    {
      id: 'RPT-001',
      title: 'Complete Blood Count (CBC)',
      date: '2024-03-15',
      doctor: 'Dr. Priya Sharma',
      type: 'Laboratory',
      status: 'completed',
      blockchainHash: '0x7a8b9c2d1e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0',
      fileUrl: '/reports/blood-test-mar-2024.pdf',
      summary: 'All blood parameters within normal ranges. No abnormalities detected.',
      recommendations: 'Continue current medication and maintain healthy lifestyle.',
      tests: [
        { name: 'Hemoglobin', value: '14.2 g/dL', normal: '12.0-16.0', status: 'normal' },
        { name: 'White Blood Cells', value: '7,500/μL', normal: '4,500-11,000', status: 'normal' },
        { name: 'Platelets', value: '280,000/μL', normal: '150,000-450,000', status: 'normal' },
        { name: 'Red Blood Cells', value: '4.5 million/μL', normal: '4.0-5.5', status: 'normal' }
      ]
    },
    {
      id: 'RPT-002',
      title: 'Electrocardiogram (ECG)',
      date: '2024-03-10',
      doctor: 'Dr. Arjun Patel',
      type: 'Cardiology',
      status: 'completed',
      blockchainHash: '0x9f8e7d6c5b4a3928374650192837465019283746501928374650192837465019',
      fileUrl: '/reports/ecg-mar-2024.pdf',
      summary: 'Normal sinus rhythm with no signs of arrhythmia or conduction abnormalities.',
      recommendations: 'Continue regular exercise and maintain heart-healthy diet.',
      tests: [
        { name: 'Heart Rate', value: '72 bpm', normal: '60-100', status: 'normal' },
        { name: 'PR Interval', value: '160 ms', normal: '120-200', status: 'normal' },
        { name: 'QRS Duration', value: '90 ms', normal: '80-120', status: 'normal' },
        { name: 'QT Interval', value: '380 ms', normal: '350-450', status: 'normal' }
      ]
    },
    {
      id: 'RPT-003',
      title: 'Chest X-Ray',
      date: '2024-02-28',
      doctor: 'Dr. Ananya Gupta',
      type: 'Radiology',
      status: 'completed',
      blockchainHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3',
      fileUrl: '/reports/xray-chest-feb-2024.pdf',
      summary: 'Clear lung fields with no signs of infection, fluid, or masses. Normal heart size and mediastinal structures.',
      recommendations: 'No immediate follow-up required. Continue regular health monitoring.',
      tests: [
        { name: 'Lung Fields', value: 'Clear', normal: 'Clear', status: 'normal' },
        { name: 'Heart Size', value: 'Normal', normal: 'Normal', status: 'normal' },
        { name: 'Pleural Spaces', value: 'Clear', normal: 'Clear', status: 'normal' },
        { name: 'Bony Structures', value: 'Intact', normal: 'Intact', status: 'normal' }
      ]
    },
    {
      id: 'RPT-004',
      title: 'MRI Brain Scan',
      date: '2024-02-20',
      doctor: 'Dr. Vikram Singh',
      type: 'Radiology',
      status: 'completed',
      blockchainHash: '0x5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7',
      fileUrl: '/reports/mri-brain-feb-2024.pdf',
      summary: 'Normal brain structure with no evidence of lesions, masses, or abnormalities.',
      recommendations: 'Continue current treatment plan. No neurological concerns identified.',
      tests: [
        { name: 'Brain Structure', value: 'Normal', normal: 'Normal', status: 'normal' },
        { name: 'White Matter', value: 'Intact', normal: 'Intact', status: 'normal' },
        { name: 'Ventricular System', value: 'Normal', normal: 'Normal', status: 'normal' },
        { name: 'Cerebellum', value: 'Normal', normal: 'Normal', status: 'normal' }
      ]
    }
  ]

  const pastVisits = [
    {
      id: 'VIS-001',
      date: '2024-03-15',
      time: '10:30 AM',
      doctor: 'Dr. Priya Sharma',
      specialty: 'Cardiology',
      hospital: 'Apollo Hospital',
      reason: 'Routine Checkup',
      diagnosis: 'Hypertension - Well Controlled',
      prescription: 'Continue current medication',
      followUp: '2024-04-15',
      blockchainHash: '0x8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0',
      status: 'completed'
    },
    {
      id: 'VIS-002',
      date: '2024-03-10',
      time: '2:15 PM',
      doctor: 'Dr. Arjun Patel',
      specialty: 'Pulmonology',
      hospital: 'Apollo Hospital',
      reason: 'Cough and Chest Pain',
      diagnosis: 'Mild Respiratory Infection',
      prescription: 'Antibiotics and Cough Syrup',
      followUp: '2024-03-17',
      blockchainHash: '0x2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3',
      status: 'completed'
    },
    {
      id: 'VIS-003',
      date: '2024-02-28',
      time: '9:00 AM',
      doctor: 'Dr. Ananya Gupta',
      specialty: 'Orthopedics',
      hospital: 'Apollo Hospital',
      reason: 'Knee Pain',
      diagnosis: 'Mild Arthritis',
      prescription: 'Pain Management and Physiotherapy',
      followUp: '2024-03-14',
      blockchainHash: '0x6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8',
      status: 'completed'
    },
    {
      id: 'VIS-004',
      date: '2024-02-20',
      time: '11:45 AM',
      doctor: 'Dr. Vikram Singh',
      specialty: 'Neurology',
      hospital: 'Apollo Hospital',
      reason: 'Headache Evaluation',
      diagnosis: 'Tension Headache',
      prescription: 'Stress Management and Pain Relief',
      followUp: '2024-03-06',
      blockchainHash: '0x9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1',
      status: 'completed'
    }
  ]

  const blockchainProofs = [
    {
      id: 'BP-001',
      reportId: 'RPT-001',
      visitId: 'VIS-001',
      timestamp: '2024-03-15 10:45:23',
      blockNumber: 18472938,
      transactionHash: '0x7a8b9c2d1e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0',
      gasUsed: '21000',
      verificationStatus: 'verified',
      ipfsHash: 'QmXxYyZz123456789abcdefghijklmnopqrstuvwxyz',
      dataIntegrity: 'intact'
    },
    {
      id: 'BP-002',
      reportId: 'RPT-002',
      visitId: 'VIS-002',
      timestamp: '2024-03-10 14:30:15',
      blockNumber: 18471945,
      transactionHash: '0x9f8e7d6c5b4a3928374650192837465019283746501928374650192837465019',
      gasUsed: '21500',
      verificationStatus: 'verified',
      ipfsHash: 'QmAbCdEf987654321zyxwvutsrqponmlkjihgfedcba',
      dataIntegrity: 'intact'
    },
    {
      id: 'BP-003',
      reportId: 'RPT-003',
      visitId: 'VIS-003',
      timestamp: '2024-02-28 09:15:42',
      blockNumber: 18468923,
      transactionHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3',
      gasUsed: '20800',
      verificationStatus: 'verified',
      ipfsHash: 'QmMnBvCx0987654321qwertyuiopasdfghjklzxcvbnm',
      dataIntegrity: 'intact'
    },
    {
      id: 'BP-004',
      reportId: 'RPT-004',
      visitId: 'VIS-004',
      timestamp: '2024-02-20 12:00:08',
      blockNumber: 18467291,
      transactionHash: '0x5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7',
      gasUsed: '21200',
      verificationStatus: 'verified',
      ipfsHash: 'QmPoIuYt1234567890zxcvbnmasdfghjklqwertyuiop',
      dataIntegrity: 'intact'
    }
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    setUploading(true)
    setUploadedFiles(prev => [...prev, ...files])

    // Process each file for AI summary
    for (const file of files) {
      setProcessingFiles(prev => ({ ...prev, [file.name]: true }))
      try {
        await generateAISummary(file)
      } catch (error) {
        console.error('Error generating AI summary:', error)
      } finally {
        setProcessingFiles(prev => ({ ...prev, [file.name]: false }))
      }
    }

    setUploading(false)
  }

  const generateAISummary = async (file: File) => {
    try {
      // Create a mock medical report content based on file name
      const mockContent = generateMockReportContent(file.name)
      
      const response = await fetch('/api/analyze-lab-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          fileSize: file.size,
          contentType: file.type,
          content: mockContent // In real implementation, this would be OCR text extraction
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setAiSummaries(prev => ({
          ...prev,
          [file.name]: data.summary
        }))
      } else {
        // Fallback summary if API fails
        setAiSummaries(prev => ({
          ...prev,
          [file.name]: `AI Summary for ${file.name}: This medical report has been uploaded and is ready for review. The document contains important health information that should be discussed with your healthcare provider.`
        }))
      }
    } catch (error) {
      console.error('Error generating AI summary:', error)
      setAiSummaries(prev => ({
        ...prev,
        [file.name]: `AI Summary for ${file.name}: Report uploaded successfully. Please consult with your doctor for detailed analysis.`
      }))
    }
  }

  const generateMockReportContent = (fileName: string) => {
    const lowerName = fileName.toLowerCase()
    const currentDate = new Date().toLocaleDateString()
    
    if (lowerName.includes('blood') || lowerName.includes('cbc') || lowerName.includes('pathology')) {
      return `COMPLETE BLOOD COUNT (CBC) REPORT
Patient Name: Rajesh Kumar
Age: 45 years
Date of Test: ${currentDate}
Lab: Sterling Accuris Pathology

TEST RESULTS:
Hemoglobin: 13.8 g/dL (Normal: 12.0-16.0) - NORMAL
White Blood Cells: 8,200/μL (Normal: 4,500-11,000) - NORMAL
Platelets: 275,000/μL (Normal: 150,000-450,000) - NORMAL
Red Blood Cells: 4.6 million/μL (Normal: 4.0-5.5) - NORMAL
Hematocrit: 42% (Normal: 36-46%) - NORMAL

SUMMARY: All blood parameters are within normal ranges. No abnormalities detected. Patient appears to be in good health based on these results.

RECOMMENDATIONS: Continue regular health monitoring and maintain current lifestyle habits.`
    } else if (lowerName.includes('ecg') || lowerName.includes('heart') || lowerName.includes('cardiac')) {
      return `ELECTROCARDIOGRAM (ECG) REPORT
Patient Name: Rajesh Kumar
Age: 45 years
Date of Test: ${currentDate}
Hospital: Apollo Hospital

FINDINGS:
Heart Rate: 68 bpm (Normal: 60-100)
Rhythm: Normal sinus rhythm
PR Interval: 160 ms (Normal: 120-200)
QRS Duration: 88 ms (Normal: 80-120)
QT Interval: 380 ms (Normal: 350-450)
Axis: Normal

INTERPRETATION: Normal ECG with no signs of arrhythmia or conduction abnormalities. Heart function appears normal.

RECOMMENDATIONS: Continue regular exercise and maintain heart-healthy diet.`
    } else if (lowerName.includes('xray') || lowerName.includes('chest') || lowerName.includes('radiology')) {
      return `CHEST X-RAY REPORT
Patient Name: Rajesh Kumar
Age: 45 years
Date of Test: ${currentDate}
Hospital: Apollo Hospital

FINDINGS:
Lung fields: Clear bilaterally, no consolidation or effusion
Heart size: Normal cardiothoracic ratio
Mediastinal structures: Unremarkable
Bony structures: Intact, no fractures
Diaphragm: Normal position and contour

IMPRESSION: Normal chest X-ray with no acute findings.

RECOMMENDATIONS: No immediate follow-up required for chest imaging.`
    } else if (lowerName.includes('urine') || lowerName.includes('urinalysis')) {
      return `URINALYSIS REPORT
Patient Name: Rajesh Kumar
Age: 45 years
Date of Test: ${currentDate}
Lab: Sterling Accuris Pathology

RESULTS:
Color: Yellow (Normal)
Appearance: Clear (Normal)
Specific Gravity: 1.015 (Normal: 1.003-1.030)
pH: 6.5 (Normal: 5.0-8.0)
Protein: Negative (Normal)
Glucose: Negative (Normal)
Blood: Negative (Normal)
White Blood Cells: 0-2/hpf (Normal: 0-5)

SUMMARY: Normal urinalysis with no signs of infection or kidney problems.

RECOMMENDATIONS: Continue adequate hydration and regular health monitoring.`
    } else {
      return `MEDICAL REPORT SUMMARY
Patient Name: Rajesh Kumar
Age: 45 years
Date of Report: ${currentDate}
Report Type: General Health Assessment

OVERVIEW: This medical report contains important health information for patient Rajesh Kumar. The document has been securely uploaded and is ready for review by healthcare providers.

STATUS: Report successfully processed and stored in patient's health profile.

RECOMMENDATIONS: Please consult with your healthcare provider to discuss the findings and any necessary follow-up care.`
    }
  }

  const removeFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(file => file.name !== fileName))
    setAiSummaries(prev => {
      const newSummaries = { ...prev }
      delete newSummaries[fileName]
      return newSummaries
    })
    setProcessingFiles(prev => {
      const newProcessing = { ...prev }
      delete newProcessing[fileName]
      return newProcessing
    })
  }

  const formatAIResponse = (summary: string) => {
    // Clean and structure the AI response
    const sections = {
      summary: '',
      keyPoints: [],
      recommendations: [],
      nextSteps: []
    }

    const lines = summary.split('\n').filter(line => line.trim())
    let currentSection = ''

    for (const line of lines) {
      const trimmedLine = line.trim()
      
      // Detect section headers
      if (trimmedLine.toLowerCase().includes('summary:') && !sections.summary) {
        // Extract summary content
        const summaryContent = trimmedLine.replace(/summary:\s*/i, '').trim()
        if (summaryContent) {
          sections.summary = summaryContent
        }
        currentSection = 'summary'
        continue
      } else if (trimmedLine.toLowerCase().includes('what we found:')) {
        currentSection = 'keyPoints'
        continue
      } else if (trimmedLine.toLowerCase().includes('what you should do:')) {
        currentSection = 'recommendations'
        continue
      }

      // Process content based on current section
      if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
        const cleanPoint = trimmedLine.substring(1).trim()
        if (cleanPoint.length > 5) {
          if (currentSection === 'keyPoints') {
            sections.keyPoints.push(cleanPoint)
          } else if (currentSection === 'recommendations') {
            sections.recommendations.push(cleanPoint)
          }
        }
      } else if (trimmedLine.length > 20 && currentSection === 'summary' && !sections.summary) {
        sections.summary = trimmedLine
      }
    }

    // If no structured content found, provide fallback
    if (!sections.summary && sections.keyPoints.length === 0) {
      sections.summary = 'Your medical report has been successfully analyzed and uploaded to your health profile.'
      sections.keyPoints = [
        'Report has been securely stored in your health records',
        'All information is ready for your doctor to review',
        'Your health data is protected and accessible'
      ]
      sections.recommendations = [
        'Share this report with your healthcare provider',
        'Keep a copy for your personal records',
        'Follow any specific instructions mentioned in the report'
      ]
      sections.nextSteps = [
        'Schedule an appointment to discuss the results with your doctor',
        'Continue following your current health routine',
        'Ask your doctor any questions about the findings'
      ]
    }

    return sections
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
              <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-4">Health History</h1>
              <p className="text-lg text-gray-600 font-inter">Complete medical records, blockchain verification, and visit history</p>
            </div>
            <motion.button
              onClick={() => setShowUploadSection(!showUploadSection)}
              className="flex items-center space-x-2 px-6 py-3 bg-sanjeevan-purple text-white rounded-full font-inter font-medium hover:bg-purple-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Upload className="w-5 h-5" />
              <span>Upload Report</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Upload Section */}
        {showUploadSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mb-8 bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Upload Medical Reports</span>
              </h3>
              <button
                onClick={() => setShowUploadSection(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-sanjeevan-purple transition-colors duration-300">
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={uploading}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center space-y-4"
              >
                <div className="p-4 bg-sanjeevan-purple/10 rounded-full">
                  <Upload className="w-8 h-8 text-sanjeevan-purple" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    {uploading ? 'Processing files...' : 'Click to upload medical reports'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports PDF, JPG, PNG, DOC, DOCX files
                  </p>
                </div>
                {uploading && (
                  <div className="flex items-center justify-center space-x-2 text-sanjeevan-purple bg-purple-50/50 rounded-lg p-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <div className="text-center">
                      <p className="text-sm font-medium">Processing Reports</p>
                      <p className="text-xs text-purple-600">AI is analyzing your medical documents...</p>
                    </div>
                  </div>
                )}
              </label>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6 space-y-4">
                <h4 className="text-lg font-medium text-gray-900">Uploaded Reports</h4>
                {uploadedFiles.map((file, index) => (
                  <motion.div
                    key={file.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50/70 backdrop-blur-sm rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <File className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(file.name)}
                        className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                    
                    {/* Processing Status */}
                    {processingFiles[file.name] && (
                      <div className="bg-blue-50/80 backdrop-blur-sm rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center space-x-3">
                          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                          <div>
                            <p className="font-medium text-blue-900">Processing Report</p>
                            <p className="text-sm text-blue-700">AI is analyzing your medical report...</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* AI Summary */}
                    {aiSummaries[file.name] && !processingFiles[file.name] && (
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center space-x-2 mb-4">
                          <Bot className="w-5 h-5 text-sanjeevan-purple" />
                          <span className="font-medium text-gray-900">AI Analysis Summary</span>
                          <div className="ml-auto px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            Complete
                          </div>
                        </div>
                        
                        {(() => {
                          const formattedResponse = formatAIResponse(aiSummaries[file.name])
                          
                          return (
                            <div className="space-y-3">
                              {/* Summary */}
                              {formattedResponse.summary && (
                                <div className="bg-blue-50/70 rounded-lg p-3 border border-blue-200">
                                  <p className="text-sm text-blue-800 leading-relaxed font-medium">
                                    {formattedResponse.summary}
                                  </p>
                                </div>
                              )}

                              {/* Key Points */}
                              {formattedResponse.keyPoints.length > 0 && (
                                <div className="bg-green-50/70 rounded-lg p-3 border border-green-200">
                                  <h4 className="font-semibold text-green-900 mb-2 flex items-center space-x-2">
                                    <CheckCircle className="w-4 h-4" />
                                    <span>What We Found</span>
                                  </h4>
                                  <ul className="space-y-1">
                                    {formattedResponse.keyPoints.slice(0, 3).map((point, idx) => (
                                      <li key={idx} className="text-sm text-green-800 flex items-start space-x-2">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>{point}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Recommendations */}
                              {formattedResponse.recommendations.length > 0 && (
                                <div className="bg-purple-50/70 rounded-lg p-3 border border-purple-200">
                                  <h4 className="font-semibold text-purple-900 mb-2 flex items-center space-x-2">
                                    <Stethoscope className="w-4 h-4" />
                                    <span>What You Should Do</span>
                                  </h4>
                                  <ul className="space-y-1">
                                    {formattedResponse.recommendations.slice(0, 3).map((rec, idx) => (
                                      <li key={idx} className="text-sm text-purple-800 flex items-start space-x-2">
                                        <span className="text-purple-600 mt-1">→</span>
                                        <span>{rec}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Next Steps */}
                              {formattedResponse.nextSteps.length > 0 && (
                                <div className="bg-indigo-50/70 rounded-lg p-3 border border-indigo-200">
                                  <h4 className="font-semibold text-indigo-900 mb-2 flex items-center space-x-2">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>Next Steps</span>
                                  </h4>
                                  <ul className="space-y-1">
                                    {formattedResponse.nextSteps.slice(0, 2).map((step, idx) => (
                                      <li key={idx} className="text-sm text-indigo-800 flex items-start space-x-2">
                                        <span className="text-indigo-600 mt-1">→</span>
                                        <span>{step}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )
                        })()}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}


        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex space-x-1 mb-8"
        >
          {[
            { id: 'reports', label: 'Medical Reports', icon: FileText },
            { id: 'visits', label: 'Past Visits', icon: Calendar },
            { id: 'blockchain', label: 'Blockchain Proof', icon: Shield }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-sanjeevan-purple text-white shadow-lg'
                  : 'bg-white/60 backdrop-blur-sm text-gray-600 hover:bg-white/80 hover:text-gray-800'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        {activeTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {healthReports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-200 group hover:shadow-2xl transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{report.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{report.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{report.doctor}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        normal
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        routine
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {report.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      onClick={() => copyToClipboard(report.blockchainHash)}
                    >
                      <Shield className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Test Results */}
                <div className="space-y-3 mb-4">
                  {report.tests && report.tests.slice(0, 3).map((test, testIndex) => (
                    <div key={testIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{test.name}</p>
                        <p className="text-xs text-gray-500">Normal: {test.normal}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{test.value}</p>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                          normal
                        </span>
                      </div>
                    </div>
                  ))}
                  {report.tests && report.tests.length > 3 && (
                    <p className="text-sm text-gray-500 text-center">
                      +{report.tests.length - 3} more tests
                    </p>
                  )}
                </div>

                {/* Summary and Recommendations */}
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Summary:</strong> {report.summary}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Recommendations:</strong> {report.recommendations || 'Continue current treatment plan and maintain regular monitoring.'}
                  </p>
                </div>

                {/* Blockchain Verification */}
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">Blockchain Verified</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'visits' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
          >
            {pastVisits.map((visit, index) => (
              <motion.div
                key={visit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{
                  scale: 1.01,
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 group hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit #{visit.id}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{visit.date} at {visit.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <User className="w-4 h-4" />
                            <span>{visit.doctor} - {visit.specialty}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Stethoscope className="w-4 h-4" />
                            <span>{visit.hospital}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Reason:</span>
                            <span className="text-gray-600 ml-2">{visit.reason}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Diagnosis:</span>
                            <span className="text-gray-600 ml-2">{visit.diagnosis}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Follow-up:</span>
                            <span className="text-blue-600 ml-2">{visit.followUp}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50/70 backdrop-blur-sm rounded-lg p-3 border border-gray-200">
                        <span className="font-medium text-gray-700">Prescription:</span>
                        <span className="text-gray-600 ml-2">{visit.prescription}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                        onClick={() => copyToClipboard(visit.blockchainHash)}
                      >
                        <Shield className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                  <div className="bg-green-50/70 backdrop-blur-sm rounded-lg p-3 border border-green-200">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">Blockchain Verified</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'blockchain' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
          >
            {blockchainProofs.map((proof, index) => (
              <motion.div
                key={proof.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{
                  scale: 1.01,
                  y: -5,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/30 group hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400/20 via-indigo-400/20 to-blue-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Blockchain Proof #{proof.id}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{proof.timestamp}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <TrendingUp className="w-4 h-4" />
                            <span>Block #{proof.blockNumber}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Activity className="w-4 h-4" />
                            <span>Gas Used: {proof.gasUsed}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Report ID:</span>
                            <span className="text-gray-600 ml-2">{proof.reportId}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">Visit ID:</span>
                            <span className="text-gray-600 ml-2">{proof.visitId}</span>
                          </div>
                          <div className="text-sm">
                            <span className="font-medium text-gray-700">IPFS Hash:</span>
                            <span className="text-blue-600 ml-2 font-mono text-xs">{proof.ipfsHash}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50/70 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-700">Transaction Hash:</span>
                          <button
                            onClick={() => copyToClipboard(proof.transactionHash)}
                            className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-xs font-mono text-gray-600 break-all">{proof.transactionHash}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50/70 backdrop-blur-sm rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-700">Data Integrity: {proof.dataIntegrity}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-green-600">Immutable Record</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  )
}
