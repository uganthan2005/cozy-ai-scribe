
import { create } from 'zustand';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  uploadedAt: string;
  type: 'pdf' | 'doc' | 'txt';
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
  sources?: Array<{ title: string; page: string }>;
}

interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  documentId?: string;
  createdAt: string;
  updatedAt: string;
}

interface AppState {
  // Files
  files: UploadedFile[];
  selectedFileId: string | null;
  
  // Chat
  chatSessions: ChatSession[];
  activeChatId: string | null;
  isTyping: boolean;
  
  // UI State
  isLoading: boolean;
  loadingMessage: string;
  sidebarCollapsed: boolean;
  
  // Actions
  addFile: (file: UploadedFile) => void;
  updateFile: (id: string, updates: Partial<UploadedFile>) => void;
  removeFile: (id: string) => void;
  selectFile: (id: string | null) => void;
  
  addChatSession: (session: ChatSession) => void;
  updateChatSession: (id: string, updates: Partial<ChatSession>) => void;
  deleteChatSession: (id: string) => void;
  setActiveChatId: (id: string | null) => void;
  addMessage: (chatId: string, message: ChatMessage) => void;
  
  setIsTyping: (typing: boolean) => void;
  setLoading: (loading: boolean, message?: string) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  files: [],
  selectedFileId: null,
  chatSessions: [],
  activeChatId: null,
  isTyping: false,
  isLoading: false,
  loadingMessage: '',
  sidebarCollapsed: false,
  
  // File actions
  addFile: (file) => set((state) => ({ 
    files: [file, ...state.files] 
  })),
  
  updateFile: (id, updates) => set((state) => ({
    files: state.files.map(file => 
      file.id === id ? { ...file, ...updates } : file
    )
  })),
  
  removeFile: (id) => set((state) => ({
    files: state.files.filter(file => file.id !== id),
    selectedFileId: state.selectedFileId === id ? null : state.selectedFileId
  })),
  
  selectFile: (id) => set({ selectedFileId: id }),
  
  // Chat actions
  addChatSession: (session) => set((state) => ({
    chatSessions: [session, ...state.chatSessions],
    activeChatId: session.id
  })),
  
  updateChatSession: (id, updates) => set((state) => ({
    chatSessions: state.chatSessions.map(session =>
      session.id === id ? { ...session, ...updates } : session
    )
  })),
  
  deleteChatSession: (id) => set((state) => ({
    chatSessions: state.chatSessions.filter(session => session.id !== id),
    activeChatId: state.activeChatId === id ? null : state.activeChatId
  })),
  
  setActiveChatId: (id) => set({ activeChatId: id }),
  
  addMessage: (chatId, message) => set((state) => ({
    chatSessions: state.chatSessions.map(session =>
      session.id === chatId 
        ? { 
            ...session, 
            messages: [...session.messages, message],
            updatedAt: new Date().toISOString()
          }
        : session
    )
  })),
  
  // UI actions
  setIsTyping: (typing) => set({ isTyping: typing }),
  setLoading: (loading, message = '') => set({ 
    isLoading: loading, 
    loadingMessage: message 
  }),
  toggleSidebar: () => set((state) => ({ 
    sidebarCollapsed: !state.sidebarCollapsed 
  })),
}));
