import { NextRequest, NextResponse } from 'next/server'
import { ai } from '@/lib/gemini'

// Fallback responses for when OpenAI is not available
const getFallbackResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase()
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! I'm Sanjeevan AI. I can help you with your medical records, health questions, and appointments. How can I assist you today?"
  }
  
  if (message.includes('blood pressure') || message.includes('bp')) {
    return "Your recent blood pressure reading was 120/80 mmHg, which is within the normal range. Continue monitoring as advised by Dr. Priya Sharma."
  }
  
  if (message.includes('medication') || message.includes('medicine') || message.includes('pill')) {
    return "Your current medications are Amoxicillin (250mg twice daily) and Paracetamol (500mg as needed). Take them as prescribed by your doctor."
  }
  
  if (message.includes('appointment') || message.includes('visit') || message.includes('consultation')) {
    return "Your next appointment is scheduled for March 20, 2024 with Dr. Priya Sharma at Apollo Hospital. Would you like me to help you reschedule or get more details?"
  }
  
  if (message.includes('test') || message.includes('report') || message.includes('lab')) {
    return "Your recent lab tests show normal results. Your blood count, ECG, and X-ray reports are all within normal ranges. I can explain specific results if you'd like."
  }
  
  if (message.includes('symptom') || message.includes('pain') || message.includes('feel')) {
    return "I understand you're experiencing some symptoms. For medical concerns, I recommend consulting with Dr. Priya Sharma or your primary care physician. Would you like me to help schedule an appointment?"
  }
  
  if (message.includes('health') || message.includes('wellness') || message.includes('exercise')) {
    return "For your hypertension condition, I recommend regular exercise, a balanced diet, and monitoring your blood pressure. Continue taking your prescribed medications and maintain regular check-ups."
  }
  
  return "I'm here to help with your health questions! I can assist with medical records, medication information, appointments, and general health guidance. What would you like to know?"
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()
    
    // Get the last user message
    const lastMessage = messages[messages.length - 1]
    const userMessage = lastMessage?.text || lastMessage?.content || ''

    // Check if Gemini AI is available
    if (ai) {
      try {
        // Sanjeevan-specific system prompt
        const systemPrompt = `You are Sanjeevan AI, a specialized health assistant for the Sanjeevan medical platform. You help patients with:

1. Medical record explanations
2. Symptom analysis and guidance
3. Medication information
4. Appointment scheduling
5. Health recommendations
6. Lab result interpretations

Context about Sanjeevan:
- We're a blockchain-powered medical platform
- We store medical records securely on blockchain
- We have Indian doctors and hospitals (Apollo Hospital, Dr. Priya Sharma, Dr. Arjun Patel, etc.)
- We provide telemedicine consultations
- We have AI-powered health diagnostics

Patient Information (dummy data for context):
- Name: Rajesh Kumar
- Age: 45
- Condition: Hypertension
- Current medications: Amoxicillin (250mg), Paracetamol (500mg)
- Recent tests: Blood pressure 120/80, Heart rate 72 bpm
- Next appointment: March 20, 2024 with Dr. Priya Sharma

Always be professional, empathetic, and suggest consulting with doctors for serious concerns. Keep responses concise but helpful. If asked about specific medical records, provide realistic dummy data that would be typical for this patient profile.`

        // Build conversation context
        const conversationContext = messages.slice(-10).map(msg => 
          `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`
        ).join('\n')

        // Create the full prompt with system context and conversation
        const fullPrompt = `${systemPrompt}

Recent Conversation:
${conversationContext}

Current User Message: ${userMessage}

Please respond as Sanjeevan AI, keeping in mind the conversation context and patient information provided above.`

        // Use the Google GenAI API
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        console.log('✅ Gemini AI response generated successfully');
        return NextResponse.json({
          message: text
        })

      } catch (geminiError) {
        console.error('❌ Gemini API Error:', geminiError)
        // Fall through to fallback system
      }
    } else {
      console.log('⚠️ Gemini AI not available, using fallback responses');
    }
    
    // Fallback to enhanced response system
    const response = getEnhancedGeminiResponse(userMessage, messages)
    
    return NextResponse.json({
      message: response
    })

  } catch (error) {
    console.error('❌ Chat API Error:', error)
    
    // Final fallback
    const { messages } = await request.json()
    const lastMessage = messages[messages.length - 1]
    const userMessage = lastMessage?.text || lastMessage?.content || ''
    const response = getFallbackResponse(userMessage)
    
    return NextResponse.json({
      message: response
    })
  }
}

