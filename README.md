
# TalkWise - AI-Powered Group Discussion Platform

A full-stack web application that enables users to practice and improve their communication skills through AI-powered group discussions. Built with the MERN stack and integrated with OpenAI, Google Speech APIs, and WebRTC for real-time communication.

## 🚀 Features

### Core Functionality
- **User Authentication**: JWT-based registration and login system
- **Session Management**: Create, schedule, and join discussion sessions
- **Real-time Audio**: WebRTC-powered voice communication
- **AI Participants**: GPT-4 powered bots that engage in discussions
- **Live Transcription**: Speech-to-text conversion with real-time display
- **Performance Analytics**: Detailed post-session reports and insights
- **Multi-language Support**: Discussions in multiple languages

### Advanced Features
- **Smart Session Configuration**: Mix real users with AI participants
- **Performance Tracking**: Speaking time, clarity, engagement metrics
- **Improvement Suggestions**: AI-powered feedback and recommendations
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Real-time Indicators**: Visual feedback for speaking participants
- **Session Sharing**: Shareable links for easy participant access

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/UI** for components
- **React Router** for navigation
- **TanStack Query** for state management
- **WebRTC** for real-time communication

### Backend (Recommended Setup)
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Socket.IO** for real-time features
- **JWT** for authentication
- **Multer** for file uploads

### AI & External APIs
- **OpenAI GPT-4** for AI participants
- **Google Speech-to-Text** for transcription
- **Google Text-to-Speech** for AI voice
- **Google Translate** for multi-language support

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance (local or Atlas)
- API keys for external services

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd talkwise-platform
```

### 2. Install Dependencies
```bash
# Frontend dependencies (already configured in Lovable)
npm install

# Backend dependencies (if setting up separately)
cd backend
npm install
```

### 3. Environment Variables

Create a `.env` file in your backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/talkwise
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/talkwise

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# AI APIs
OPENAI_API_KEY=sk-your-openai-api-key-here
OPENAI_MODEL=gpt-4

# Google Cloud APIs
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json
GOOGLE_SPEECH_API_KEY=your-google-speech-api-key
GOOGLE_TTS_API_KEY=your-google-tts-api-key
GOOGLE_TRANSLATE_API_KEY=your-google-translate-api-key

# Optional: ElevenLabs (Alternative TTS)
ELEVENLABS_API_KEY=your-elevenlabs-api-key

# WebRTC Configuration
TURN_SERVER_URL=turn:your-turn-server.com:3478
TURN_SERVER_USERNAME=username
TURN_SERVER_CREDENTIAL=password

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:8080
```

### 4. Google Cloud Setup

1. Create a Google Cloud Project
2. Enable the following APIs:
   - Speech-to-Text API
   - Text-to-Speech API
   - Cloud Translation API
3. Create a service account and download credentials
4. Set `GOOGLE_APPLICATION_CREDENTIALS` to the path of your credentials file

### 5. OpenAI Setup

1. Sign up for OpenAI API access
2. Generate an API key from the OpenAI dashboard
3. Add the key to your environment variables

## 🚀 Running the Application

### Development Mode

1. **Start the Frontend** (Lovable handles this automatically):
```bash
npm run dev
```

2. **Start the Backend** (separate terminal):
```bash
cd backend
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:8080`
- Backend API: `http://localhost:5000`

### Production Deployment

#### Frontend (Vercel/Netlify)
```bash
npm run build
```

#### Backend (Heroku/Railway/DigitalOcean)
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
talkwise-platform/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   │   ├── Index.tsx       # Landing page
│   │   ├── Login.tsx       # Authentication
│   │   ├── Dashboard.tsx   # User dashboard
│   │   ├── CreateSession.tsx # Session creation
│   │   ├── SessionRoom.tsx # Live discussion room
│   │   └── SessionReport.tsx # Analytics & feedback
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript definitions
├── backend/                # Backend server code
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   ├── services/           # Business logic
│   └── utils/              # Helper functions
└── docs/                   # Documentation
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Sessions
- `GET /api/sessions` - List user sessions
- `POST /api/sessions` - Create new session
- `GET /api/sessions/:id` - Get session details
- `PUT /api/sessions/:id` - Update session
- `DELETE /api/sessions/:id` - Delete session

### Real-time Communication
- `WebSocket /socket.io` - Real-time events
- `POST /api/sessions/:id/join` - Join session
- `POST /api/sessions/:id/leave` - Leave session

### AI & Analytics
- `POST /api/ai/generate-response` - Get AI participant response
- `POST /api/speech/transcribe` - Convert speech to text
- `POST /api/speech/synthesize` - Convert text to speech
- `GET /api/analytics/:sessionId` - Get session analytics

## 🧪 Testing

### Frontend Testing
```bash
npm run test
```

### Backend Testing
```bash
cd backend
npm run test
```

### End-to-End Testing
```bash
npm run test:e2e
```

## 📱 WebRTC Configuration

For production deployment, you'll need TURN servers for NAT traversal:

```javascript
const iceServers = [
  { urls: 'stun:stun.l.google.com:19302' },
  {
    urls: 'turn:your-turn-server.com:3478',
    username: 'username',
    credential: 'password'
  }
];
```

Recommended TURN server providers:
- **Twilio STUN/TURN**
- **Amazon Kinesis Video Streams**
- **Xirsys**

## 🔒 Security Considerations

1. **API Keys**: Never expose API keys in frontend code
2. **JWT Tokens**: Use secure, httpOnly cookies in production
3. **CORS**: Configure proper CORS policies
4. **Rate Limiting**: Implement API rate limiting
5. **Input Validation**: Validate all user inputs
6. **HTTPS**: Use HTTPS in production
7. **WebRTC Security**: Implement proper WebRTC security measures

## 📊 Monitoring & Analytics

Consider integrating:
- **Sentry** for error tracking
- **Google Analytics** for user behavior
- **Mixpanel** for event tracking
- **LogRocket** for session replay

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@talkwise.com
- Documentation: [docs.talkwise.com](https://docs.talkwise.com)

## 🛣️ Roadmap

### Phase 1 (Current)
- ✅ Basic session creation and management
- ✅ Real-time audio communication
- ✅ AI-powered participants
- ✅ Performance analytics

### Phase 2 (Upcoming)
- 🔄 Video communication support
- 🔄 Advanced AI personality customization
- ✅ Multi-language support
- 🔄 Mobile app development

### Phase 3 (Future)
- 📅 Enterprise features
- 📅 Integration with learning platforms
- 📅 Advanced analytics dashboard
- 📅 API for third-party integrations

---

**TalkWise** - Empowering better communication through AI-powered practice sessions.
