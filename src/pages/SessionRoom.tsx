
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Phone, 
  Users, 
  MessageSquare,
  Settings,
  Volume2,
  VolumeX,
  Monitor,
  Brain,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Participant {
  id: string;
  name: string;
  type: 'human' | 'ai';
  isAudioActive: boolean;
  isMuted: boolean;
  avatar: string;
  speakingLevel: number;
}

const SessionRoom = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sessionStatus, setSessionStatus] = useState<'waiting' | 'active' | 'ended'>('waiting');
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [sessionTime, setSessionTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      name: 'You',
      type: 'human',
      isAudioActive: false,
      isMuted: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
      speakingLevel: 0
    },
    {
      id: '2',
      name: 'Sarah Chen',
      type: 'human',
      isAudioActive: true,
      isMuted: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      speakingLevel: 0.7
    },
    {
      id: '3',
      name: 'AI Facilitator',
      type: 'ai',
      isAudioActive: false,
      isMuted: false,
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ai1',
      speakingLevel: 0
    },
    {
      id: '4',
      name: 'AI Analyst',
      type: 'ai',
      isAudioActive: false,
      isMuted: false,
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ai2',
      speakingLevel: 0
    }
  ]);

  useEffect(() => {
    // Simulate session timer
    const timer = setInterval(() => {
      if (sessionStatus === 'active') {
        setSessionTime(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionStatus]);

  useEffect(() => {
    // Simulate AI responses and participant interactions
    const aiInteractionTimer = setInterval(() => {
      if (sessionStatus === 'active') {
        // Randomly activate AI participants
        setParticipants(prev => prev.map(p => {
          if (p.type === 'ai' && Math.random() > 0.8) {
            return { ...p, isAudioActive: true, speakingLevel: Math.random() * 0.8 + 0.2 };
          }
          return { ...p, isAudioActive: false, speakingLevel: 0 };
        }));

        // Simulate transcription updates
        const aiResponses = [
          "I believe effective leadership requires clear communication...",
          "That's an interesting perspective on team dynamics...",
          "From my analysis, the data suggests...",
          "Building on what Sarah mentioned earlier..."
        ];
        
        if (Math.random() > 0.7) {
          setCurrentTranscript(aiResponses[Math.floor(Math.random() * aiResponses.length)]);
          setTimeout(() => setCurrentTranscript(''), 3000);
        }
      }
    }, 2000);

    return () => clearInterval(aiInteractionTimer);
  }, [sessionStatus]);

  const toggleAudio = async () => {
    try {
      if (!isAudioEnabled) {
        // Request microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsAudioEnabled(true);
        toast({
          title: "Microphone enabled",
          description: "You can now speak in the discussion",
        });
        
        // Clean up stream
        stream.getTracks().forEach(track => track.stop());
      } else {
        setIsAudioEnabled(false);
        setIsMuted(true);
      }
    } catch (error) {
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to participate",
        variant: "destructive",
      });
    }
  };

  const startSession = () => {
    setSessionStatus('active');
    toast({
      title: "Session started!",
      description: "The discussion is now live",
    });
  };

  const endSession = () => {
    setSessionStatus('ended');
    toast({
      title: "Session ended",
      description: "Generating your performance report...",
    });
    setTimeout(() => {
      navigate(`/report/${sessionId}`);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Top Bar */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-blue-400" />
              <span className="text-white font-semibold">Leadership Discussion</span>
            </div>
            <Badge className={sessionStatus === 'active' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}>
              {sessionStatus === 'active' ? `Live • ${formatTime(sessionTime)}` : 'Waiting to start'}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-white/20 text-white">
              <Users className="w-3 h-3 mr-1" />
              {participants.length} participants
            </Badge>
            <Button variant="ghost" size="sm" className="text-white">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Participants Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {participants.map((participant) => (
                <Card key={participant.id} className="bg-white/5 backdrop-blur-sm border-white/10 relative overflow-hidden">
                  <CardContent className="p-4">
                    <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center mb-3 relative">
                      <img 
                        src={participant.avatar} 
                        alt={participant.name}
                        className="w-16 h-16 rounded-full"
                      />
                      
                      {/* Speaking indicator */}
                      {participant.speakingLevel > 0 && (
                        <div className="absolute inset-0 border-2 border-green-400 rounded-lg animate-pulse" />
                      )}
                      
                      {/* Audio level bars */}
                      {participant.isAudioActive && (
                        <div className="absolute bottom-2 left-2 flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 bg-green-400 rounded-sm transition-all duration-150 ${
                                i < participant.speakingLevel * 5 ? 'h-4' : 'h-1 opacity-30'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {participant.type === 'ai' ? (
                          <Brain className="w-4 h-4 text-purple-400" />
                        ) : (
                          <User className="w-4 h-4 text-blue-400" />
                        )}
                        <span className="text-white font-medium">{participant.name}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        {participant.isMuted ? (
                          <MicOff className="w-4 h-4 text-red-400" />
                        ) : (
                          <Mic className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              <Button
                variant={isAudioEnabled ? "default" : "outline"}
                size="lg"
                onClick={toggleAudio}
                className={`${isAudioEnabled ? 'bg-green-600 hover:bg-green-700' : 'border-white/20 text-black hover:bg-white/10'} rounded-full p-4`}
              >
                {isAudioEnabled && !isMuted ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </Button>
              
              <Button
                variant={isVideoEnabled ? "default" : "outline"}
                size="lg"
                onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                className={`${isVideoEnabled ? 'bg-blue-600 hover:bg-blue-700' : 'border-white/20 text-black hover:bg-blue/10'} rounded-full p-4`}
              >
                {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </Button>

              {sessionStatus === 'waiting' ? (
                <Button
                  size="lg"
                  onClick={startSession}
                  className="bg-green-600 hover:bg-green-700 text-black rounded-full px-6"
                >
                  Start Discussion
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={endSession}
                  className="rounded-full p-4"
                >
                  <Phone className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Live Transcription */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <Monitor className="w-4 h-4 mr-2" />
                  Live Transcription
                </h3>
                <div className="bg-black/20 rounded-lg p-3 min-h-[100px]">
                  {currentTranscript ? (
                    <p className="text-gray-300 text-sm">{currentTranscript}</p>
                  ) : (
                    <p className="text-gray-500 text-sm italic">Listening for speech...</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Session Info */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-3">Session Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Topic:</span>
                    <span className="text-white">Leadership</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Duration:</span>
                    <span className="text-white">{formatTime(sessionTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Participants:</span>
                    <span className="text-white">{participants.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">AI Bots:</span>
                    <span className="text-purple-300">{participants.filter(p => p.type === 'ai').length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-4">
                <h3 className="text-white font-semibold mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full border-white/20 text-black hover:bg-white/10">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Audio Settings
                  </Button>
                  <Button variant="outline" size="sm" className="w-full border-white/20 text-black hover:bg-white/10">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                  <Button variant="outline" size="sm" className="w-full border-white/20 text-black hover:bg-white/10">
                    <Monitor className="w-4 h-4 mr-2" />
                    Share Screen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionRoom;
