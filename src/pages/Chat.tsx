
import { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Mic, FileText, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';
import { ChatLoadingBubble, ChatHistoryLoader } from '@/components/ui/loading-states';

const Chat = () => {
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { 
    chatSessions, 
    activeChatId, 
    files, 
    selectedFileId, 
    isTyping,
    addMessage, 
    setIsTyping,
    addChatSession,
    setActiveChatId,
    selectFile
  } = useAppStore();

  const activeChat = chatSessions.find(chat => chat.id === activeChatId);
  const selectedFile = files.find(file => file.id === selectedFileId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages, isTyping]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const messageId = Date.now().toString();
    const userMessage = {
      id: messageId,
      type: 'user' as const,
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Create new chat if none exists
    if (!activeChatId) {
      const newChatId = Date.now().toString();
      const newChat = {
        id: newChatId,
        title: message.slice(0, 50) + (message.length > 50 ? '...' : ''),
        messages: [userMessage],
        documentId: selectedFileId || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      addChatSession(newChat);
    } else {
      addMessage(activeChatId, userMessage);
    }

    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai' as const,
        content: `Based on your question about "${message}", I can provide relevant information from the uploaded document. This is a simulated response that would normally come from Gemini Flash 2.5 with RAG capabilities.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: selectedFile ? [
          { title: selectedFile.name, page: '1-3' }
        ] : undefined
      };
      
      const currentChatId = activeChatId || chatSessions[0]?.id;
      if (currentChatId) {
        addMessage(currentChatId, aiMessage);
      }
      setIsTyping(false);
    }, 2000);
  };

  const handleChatSelect = (chatId: string) => {
    setActiveChatId(chatId);
  };

  const handleFileSelect = (fileId: string) => {
    selectFile(fileId);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Chat History Sidebar */}
      <div className="w-80 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Chats</h2>
            <Button size="sm" variant="ghost">
              <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Document Selector */}
          {selectedFile && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-3 mb-4 border border-blue-100 dark:border-blue-800">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100 truncate">
                  {selectedFile.name}
                </span>
              </div>
            </div>
          )}

          {/* File Selector Dropdown */}
          {files.length > 0 && (
            <select 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
              value={selectedFileId || ''}
              onChange={(e) => handleFileSelect(e.target.value)}
            >
              <option value="">Select a document...</option>
              {files.filter(f => f.status === 'completed').map(file => (
                <option key={file.id} value={file.id}>{file.name}</option>
              ))}
            </select>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {chatSessions.length === 0 ? (
            <ChatHistoryLoader />
          ) : (
            <div className="p-4 space-y-3">
              {chatSessions.map((chat) => (
                <Card 
                  key={chat.id} 
                  className={`p-3 cursor-pointer border-0 shadow-sm transition-all duration-200 backdrop-blur-sm ${
                    chat.id === activeChatId 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700 transform scale-105' 
                      : 'bg-white/50 dark:bg-slate-700/50 hover:bg-gray-50/80 dark:hover:bg-slate-600/50 hover:transform hover:scale-105'
                  }`}
                  onClick={() => handleChatSelect(chat.id)}
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-medium truncate">{chat.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(chat.updatedAt).toLocaleString()}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-b border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Research Assistant</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedFile ? `Analyzing ${selectedFile.name}` : `Ready to help with ${files.length} documents`}
              </p>
            </div>
            <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-700">
              Online
            </Badge>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeChat?.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-2xl ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`rounded-2xl px-4 py-3 transition-all duration-200 ${
                  msg.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md shadow-lg' 
                    : 'bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border border-gray-200 dark:border-gray-700 rounded-bl-md shadow-sm'
                }`}>
                  <p className={`${msg.type === 'ai' ? 'text-gray-800 dark:text-gray-200' : 'text-white'} whitespace-pre-line`}>
                    {msg.content}
                  </p>
                  
                  {msg.sources && (
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-600">
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Sources:</p>
                      <div className="space-y-1">
                        {msg.sources.map((source, index) => (
                          <div key={index} className="flex items-center space-x-2 text-xs text-blue-600 dark:text-blue-400">
                            <FileText className="w-3 h-3" />
                            <span>{source.title}, Page {source.page}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}

          {isTyping && <ChatLoadingBubble />}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border-t border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything about your documents..."
                className="pr-20 py-3 text-base border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={files.filter(f => f.status === 'completed').length === 0}
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
              disabled={!message.trim() || files.filter(f => f.status === 'completed').length === 0}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
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
