
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AIResponseButtonProps {
  recentMessages: Array<{
    id: string;
    name: string;
    message: string;
    created_at: string;
  }>;
  onAIResponse: () => void;
}

const AIResponseButton = ({ recentMessages, onAIResponse }: AIResponseButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleAIResponse = async () => {
    if (recentMessages.length === 0) {
      toast({
        title: "No messages",
        description: "There are no messages for the AI to respond to yet.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const latestMessage = recentMessages[0];
      const context = recentMessages.slice(0, 5).reverse(); // Last 5 messages for context

      const { data, error } = await supabase.functions.invoke('chat-with-gemini', {
        body: {
          message: latestMessage.message,
          recentMessages: context,
        },
      });

      if (error) throw error;

      if (data?.response) {
        // Insert AI response into the messages table
        const { error: insertError } = await supabase
          .from('messages')
          .insert([
            {
              name: 'AI Assistant',
              message: data.response,
            }
          ]);

        if (insertError) throw insertError;

        toast({
          title: "AI Response Added",
          description: "The AI assistant has joined the conversation!",
        });

        onAIResponse();
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "Error",
        description: "Failed to generate AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleAIResponse}
      disabled={isGenerating}
      variant="outline"
      className="flex items-center gap-2"
    >
      {isGenerating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Bot className="h-4 w-4" />
      )}
      {isGenerating ? 'Getting AI Response...' : 'Ask AI Assistant'}
    </Button>
  );
};

export default AIResponseButton;
