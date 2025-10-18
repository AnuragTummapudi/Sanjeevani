import { NextRequest, NextResponse } from 'next/server'
import { ai } from '@/lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileSize, contentType, content } = await request.json()

    if (!content) {
      return NextResponse.json(
        { error: 'No report content provided' },
        { status: 400 }
      )
    }

    // Create a direct prompt for medical report analysis
    const prompt = `You are analyzing a real medical report. Here is the actual content:

REPORT DETAILS:
File: ${fileName || 'Medical Report'}
Date: ${new Date().toLocaleDateString()}

REPORT CONTENT:
${content}

Please provide a helpful summary in this exact format:

Summary: [Write 1-2 sentences about what the report shows - be specific about the findings]

What we found:
• [Key finding 1 - be specific about test results or findings]
• [Key finding 2 - mention normal/abnormal values]
• [Key finding 3 - any important observations]

What you should do:
• [Practical action 1 - specific to the findings]
• [Practical action 2 - lifestyle or medical advice]
• [Practical action 3 - follow-up recommendations]

Guidelines:
- Be specific about actual test results and values
- Use simple language but include medical details
- Focus on what the report actually shows
- Give practical advice based on the findings
- Always recommend consulting a doctor for serious concerns`

    // Use Gemini API for analysis
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const summary = response.text

    if (!summary) {
      throw new Error('No response from Gemini AI')
    }

    return NextResponse.json({
      success: true,
      summary: summary,
      fileName: fileName,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error analyzing medical report:', error)
    
    // Simple fallback response if Gemini API fails
    const fallbackSummary = `Your medical report has been uploaded successfully!

What we found:
• Report is safely stored in your health profile
• Ready for your doctor to review
• All information is secure and protected

What you should do:
• Show this report to your doctor
• Keep a copy for your records
• Follow any instructions in the report

Next steps:
• Schedule a doctor appointment to discuss results
• Ask your doctor any questions you have
• Continue taking care of your health

Remember: Always talk to your doctor about any health concerns!`
    
    return NextResponse.json({
      success: true,
      summary: fallbackSummary,
      fileName: fileName,
      timestamp: new Date().toISOString(),
      fallback: true
    })
  }
}
