
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import ChatMessage from './ChatMessage';
import MessageForm from './MessageForm';
import AIResponseButton from './AIResponseButton';
import { Loader2 } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

const ChatRoom = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const { data: messages, isLoading, error, refetch } = useQuery({
    queryKey: ['messages', refreshTrigger],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Message[];
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const handleMessageSent = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleAIResponse = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (error) {
    console.error('Error loading messages:', error);
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Failed to load messages. Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Talk Wise Circles</h1>
        <p className="text-gray-600">Join the conversation and share your thoughts with AI assistance</p>
      </div>

      <MessageForm onMessageSent={handleMessageSent} />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Recent Messages</h2>
          <AIResponseButton 
            recentMessages={messages || []} 
            onAIResponse={handleAIResponse}
          />
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
          </div>
        ) : messages && messages.length > 0 ? (
          <div className="space-y-3">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                name={message.name}
                message={message.message}
                createdAt={message.created_at}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No messages yet. Be the first to start the conversation!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
