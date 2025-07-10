
import { useState } from 'react';
import { Send, Paperclip, Mic, FileText, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messages = [
    {
      id: 1,
      type: 'user',
      content: 'What are the main conclusions about climate change impacts on agriculture?',
      timestamp: '2:30 PM'
    },
    {
      id: 2,
      type: 'ai',
      content: 'Based on the research papers you\'ve uploaded, there are several key conclusions about climate change impacts on agriculture:\n\n1. **Temperature Changes**: Rising temperatures are affecting crop yields, with heat-sensitive crops like wheat showing 10-25% reduced productivity in warmer regions.\n\n2. **Water Availability**: Changing precipitation patterns are creating both drought and flood conditions, disrupting traditional farming cycles.\n\n3. **Pest and Disease Pressure**: Warmer temperatures are expanding the range of agricultural pests and plant diseases.',
      timestamp: '2:31 PM',
      sources: [
        { title: 'Climate Agriculture Report 2024', page: '15-17' },
        { title: 'Global Food Security Analysis', page: '23-25' }
      ]
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setIsTyping(true);
      // Simulate AI response
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
      setMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Chat History Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Chats</h2>
            <Button size="sm" variant="ghost">
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Document Selector */}
          <div className="bg-blue-50 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Climate Research Papers (3)</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {[
            'Climate change and agriculture impacts',
            'Food security analysis discussion',
            'Temperature effects on crop yields',
            'Water availability patterns',
            'Agricultural adaptation strategies'
          ].map((chat, index) => (
            <Card key={index} className="p-3 hover:bg-gray-50 cursor-pointer border-0 shadow-sm">
              <p className="text-sm text-gray-700 font-medium truncate">{chat}</p>
              <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AI Research Assistant</h1>
              <p className="text-sm text-gray-600">Analyzing 3 climate research documents</p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Online
            </Badge>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`rounded-2xl px-4 py-3 ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-md' 
                    : 'bg-white border border-gray-200 rounded-bl-md shadow-sm'
                }`}>
                  <p className={`${msg.type === 'ai' ? 'text-gray-800' : 'text-white'} whitespace-pre-line`}>
                    {msg.content}
                  </p>
                  
                  {msg.sources && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-600 mb-2">Sources:</p>
                      <div className="space-y-1">
                        {msg.sources.map((source, index) => (
                          <div key={index} className="flex items-center space-x-2 text-xs text-blue-600">
                            <FileText className="w-3 h-3" />
                            <span>{source.title}, Page {source.page}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className={`text-xs text-gray-500 mt-1 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything about your documents..."
                className="pr-20 py-3 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <Button size="sm" variant="ghost" className="p-1 h-8 w-8">
                  <Paperclip className="w-4 h-4 text-gray-400" />
                </Button>
                <Button size="sm" variant="ghost" className="p-1 h-8 w-8">
                  <Mic className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
