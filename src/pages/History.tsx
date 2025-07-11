
import { useState } from 'react';
import { History as HistoryIcon, Clock, FileText, MessageSquare, Search, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';

const History = () => {
  const { chatSessions, files } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'chats' | 'uploads'>('all');

  const filteredHistory = [...chatSessions, ...files]
    .filter(item => {
      if (filterType === 'chats' && !('messages' in item)) return false;
      if (filterType === 'uploads' && !('status' in item)) return false;
      
      const searchFields = 'messages' in item 
        ? [item.title, ...item.messages.map(m => m.content)]
        : [item.name];
      
      return searchFields.some(field => 
        field.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
    .sort((a, b) => {
      const dateA = new Date('updatedAt' in a ? a.updatedAt : a.uploadedAt);
      const dateB = new Date('updatedAt' in b ? b.updatedAt : b.uploadedAt);
      return dateB.getTime() - dateA.getTime();
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Activity History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View your recent chats and uploaded documents
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search your history..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterType === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterType('all')}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filterType === 'chats' ? 'default' : 'outline'}
                  onClick={() => setFilterType('chats')}
                  size="sm"
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Chats
                </Button>
                <Button
                  variant={filterType === 'uploads' ? 'default' : 'outline'}
                  onClick={() => setFilterType('uploads')}
                  size="sm"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  Uploads
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History Items */}
        <div className="space-y-4">
          {filteredHistory.length === 0 ? (
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <HistoryIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No history found
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Start chatting or uploading documents to see your activity here.
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredHistory.map((item) => (
              <Card key={item.id} className="shadow-lg border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {'messages' in item ? (
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                      ) : (
                        <FileText className="w-5 h-5 text-green-600" />
                      )}
                      <div>
                        <CardTitle className="text-lg">
                          {'messages' in item ? item.title : item.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3" />
                          {'updatedAt' in item 
                            ? new Date(item.updatedAt).toLocaleDateString()
                            : new Date(item.uploadedAt).toLocaleDateString()
                          }
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {'messages' in item ? (
                        <Badge variant="secondary">
                          {item.messages.length} messages
                        </Badge>
                      ) : (
                        <Badge variant={
                          item.status === 'completed' ? 'default' :
                          item.status === 'error' ? 'destructive' : 'secondary'
                        }>
                          {item.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                {'messages' in item && item.messages.length > 0 && (
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {item.messages[item.messages.length - 1].content}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
