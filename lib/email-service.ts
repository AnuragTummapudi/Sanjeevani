import { Resend } from 'resend'

const resend = new Resend('re_AJWLwkHb_GRe9oncHt8uQPwxCcvGvEbCi')

export interface HealthAnalysisEmailData {
  patientName: string
  patientEmail: string
  riskLevel: 'low' | 'medium' | 'high'
  predictions: string[]
  recommendations: string[]
  trends: {
    heartRate: 'increasing' | 'decreasing' | 'stable'
    bloodPressure: 'increasing' | 'decreasing' | 'stable'
    oxygenSaturation: 'increasing' | 'decreasing' | 'stable'
  }
  insights: string[]
  timestamp: string
  dataPoints: number
}

export async function sendHealthAnalysisEmail(data: HealthAnalysisEmailData) {
  try {
    console.log('📧 Sending health analysis email to:', data.patientEmail)
    
    const riskLevelColors = {
      low: '#10B981', // green
      medium: '#F59E0B', // yellow
      high: '#EF4444' // red
    }

    const riskLevelLabels = {
      low: 'Low Risk',
      medium: 'Medium Risk', 
      high: 'High Risk'
    }

    const getTrendIcon = (trend: string) => {
      switch (trend) {
        case 'increasing': return '📈'
        case 'decreasing': return '📉'
        default: return '➡️'
      }
    }

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Health Analysis Report - Sanjeevan AI</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid #e5e7eb;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #7c3aed;
          margin-bottom: 10px;
        }
        .risk-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 14px;
          margin: 10px 0;
        }
        .risk-low { background-color: #dcfce7; color: #166534; }
        .risk-medium { background-color: #fef3c7; color: #92400e; }
        .risk-high { background-color: #fee2e2; color: #991b1b; }
        .section {
          margin: 25px 0;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
        }
        .icon {
          margin-right: 8px;
          font-size: 20px;
        }
        .list {
          list-style: none;
          padding: 0;
        }
        .list li {
          padding: 8px 0;
          border-bottom: 1px solid #f3f4f6;
          display: flex;
          align-items: flex-start;
        }
        .list li:last-child {
          border-bottom: none;
        }
        .bullet {
          color: #7c3aed;
          margin-right: 10px;
          font-weight: bold;
        }
        .trends-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin: 15px 0;
        }
        .trend-item {
          background: #f8fafc;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
        }
        .trend-label {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 5px;
        }
        .trend-value {
          font-size: 16px;
          font-weight: bold;
          color: #1f2937;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
        .timestamp {
          background: #f3f4f6;
          padding: 10px;
          border-radius: 6px;
          font-size: 12px;
          color: #6b7280;
          margin: 15px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🏥 Sanjeevan AI</div>
          <h1>Health Analysis Report</h1>
          <p>AI-Powered Predictive Health Analysis</p>
          <div class="risk-badge risk-${data.riskLevel}">
            ${riskLevelLabels[data.riskLevel]} Assessment
          </div>
        </div>

        <div class="timestamp">
          📅 Analysis Date: ${new Date(data.timestamp).toLocaleString()}<br>
          📊 Data Points Analyzed: ${data.dataPoints} readings
        </div>

        <div class="section">
          <div class="section-title">
            <span class="icon">🔮</span>
            Health Predictions
          </div>
          <ul class="list">
            ${data.predictions.map(prediction => `
              <li>
                <span class="bullet">•</span>
                ${prediction}
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="section">
          <div class="section-title">
            <span class="icon">💡</span>
            Personalized Recommendations
          </div>
          <ul class="list">
            ${data.recommendations.map(recommendation => `
              <li>
                <span class="bullet">•</span>
                ${recommendation}
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="section">
          <div class="section-title">
            <span class="icon">📊</span>
            Vital Signs Trends
          </div>
          <div class="trends-grid">
            <div class="trend-item">
              <div class="trend-label">Heart Rate</div>
              <div class="trend-value">${getTrendIcon(data.trends.heartRate)} ${data.trends.heartRate}</div>
            </div>
            <div class="trend-item">
              <div class="trend-label">Blood Pressure</div>
              <div class="trend-value">${getTrendIcon(data.trends.bloodPressure)} ${data.trends.bloodPressure}</div>
            </div>
            <div class="trend-item">
              <div class="trend-label">Oxygen Saturation</div>
              <div class="trend-value">${getTrendIcon(data.trends.oxygenSaturation)} ${data.trends.oxygenSaturation}</div>
            </div>
          </div>
        </div>

        ${data.insights.length > 0 ? `
        <div class="section">
          <div class="section-title">
            <span class="icon">🧠</span>
            Key Insights
          </div>
          <ul class="list">
            ${data.insights.map(insight => `
              <li>
                <span class="bullet">•</span>
                ${insight}
              </li>
            `).join('')}
          </ul>
        </div>
        ` : ''}

        <div class="footer">
          <p><strong>Important:</strong> This analysis is generated by AI and should not replace professional medical advice. Please consult with your healthcare provider for any concerns.</p>
          <p>Generated by Sanjeevan AI Health Monitoring System</p>
          <p>For support, contact: support@sanjeevan.ai</p>
        </div>
      </div>
    </body>
    </html>
    `

    const result = await resend.emails.send({
      from: 'Sanjeevan AI <onboarding@resend.dev>',
      to: data.patientEmail,
      subject: `🏥 Health Analysis Report - ${riskLevelLabels[data.riskLevel]} Risk Assessment`,
      html: htmlContent,
    })

    console.log('✅ Health analysis email sent successfully:', result.data?.id)
    return { success: true, emailId: result.data?.id }
    
  } catch (error) {
    console.error('❌ Failed to send health analysis email:', error)
    return { success: false, error: error.message }
  }
}

export async function sendHealthAlertEmail(
  patientEmail: string, 
  patientName: string, 
  alertType: 'warning' | 'critical', 
  message: string,
  vitalsData: any
) {
  try {
    console.log('🚨 Sending health alert email to:', patientEmail)
    
    const alertColors = {
      warning: '#F59E0B',
      critical: '#EF4444'
    }

    const alertLabels = {
      warning: 'Health Warning',
      critical: 'Critical Health Alert'
    }

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Health Alert - Sanjeevan AI</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f8fafc;
        }
        .container {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-left: 5px solid ${alertColors[alertType]};
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #7c3aed;
          margin-bottom: 10px;
        }
        .alert-badge {
          display: inline-block;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: bold;
          font-size: 16px;
          margin: 15px 0;
          background-color: ${alertColors[alertType]};
          color: white;
        }
        .alert-message {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          font-size: 16px;
          font-weight: 500;
        }
        .vitals-summary {
          background: #f8fafc;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .vitals-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }
        .vital-item {
          text-align: center;
          padding: 10px;
          background: white;
          border-radius: 6px;
        }
        .vital-label {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 5px;
        }
        .vital-value {
          font-size: 16px;
          font-weight: bold;
          color: #1f2937;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🏥 Sanjeevan AI</div>
          <div class="alert-badge">
            ${alertType === 'critical' ? '🚨' : '⚠️'} ${alertLabels[alertType]}
          </div>
        </div>

        <div class="alert-message">
          <strong>Dear ${patientName},</strong><br><br>
          ${message}
        </div>

        <div class="vitals-summary">
          <h3>Current Vital Signs:</h3>
          <div class="vitals-grid">
            <div class="vital-item">
              <div class="vital-label">Heart Rate</div>
              <div class="vital-value">${vitalsData.heartRate} BPM</div>
            </div>
            <div class="vital-item">
              <div class="vital-label">Blood Pressure</div>
              <div class="vital-value">${vitalsData.bloodPressure.systolic}/${vitalsData.bloodPressure.diastolic}</div>
            </div>
            <div class="vital-item">
              <div class="vital-label">Oxygen</div>
              <div class="vital-value">${vitalsData.oxygenSaturation.toFixed(1)}%</div>
            </div>
            <div class="vital-item">
              <div class="vital-label">Temperature</div>
              <div class="vital-value">${vitalsData.temperature.toFixed(1)}°C</div>
            </div>
          </div>
        </div>

        <div class="footer">
          <p><strong>Action Required:</strong> Please review your vitals and consider consulting with a healthcare professional if symptoms persist.</p>
          <p>Generated by Sanjeevan AI Health Monitoring System</p>
          <p>For emergency situations, please contact emergency services immediately.</p>
        </div>
      </div>
    </body>
    </html>
    `

    const result = await resend.emails.send({
      from: 'Sanjeevan AI Alerts <onboarding@resend.dev>',
      to: patientEmail,
      subject: `🚨 ${alertLabels[alertType]} - Sanjeevan AI Health Monitor`,
      html: htmlContent,
    })

    console.log('✅ Health alert email sent successfully:', result.data?.id)
    return { success: true, emailId: result.data?.id }
    
  } catch (error) {
    console.error('❌ Failed to send health alert email:', error)
    return { success: false, error: error.message }
  }
}