// Enhanced Gemini-like response system with medical AI expertise
const getEnhancedGeminiResponse = (userMessage: string, conversationHistory: any[]): string => {
  const message = userMessage.toLowerCase()
  
  // Check conversation context for better responses
  const hasAskedAboutBP = conversationHistory.some(msg => 
    msg.sender === 'user' && (msg.text.toLowerCase().includes('blood pressure') || msg.text.toLowerCase().includes('bp'))
  )
  
  const hasAskedAboutMeds = conversationHistory.some(msg => 
    msg.sender === 'user' && (msg.text.toLowerCase().includes('medication') || msg.text.toLowerCase().includes('medicine'))
  )
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! I'm Sanjeevan AI, your specialized health assistant powered by advanced medical AI. I'm here to help you understand your health data, medications, and provide personalized medical guidance. How can I assist you with your health today?"
  }
  
  if (message.includes('blood pressure') || message.includes('bp')) {
    return `Based on your latest readings, your blood pressure is 120/80 mmHg, which falls within the normal range for your age group. This is excellent news! 

**What this means:**
- Systolic (120): The pressure when your heart beats
- Diastolic (80): The pressure when your heart rests between beats

**Recommendations:**
- Continue your current lifestyle habits
- Maintain regular monitoring as advised by Dr. Priya Sharma
- Keep taking your prescribed medications

Would you like me to explain more about blood pressure management or discuss your medication schedule?`
  }
  
  if (message.includes('medication') || message.includes('medicine') || message.includes('pill')) {
    return `Here's your current medication regimen:

**Active Prescriptions:**
• **Amoxicillin 250mg** - Take twice daily after meals
  - Purpose: Antibiotic treatment
  - Timing: Morning and evening with food
  - Prescribed by: Dr. Priya Sharma

• **Paracetamol 500mg** - Take as needed for pain relief
  - Purpose: Pain and fever management
  - Timing: Every 6-8 hours when needed
  - Maximum: 4 times per day

**Important Notes:**
- Continue taking medications as prescribed
- Don't skip doses unless advised by your doctor
- Contact Dr. Priya Sharma if you experience any side effects

Would you like me to help you set up medication reminders or explain more about any specific medication?`
  }
  
  if (message.includes('appointment') || message.includes('visit') || message.includes('consultation')) {
    return `Your upcoming medical appointment details:

**Next Appointment:**
📅 **Date:** March 20, 2024
⏰ **Time:** 10:30 AM
👩‍⚕️ **Doctor:** Dr. Priya Sharma
🏥 **Location:** Apollo Hospital, Mumbai
📋 **Purpose:** Hypertension follow-up consultation

**Preparation Tips:**
- Bring your medication list
- Note any new symptoms since last visit
- Prepare questions about your health
- Arrive 15 minutes early

Would you like me to help you prepare questions for your visit or assist with scheduling changes?`
  }
  
  if (message.includes('test') || message.includes('report') || message.includes('lab')) {
    return `Your recent medical test results summary:

**Laboratory Tests (March 15, 2024):**
✅ **Complete Blood Count:** All parameters within normal ranges
✅ **ECG:** Normal sinus rhythm, no abnormalities detected
✅ **Chest X-Ray:** Clear lung fields, normal heart size
✅ **Blood Pressure:** 120/80 mmHg (Normal)

**Key Findings:**
- Hemoglobin: 14.2 g/dL (Normal: 12.0-16.0)
- Heart Rate: 72 bpm (Normal: 60-100)
- White Blood Cells: 7,500/μL (Normal: 4,500-11,000)

All your results are within healthy ranges! Would you like me to explain any specific test results in more detail?`
  }
  
  if (message.includes('symptom') || message.includes('pain') || message.includes('feel') || message.includes('unwell')) {
    return `I understand you're experiencing some discomfort. As your AI health assistant, here's what I recommend:

**Immediate Steps:**
1. **Monitor Symptoms:** Keep track of what you're feeling and when
2. **Take Medications:** Continue your prescribed treatments
3. **Rest:** Ensure adequate rest and hydration
4. **Contact Doctor:** Reach out to Dr. Priya Sharma if symptoms worsen

**When to Seek Immediate Care:**
- Severe or worsening symptoms
- Difficulty breathing
- Chest pain
- High fever (>101°F)

**Available Resources:**
- Emergency: Apollo Hospital Emergency Department
- Urgent Care: Contact Dr. Priya Sharma's clinic
- Telemedicine: Available through Sanjeevan platform

Would you like me to help you schedule an urgent consultation or provide more specific guidance based on your symptoms?`
  }
  
  if (message.includes('health') || message.includes('wellness') || message.includes('exercise') || message.includes('diet')) {
    return `Here's your personalized health and wellness plan:

**For Your Hypertension Management:**

🏃‍♂️ **Exercise Recommendations:**
- 30 minutes of moderate exercise daily
- Walking, swimming, or cycling
- Include strength training 2-3 times per week

🥗 **Dietary Guidelines:**
- Low sodium (<2,300mg daily)
- Rich in fruits and vegetables
- Limit processed foods
- Stay hydrated (8 glasses water daily)

💊 **Medication Adherence:**
- Take medications as prescribed
- Don't skip doses
- Regular monitoring with doctor

📊 **Health Monitoring:**
- Check blood pressure regularly
- Maintain healthy weight
- Get adequate sleep (7-8 hours)

Would you like specific meal plans, exercise routines, or tips for maintaining these healthy habits?`
  }
  
  if (message.includes('thank') || message.includes('thanks')) {
    return `You're very welcome! I'm here to support your health journey 24/7. 

Remember, I can help you with:
- Understanding your medical records
- Medication guidance and reminders
- Appointment scheduling and preparation
- Health and lifestyle recommendations
- Symptom tracking and analysis

Feel free to ask me anything about your health - I'm always here to help! Is there anything else you'd like to know about your health or medications?`
  }
  
  if (message.includes('help') || message.includes('what can you do')) {
    return `I'm Sanjeevan AI, your advanced medical assistant! Here's how I can help:

**🏥 Medical Support:**
- Explain test results and medical reports
- Provide medication information and reminders
- Help with appointment scheduling and preparation
- Offer health guidance and lifestyle recommendations

**📊 Your Health Data:**
- Blood pressure: 120/80 mmHg (Normal)
- Current medications: Amoxicillin, Paracetamol
- Next appointment: March 20, 2024 with Dr. Priya Sharma
- Recent tests: All within normal ranges

**🤖 AI Capabilities:**
- 24/7 availability for health questions
- Personalized recommendations based on your data
- Integration with blockchain-secured medical records
- Telemedicine support and guidance

What would you like to explore? I can dive deeper into any of these areas!`
  }
  
  // Default intelligent response
  return `I'm here to help with your health questions! As your Sanjeevan AI assistant, I can provide insights about your medical records, medications, appointments, and health guidance. 

Could you be more specific about what you'd like to know? For example:
- "Tell me about my blood pressure"
- "Explain my medications"
- "When is my next appointment?"
- "I'm feeling unwell"

I'm equipped with your complete medical profile and ready to assist!`
}

