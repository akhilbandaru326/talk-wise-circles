
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  ArrowLeft, 
  MessageSquare,
  Users,
  Brain,
  Mic,
  BarChart3,
  Volume2,
  Sparkles
} from "lucide-react";

const Demo = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      title: "Create Your Session",
      description: "Set up a discussion with custom topics, participant mix, and timing",
      duration: "30 seconds",
      features: ["Custom topics", "Flexible scheduling", "AI participant control"]
    },
    {
      title: "Join the Discussion",
      description: "Engage in real-time conversations with AI-powered participants",
      duration: "45 seconds", 
      features: ["Real-time audio", "Live transcription", "Smart AI responses"]
    },
    {
      title: "Get Detailed Analytics",
      description: "Receive comprehensive feedback on your communication performance",
      duration: "25 seconds",
      features: ["Performance metrics", "Improvement suggestions", "Progress tracking"]
    }
  ];

  const toggleDemo = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate demo progression
      const timer = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= demoSteps.length - 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 5000);

      setTimeout(() => {
        clearInterval(timer);
        setIsPlaying(false);
        setCurrentStep(0);
      }, 15000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-blue-300 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">TalkWise Demo</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-blue-600/20 text-black hovor:text-blue-300 border-blue-400/30">
            🎬 Interactive Demo
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            See TalkWise in Action
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Experience how AI-powered group discussions can transform your communication skills
          </p>
        </div>

        {/* Demo Player */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative flex items-center justify-center">
              {/* Mock Interface */}
              <div className="absolute inset-4 bg-black/30 rounded-lg border border-white/10 p-6">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {/* Participants */}
                  <div className="space-y-2">
                    <div className="bg-white/10 rounded-lg p-3 flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white text-sm">You</span>
                      {isPlaying && currentStep >= 1 && (
                        <div className="flex space-x-1 ml-auto">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-1 h-4 bg-green-400 rounded-sm animate-pulse" />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 flex items-center space-x-2">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-white text-sm">AI Facilitator</span>
                      {isPlaying && currentStep === 1 && (
                        <div className="flex space-x-1 ml-auto">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-1 h-6 bg-green-400 rounded-sm animate-pulse" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Controls & Info */}
                  <div className="space-y-4">
                    {isPlaying && (
                      <div className="bg-blue-600/20 rounded-lg p-3 border border-blue-400/30">
                        <div className="flex items-center space-x-2 mb-2">
                          <Sparkles className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-300 text-sm font-medium">
                            {demoSteps[currentStep].title}
                          </span>
                        </div>
                        <p className="text-gray-300 text-xs">
                          {demoSteps[currentStep].description}
                        </p>
                      </div>
                    )}
                    
                    {currentStep >= 2 && (
                      <div className="bg-green-600/20 rounded-lg p-2 border border-green-400/30">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-green-300">Performance Score</span>
                          <span className="text-white font-bold">85/100</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Play Button */}
              <Button
                size="lg"
                onClick={toggleDemo}
                className={`absolute inset-0 m-auto w-20 h-20 rounded-full ${
                  isPlaying 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } transition-all duration-300 hover:scale-110`}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </Button>

              {/* Progress Bar */}
              {isPlaying && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/50 rounded-full h-1">
                    <div 
                      className="bg-blue-400 h-1 rounded-full transition-all duration-1000"
                      style={{ 
                        width: `${((currentStep + 1) / demoSteps.length) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Features Showcase */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {demoSteps.map((step, index) => (
            <Card 
              key={index}
              className={`bg-white/5 backdrop-blur-sm border-white/10 transition-all duration-300 ${
                isPlaying && currentStep === index 
                  ? 'ring-2 ring-blue-400 bg-blue-600/10' 
                  : 'hover:bg-white/10'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isPlaying && currentStep === index 
                      ? 'bg-blue-600' 
                      : 'bg-white/10'
                  }`}>
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <Badge variant="outline" className="border-white/20 text-gray-300 text-xs">
                    {step.duration}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-300 mb-4">{step.description}</p>
                
                <div className="space-y-2">
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-blue-400 rounded-full" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-white/10">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Communication Skills?
            </h2>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of professionals who have improved their speaking and listening abilities 
              through AI-powered group discussions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-black px-8"
                onClick={() => navigate('/register')}
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-blue-600 hover:bg-blue-700 text-black px-8"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Demo;
