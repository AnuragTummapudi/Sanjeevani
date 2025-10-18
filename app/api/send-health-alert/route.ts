import { NextRequest, NextResponse } from 'next/server'
import { sendHealthAlertEmail } from '../../../lib/email-service'

export async function POST(request: NextRequest) {
  try {
    const { 
      patientEmail, 
      patientName, 
      alertType, 
      message, 
      vitalsData 
    } = await request.json()
    
    console.log('🚨 Sending health alert email...')
    console.log('📧 To:', patientEmail)
    console.log('⚠️ Alert type:', alertType)
    console.log('💬 Message:', message)

    if (!patientEmail || !patientName || !alertType || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: patientEmail, patientName, alertType, message' },
        { status: 400 }
      )
    }

    const emailResult = await sendHealthAlertEmail(
      patientEmail,
      patientName,
      alertType,
      message,
      vitalsData || {}
    )

    if (emailResult.success) {
      console.log('✅ Health alert email sent successfully')
      return NextResponse.json({
        success: true,
        emailId: emailResult.emailId,
        message: 'Health alert email sent successfully'
      })
    } else {
      console.error('❌ Failed to send health alert email:', emailResult.error)
      return NextResponse.json(
        { 
          success: false, 
          error: emailResult.error,
          message: 'Failed to send health alert email'
        },
        { status: 500 }
      )
    }
    
  } catch (error) {
    console.error('❌ Health alert email error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        message: 'Internal server error'
      },
      { status: 500 }
    )
  }
}
