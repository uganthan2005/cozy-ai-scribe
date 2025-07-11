
import { useState, useCallback } from 'react';
import { Upload as UploadIcon, File, X, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';
import { PDFLoadingCard, UploadLoadingState } from '@/components/ui/loading-states';

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();
  
  const { 
    files, 
    addFile, 
    updateFile, 
    removeFile, 
    selectFile,
    setActiveChatId 
  } = useAppStore();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFiles = (fileList: FileList) => {
    Array.from(fileList).forEach((file) => {
      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        const fileId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        const newFile = {
          id: fileId,
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          status: 'uploading' as const,
          progress: 0,
          uploadedAt: 'Just now',
          type: 'pdf' as const
        };
        
        addFile(newFile);
        
        // Simulate upload progress
        const interval = setInterval(() => {
          const currentFile = files.find(f => f.id === fileId);
          if (!currentFile) return;
          
          if (currentFile.progress < 100) {
            updateFile(fileId, { progress: currentFile.progress + 10 });
          } else {
            updateFile(fileId, { status: 'processing' });
          }
        }, 200);

        // Simulate completion
        setTimeout(() => {
          clearInterval(interval);
          updateFile(fileId, { 
            status: 'completed', 
            progress: 100,
            uploadedAt: new Date().toLocaleString()
          });
        }, 3000);
      }
    });
  };

  const handleRemoveFile = (id: string) => {
    removeFile(id);
  };

  const handleChatWithFile = (fileId: string) => {
    selectFile(fileId);
    setActiveChatId(null); // Create new chat
    navigate('/app/chat');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-700">Ready</Badge>;
      case 'processing':
        return <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-700">Processing</Badge>;
      case 'uploading':
        return <Badge className="bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-800/20 dark:to-slate-800/20 text-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700">Uploading</Badge>;
      case 'error':
        return <Badge className="bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/20 dark:to-rose-900/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-700">Error</Badge>;
      default:
        return null;
    }
  };

  const completedFiles = files.filter(f => f.status === 'completed');
  const processingFiles = files.filter(f => f.status === 'uploading' || f.status === 'processing');

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Upload Documents</h1>
          <p className="text-gray-600 dark:text-gray-400">Upload PDF documents and let AI analyze them for instant Q&A</p>
          {completedFiles.length > 0 && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">
              {completedFiles.length} document{completedFiles.length !== 1 ? 's' : ''} ready for chat
            </p>
          )}
        </div>

        {/* Upload Area */}
        <Card className="mb-8 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-200 backdrop-blur-sm bg-white/80 dark:bg-slate-800/80">
          <div
            className={`p-12 text-center transition-all duration-200 ${
              dragActive ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-400 dark:border-blue-500' : 'bg-transparent'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <UploadIcon className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Drop your PDF files here
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              or click to browse from your computer
            </p>
            
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                Choose Files
              </Button>
              <span className="text-sm text-gray-500 dark:text-gray-400">or drag and drop</span>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Supported format: PDF files only</p>
              <p>Maximum file size: 10MB per file</p>
            </div>
            
            <input
              id="file-input"
              type="file"
              multiple
              accept=".pdf"
              className="hidden"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
          </div>
        </Card>

        {/* Processing Files */}
        {processingFiles.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Processing Files</h2>
            <div className="space-y-4">
              {processingFiles.map((file) => (
                <PDFLoadingCard key={file.id} />
              ))}
            </div>
          </div>
        )}

        {/* Completed Files */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Documents</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">{files.length} file{files.length !== 1 ? 's' : ''}</span>
          </div>

          {files.map((file) => (
            <Card key={file.id} className="p-6 bg-white/80 backdrop-blur-sm dark:bg-slate-800/80 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 hover:transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    {getStatusIcon(file.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white truncate">{file.name}</h3>
                      {getStatusBadge(file.status)}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.uploadedAt}</span>
                    </div>
                    
                    {(file.status === 'uploading' || file.status === 'processing') && (
                      <div className="mt-2">
                        <Progress value={file.progress} className="h-2" />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {file.status === 'uploading' ? 'Uploading...' : 'Processing document...'} {file.progress}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {file.status === 'completed' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleChatWithFile(file.id)}
                      className="border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                      Chat
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRemoveFile(file.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {files.length === 0 && (
          <Card className="p-12 text-center bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
            <File className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No documents yet</h3>
            <p className="text-gray-600 dark:text-gray-400">Upload your first PDF to get started with AI-powered Q&A</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Upload;
