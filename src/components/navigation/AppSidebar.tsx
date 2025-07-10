
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FileText, 
  MessageSquare, 
  Upload, 
  User, 
  Settings,
  Sparkles,
  Plus,
  History
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
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { title: 'Chat', url: '/app/chat', icon: MessageSquare },
  { title: 'Upload PDFs', url: '/app/upload', icon: Upload },
  { title: 'Documents', url: '/documents', icon: FileText },
  { title: 'History', url: '/history', icon: History },
];

const accountItems = [
  { title: 'Profile', url: '/profile', icon: User },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === 'collapsed';

  const isActive = (path: string) => currentPath === path;
  const getNavClass = (path: string) =>
    `flex items-center w-full transition-colors duration-200 ${
      isActive(path)
        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
    }`;

  return (
    <Sidebar className={`${isCollapsed ? 'w-16' : 'w-64'} border-r border-gray-200 bg-white`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-semibold text-gray-900">AI Scribe</span>
          )}
        </div>
      </div>

      <SidebarContent className="flex flex-col h-full">
        {!isCollapsed && (
          <div className="p-4">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : ''}>
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto">
          <SidebarGroup>
            <SidebarGroupLabel className={isCollapsed ? 'sr-only' : ''}>
              Account
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {accountItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClass(item.url)}>
                        <item.icon className={`h-5 w-5 ${isCollapsed ? '' : 'mr-3'}`} />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>

      <SidebarTrigger className="absolute top-4 right-4" />
    </Sidebar>
  );
}
