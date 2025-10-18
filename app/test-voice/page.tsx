'use client'

import { useState } from 'react'
import WorkingVoiceAgent from '../../components/WorkingVoiceAgent'

export default function TestVoicePage() {
  const [isVoiceAgentOpen, setIsVoiceAgentOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          🎤 Voice Agent Test Page
        </h1>
        
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
          <p className="text-gray-600 mb-6">
            Click the button below to test the voice agent with full debugging.
          </p>
          
          <button
            onClick={() => setIsVoiceAgentOpen(true)}
            className="w-full bg-sanjeevan-purple text-white py-4 px-6 rounded-xl font-semibold hover:bg-sanjeevan-dark-purple transition-colors"
          >
            🎤 Open Voice Agent
          </button>
          
          <div className="mt-6 text-sm text-gray-500">
            <p>✅ Speech Recognition</p>
            <p>✅ Text-to-Speech</p>
            <p>✅ API Integration</p>
            <p>✅ Real-time Debugging</p>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Open browser console (F12) to see detailed logs</p>
        </div>
      </div>

      <WorkingVoiceAgent 
        isOpen={isVoiceAgentOpen} 
        onClose={() => setIsVoiceAgentOpen(false)} 
      />
    </div>
  )
}
