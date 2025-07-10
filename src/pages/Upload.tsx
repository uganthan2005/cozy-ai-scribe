
import { useState, useCallback } from 'react';
import { Upload as UploadIcon, File, X, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  uploadedAt: string;
}

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: '1',
      name: 'Climate Research Report 2024.pdf',
      size: '2.4 MB',
      status: 'completed',
      progress: 100,
      uploadedAt: '2 hours ago'
    },
    {
      id: '2',
      name: 'Agricultural Impact Study.pdf',
      size: '1.8 MB',
      status: 'completed',
      progress: 100,
      uploadedAt: '1 day ago'
    },
    {
      id: '3',
      name: 'Food Security Analysis.pdf',
      size: '3.1 MB',
      status: 'processing',
      progress: 65,
      uploadedAt: 'Just now'
    }
  ]);

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
      if (file.type === 'application/pdf') {
        const newFile: UploadedFile = {
          id: Date.now().toString(),
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          status: 'uploading',
          progress: 0,
          uploadedAt: 'Just now'
        };
        
        setFiles(prev => [newFile, ...prev]);
        
        // Simulate upload progress
        const interval = setInterval(() => {
          setFiles(prev => prev.map(f => {
            if (f.id === newFile.id) {
              if (f.progress < 100) {
                return { ...f, progress: f.progress + 10 };
              } else {
                return { ...f, status: 'processing' };
              }
            }
            return f;
          }));
        }, 200);

        // Simulate completion
        setTimeout(() => {
          clearInterval(interval);
          setFiles(prev => prev.map(f => 
            f.id === newFile.id ? { ...f, status: 'completed', progress: 100 } : f
          ));
        }, 3000);
      }
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
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
        return <Badge className="bg-green-100 text-green-800">Ready</Badge>;
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case 'uploading':
        return <Badge className="bg-gray-100 text-gray-800">Uploading</Badge>;
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Documents</h1>
          <p className="text-gray-600">Upload PDF documents and let AI analyze them for instant Q&A</p>
        </div>

        {/* Upload Area */}
        <Card className="mb-8 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-200">
          <div
            className={`p-12 text-center ${
              dragActive ? 'bg-blue-50 border-blue-400' : 'bg-white'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <UploadIcon className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Drop your PDF files here
            </h3>
            <p className="text-gray-600 mb-6">
              or click to browse from your computer
            </p>
            
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={() => document.getElementById('file-input')?.click()}
              >
                Choose Files
              </Button>
              <span className="text-sm text-gray-500">or drag and drop</span>
            </div>
            
            <div className="text-sm text-gray-500">
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

        {/* Uploaded Files */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Your Documents</h2>
            <span className="text-sm text-gray-500">{files.length} files</span>
          </div>

          {files.map((file) => (
            <Card key={file.id} className="p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    {getStatusIcon(file.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="font-medium text-gray-900 truncate">{file.name}</h3>
                      {getStatusBadge(file.status)}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.uploadedAt}</span>
                    </div>
                    
                    {(file.status === 'uploading' || file.status === 'processing') && (
                      <div className="mt-2">
                        <Progress value={file.progress} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">
                          {file.status === 'uploading' ? 'Uploading...' : 'Processing document...'} {file.progress}%
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {file.status === 'completed' && (
                    <Button variant="outline" size="sm">
                      Chat
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeFile(file.id)}
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
          <Card className="p-12 text-center bg-white">
            <File className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
            <p className="text-gray-600">Upload your first PDF to get started with AI-powered Q&A</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Upload;
