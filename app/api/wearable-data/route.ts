import { NextRequest, NextResponse } from 'next/server'

// Simulate different wearable devices
const DEVICE_TYPES = {
  appleWatch: {
    name: 'Apple Watch Series 9',
    capabilities: ['heartRate', 'bloodPressure', 'oxygenSaturation', 'temperature', 'steps', 'sleep', 'ecg'],
    accuracy: 0.95
  },
  fitbit: {
    name: 'Fitbit Charge 5',
    capabilities: ['heartRate', 'steps', 'sleep', 'stressLevel'],
    accuracy: 0.92
  },
  samsungWatch: {
    name: 'Samsung Galaxy Watch 6',
    capabilities: ['heartRate', 'bloodPressure', 'oxygenSaturation', 'steps', 'sleep'],
    accuracy: 0.93
  },
  garmin: {
    name: 'Garmin Venu 3',
    capabilities: ['heartRate', 'oxygenSaturation', 'steps', 'sleep', 'stressLevel', 'bodyBattery'],
    accuracy: 0.94
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const deviceType = searchParams.get('device') || 'appleWatch'
    const patientId = searchParams.get('patientId') || 'patient_001'
    
    console.log(`📱 Fetching data from ${deviceType} for patient ${patientId}`)
    
    const device = DEVICE_TYPES[deviceType as keyof typeof DEVICE_TYPES] || DEVICE_TYPES.appleWatch
    
    // Generate realistic vitals data based on device capabilities
    const generateVitalsData = () => {
      const now = new Date()
      const baseHeartRate = 70 + Math.random() * 20 - 10
      const baseSystolic = 115 + Math.random() * 15 - 5
      const baseDiastolic = 75 + Math.random() * 10 - 5
      
      const vitals: any = {
        timestamp: now.toISOString(),
        deviceType: deviceType,
        deviceName: device.name,
        accuracy: device.accuracy,
        patientId: patientId
      }
      
      // Add capabilities based on device
      if (device.capabilities.includes('heartRate')) {
        vitals.heartRate = Math.round(baseHeartRate)
        vitals.heartRateVariability = (Math.random() * 20 + 30).toFixed(1)
      }
      
      if (device.capabilities.includes('bloodPressure')) {
        vitals.bloodPressure = {
          systolic: Math.round(baseSystolic),
          diastolic: Math.round(baseDiastolic)
        }
      }
      
      if (device.capabilities.includes('oxygenSaturation')) {
        vitals.oxygenSaturation = (98 + Math.random() * 2).toFixed(1)
      }
      
      if (device.capabilities.includes('temperature')) {
        vitals.temperature = (36.5 + Math.random() * 0.6).toFixed(1)
      }
      
      if (device.capabilities.includes('steps')) {
        vitals.steps = Math.floor(Math.random() * 2000) + 6000
        vitals.calories = Math.floor(Math.random() * 300) + 2000
        vitals.distance = (vitals.steps * 0.0008).toFixed(2) // Approximate km
      }
      
      if (device.capabilities.includes('sleep')) {
        vitals.sleep = {
          duration: (7 + Math.random() * 2).toFixed(1),
          deepSleep: (1.5 + Math.random() * 0.5).toFixed(1),
          remSleep: (1.8 + Math.random() * 0.4).toFixed(1),
          lightSleep: (3.5 + Math.random() * 1).toFixed(1)
        }
      }
      
      if (device.capabilities.includes('stressLevel')) {
        vitals.stressLevel = Math.floor(Math.random() * 5) + 1
      }
      
      if (device.capabilities.includes('ecg')) {
        vitals.ecg = {
          rhythm: Math.random() > 0.95 ? 'irregular' : 'normal',
          afib: Math.random() > 0.98 ? 'detected' : 'not_detected'
        }
      }
      
      if (device.capabilities.includes('bodyBattery')) {
        vitals.bodyBattery = Math.floor(Math.random() * 100)
      }
      
      return vitals
    }
    
    // Generate multiple data points for trend analysis
    const dataPoints = []
    for (let i = 0; i < 10; i++) {
      const timestamp = new Date()
      timestamp.setMinutes(timestamp.getMinutes() - (i * 30)) // Every 30 minutes
      const data = generateVitalsData()
      data.timestamp = timestamp.toISOString()
      dataPoints.push(data)
    }
    
    const response = {
      success: true,
      device: device,
      patientId: patientId,
      dataPoints: dataPoints,
      lastSync: new Date().toISOString(),
      batteryLevel: Math.floor(Math.random() * 40) + 60, // 60-100%
      connectionStatus: 'connected'
    }
    
    console.log(`✅ Generated ${dataPoints.length} data points from ${device.name}`)
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('❌ Wearable data error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch wearable data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { deviceType, patientId, syncData } = await request.json()
    
    console.log(`📤 Syncing data from ${deviceType} for patient ${patientId}`)
    
    // Simulate data sync process
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const response = {
      success: true,
      message: 'Data synced successfully',
      deviceType: deviceType,
      patientId: patientId,
      syncedAt: new Date().toISOString(),
      recordsProcessed: syncData?.length || 0
    }
    
    console.log(`✅ Data sync completed for ${deviceType}`)
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('❌ Data sync error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to sync data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
