
import { FileText, MessageCircle, Upload, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const PDFLoadingCard = () => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
    <div className="flex items-center space-x-3">
      <div className="animate-pulse">
        <FileText className="w-8 h-8 text-blue-500" />
      </div>
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '45%' }}></div>
        </div>
      </div>
    </div>
  </div>
);

export const ChatLoadingBubble = () => (
  <div className="flex justify-start">
    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm max-w-xs">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  </div>
);

export const UploadLoadingState = () => (
  <div className="flex flex-col items-center justify-center p-12 space-y-4">
    <div className="relative">
      <Upload className="w-16 h-16 text-blue-500" />
      <Loader2 className="w-6 h-6 text-blue-600 animate-spin absolute -top-1 -right-1" />
    </div>
    <div className="text-center space-y-2">
      <h3 className="text-lg font-medium text-gray-900">Processing Document</h3>
      <p className="text-gray-500">Analyzing and indexing your PDF...</p>
    </div>
  </div>
);

export const ChatHistoryLoader = () => (
  <div className="space-y-3 p-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="bg-white rounded-lg p-3 shadow-sm">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    ))}
  </div>
);

export const GlobalLoader = ({ message }: { message?: string }) => (
  <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6 shadow-xl flex items-center space-x-4">
      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      <span className="text-gray-700">{message || 'Loading...'}</span>
    </div>
  </div>
);
