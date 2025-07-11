
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft,
  Download,
  Share2,
  Clock,
  Mic,
  TrendingUp,
  Award,
  Brain,
  MessageSquare,
  BarChart3,
  Users,
  Target,
  Lightbulb,
  User
} from "lucide-react";

interface Participant {
  id: string;
  name: string;
  type: 'human' | 'ai';
  avatar: string;
  speakingTime: number;
  wordsSpoken: number;
  contributionScore: number;
}

interface AnalysisData {
  speakingTime: number;
  totalTime: number;
  wordsSpoken: number;
  averagePause: number;
  interactionScore: number;
  clarityScore: number;
  engagementLevel: number;
  keyPoints: string[];
  improvements: string[];
  strengths: string[];
  participants: Participant[];
}

const SessionReport = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    speakingTime: 180, // seconds
    totalTime: 900, // 15 minutes
    wordsSpoken: 342,
    averagePause: 2.3,
    interactionScore: 85,
    clarityScore: 78,
    engagementLevel: 92,
    participants: [
      {
        id: '1',
        name: 'You',
        type: 'human',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
        speakingTime: 180,
        wordsSpoken: 342,
        contributionScore: 85
      },
      {
        id: '2',
        name: 'Sarah Chen',
        type: 'human',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        speakingTime: 220,
        wordsSpoken: 428,
        contributionScore: 92
      },
      {
        id: '3',
        name: 'AI Facilitator',
        type: 'ai',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ai1',
        speakingTime: 150,
        wordsSpoken: 298,
        contributionScore: 88
      },
      {
        id: '4',
        name: 'AI Analyst',
        type: 'ai',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ai2',
        speakingTime: 120,
        wordsSpoken: 245,
        contributionScore: 82
      }
    ],
    keyPoints: [
      "Emphasized the importance of clear communication in leadership",
      "Discussed strategies for managing remote teams effectively",
      "Shared insights on building trust within organizations",
      "Highlighted the role of emotional intelligence in decision-making"
    ],
    improvements: [
      "Consider speaking more slowly to improve clarity",
      "Try to ask more questions to encourage participation",
      "Use more specific examples to support your points",
      "Work on reducing filler words like 'um' and 'uh'"
    ],
    strengths: [
      "Excellent use of concrete examples",
      "Strong active listening skills demonstrated",
      "Good balance between speaking and listening",
      "Effective use of follow-up questions"
    ]
  });

  useEffect(() => {
    // Simulate API call to fetch report data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const speakingPercentage = (analysisData.speakingTime / analysisData.totalTime) * 100;
  const wordsPerMinute = Math.round(analysisData.wordsSpoken / (analysisData.speakingTime / 60));

  const overallScore = Math.round(
    (analysisData.interactionScore + analysisData.clarityScore + analysisData.engagementLevel) / 3
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Analyzing your performance...</p>
          <p className="text-gray-300 text-sm">This may take a few moments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                className="text-white hover:text-blue-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold text-white">Session Report</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Leadership Discussion</h1>
              <p className="text-gray-300">Session completed on January 15, 2024</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-1">{overallScore}</div>
              <div className="text-gray-300 text-sm">Overall Score</div>
              <Badge className="mt-2 bg-green-500/20 text-green-300 border-green-400/30">
                <Award className="w-3 h-3 mr-1" />
                Excellent
              </Badge>
            </div>
          </div>
        </div>

        {/* Participants Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <Users className="w-6 h-6 mr-2" />
            Session Participants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analysisData.participants.map((participant) => (
              <Card key={participant.id} className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-4 text-center">
                  <div className="mb-3">
                    <Avatar className="w-16 h-16 mx-auto mb-2">
                      <AvatarImage src={participant.avatar} alt={participant.name} />
                      <AvatarFallback className="bg-blue-600 text-white">
                        {participant.type === 'ai' ? (
                          <Brain className="w-8 h-8" />
                        ) : (
                          <User className="w-8 h-8" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-white font-medium">{participant.name}</h3>
                    <Badge 
                      variant="outline" 
                      className={participant.type === 'ai' 
                        ? "border-purple-400/30 text-purple-300" 
                        : "border-blue-400/30 text-blue-300"
                      }
                    >
                      {participant.type === 'ai' ? 'AI Bot' : 'Human'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Speaking Time:</span>
                      <span className="text-white">
                        {Math.floor(participant.speakingTime / 60)}:{(participant.speakingTime % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Words:</span>
                      <span className="text-white">{participant.wordsSpoken}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Score:</span>
                      <span className="text-white">{participant.contributionScore}/100</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-8 h-8 text-blue-400" />
                <Badge variant="outline" className="border-blue-400/30 text-blue-300">
                  {Math.round(speakingPercentage)}%
                </Badge>
              </div>
              <h3 className="text-white font-semibold">Speaking Time</h3>
              <p className="text-2xl font-bold text-white mb-1">
                {Math.floor(analysisData.speakingTime / 60)}:{(analysisData.speakingTime % 60).toString().padStart(2, '0')}
              </p>
              <p className="text-gray-300 text-sm">of {Math.floor(analysisData.totalTime / 60)} minutes total</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Mic className="w-8 h-8 text-green-400" />
                <Badge variant="outline" className="border-green-400/30 text-green-300">
                  {wordsPerMinute} WPM
                </Badge>
              </div>
              <h3 className="text-white font-semibold">Words Spoken</h3>
              <p className="text-2xl font-bold text-white mb-1">{analysisData.wordsSpoken}</p>
              <p className="text-gray-300 text-sm">Average pace: {wordsPerMinute} words/min</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 text-purple-400" />
                <Badge variant="outline" className="border-purple-400/30 text-purple-300">
                  {analysisData.interactionScore}/100
                </Badge>
              </div>
              <h3 className="text-white font-semibold">Interaction</h3>
              <p className="text-2xl font-bold text-white mb-1">{analysisData.interactionScore}</p>
              <p className="text-gray-300 text-sm">Engagement with others</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Brain className="w-8 h-8 text-orange-400" />
                <Badge variant="outline" className="border-orange-400/30 text-orange-300">
                  {analysisData.clarityScore}/100
                </Badge>
              </div>
              <h3 className="text-white font-semibold">Clarity</h3>
              <p className="text-2xl font-bold text-white mb-1">{analysisData.clarityScore}</p>
              <p className="text-gray-300 text-sm">Communication clarity</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="performance" className="data-[state=active]:bg-blue-600">
              Performance Analysis
            </TabsTrigger>
            <TabsTrigger value="insights" className="data-[state=active]:bg-blue-600">
              Key Insights
            </TabsTrigger>
            <TabsTrigger value="improvements" className="data-[state=active]:bg-blue-600">
              Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Communication Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Interaction Score</span>
                      <span className="text-white font-medium">{analysisData.interactionScore}/100</span>
                    </div>
                    <Progress value={analysisData.interactionScore} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Clarity Score</span>
                      <span className="text-white font-medium">{analysisData.clarityScore}/100</span>
                    </div>
                    <Progress value={analysisData.clarityScore} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Engagement Level</span>
                      <span className="text-white font-medium">{analysisData.engagementLevel}/100</span>
                    </div>
                    <Progress value={analysisData.engagementLevel} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Your Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisData.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-gray-300 text-sm">{strength}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Key Discussion Points
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Main topics and insights from your conversation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisData.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-300">{point}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="improvements" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Improvement Recommendations
                </CardTitle>
                <CardDescription className="text-gray-300">
                  AI-powered suggestions to enhance your communication skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisData.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-gray-300 mb-2">{improvement}</p>
                        <Badge variant="outline" className="border-orange-400/30 text-orange-300 text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Priority: {index < 2 ? 'High' : 'Medium'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Next Steps */}
        <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-white/10 mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Ready for your next session?</h3>
                <p className="text-gray-300">
                  Continue improving your communication skills with more AI-powered discussions.
                </p>
              </div>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => navigate('/create-session')}
              >
                Schedule New Session
              </Button>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
};

export default SessionReport;