// Enhanced fallback system with conversation context
const getEnhancedFallbackResponse = (userMessage: string, conversationHistory: any[]): string => {
  const message = userMessage.toLowerCase()
  
  // Check conversation context for better responses
  const hasAskedAboutBP = conversationHistory.some(msg => 
    msg.role === 'user' && (msg.content.toLowerCase().includes('blood pressure') || msg.content.toLowerCase().includes('bp'))
  )
  
  const hasAskedAboutMeds = conversationHistory.some(msg => 
    msg.role === 'user' && (msg.content.toLowerCase().includes('medication') || msg.content.toLowerCase().includes('medicine'))
  )
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! I'm Sanjeevan AI, your specialized health assistant. I can help you with your medical records, health questions, and appointments. How can I assist you today?"
  }
  
  if (message.includes('blood pressure') || message.includes('bp')) {
    return "Your recent blood pressure reading was 120/80 mmHg, which is within the normal range for your age. Continue monitoring as advised by Dr. Priya Sharma. Would you like me to explain what these numbers mean?"
  }
  
  if (message.includes('medication') || message.includes('medicine') || message.includes('pill')) {
    return "Your current medications are:\n• Amoxicillin (250mg) - Take twice daily after meals\n• Paracetamol (500mg) - Take as needed for pain\n\nBoth are prescribed by Dr. Priya Sharma. Continue taking them as directed. Do you have any questions about these medications?"
  }
  
  if (message.includes('appointment') || message.includes('visit') || message.includes('consultation')) {
    return "Your next appointment is scheduled for March 20, 2024 at 10:30 AM with Dr. Priya Sharma at Apollo Hospital. It's a follow-up consultation for your hypertension. Would you like me to help you prepare any questions for your visit?"
  }
  
  if (message.includes('test') || message.includes('report') || message.includes('lab')) {
    return "Your recent lab tests show excellent results:\n• Complete Blood Count: All parameters normal\n• ECG: Normal sinus rhythm\n• Chest X-Ray: Clear lung fields\n• Blood Pressure: 120/80 mmHg\n\nEverything looks good! I can explain any specific results in detail."
  }
  
  if (message.includes('symptom') || message.includes('pain') || message.includes('feel') || message.includes('unwell')) {
    return "I understand you're experiencing some symptoms. For medical concerns, I recommend:\n\n1. Monitor your symptoms\n2. Take your prescribed medications\n3. Contact Dr. Priya Sharma if symptoms worsen\n4. For emergencies, visit Apollo Hospital immediately\n\nWould you like me to help you schedule an urgent consultation?"
  }
  
  if (message.includes('health') || message.includes('wellness') || message.includes('exercise') || message.includes('diet')) {
    return "For your hypertension condition, I recommend:\n\n🏃‍♂️ **Exercise**: 30 minutes daily walking\n🥗 **Diet**: Low sodium, plenty of fruits/vegetables\n💊 **Medications**: Take as prescribed\n📊 **Monitoring**: Check BP regularly\n\nWould you like specific exercise or diet recommendations?"
  }
  
  if (message.includes('thank') || message.includes('thanks')) {
    return "You're very welcome! I'm here to help with all your health-related questions. Feel free to ask about your medications, appointments, test results, or any health concerns. Is there anything else I can assist you with?"
  }
  
  if (message.includes('help') || message.includes('what can you do')) {
    return "I'm Sanjeevan AI, your health assistant! I can help you with:\n\n📋 **Medical Records**: Explain test results and reports\n💊 **Medications**: Information about your prescriptions\n📅 **Appointments**: Schedule and prepare for visits\n🏥 **Health Guidance**: Lifestyle and wellness tips\n📊 **Vital Signs**: Monitor your health metrics\n\nWhat would you like to know about?"
  }
  
  // Default intelligent response
  return "I'm here to help with your health questions! I can assist with medical records, medication information, appointments, and health guidance. Could you be more specific about what you'd like to know? For example, you could ask about your blood pressure, medications, or next appointment."
}
