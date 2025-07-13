
import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  Upload, 
  User, 
  Settings,
  Sparkles,
  Plus,
  History,
  Home,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StarBorder } from '@/components/ui/star-border';
import { useAppStore } from '@/store/useAppStore';
import { useTheme } from '@/components/theme/ThemeProvider';

const navigationItems = [
  { title: 'Chat', url: '/app/chat', icon: MessageSquare },
  { title: 'Upload PDFs', url: '/app/upload', icon: Upload },
  { title: 'History', url: '/app/history', icon: History },
];

const accountItems = [
  { title: 'Profile', url: '/app/profile', icon: User },
  { title: 'Settings', url: '/app/settings', icon: Settings },
];

export function AppSidebar() {
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { files, chatSessions, addChatSession } = useAppStore();
  
  const currentPath = location.pathname;
  const isCollapsed = state === 'collapsed';
  const completedFiles = files.filter(f => f.status === 'completed');

  const isActive = (path: string) => currentPath === path;
  const getNavClass = (path: string) =>
    `flex items-center w-full transition-all duration-200 rounded-lg ${
      isActive(path)
        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20'
    }`;

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat = {
      id: newChatId,
      title: 'New Chat',
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    addChatSession(newChat);
    navigate('/app/chat');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <Sidebar className={`${isCollapsed ? 'w-16' : 'w-64'} border-r border-gray-200 dark:border-gray-700 bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-800`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-200 transform hover:scale-110"
              onClick={handleHomeClick}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            {!isCollapsed && (
              <span 
                className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={handleHomeClick}
              >
                AI Scribe
              </span>
            )}
          </div>
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <Home className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        
        {/* Sidebar Toggle Button */}
        <div className="mt-4 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <SidebarContent className="flex flex-col h-full">
        {!isCollapsed && (
          <div className="p-4">
            <StarBorder 
              as="button" 
              onClick={handleNewChat}
              className="w-full"
              color="rgb(99, 102, 241)" 
              speed="4s"
            >
              <div className="flex items-center justify-center">
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </div>
            </StarBorder>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : 'text-gray-500 dark:text-gray-400 font-semibold'}>
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                      {!isCollapsed && (
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium">{item.title}</span>
                          {item.title === 'Chat' && chatSessions.length > 0 && (
                            <Badge variant="secondary" className="ml-2 text-xs bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700">
                              {chatSessions.length}
                            </Badge>
                          )}
                          {item.title === 'Upload PDFs' && completedFiles.length > 0 && (
                            <Badge variant="secondary" className="ml-2 text-xs bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700">
                              {completedFiles.length}
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto">
          <SidebarGroup>
            <SidebarGroupLabel className={isCollapsed ? 'sr-only' : 'text-gray-500 dark:text-gray-400 font-semibold'}>
              Account
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {accountItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClass(item.url)}>
                        <item.icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                        {!isCollapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
