# 🚀 Quick Start Guide

## Prerequisites

Make sure you have completed these one-time setup steps:

1. **Create `.env.local` file in the UI directory:**
   ```bash
   # In UI/.env.local
   NEXT_PUBLIC_LIVEKIT_URL=wss://sanjeevan-23bj7opl.livekit.cloud
   NEXT_PUBLIC_LIVEKIT_API_KEY=APIxCnKpwpoRrQH
   LIVEKIT_API_SECRET=r7Gn9w3a9IQk5HURgPFC2BjIgtfZN78LOSrEU38bspE
   ```

## Running the Voice Agent

### Step 1: Start the Backend Agent (Terminal 1)
```bash
cd agent-test
python simplified_agent.py start
```

**You should see:**
- "starting worker"
- "starting inference executor"
- Agent is now running and waiting for connections

### Step 2: Start the UI (Terminal 2)
```bash
cd UI
npm run dev
```

**You should see:**
- "ready started server on 0.0.0.0:3000"
- Open http://localhost:3000

### Step 3: Test the Voice Agent

1. Open browser: `http://localhost:3000/ai-features/voice-interaction`
2. Click **"Connect to AI Agent"** button (blue gradient button)
3. Wait for connection (popup will appear)
4. Start speaking when you see the microphone icon pulsing
5. The agent will respond with voice!

## 🎯 Test Queries

Try saying:
- "I have a headache"
- "What are my medications?"
- "Check my blood pressure"
- "I feel tired and dizzy"

## ✅ Expected Flow

1. **Click button** → Popup opens
2. **"Connecting..."** → Shows loading spinner
3. **"Ready to assist"** → Blue microphone icon
4. **You speak** → Red pulsing icon (Listening)
5. **Processing** → Yellow pulsing icon (Thinking)
6. **Agent responds** → Green pulsing icon (Speaking)

## 🐛 If Something Goes Wrong

### Agent won't start:
```bash
# Check if port is already in use
# Kill existing Python processes and try again
```

### Connection fails:
- Verify both terminals are running
- Check .env.local file exists with correct credentials
- Refresh the browser page

### No audio:
- Allow microphone permissions when prompted
- Check your microphone is working in system settings
- Try using Chrome browser (recommended)

## 💡 Quick Tips

- Use headphones to avoid feedback
- Speak clearly and naturally
- Wait for visual feedback before speaking again
- The agent remembers conversation context

---

**That's it! You're ready to use your AI Voice Health Assistant!** 🏥🤖

