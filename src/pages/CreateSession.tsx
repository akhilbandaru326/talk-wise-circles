
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  Brain, 
  Share2,
  Plus,
  Minus,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateSession = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    description: "",
    date: "",
    time: "",
    duration: "60",
    realUsers: 2,
    aiParticipants: 2,
    language: "en",
    difficulty: "intermediate"
  });
  const [loading, setLoading] = useState(false);

  const topics = [
    "Leadership & Management",
    "Team Communication",
    "Public Speaking",
    "Presentation Skills",
    "Conflict Resolution",
    "Negotiation Skills",
    "Creative Problem Solving",
    "Decision Making",
    "Cultural Awareness",
    "Customer Service"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const adjustParticipants = (type: 'real' | 'ai', operation: 'add' | 'subtract') => {
    setFormData(prev => {
      const field = type === 'real' ? 'realUsers' : 'aiParticipants';
      const current = prev[field];
      const newValue = operation === 'add' ? current + 1 : Math.max(1, current - 1);
      
      return {
        ...prev,
        [field]: newValue
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const sessionId = Math.random().toString(36).substr(2, 9);
      
      toast({
        title: "Session created successfully!",
        description: "Your discussion session has been scheduled.",
      });
      
      // Redirect to session sharing page or dashboard
      navigate(`/session/${sessionId}/share`);
    } catch (error) {
      toast({
        title: "Failed to create session",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalParticipants = formData.realUsers + formData.aiParticipants;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="text-white hover:text-blue-300 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">TalkWise</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create New Session</h1>
          <p className="text-gray-300">Set up your AI-powered group discussion</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Session Details</CardTitle>
                <CardDescription className="text-gray-300">
                  Configure your discussion session settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Session Title</Label>
                      <Input
                        name="title"
                        placeholder="e.g., Leadership Discussion"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Topic</Label>
                      <Select onValueChange={(value) => handleSelectChange('topic', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Choose a topic" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/20">
                          {topics.map((topic) => (
                            <SelectItem key={topic} value={topic} className="text-white hover:bg-white/10">
                              {topic}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Description (Optional)</Label>
                    <Textarea
                      name="description"
                      placeholder="Describe what you'd like to discuss..."
                      value={formData.description}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Date</Label>
                      <Input
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Time</Label>
                      <Input
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="bg-white/10 border-white/20 text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Duration (minutes)</Label>
                      <Select onValueChange={(value) => handleSelectChange('duration', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Duration" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/20">
                          <SelectItem value="30" className="text-white">30 minutes</SelectItem>
                          <SelectItem value="45" className="text-white">45 minutes</SelectItem>
                          <SelectItem value="60" className="text-white">60 minutes</SelectItem>
                          <SelectItem value="90" className="text-white">90 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-white text-lg">Participants Configuration</Label>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-white flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            Real Users
                          </Label>
                          <Badge variant="outline" className="border-blue-400/30 text-blue-300">
                            {formData.realUsers}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-white/10"
                            onClick={() => adjustParticipants('real', 'subtract')}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <div className="flex-1 text-center text-white font-medium py-2">
                            {formData.realUsers} participant{formData.realUsers !== 1 ? 's' : ''}
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-white/10"
                            onClick={() => adjustParticipants('real', 'add')}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-white flex items-center">
                            <Brain className="w-4 h-4 mr-2" />
                            AI Participants
                          </Label>
                          <Badge variant="outline" className="border-purple-400/30 text-purple-300">
                            {formData.aiParticipants}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-white/10"
                            onClick={() => adjustParticipants('ai', 'subtract')}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <div className="flex-1 text-center text-white font-medium py-2">
                            {formData.aiParticipants} AI bot{formData.aiParticipants !== 1 ? 's' : ''}
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="border-white/20 text-white hover:bg-white/10"
                            onClick={() => adjustParticipants('ai', 'add')}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Language</Label>
                      <Select onValueChange={(value) => handleSelectChange('language', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/20">
                          <SelectItem value="en" className="text-white">English</SelectItem>
                          <SelectItem value="es" className="text-white">Spanish</SelectItem>
                          <SelectItem value="fr" className="text-white">French</SelectItem>
                          <SelectItem value="de" className="text-white">German</SelectItem>
                          <SelectItem value="it" className="text-white">Italian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Difficulty Level</Label>
                      <Select onValueChange={(value) => handleSelectChange('difficulty', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/20">
                          <SelectItem value="beginner" className="text-white">Beginner</SelectItem>
                          <SelectItem value="intermediate" className="text-white">Intermediate</SelectItem>
                          <SelectItem value="advanced" className="text-white">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                    disabled={loading}
                  >
                    {loading ? "Creating Session..." : "Create Session"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 sticky top-8">
              <CardHeader>
                <CardTitle className="text-white">Session Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span>{formData.date || "Date not set"}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>{formData.time || "Time not set"} ({formData.duration}min)</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Users className="w-4 h-4" />
                  <span>{totalParticipants} total participants</span>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Real Users:</span>
                      <span className="text-blue-300">{formData.realUsers}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">AI Participants:</span>
                      <span className="text-purple-300">{formData.aiParticipants}</span>
                    </div>
                  </div>
                </div>

                {formData.title && (
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-white font-medium mb-2">Ready to share?</h4>
                    <p className="text-sm text-gray-300 mb-3">
                      Once created, you'll get a link to share with participants.
                    </p>
                    <div className="flex items-center space-x-1 text-blue-300 text-sm">
                      <Share2 className="w-4 h-4" />
                      <span>Shareable link will be generated</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSession;
