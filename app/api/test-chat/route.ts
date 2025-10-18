import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()
    
    // Get the last user message
    const lastMessage = messages[messages.length - 1]
    const userMessage = lastMessage?.text || lastMessage?.content || ''

    console.log('📨 Received message:', userMessage)

    // Simple fallback responses for testing
    const getTestResponse = (message: string): string => {
      const msg = message.toLowerCase()
      
      if (msg.includes('hello') || msg.includes('hi')) {
        return "Hello Anurag! I'm Sanjeevan AI, your health assistant. I'm working perfectly! How can I help you today?"
      }
      
      if (msg.includes('blood pressure') || msg.includes('bp')) {
        return "Your blood pressure is 120/80 mmHg, which is normal. Continue monitoring as advised by your doctor."
      }
      
      if (msg.includes('medication') || msg.includes('medicine')) {
        return "Your current medications are Amoxicillin (250mg twice daily) and Paracetamol (500mg as needed). Take them as prescribed."
      }
      
      if (msg.includes('appointment')) {
        return "Your next appointment is on March 20, 2024 with Dr. Priya Sharma at Apollo Hospital."
      }
      
      if (msg.includes('test') || msg.includes('report')) {
        return "Your recent lab tests show normal results. All parameters are within healthy ranges."
      }
      
      if (msg.includes('pain') || msg.includes('hurt') || msg.includes('symptom')) {
        return "I understand you're experiencing some discomfort. Please consult with your doctor if symptoms persist or worsen."
      }
      
      return `I received your message: "${message}". I'm Sanjeevan AI and I'm working! I can help with health questions, medications, appointments, and more. What would you like to know?`
    }

    const response = getTestResponse(userMessage)
    
    console.log('🤖 Sending response:', response)

    return NextResponse.json({
      message: response
    })

  } catch (error) {
    console.error('❌ Test API Error:', error)
    
    return NextResponse.json({
      message: "I'm having some technical difficulties, but I'm still here to help! Please try again."
    })
  }
}
