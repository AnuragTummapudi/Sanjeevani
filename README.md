# Sanjeevan Health Platform

A comprehensive AI-powered health diagnostics platform built with modern web technologies. Sanjeevan provides advanced medical intelligence through accessible and precise healthcare solutionss. 

## Features

- 🎨 **Modern Design**: Clean, minimalist design with centered layout and smooth gradients
- 🧠 **AI-Powered Analysis**: Advanced medical intelligence for health diagnostics
- ✨ **Smooth Animations**: Framer Motion animations throughout the site
- 📱 **Responsive**: Fully responsive design for all devices
- 🎯 **Interactive Elements**: Hover effects and smooth transitions
- 🏥 **Health Monitoring**: Real-time vitals tracking and analysis
- 📊 **Medical Reports**: AI-generated health insights and recommendations
- 🔒 **Secure & Compliant**: Enterprise-grade security and privacy

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Google Generative AI** - AI-powered health analysis
- **LiveKit** - Real-time voice interactions
- **Resend** - Email notifications and reports

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
UI/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main landing page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── api/               # API routes
│   │   ├── chat/          # AI chat endpoint
│   │   ├── health-analysis/ # Health analysis API
│   │   └── ...            # Other API endpoints
│   └── dashboard/         # Dashboard pages
├── components/            # React components
│   ├── AIAssistantPanel.tsx # AI chat interface
│   ├── VitalsMonitor.tsx    # Health monitoring
│   └── ...                # Other components
├── lib/                   # Utility libraries
│   ├── gemini.ts         # Google AI integration
│   └── email-service.ts  # Email notifications
├── public/                # Static assets
└── package.json          # Dependencies
```

## Key Features

### AI-Powered Health Analysis
- Google Generative AI integration for medical insights
- Real-time health data processing
- Intelligent symptom analysis and recommendations

### Health Monitoring
- Real-time vitals tracking
- Wearable device integration
- Historical health data visualization

### Voice Interactions
- LiveKit integration for voice-based health consultations
- Real-time speech-to-text and text-to-speech
- Interactive health assessments

### Medical Reports
- AI-generated health reports
- Lab report analysis
- Email delivery of health insights

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Google AI
GOOGLE_AI_API_KEY=your_google_ai_api_key

# LiveKit
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret

# Email Service
RESEND_API_KEY=your_resend_api_key

# Database (if using)
DATABASE_URL=your_database_url
```

## API Endpoints

- `POST /api/chat` - AI chat interface
- `POST /api/health-analysis` - Health data analysis
- `GET /api/google-fit-data` - Wearable device data
- `POST /api/send-health-alert` - Health alerts
- `GET /api/livekit-token` - Voice interaction tokens

## Security & Privacy

- HIPAA-compliant data handling
- End-to-end encryption for sensitive data
- Secure API authentication
- Privacy-first design principles

## Deployment

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard
5. Deploy!

### Vercel Deployment
1. Import your project to Vercel
2. Add environment variables
3. Deploy automatically on every push

## License

This project is proprietary and confidential. All rights reserved.
