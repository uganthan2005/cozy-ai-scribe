
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FileText, MessageSquare, Upload, Zap, ChevronRight, Sparkles, History, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { ParticleCard } from '@/components/ui/magic-bento';
import { StarBorder } from '@/components/ui/star-border';

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate= useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-semibold text-gray-900">AI Scribe</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6">
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            <span>Powered by Gemini Flash 2.5</span>
          </div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Chat with your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> PDFs</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Upload any PDF and ask questions in natural language. Get accurate, contextual answers 
            powered by advanced AI that understands your documents inside out.
          </p>

          <div className="flex items-center justify-center space-x-4 mb-16">
            <Button 
              onClick={() => navigate('/app/chat')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Start Asking Questions
              <ChevronRight className={`w-5 h-5 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            </Button>
            <StarBorder 
              as="button"
              color="rgb(59, 130, 246)"
              speed="4s"
              className="px-8 py-4 text-lg font-medium"
              onClick={() => navigate('/app/upload')}
            >
              Documents
            </StarBorder>
          </div>

          {/* Demo Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="text-sm text-gray-500">AI Scribe - Research Assistant</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs">
                    What are the key findings about climate change in this research paper?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-md max-w-md">
                    Based on the research paper, there are three key findings: 1) Global temperatures have risen by 1.2°C since pre-industrial times...
                    <div className="mt-2 text-xs text-blue-600 font-medium">📄 Source: Climate Research 2024, Page 15-17</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A complete AI-powered research assistant that makes working with documents effortless
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ParticleCard enableTilt enableMagnetism glowColor="59, 130, 246">
              <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.3)">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Smart Upload</h3>
                <p className="text-gray-300 leading-relaxed">
                  Drag and drop PDFs or select from your device. Our AI automatically processes and indexes your documents for instant searching.
                </p>
              </SpotlightCard>
            </ParticleCard>

            <ParticleCard enableTilt enableMagnetism glowColor="168, 85, 247">
              <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.3)">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Natural Conversations</h3>
                <p className="text-gray-300 leading-relaxed">
                  Ask questions in plain English. Our AI understands context and provides detailed answers with exact source citations.
                </p>
              </SpotlightCard>
            </ParticleCard>

            <ParticleCard enableTilt enableMagnetism glowColor="34, 197, 94">
              <SpotlightCard spotlightColor="rgba(34, 197, 94, 0.3)">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Source Transparency</h3>
                <p className="text-gray-300 leading-relaxed">
                  Every answer includes specific page references and quotes, so you can verify information and dive deeper into the source material.
                </p>
              </SpotlightCard>
            </ParticleCard>
          </div>
          
          {/* Quick Access Cards */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link to="/app/chat">
              <ParticleCard enableTilt enableMagnetism glowColor="59, 130, 246" className="cursor-pointer">
                <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.3)" className="h-full">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-8 h-8 text-blue-400" />
                    <div>
                      <h4 className="text-lg font-semibold text-white">Start Chat</h4>
                      <p className="text-gray-400 text-sm">Ask questions now</p>
                    </div>
                  </div>
                </SpotlightCard>
              </ParticleCard>
            </Link>
            
            <Link to="/app/upload">
              <ParticleCard enableTilt enableMagnetism glowColor="34, 197, 94" className="cursor-pointer">
                <SpotlightCard spotlightColor="rgba(34, 197, 94, 0.3)" className="h-full">
                  <div className="flex items-center space-x-3">
                    <Upload className="w-8 h-8 text-green-400" />
                    <div>
                      <h4 className="text-lg font-semibold text-white">Upload PDF</h4>
                      <p className="text-gray-400 text-sm">Add documents</p>
                    </div>
                  </div>
                </SpotlightCard>
              </ParticleCard>
            </Link>
            
            <Link to="/app/history">
              <ParticleCard enableTilt enableMagnetism glowColor="249, 115, 22" className="cursor-pointer">
                <SpotlightCard spotlightColor="rgba(249, 115, 22, 0.3)" className="h-full">
                  <div className="flex items-center space-x-3">
                    <History className="w-8 h-8 text-orange-400" />
                    <div>
                      <h4 className="text-lg font-semibold text-white">View History</h4>
                      <p className="text-gray-400 text-sm">Past conversations</p>
                    </div>
                  </div>
                </SpotlightCard>
              </ParticleCard>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to transform how you work with documents?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of researchers, students, and professionals who are already using AI Scribe to unlock insights from their PDFs.
          </p>
          <StarBorder 
            as="button"
            color="rgba(255, 255, 255, 0.8)"
            speed="5s"
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => navigate('/app/chat')}
          >
            Get Started Free
          </StarBorder>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">AI Scribe</span>
            </div>
            <p className="text-gray-600">© 2024 AI Scribe. Built with ❤️ for researchers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
