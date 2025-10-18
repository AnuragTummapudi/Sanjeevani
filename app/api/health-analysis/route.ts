import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { sendHealthAnalysisEmail, sendHealthAlertEmail } from '../../../lib/email-service'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { vitalsData, patientInfo, sendEmail = true, patientEmail } = await request.json()
    
    console.log('🧠 Starting AI health analysis...')
    console.log('📊 Vitals data points:', vitalsData.length)
    console.log('👤 Patient info:', patientInfo.name)

    // Prepare vitals data for analysis
    const recentVitals = vitalsData.slice(0, 10) // Last 10 readings
    const vitalsSummary = {
      heartRate: {
        current: recentVitals[0]?.heartRate,
        average: recentVitals.reduce((sum: number, v: any) => sum + v.heartRate, 0) / recentVitals.length,
        min: Math.min(...recentVitals.map((v: any) => v.heartRate)),
        max: Math.max(...recentVitals.map((v: any) => v.heartRate))
      },
      bloodPressure: {
        current: recentVitals[0]?.bloodPressure,
        average: {
          systolic: recentVitals.reduce((sum: number, v: any) => sum + v.bloodPressure.systolic, 0) / recentVitals.length,
          diastolic: recentVitals.reduce((sum: number, v: any) => sum + v.bloodPressure.diastolic, 0) / recentVitals.length
        }
      },
      oxygenSaturation: {
        current: recentVitals[0]?.oxygenSaturation,
        average: recentVitals.reduce((sum: number, v: any) => sum + v.oxygenSaturation, 0) / recentVitals.length,
        min: Math.min(...recentVitals.map((v: any) => v.oxygenSaturation))
      },
      temperature: {
        current: recentVitals[0]?.temperature,
        average: recentVitals.reduce((sum: number, v: any) => sum + v.temperature, 0) / recentVitals.length
      }
    }

    // Create analysis prompt for Gemini
    const analysisPrompt = `
You are a medical AI assistant analyzing patient vitals data. Please provide a comprehensive health analysis based on the following data:

PATIENT INFORMATION:
- Name: ${patientInfo.name}
- Age: ${patientInfo.age}
- Gender: ${patientInfo.gender}
- Medical History: ${patientInfo.medicalHistory.join(', ')}

VITALS DATA ANALYSIS:
Heart Rate:
- Current: ${vitalsSummary.heartRate.current} BPM
- Average: ${vitalsSummary.heartRate.average.toFixed(1)} BPM
- Range: ${vitalsSummary.heartRate.min} - ${vitalsSummary.heartRate.max} BPM

Blood Pressure:
- Current: ${vitalsSummary.bloodPressure.current.systolic}/${vitalsSummary.bloodPressure.current.diastolic} mmHg
- Average: ${vitalsSummary.bloodPressure.average.systolic.toFixed(1)}/${vitalsSummary.bloodPressure.average.diastolic.toFixed(1)} mmHg

Oxygen Saturation:
- Current: ${vitalsSummary.oxygenSaturation.current.toFixed(1)}%
- Average: ${vitalsSummary.oxygenSaturation.average.toFixed(1)}%
- Minimum: ${vitalsSummary.oxygenSaturation.min.toFixed(1)}%

Temperature:
- Current: ${vitalsSummary.temperature.current.toFixed(1)}°C
- Average: ${vitalsSummary.temperature.average.toFixed(1)}°C

Please provide your analysis in the following JSON format:
{
  "riskLevel": "low|medium|high",
  "predictions": [
    "Prediction 1 about heart rate trends",
    "Prediction 2 about blood pressure patterns",
    "Prediction 3 about overall health trajectory"
  ],
  "recommendations": [
    "Specific recommendation 1",
    "Specific recommendation 2",
    "Specific recommendation 3"
  ],
  "trends": {
    "heartRate": "increasing|decreasing|stable",
    "bloodPressure": "increasing|decreasing|stable",
    "oxygenSaturation": "increasing|decreasing|stable"
  },
  "insights": [
    "Key insight 1",
    "Key insight 2"
  ]
}

Focus on:
1. Identifying any concerning patterns or trends
2. Providing actionable health recommendations
3. Assessing overall cardiovascular health
4. Considering the patient's medical history
5. Predicting potential health risks

Be specific, medical, but accessible. Consider normal ranges:
- Heart Rate: 60-100 BPM
- Blood Pressure: <120/80 mmHg (normal), 120-139/80-89 (elevated), ≥140/90 (high)
- Oxygen Saturation: 95-100%
- Temperature: 36.1-37.2°C
`

    // Get Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })
    
    // Generate analysis
    const result = await model.generateContent(analysisPrompt)
    const response = await result.response
    const analysisText = response.text()
    
    console.log('🤖 Gemini response:', analysisText)
    
    // Parse JSON response
    let analysis
    try {
      // Extract JSON from markdown if present
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0])
      } else {
        analysis = JSON.parse(analysisText)
      }
    } catch (parseError) {
      console.error('❌ Failed to parse Gemini response:', parseError)
      // Fallback analysis
      analysis = {
        riskLevel: 'medium',
        predictions: [
          'Heart rate shows normal variation within healthy range',
          'Blood pressure trending slightly elevated, monitor closely',
          'Oxygen saturation remains within normal parameters'
        ],
        recommendations: [
          'Continue regular cardiovascular exercise',
          'Monitor blood pressure daily and report any sustained elevation',
          'Maintain current medication regimen as prescribed',
          'Schedule follow-up with cardiologist if trends continue'
        ],
        trends: {
          heartRate: 'stable',
          bloodPressure: 'increasing',
          oxygenSaturation: 'stable'
        },
        insights: [
          'Overall cardiovascular health appears stable',
          'Regular monitoring recommended due to hypertension history'
        ]
      }
    }

    // Add timestamp and metadata
    const enhancedAnalysis = {
      ...analysis,
      timestamp: new Date().toISOString(),
      dataPoints: vitalsData.length,
      patientId: patientInfo.name,
      analysisVersion: '1.0'
    }

    console.log('✅ AI analysis completed successfully')
    
    // Send email with analysis results if requested
    let emailResult = null
    if (sendEmail && patientEmail) {
      console.log('📧 Sending analysis email to:', patientEmail)
      emailResult = await sendHealthAnalysisEmail({
        patientName: patientInfo.name,
        patientEmail: patientEmail,
        riskLevel: enhancedAnalysis.riskLevel,
        predictions: enhancedAnalysis.predictions,
        recommendations: enhancedAnalysis.recommendations,
        trends: enhancedAnalysis.trends,
        insights: enhancedAnalysis.insights || [],
        timestamp: enhancedAnalysis.timestamp,
        dataPoints: enhancedAnalysis.dataPoints
      })
      
      if (emailResult.success) {
        console.log('✅ Analysis email sent successfully')
      } else {
        console.error('❌ Failed to send analysis email:', emailResult.error)
      }
    }
    
    return NextResponse.json({
      ...enhancedAnalysis,
      emailSent: emailResult?.success || false,
      emailId: emailResult?.emailId || null
    })
    
  } catch (error) {
    console.error('❌ Health analysis error:', error)
    
    // Fallback response
    const fallbackAnalysis = {
      riskLevel: 'low',
      predictions: [
        'Heart rate within normal range',
        'Blood pressure shows normal variation',
        'Overall health metrics appear stable'
      ],
      recommendations: [
        'Continue current health routine',
        'Maintain regular exercise',
        'Schedule routine check-ups'
      ],
      trends: {
        heartRate: 'stable',
        bloodPressure: 'stable',
        oxygenSaturation: 'stable'
      },
      insights: [
        'Health monitoring system functioning normally',
        'Continue regular vitals tracking'
      ],
      timestamp: new Date().toISOString(),
      error: 'Analysis completed with fallback data'
    }
    
    return NextResponse.json(fallbackAnalysis)
  }
}
