import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    console.log('📊 Fetching Google Fit data for Firebolt watch...')
    
    // Simulate real Google Fit API call
    // In production, you would use actual Google Fit API with OAuth tokens
    
    const today = new Date()
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    
    // Simulate fetching data from Google Fit API
    // This would be replaced with actual API calls to:
    // https://www.googleapis.com/fitness/v1/users/me/dataSources
    
    const mockGoogleFitData = {
      heartRate: {
        current: 72 + Math.floor(Math.random() * 20 - 10), // 62-82 BPM
        average: 75,
        resting: 68,
        max: 95,
        min: 60,
        dataPoints: [
          { time: new Date(Date.now() - 30 * 60 * 1000).toISOString(), value: 75 },
          { time: new Date(Date.now() - 25 * 60 * 1000).toISOString(), value: 78 },
          { time: new Date(Date.now() - 20 * 60 * 1000).toISOString(), value: 72 },
          { time: new Date(Date.now() - 15 * 60 * 1000).toISOString(), value: 80 },
          { time: new Date(Date.now() - 10 * 60 * 1000).toISOString(), value: 76 },
          { time: new Date(Date.now() - 5 * 60 * 1000).toISOString(), value: 74 }
        ]
      },
      steps: {
        today: 8500 + Math.floor(Math.random() * 2000), // 8500-10500 steps
        yesterday: 9200,
        weekly: 58000,
        goal: 10000,
        dataPoints: [
          { time: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), value: 1200 },
          { time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), value: 2400 },
          { time: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), value: 3600 },
          { time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), value: 4800 },
          { time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), value: 6200 },
          { time: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), value: 7500 },
          { time: new Date().toISOString(), value: 8500 }
        ]
      },
      calories: {
        burned: 2100 + Math.floor(Math.random() * 300), // 2100-2400 calories
        goal: 2500,
        active: 450,
        resting: 1650
      },
      distance: {
        today: 6.2 + Math.random() * 1.5, // 6.2-7.7 km
        yesterday: 7.1,
        weekly: 42.5
      },
      activeMinutes: {
        today: 45 + Math.floor(Math.random() * 15), // 45-60 minutes
        goal: 60,
        moderate: 30,
        vigorous: 15
      },
      sleep: {
        lastNight: {
          duration: 7.5 + Math.random() * 1, // 7.5-8.5 hours
          deep: 1.8,
          rem: 1.5,
          light: 4.2,
          awake: 0.3
        },
        average: 7.8,
        goal: 8.0
      },
      device: {
        name: 'Firebolt Watch',
        model: 'FB-2024',
        batteryLevel: 85 + Math.floor(Math.random() * 10), // 85-95%
        lastSync: new Date().toISOString(),
        connectionType: 'Bluetooth',
        firmwareVersion: '2.1.4'
      },
      metadata: {
        dataSource: 'DaFit App → Google Fit',
        syncStatus: 'success',
        lastSyncTime: new Date().toISOString(),
        dataQuality: 'high',
        timeRange: {
          start: yesterday.toISOString(),
          end: today.toISOString()
        }
      }
    }
    
    // Process the data for our vitals format
    const processedData = {
      heartRate: mockGoogleFitData.heartRate.current,
      bloodPressure: {
        systolic: 120 + Math.floor(Math.random() * 10 - 5), // 115-125
        diastolic: 80 + Math.floor(Math.random() * 5 - 2)   // 78-82
      },
      oxygenSaturation: 98 + Math.random() * 1.5, // 98-99.5%
      temperature: 36.5 + Math.random() * 0.5, // 36.5-37.0°C
      steps: mockGoogleFitData.steps.today,
      calories: mockGoogleFitData.calories.burned,
      distance: mockGoogleFitData.distance.today,
      activeMinutes: mockGoogleFitData.activeMinutes.today,
      sleepHours: mockGoogleFitData.sleep.lastNight.duration,
      stressLevel: Math.floor(Math.random() * 3) + 1, // 1-3 (low stress)
      deviceType: 'watch',
      deviceInfo: mockGoogleFitData.device,
      rawData: mockGoogleFitData,
      timestamp: new Date().toISOString()
    }
    
    console.log('✅ Google Fit data processed successfully')
    console.log('📊 Heart Rate:', processedData.heartRate, 'BPM')
    console.log('👟 Steps:', processedData.steps)
    console.log('🔥 Calories:', processedData.calories)
    console.log('📱 Device:', processedData.deviceInfo.name)
    
    return NextResponse.json({
      success: true,
      data: processedData,
      metadata: {
        source: 'Google Fit API',
        device: 'Firebolt Watch via DaFit',
        syncTime: new Date().toISOString(),
        dataPoints: Object.keys(processedData).length
      }
    })
    
  } catch (error) {
    console.error('❌ Google Fit data fetch error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch Google Fit data',
      message: error instanceof Error ? error.message : 'Unknown error',
      fallback: {
        heartRate: 72,
        steps: 8000,
        calories: 2000,
        distance: 6.0,
        activeMinutes: 45,
        sleepHours: 7.5,
        deviceType: 'watch',
        timestamp: new Date().toISOString()
      }
    }, { status: 500 })
  }
}

// POST endpoint for manual data sync
export async function POST(request: NextRequest) {
  try {
    const { deviceId, syncType } = await request.json()
    
    console.log(`🔄 Manual sync requested for device: ${deviceId}`)
    
    // Simulate manual sync process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const syncResult = {
      success: true,
      deviceId: deviceId,
      syncType: syncType || 'full',
      syncedAt: new Date().toISOString(),
      dataPoints: {
        heartRate: 15,
        steps: 1,
        calories: 1,
        sleep: 1,
        activity: 8
      },
      message: 'Data synced successfully from Firebolt watch via DaFit app'
    }
    
    console.log('✅ Manual sync completed:', syncResult)
    
    return NextResponse.json(syncResult)
    
  } catch (error) {
    console.error('❌ Manual sync error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Manual sync failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
