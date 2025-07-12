
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Plus, 
  Users, 
  Clock, 
  BarChart3, 
  Settings,
  MessageSquare,
  User,
  Mic,
  Brain,
  TrendingUp,
  Award
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Session {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: number;
  aiParticipants: number;
  status: 'upcoming' | 'completed' | 'in-progress';
  topic: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: '1',
      title: 'Leadership Discussion',
      date: '2024-01-15',
      time: '14:00',
      participants: 3,
      aiParticipants: 2,
      status: 'upcoming',
      topic: 'Effective Leadership Strategies'
    },
    {
      id: '2',
      title: 'Team Communication',
      date: '2024-01-12',
      time: '10:30',
      participants: 4,
      aiParticipants: 1,
      status: 'completed',
      topic: 'Improving Team Collaboration'
    },
    {
      id: '3',
      title: 'Public Speaking Practice',
      date: '2024-01-10',
      time: '16:00',
      participants: 2,
      aiParticipants: 3,
      status: 'completed',
      topic: 'Presentation Skills Enhancement'
    }
  ]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const getStatusColor = (status: Session['status']) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/20 text-blue-300 border-blue-400/30';
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-400/30';
      case 'in-progress': return 'bg-orange-500/20 text-orange-300 border-orange-400/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-400/30';
    }
  };

  const stats = {
    totalSessions: sessions.length,
    completedSessions: sessions.filter(s => s.status === 'completed').length,
    avgRating: 4.2,
    improvementScore: 85
  };

  if (!user) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">TalkWise</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white font-medium">{user.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-black hover:text-blue-300"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="border-white/20 text-black hover:bg-white/10"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-300">
            Ready to improve your communication skills today?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Sessions</p>
                  <p className="text-2xl font-bold text-white">{stats.totalSessions}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-white">{stats.completedSessions}</p>
                </div>
                <Award className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Avg Rating</p>
                  <p className="text-2xl font-bold text-white">{stats.avgRating}/5</p>
                </div>
                <BarChart3 className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Improvement</p>
                  <p className="text-2xl font-bold text-white">{stats.improvementScore}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="sessions" className="space-y-6">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="sessions" className="data-[state=active]:bg-blue-600">
              My Sessions
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sessions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Discussion Sessions</h2>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate('/create-session')}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Session
              </Button>
            </div>

            <div className="grid gap-6">
              {sessions.map((session) => (
                <Card key={session.id} className="bg-white/5 backdrop-blur-sm border-black/10 hover:bg-white/10 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{session.title}</h3>
                        <p className="text-gray-300">{session.topic}</p>
                      </div>
                      <Badge className={getStatusColor(session.status)}>
                        {session.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-300">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(session.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{session.participants} users</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Brain className="w-4 h-4" />
                          <span>{session.aiParticipants} AI</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {session.status === 'upcoming' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-white/20 text-black hover:bg-white/10"
                            onClick={() => navigate(`/session/${session.id}`)}
                          >
                            Join
                          </Button>
                        )}
                        {session.status === 'completed' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="border-white/20 text-black hover:bg-white/10"
                            onClick={() => navigate(`/report/${session.id}`)}
                          >
                            View Report
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="ghost"
                          className="text-gray-400 hover:text-white"
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Performance Analytics</CardTitle>
                <CardDescription className="text-gray-300">
                  Track your communication skills improvement over time
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center text-gray-300">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                  <p>Analytics dashboard coming soon...</p>
                  <p className="text-sm mt-2">
                    Complete more sessions to see detailed insights about your communication patterns.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
